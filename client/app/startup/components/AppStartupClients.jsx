import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
// import InteractionsCounter from '../../components/InteractionsCounter'

export default class AppStartupClients extends React.Component{
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
        <h2>Clients</h2>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">

          <div className="team-block">
            <img src="/images/p_27.jpg" className="team_img" />
            <h3>
              Zomato <br /><b>Series A</b>
            </h3>
          </div>

        </div>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
          <div className="team-block">
            <img src="/images/p_26.jpg" className="team_img" />
            <h3>
              Cuemath <br /><b>Series B</b>
            </h3>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
          <div className="team-block">
            <img src="/images/p_25.jpg" className="team_img" />
            <h3>
              LeadSquared <br /><b>Venture</b>
            </h3>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
          <div className="team-block">
            <img src="/images/p_24.jpg" className="team_img" />
            <h3>
              DoneThing <br /><b>Seed</b>
            </h3>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
          <div className="team-block">
            <img src="/images/p_23.jpg" className="team_img" />
            <h3>
              Naval Ravikant <br /><b>Seed</b>
            </h3>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
          <div className="team-block">
            <img src="/images/p_22.jpg" className="team_img" />
            <h3>
              Sanjay Jesrani <br /><b>Seed</b>
            </h3>
          </div>
        </div>

      </div>
    )
  }
};
