import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import './app.css';
import Episode from './Episode'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)
library.add(faTimesCircle)

const EpisodesQuery = gql`{
  episodes {
  EpisodeNumber
	EpisodeTitle
	EpisodeDescription
  Completed
  id
}
}`
class App extends Component {
  render() {
    const {data: {loading, episodes}} = this.props
    if(loading){
      return(null)
    }
    return (
      <div className="App">
        {
          episodes.map(episode =>{
            return(
              <Episode
                key = {`${episode.id}-episode-id`}
                EpisodeDescription = {episode.EpisodeDescription}
                EpisodeTitle = {episode.EpisodeTitle}
                EpisodeNumber = {episode.EpisodeNumber}
                Completed = {episode.Completed}
                id = {episode.id}
                />
            )
          })
        }
      </div>
    );
  }
}

export default graphql(EpisodesQuery)(App);
