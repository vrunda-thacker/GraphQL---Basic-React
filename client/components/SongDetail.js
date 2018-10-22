import React, { Component } from 'react';
import fetchSongDetail from '../queries/fetchSongDetail';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import AddLyric from './AddLyric';
import LyricList from './LyricList';


class SongDetail extends Component {

  render() {
    console.log(this.props);
    const  { song } = this.props.data;
    if (!song) {
      return <div>Loading... </div>
    } else {
      return (
        <div>
          <Link to='/'>Back</Link>
          <h3>{
            `Song Details for ${song.title}`
          }</h3>
          <LyricList lyrics={song.lyrics} />
          <AddLyric songId={this.props.params.id}/>
        </div>
      );
    }
  }
}

export default graphql(fetchSongDetail, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id
      }
    }
  }
})(SongDetail);
