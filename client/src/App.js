import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import './app.css';
import Episode from './Episode'

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
      oldestFirst: true,
      completedFilter: "All"
    }

    this.handleChange = this.handleChange.bind(this);
    this.sortEpisodes = this.sortEpisodes.bind(this);
    this.filterCompleted = this.filterCompleted.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  sortEpisodes() {
    this.setState({oldestFirst:!this.state.oldestFirst})
    document.getElementById("sortButton").style.backgroundColor=this.state.oldestFirst? "purple": "green"
  }

  filterCompleted() {
    if(this.state.completedFilter==="All"){
      this.setState({completedFilter:"Completed"})
      document.getElementById("filterCompletedButton").style.backgroundColor="green"
    }else if(this.state.completedFilter==="Completed"){
      this.setState({completedFilter:"Uncompleted"})
      document.getElementById("filterCompletedButton").style.backgroundColor="red"
    }else if(this.state.completedFilter==="Uncompleted"){
      this.setState({completedFilter:"In Progress"})
      document.getElementById("filterCompletedButton").style.backgroundColor="yellow"
    }else{
      this.setState({completedFilter:"All"})
      document.getElementById("filterCompletedButton").style.backgroundColor="black"
    }
  }

  
  render() {
    var {data: {loading, episodes}} = this.props
    if(loading){
      return(<div>Loading</div>)
    }
    episodes = this.state.oldestFirst ? Array.from(episodes): Array.from(episodes).reverse()
    return (
      <div className="App">
      <div className="row">
        <div className="logo">Podscript</div>
        <input type="text" className="form-control form-control-lg" id="search" placeholder="Search" value={this.state.title} onChange={this.handleChange}/>
       <div className="row filters">
        <input className="btn" id="sortButton" type="button" onClick={this.sortEpisodes} value={this.state.oldestFirst ? "Oldest First":"Newest First"} />
        <input className="btn" id="filterCompletedButton" type="button" onClick={this.filterCompleted} value={this.state.completedFilter} />
        </div>
      </div>
        {
          episodes.filter(function(episode) {
            if (episode.EpisodeDescription.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1||
            episode.EpisodeTitle.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1) {
              if(this.state.completedFilter==="All"){
                return episode;
              }else if(this.state.completedFilter==="Completed" && episode.Completed === "2"){
                return episode
              }else if(this.state.completedFilter==="Uncompleted"&& episode.Completed === "0"){
                return episode
              }else if(this.state.completedFilter==="In Progress"&& episode.Completed === "1"){
                return episode
              }
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
