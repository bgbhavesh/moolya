import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
// import InteractionsCounter from '../../components/InteractionsCounter'

export default class AppStartupManagement extends React.Component{
  componentDidMount()
  {
    var $frame = $('#forcecentered');
    var $wrap  = $frame.parent();

    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt:0,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

    });
  }
  render(){
    return (
      <div className="col-lg-12 nopadding">
        <h2>Management</h2>
        <div className="row">

          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_20.jpg" className="team_img" />
                <h3>
                  Aakrit Vaish <br /><b>Co-Founder & CEO</b>
                </h3>
              </div>
            </a>
          </div>

          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_21.jpg" className="team_img" />
                <h3>
                  Swapan Rajdev <br /><b>Co-Founder & CTO</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_22.jpg" className="team_img" />
                <h3>
                  Apurva Mudgal <br /><b>VP, Product</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_23.jpg" className="team_img" />
                <h3>
                  Miten Sampat <br /><b>Advisor</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_24.jpg" className="team_img" />
                <h3>
                  Dhaval <br /><b>Advisor</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_25.jpg" className="team_img" />
                <h3>
                  Amith <br /><b>Advisor</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_26.jpg" className="team_img" />
                <h3>
                  Animesh <br /><b>Advisor</b>
                </h3>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
            <a href="/app/startupManagementViewDetails">
              <div className="team-block">
                <img src="/images/p_27.jpg" className="team_img" />
                <h3>
                  Pavan <br /><b>Advisor</b>
                </h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
};
