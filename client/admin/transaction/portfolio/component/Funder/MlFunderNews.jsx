import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class MlFunderNews extends React.Component{
  componentDidMount()
  {
  }
  render(){
    return (
      <div>

        <h2>News</h2>
        <div className="main_wrap_scroll">
          <ul className="list-info">
            <li>1/5/2017 - Kishore Kumar invests undisclosed amount in fintech startup.</li>
          </ul>
        </div>




      </div>
    )
  }
};
