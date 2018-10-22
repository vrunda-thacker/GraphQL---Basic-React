import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import  query from '../queries/fetchSongs';

class SongList extends Component {
  constructor(props) {
    super(props);

    this.deleteSong = this.deleteSong.bind(this);
  }

  deleteSong(id) {
    this.props.mutate({
      variables: {
        id
      }
    }).then(() => {
      return this.props.data.refetch();
    });
  };

  renderSongs() {
    return this.props.data && this.props.data.songs && this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>{ title }</Link>
          <button className='btn-floatin btn-small red right' onClick={() => this.deleteSong(id)}>Delete</button>
        </li>
      );
    })
  }

  render() {
    if (this.props.data && this.props.data.loading) {
      return (
        <div>Loading... </div>
      );
    }
    return (
      <div>
        <ul className='collection'>
        {
          this.renderSongs()
        }
        </ul>
        <Link to='/songs/new' className='btn-floating btn-large blue right'>
          Add
        </Link>
    </div>
  )}
}

const delMutation = gql`
  mutation DeleteSong($id:ID) {
    deleteSong(id: $id) {
      id
    }
}`;


export default graphql(delMutation)(
  graphql(query)(SongList));
