import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  { value: 'Type of Funding', label: 'Type of Funding' },
  { value: '2', label: '2' }
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderAreaOfInterest extends React.Component{
  componentDidMount()
  {
    $("#show").click(function(){
      $("#details-div").show();
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
      $("#show").hide();
    });
    $(function() {
      $('.float-label').jvFloat();
    });
  }
  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
        <h2>Area of Intrests</h2>
        <div className="requested_input main_wrap_scroll">

          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
            <div className="col-lg-12" id="show">
              <div className="row">

                <div className="col-lg-2 col-md-4 col-sm-4">

                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/education.png"/></div>
                    <h3>Education</h3>
                  </div>

                </div>
                <div className="col-lg-2 col-md-4 col-sm-4">

                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/health.png"/></div>
                    <h3>Health</h3>
                  </div>

                </div>
                <div className="col-lg-2 col-md-4 col-sm-4">

                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/mobility.png"/></div>
                    <h3>Mobility</h3>
                  </div>

                </div>
                <div className="col-lg-2 col-md-4 col-sm-4">

                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/ecommerce.png"/></div>
                    <h3>Ecommerce</h3>
                  </div>

                </div>

              </div>
            </div>

          </ScrollArea>






        </div>
        <div id="details-div" style={{display:'none'}}>
          <div className="col-lg-12">
            <div className="row">

              <div className="top_block_scroller" id="forcecentered">
                <ul className="topscroll_listblock">
                  <li>
                    <div className="list_block list_block_intrests notrans">
                      <div className="hex_outer"><img src="/images/education.png"/></div>
                      <h3>Education</h3>
                    </div>
                  </li>
                  <li>
                    <div className="list_block list_block_intrests notrans">
                      <div className="hex_outer"><img src="/images/health.png"/></div>
                      <h3>Health</h3>
                    </div>
                  </li>
                  <li>
                    <div className="list_block list_block_intrests notrans">
                      <div className="hex_outer"><img src="/images/mobility.png"/></div>
                      <h3>Mobility</h3>
                    </div>
                  </li>
                  <li>
                    <div className="list_block list_block_intrests notrans">
                      <div className="hex_outer"><img src="/images/ecommerce.png"/></div>
                      <h3>Ecommerce</h3>
                    </div>
                  </li>

                </ul>
              </div>


            </div>

          </div>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >

              <div className="col-lg-12">
                <div className="row">
                  <div className="investement-view-content">

                    <div className="panel panel-default panel-form-view"><div className="panel-body">
                      <p>DoneThing is an on-demand task management solution. Provide real time personal assistance enabling customers to fulfill their tangible/intangible needs wants and desires, through use of a combination of technology and logistics.</p>
                      <p>DoneThing aims to introduce concierge service to the fast growing Indian middle class population. The solution is empowering brick and mortar local businesses in the e-commerce age while offering affordable convenience to our customers.</p>
                      <p>The team includes MBA graduates and Chartered Accountants handling business operations and IIT graduates handling the technology operations. The overall team size now stands at 78.</p>
                    </div></div>


                  </div>
                </div>
              </div>

            </ScrollArea>






          </div>
        </div>

      </div>
    </div>


    )
  }
};
