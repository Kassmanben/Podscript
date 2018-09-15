import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle)


class Episode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayAll : false,
            moreOrLess : "+",
            completed: this.props.Completed,
            opendesc:0
        };
        this.showMoreorLess = this.showMoreorLess.bind(this);
      }

   
    showMoreorLess() {
    
        if(!this.state.displayAll){
            this.setState({displayAll:true});
            this.setState({moreOrLess: "-"});
        }
        else{
            this.setState({displayAll:false});
            this.setState({moreOrLess: "+"});
        }
    }
  render() {
    const {EpisodeNumber, EpisodeDescription,EpisodeTitle,id} = this.props
    return (
        <div>
        {(!this.state.displayAll ? 
        
        <div key={`${id}-episode-id`} className='row episode'>
            <div className="col-xs-2">
            <img className='img-thumb img-fluid' src={require('./MBMBaM.jpg')} alt="My Brother, My Brother and Me Logo"></img>
            </div>
            <div className="col-7">
                <div className="episode-info">
                    <div className='row name text-truncate'>{EpisodeTitle}</div>
                </div>
                <div id="cool-hover" className="row col-12" onClick={this.showMoreorLess}>
                    <FontAwesomeIcon className="hideorshow" icon={this.state.moreOrLess === "+" ? "chevron-down":"chevron-up"} vertical-align="middle"/>
                </div>
            </div>
                <div id={`${id}-completed`} className="completed col-1">
                    <FontAwesomeIcon icon={this.state.completed === "0" ? "times-circle":"check-circle"} 
                        color={this.state.completed === "0" ? "#a91212":"#2e9e2e"} size="2x" vertical-align="middle"/>
                </div>
        </div>
        
        : 

        <div key={`${id}-episode-id`} className='row episode-expanded' >
        <div className="row">

            <div className="col-md-4">
                <img className='img-expanded row center-block' src={require('./MBMBaM_lg.png')} alt="My Brother, My Brother and Me Logo"></img>
                <div id={`${id}-completed`} className="completed-expanded row">
            <FontAwesomeIcon icon={this.state.completed === "0" ? "times-circle":"check-circle"} 
            color={this.state.completed === "0" ? "#a91212":"#2e9e2e"} size="2x" vertical-align="middle"/>
        
            </div>
            </div>
                
            <div className="episode-info col-md-7">
                <div className='row name-expanded'>{EpisodeTitle}</div>
                <div className="description row expanded">
                {EpisodeDescription}
                </div>
            </div>
        </div>
        <div id="cool-hover" className="row col-md-12 padding-top" onClick={this.showMoreorLess}>
                    <FontAwesomeIcon className="hideorshow" icon={this.state.moreOrLess === "+" ? "chevron-down":"chevron-up"} vertical-align="middle"/>
        </div>
          
        </div>
        )}</div>
    
    );
  }
}

export default Episode;
