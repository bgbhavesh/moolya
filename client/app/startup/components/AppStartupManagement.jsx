import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
// import TopIconsList from '../../components/topIconsList'
// import AppActionButtons from '../../components/appActionButtons'

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
      <div className="app_main_wrap">
        <div className="app_padding_wrap portfolio-main-wrap">
          <div className="col-md-12">
            {/*<TopIconsList/>*/}
            <div className="top_block_scroller" id="forcecentered">
              <ul>
                <li>
                  <div className="team-block">
                    <img src="/images/p_20.jpg" className="team_img" />
                    <h3>
                      Co-Founder & CEO <br /><b>Aakrit Vaish</b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_21.jpg" className="team_img" />
                    <h3>
                      Co-Founder & CTO <br /><b>Swapan Rajdev </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_22.jpg" className="team_img" />
                    <h3>
                      VP, Product <br /><b>Apurva Mudgal </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_23.jpg" className="team_img" />
                    <h3>
                      Advisor <br /><b>Miten Sampat </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_24.jpg" className="team_img" />
                    <h3>
                      Advisor <br /><b>Dhaval </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_25.jpg" className="team_img" />
                    <h3>
                      Advisor <br /><b>Amith </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_26.jpg" className="team_img" />
                    <h3>
                      Advisor <br /><b>Animesh </b>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="team-block">
                    <img src="/images/p_27.jpg" className="team_img" />
                    <h3>
                      Advisor <br /><b>Pavan </b>
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/*<AppActionButtons/>*/}

          <br className="brclear"/>
        </div>
      </div>
    )
  }
};
