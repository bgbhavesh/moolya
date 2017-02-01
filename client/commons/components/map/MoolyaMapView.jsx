import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
import MoolyaFooter from '../footer/ActionComponent'
export default class MoolyaCluster extends Component {

  render(){

    return(
        <div className="map_view_block">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d64726659.874872215!2d23.88162120664553!3d8.039924591525171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1482583926409" width="100%" height="100%" frameBorder={0} style={{border: 0, float: 'left'}} allowFullScreen />

        </div>


    )
  }

}



