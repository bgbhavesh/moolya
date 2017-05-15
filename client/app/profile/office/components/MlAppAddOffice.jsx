/**
 * Created by vishwadeep on 12/5/17.
 */
import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import MlAppNewSpokePerson from "./MlAppNewSpokePerson";
import MlSpokePersonDetail from "./MlSpokePersonDetail";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlAppAddOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewSpokePerson: true};
    return this;
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });


    $("#create_client").popover({
      'title': 'Add Investments',
      'html': true,
      'placement': 'right',
      'container': '.admin_main_wrap',
      'content': $(".ml_create_client").html()
    });
    $('.list_block').click(function () {
      $('#details-div').show();
      $('.requested_input').hide();
      var $frame = $('#forcecentered');
      var $wrap = $frame.parent();

      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

      });
    });
  }

  nextDetailPage() {
    FlowRouter.go('/app/officeMembersDetails');
  }

  showNewSpokePerson() {
    this.setState({showNewSpokePerson: true})
  }

  showDetails() {
    this.setState({showNewSpokePerson: false})
  }

  render() {
    let isShowNewSpoke = this.state.showNewSpokePerson ? true : false
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap portfolio-main-wrap">

          <div className="requested_input main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="#" id="create_client" data-placement="top" data-class="large_popover">
                      <div className="list_block notrans">
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3>Bespoke Members</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="list_block notrans funding_list">
                      <div><p className="fund">10 Members</p><span>Principal: 2</span><span>Team: 2</span><span>(Limited Community)</span>
                      </div>
                      <h3>Basic Office</h3>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="list_block notrans funding_list">
                      <div><p className="fund">15 Members</p><span>Principal: 2</span><span>Team: 13</span><span>(All Community)</span>
                      </div>
                      <h3>Advance Office</h3>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="list_block notrans funding_list">
                      <div><p className="fund">20 Members</p><span>Principal: 5</span><span>Team: 15</span><span>(All Community)</span>
                      </div>
                      <h3>Pro Office</h3>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="list_block notrans funding_list">
                      <div><p className="fund">10 Members</p><span>Principal: 2</span><span>Team: 2</span><span>(Limited Community)</span>
                      </div>
                      <h3>Basic Office</h3>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="list_block notrans funding_list">
                      <div><p className="fund">15 Members</p><span>Principal: 2</span><span>Team: 13</span><span>(All Community)</span>
                      </div>
                      <h3>Advance Office</h3>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>


            <div style={{'display': 'none'}} className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Enter Date of Investment" className="form-control float-label"
                      />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Company Name" className="form-control float-label"/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Investment Amount" className="form-control float-label"/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        options={options}
                        value='Type of Funding'
                        onChange={logChange}
                      />
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="About" className="form-control float-label"/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox"
                                                          value="1"/><label htmlFor="checkbox1"><span></span>Make
                        Default</label></div>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div id="details-div" style={{'display': 'none'}}>
            <div className="col-lg-12">
              <div className="row">

                <div className="top_block_scroller" id="forcecentered">
                  <ul>
                    <li>
                      <a onClick={this.showNewSpokePerson.bind(this)}>
                        <div className="team-block details-add-block">
                          <h2>Bespoke Memb</h2>
                          <span className="ml ml-plus "></span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="team-block" onClick={this.showDetails.bind(this)}>
                        <h2>Basic Office</h2>
                        <h3>
                          <p className="fund">10 Mem</p><p>Principal : 2</p><p>Team : 2</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block" onClick={this.showDetails.bind(this)}>
                        <h2>Advance Office</h2>
                        <h3>
                          <p className="fund">15 Mem</p><p>Principal : 2</p><p>Team : 13</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block" onClick={this.showDetails.bind(this)}>
                        <h2>Pro Office</h2>
                        <h3>
                          <p className="fund">20 Mem</p><p>Principal : 5</p><p>Team : 15</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block" onClick={this.showDetails.bind(this)}>
                        <h2>Advance Office</h2>
                        <h3>
                          <p className="fund">15 Mem</p><p>Principal : 2</p><p>Team : 13</p>
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {isShowNewSpoke ? <MlAppNewSpokePerson/> : <MlSpokePersonDetail/>}

          </div>
        </div>
      </div>
    )
  }
};

//onClick={this.nextDetailPage.bind(this)}
