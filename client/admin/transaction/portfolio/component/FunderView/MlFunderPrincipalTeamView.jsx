import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderPrincipalTeamView extends React.Component {
  componentDidMount() {
    $("#show").click(function () {
      $("#details-div").show();
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

      var $frame = $('#forcecentered2');
      var $wrap = $frame.parent();

      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'forceCentered2',
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
      $("#show").hide();
    });
  }

  render() {
    return (
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">
            <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
              <div className="ml_tabs ml_tabs_large" id="show">
                <ul className="nav nav-pills">
                  <li className="active">
                    <a href="#1a" data-toggle="tab">Principal</a>
                  </li>
                  <li><a href="#2a" data-toggle="tab">Team</a>
                  </li>
                </ul>
                <div className="tab-content clearfix requested_input">
                  <div className="tab-pane active" id="1a">
                    <div className="col-lg-12 nopadding">
                      <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <div className="list_block notrans funding_list">
                            <img src="../images/p_29.jpg"/>
                            <div><p>Kishore Kumar</p><p className="small">Founder</p></div>
                            <div className="ml_icon_btn">
                              <a href="#" id="" className="save_btn"><FontAwesome name='facebook'/></a>
                              <a href="#" id="" className="save_btn"><FontAwesome name='twitter'/></a>
                              <a href="#" id="" className="save_btn"><FontAwesome name='linkedin'/></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="2a">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <div className="list_block notrans funding_list">
                            <img src="../images/p_5.jpg"/>
                            <div><p>Rajesh Sethi</p><p className="small">COO</p></div>
                            <div className="ml_icon_btn">
                              <a href="#" id="" className="save_btn"><FontAwesome name='facebook'/></a>
                              <a href="#" id="" className="save_btn"><FontAwesome name='twitter'/></a>
                              <a href="#" id="" className="save_btn"><FontAwesome name='linkedin'/></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="main_wrap_scroll" id="details-div" style={{display: 'none'}}>
            <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
              <div className="ml_tabs ml_tabs_large">
                <ul className="nav nav-pills">
                  <li className="active">
                    <a href="#1a" data-toggle="tab">Principal</a>
                  </li>
                  <li><a href="#2a" data-toggle="tab">Team</a>
                  </li>
                </ul>

                <div className="tab-content clearfix">
                  <div className="tab-pane active" id="1a">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="top_block_scroller" id="forcecentered">
                          <ul>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Naval Ravikant <br /><b>Partner</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_33.jpg" className="team_img"/>
                                <h3>
                                  Prathishta <br /><b>Co Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_38.jpg" className="team_img"/>
                                <h3>
                                  Priyanka <br /><b>VP</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_17.jpg" className="team_img"/>
                                <h3>
                                  Laxmi C <br /><b>Partner</b>
                                </h3>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="main_wrap_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="main_wrap_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                          <div className="details-panel">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-4">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                  <div className="list_block notrans funding_list">
                                    <img src="../images/p_5.jpg"/>
                                    <div><p>Naval Ravikant</p><p className="small">Partner</p></div>
                                    <div className="ml_icon_btn">
                                      <a href="#" id="" className="save_btn"><FontAwesome name='facebook'/></a>
                                      <a href="#" id="" className="save_btn"><FontAwesome name='twitter'/></a>
                                      <a href="#" id="" className="save_btn"><FontAwesome name='linkedin'/></a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-8">
                                <div className="form_bg col-md-6">
                                  <form>
                                    <div className="form-group">
                                      <input type="text" placeholder="Name" className="form-control float-label"
                                             id="cluster_name"/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Company" className="form-control float-label"
                                             id="cluster_name"/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Year of Experience"
                                             className="form-control float-label" id="cluster_name"/>
                                    </div>
                                  </form>
                                </div>
                                <div className="form_bg col-md-6">
                                  <form>
                                    <div className="form-group">
                                      <input type="text" placeholder="Designation" className="form-control float-label"
                                             id="cluster_name"/>
                                    </div>

                                    <div className="form-group">
                                      <input type="text" placeholder="Duration" className="form-control float-label"
                                             id="cluster_name"/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Qualification"
                                             className="form-control float-label" id="cluster_name"/>
                                    </div>
                                  </form>
                                </div>
                                <div className="form_bg col-md-12">
                                  <form>
                                    <div className="form-group">
                                      <input type="text" placeholder="About" className="form-control float-label"
                                             id="cluster_name"/>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="2a">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="top_block_scroller" id="forcecentered2">
                          <ul>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="team-block">
                                <img src="/images/p_5.jpg" className="team_img"/>
                                <h3>
                                  Name Here <br /><b>Founder</b>
                                </h3>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="main_wrap_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="main_wrap_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                          <div className="details-panel">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-4">
                                <div className="col-lg-12 col-md-12 col-sm-12">

                                  <div className="list_block notrans funding_list">

                                    <img src="../images/p_5.jpg"/>
                                    <div><p>Rajesh Sethi</p><p className="small">COO</p></div>
                                    <div className="ml_icon_btn">
                                      <a href="#" id="" className="save_btn"><FontAwesome name='facebook'/></a>
                                      <a href="#" id="" className="save_btn"><FontAwesome name='twitter'/></a>
                                      <a href="#" id="" className="save_btn"><FontAwesome name='linkedin'/></a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-8">
                                <div className="form_bg col-md-6">
                                  <form>
                                    <div className="form-group">
                                      <input type="text" placeholder="Name" className="form-control float-label"
                                             id="cluster_name" disabled/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Company" className="form-control float-label"
                                             id="cluster_name" disabled/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Year of Experience"
                                             className="form-control float-label" id="cluster_name" disabled/>
                                    </div>
                                  </form>
                                </div>
                                <div className="form_bg col-md-6">
                                  <form>

                                    <div className="form-group">
                                      <input type="text" placeholder="Disignation" className="form-control float-label"
                                             id="cluster_name" disabled/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Duration" className="form-control float-label"
                                             id="cluster_name" disabled/>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Qualification"
                                             className="form-control float-label" id="cluster_name" disabled/>
                                    </div>
                                  </form>
                                </div>
                                <div className="form_bg col-md-12">
                                  <form>
                                    <div className="form-group">
                                      <input type="text" placeholder="About" className="form-control float-label"
                                             id="cluster_name" disabled/>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
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
                      <div className="fileUpload mlUpload_btn">
                        <span>Add New</span>
                        <input type="file" className="upload"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Title" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        options={options}
                        value='Company Name'
                        onChange={logChange}
                      />
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Duration" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Years of Experience" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Qualification" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="About" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="LinkedIn" className="form-control float-label" id=""/>
                      <FontAwesome name="linkedin-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Facebook" className="form-control float-label" id=""/>
                      <FontAwesome name="facebook-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="twitter" className="form-control float-label" id=""/>
                      <FontAwesome name="twitter-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Youtube" className="form-control float-label" id=""/>
                      <FontAwesome name="youtube-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Google plus" className="form-control float-label" id=""/>
                      <FontAwesome name="google-plus-square" className="password_icon"/>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{'display': 'none'}} className="team-list-main">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Add New</span>
                        <input type="file" className="upload"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Title" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Disignation" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Company Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Duration" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
};
