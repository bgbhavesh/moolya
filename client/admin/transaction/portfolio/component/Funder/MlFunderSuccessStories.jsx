import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlFunderSuccessStories extends React.Component {
  componentDidMount() {
    $("#team-list").popover({
      'title': 'Add New',
      'html': true,
      'placement': 'right',
      'container': '.admin_main_wrap',
      'content': $(".team-list-main").html()
    });
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap">
          <h2>Success Stories</h2>
          <div className="main_wrap_scroll">
            <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
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
                    <a href="">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <img src="../images/p_5.jpg"/>
                        <div><p>Best Funder of the Year</p></div>
                        <h3>17 Jan 2017</h3>
                      </div>
                    </a>
                  </div>


                </div>
              </div>
            </ScrollArea>
            <div style={{'display': 'none'}} className="team-list-main">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Select Date" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
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
                      <input type="text" placeholder="Enter title of Story" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Description" className="form-control float-label" id=""/>
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
      </div>
    )
  }
};
