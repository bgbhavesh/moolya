import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';


export default class VerticalBreadCrum extends Component {
  constructor(props){
    super(props);
    return this;
  }

  componentDidMount()
  { }

  render(){
    return(

      <div className="vTimeline">
        <ul>
          <li>India</li>
          <li>Telangana</li>
          <li className="current">Internal Users</li>
          <li className="timelineLast"></li>
        </ul>
      </div>
    )
  }

}
