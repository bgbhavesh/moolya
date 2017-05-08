import $ from 'jquery'
import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


var options = [
  {value: 'Company Name', label: 'Company Name'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}

export default class MlFunderPrincipalTeam extends React.Component {
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    $("#create_client").popover({
      'title': 'Add New Member',
      'html': true,
      'placement': 'right',
      'container': '.admin_main_wrap',
      'content': $(".ml_create_client").html()
    });
    $("#team-list").popover({
      'title': 'Add New Member',
      'html': true,
      'placement': 'right',
      'container': '.admin_main_wrap',
      'content': $(".team-list-main").html()
    });
  }

  componentDidUpdate(){
    var WinWidth = $(window).width();
    if (WinWidth > 768) {
      $(".medium-popover").mCustomScrollbar({theme: "minimal-dark"});
    }
  }

  render() {
    return (
        <div className="portfolio-main-wrap">
          <div className="main_wrap_scroll">
            <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
              <div className="ml_tabs ml_tabs_large">
                <ul className="nav nav-pills">
                  <li className="active">
                    <a href="#1a" data-toggle="tab">Principal</a>
                  </li>
                  <li><a href="#2a" data-toggle="tab">Team</a>
                  </li>
                </ul>

                {/*principle list*/}
                <div className="tab-content clearfix requested_input">
                  <div className="tab-pane active" id="1a">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <a href="#" id="create_client" data-placement="top" data-class="large_popover">
                            <div className="list_block notrans">
                              <div className="hex_outer"><span className="ml ml-plus "></span></div>
                              <h3>Add New</h3>
                            </div>
                          </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <a href="#">
                            <div className="list_block notrans funding_list">
                              <FontAwesome name='lock'/>
                              <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                              <img src="../images/p_5.jpg"/>
                              <div><p>Naval Ravikant</p><p className="small">Founder</p></div>
                              <div className="ml_icon_btn">
                                <a href="#"   className="save_btn"><FontAwesome name='facebook'/></a>
                                <a href="#"   className="save_btn"><FontAwesome name='twitter'/></a>
                                <a href="#"   className="save_btn"><FontAwesome name='linkedin'/></a>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*team list view*/}
                  <div className="tab-pane" id="2a">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <a href="#" id="team-list" data-placement="top" data-class="large_popover">
                            <div className="list_block notrans">
                              <div className="hex_outer"><span className="ml ml-plus "></span></div>
                              <h3>Add New</h3>
                            </div>
                          </a>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <a href="#">
                            <div className="list_block notrans funding_list">
                              <FontAwesome name='lock'/>
                              <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                              <img src="../images/p_5.jpg"/>
                              <div><p>Rajesh Sethi</p><p className="small">COO</p></div>
                              <div className="ml_icon_btn">
                                <a href="#"   className="save_btn"><FontAwesome name='facebook'/></a>
                                <a href="#"   className="save_btn"><FontAwesome name='twitter'/></a>
                                <a href="#"   className="save_btn"><FontAwesome name='linkedin'/></a>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollArea>

            {/*principle popover*/}
            <div style={{'display': 'none'}} className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload Pic</span>
                        <input type="file" className="upload"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Title" className="form-control float-label" />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label"  />
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
                      <input type="text" placeholder="Duration" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Years of Experience" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Qualification" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="About" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="LinkedIn" className="form-control float-label"  />
                      <FontAwesome name="linkedin-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Facebook" className="form-control float-label"  />
                      <FontAwesome name="facebook-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="twitter" className="form-control float-label"  />
                      <FontAwesome name="twitter-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Youtube" className="form-control float-label"  />
                      <FontAwesome name="youtube-square" className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Google plus" className="form-control float-label"  />
                      <FontAwesome name="google-plus-square" className="password_icon"/>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*team popover*/}
            <div style={{'display': 'none'}} className="team-list-main">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload Pic</span>
                        <input type="file" className="upload"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Title" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Disignation" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Company Name" className="form-control float-label"  />
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Duration" className="form-control float-label"  />
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
