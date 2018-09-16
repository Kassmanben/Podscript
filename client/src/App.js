import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import './app.css';
import Episode from './Episode'
import {Button} from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)
library.add(faTimesCircle)
library.add(faChevronDown)
library.add(faChevronUp)

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
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      episodes: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  
  render() {
    const {data: {loading, episodes}} = this.props
    if(loading){
      return(<div>Loading</div>)
    }

    return (
      <div className="App">
      <div className="row">
        <img className='logo img-fluid' src={require('./Podscript.png')} alt="Podscript Logo"></img>      
      </div>
      <div className="row">
      <form>
        <input type="text" className="form-control form-control-lg" id="search" placeholder="Search" value={this.state.title} onChange={this.handleChange}/>
      </form>
      </div>
        {
          episodes.filter(function(episode) {
            if (episode.EpisodeDescription.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1||
            episode.EpisodeTitle.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1) {
                return episode
            }
        }, this).map(episode =>{
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
