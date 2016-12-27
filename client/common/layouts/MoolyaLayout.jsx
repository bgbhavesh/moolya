import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

MoolyaLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})

MoolyaContent = React.createClass({
  render(){
    return (
      <div className="intro" style={{textAlign:"center"}}>
        <video poster="" id="bgvid" autoPlay muted loop playsInline>
          <source src="images/bg_video.mp4"/>
        </video>
        <img className="logo" src="images/moolya_logo.png" />
        <a href="/admin" className="moolya_btn">let’s get you started</a>
      </div>
    )
  }
})

