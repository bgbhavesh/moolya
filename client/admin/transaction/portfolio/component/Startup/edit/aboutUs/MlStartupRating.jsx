import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var Rating = require('react-rating');

export default class MlStartupRating extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      data:this.props.ratingDetails || {},
    }
    this.onRatingChange.bind(this);
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.rating)
    if(!empty){
      this.setState({data: this.context.startupPortfolio.rating});
    }
  }
  onRatingChange(rate){
    let details =this.state.data;
    details=_.omit(details,"rating");
    details=_.extend(details,{"rating":rate});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data
    this.props.getStartupRating(data)
  }
  render(){
    return (
        <div className="star_ratings">
          <Rating
            empty="fa fa-star-o empty"
            full="fa fa-star fill"
            fractions={2}
            initialRate={this.state.data.rating}
            onChange={this.onRatingChange.bind(this)}
          />
        </div>
    )
  }
}
MlStartupRating.contextTypes = {
  startupPortfolio: PropTypes.object,
};
