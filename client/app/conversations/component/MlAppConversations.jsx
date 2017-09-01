import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');

export default class MlAppConversations extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
      var swiper = new Swiper('.update_blocks', {
        slidesPerView: "auto",
        spaceBetween: 20
      });
  }

  redirectToChat(){
    FlowRouter.go('/app/chatview')
  }

  render(){
    return(
      <div className="app_main_wrap">
        <div className="col-md-12">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="#">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-message"></span></div>
                  <h3>
                    <span className="pull-left"> Messages</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="" onClick={this.redirectToChat.bind(this)}>
                <div className="list_block">
                  <div className="hex_outer"><span className="ml my-ml-chat"></span></div>
                  <h3>
                    <span className="pull-left"> Chats</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="#">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-phone-call"></span></div>
                  <h3>
                    <span className="pull-left"> Calls</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="/app/appOfficeBearerCommon">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-video-Chat"></span></div>
                  <h3>
                    <span className="pull-left"> Video</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="/app/appOfficeBearerCommon">
                <div className="list_block">
                  <div className="hex_outer"><span className="ml my-ml-audio"></span></div>
                  <h3>
                    <span className="pull-left"> Audio</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="/app/appOfficeBearerCommon">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-services"></span></div>
                  <h3>
                    <span className="pull-left"> Services</span>
                    {/*<span className="pull-right badge ml_badge_red">08</span>*/}
                  </h3>
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="/app/appOfficeBearerCommon">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-timeline"></span></div>
                  <h3>Timeline</h3>
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <a href="/app/appOfficeBearerCommon">
                <div className="list_block">

                  <div className="hex_outer"><span className="ml my-ml-share"></span></div>
                  <h3>Share</h3>
                </div>
              </a>
            </div>

          </div>
        </div>
        <br className="brclear"/>
        {/*<div className="update_blocks swiper-container">*/}
          {/*<div className="swiper-wrapper">*/}
            {/*<div className="update_block swiper-slide">*/}
              {/*<h3><span className="pull-left update_icon"><span className="ml my-ml-message"></span></span><span className="pull-right update_time">19-Nov-16 08:00PM</span></h3>*/}
              {/*<p>*/}
                {/*<b>From :</b> Steave Smith<br/>*/}
                {/*<b>Sub :</b> Funding Response<br/>*/}
                {/*Dear Govind, I am interested to fund on your idea*/}
              {/*</p>*/}
            {/*</div>*/}
            {/*<div className="update_block swiper-slide">*/}
              {/*<h3><span className="pull-left update_icon"><span className="ml my-ml-chat"></span></span><span className="pull-right update_time">19-Nov-16 08:00PM</span></h3>*/}
              {/*<p>*/}
                {/*<b>From :</b> Miraj Jain<br/>*/}
                {/*Hey, Please send the details on things required...*/}
              {/*</p>*/}
            {/*</div>*/}
            {/*<div className="update_block swiper-slide">*/}
              {/*<h3><span className="pull-left update_icon"><span className="ml my-ml-video-Chat"></span></span><span className="pull-right update_time">19-Nov-16 08:00PM</span></h3>*/}
              {/*<p>*/}
                {/*<span className="ml my-ml-video-Chat"></span><br/>*/}
                {/*Miraj Jain*/}
              {/*</p>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    )
  }
}
