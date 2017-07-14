/** ************************************************************
 * Date: 12 Jul, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Infinite scroll component
 * JavaScript file MlInfiniteScroll.js
 * *************************************************************** */

/**
 * Import libs and component
 */
import React, { Component } from 'react';
import MlInfiniteScrollComposer from '../actions/MlInfiniteScrollComposer';

export default class MlInfiniteScroll extends Component {

  constructor(props){
    super(props);

  }

  render() {
    let config=this.props.config;
    return (
      <MlInfiniteScrollComposer {...config}/>
    );
  }

}
