/**
 * Created by vishwadeep on 12/5/17.
 */
import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import MlAppNewSpokePerson from "./MlAppNewSpokePerson";
import MlSpokePersonDetail from "./MlSpokePersonDetail";
import {fetchOfficePackages} from "../actions/findOfficeAction";

export default class MlAppAddOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewSpokePerson: true, data: []};
    return this;
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
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

  componentWillMount() {
    const resp = this.getUserPackages()
    return resp
  }

  async getUserPackages() {
    var response = await fetchOfficePackages()
    console.log(response)
    this.setState({data: response})
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
    let that = this
    let isShowNewSpoke = this.state.showNewSpokePerson ? true : false
    const data = this.state.data && this.state.data.length > 0 ? this.state.data : []
    const list = data.map(function (value, idx) {
      return (
        <div className="col-lg-2 col-md-4 col-sm-4" onClick={that.showDetails.bind(that, idx)} key={idx}>
          <div className="list_block notrans funding_list">
            <div><p className="fund">{value.totalCount} Members</p>
              <span>Principal: {value.principalUserCount}</span><span>Team: {value.teamUserCount}</span><span>(Limited Community)</span>
            </div>
            <h3>{value.serviceCardName}</h3>
          </div>
        </div>
      )
    })
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
                  <div className="col-lg-2 col-md-4 col-sm-4" onClick={this.showNewSpokePerson.bind(this)}>
                    <div className="list_block notrans">
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3>Bespoke Members</h3>
                    </div>
                  </div>
                  {/*<div className="col-lg-2 col-md-4 col-sm-4" onClick={this.showDetails.bind(this)}>*/}
                  {/*<div className="list_block notrans funding_list">*/}
                  {/*<div><p className="fund">10 Members</p><span>Principal: 2</span><span>Team: 2</span><span>(Limited Community)</span>*/}
                  {/*</div>*/}
                  {/*<h3>Basic Office</h3>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {list}

                </div>
              </div>
            </ScrollArea>
          </div>

          {/**
           *if onces Options are clicked UI
           * */}
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
