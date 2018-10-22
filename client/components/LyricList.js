import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {

  onLike(id, currentLikes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse:{
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: currentLikes + 1
        }
      }
  })
  }

  renderLyrics() {
    return this.props.lyrics && this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          { content }
          <div className='vote-box'>
            <i onClick={ () => this.onLike(id, likes) } className='material-icons'>thumb_up</i>
            {likes}
          </div>
        </li>
      );
    })
  }

  render() {
    return (
      <ul className='collection'>
      { this.renderLyrics() }
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id:ID) {
    likeLyric(id: $id){
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
