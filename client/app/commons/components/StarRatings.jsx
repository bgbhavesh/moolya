import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Rating = require('react-rating');

export default class StarRatings extends React.Component{
  render(){
    return (
      <div className="star_ratings">
        <Rating  empty="fa fa-star-o empty"  full="fa fa-star fill" fractions={2} initialRate={2.5} readonly={true}/>
      </div>
    )
  }
};
