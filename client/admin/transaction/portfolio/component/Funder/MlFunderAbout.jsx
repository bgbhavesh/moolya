import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

export default class MlFunderAbout extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>About Us</h2>
        <div className="main_wrap_scroll">
          <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>

            <div className="col-md-6 nopadding-left">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="form_bg">
                    <form>

                      <div className="form-group">
                        <input type="text" placeholder="First Name" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Last Name" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Gender" className="form-control float-label" id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="User Category" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Qualification" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Employment Status" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Professional Tax" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Years of Experience" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Industry" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Profession" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='unlock' className="password_icon"/>
                      </div>
                    </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="form_bg">
                    <form>

                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Profile Pic</span>
                          <input type="file" className="upload"/>
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src="/images/ideator_01.png"/>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="panel panel-default mart20">
                        <div className="panel-heading"> Investment Budget Per Years:</div>

                        <div className="panel-body">
                          <div className="form-group">
                            <input type="text" placeholder="From" className="form-control float-label"
                                   id="cluster_name"/>
                            <FontAwesome name='lock' className="password_icon"/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="To" className="form-control float-label" id="cluster_name"/>
                            <FontAwesome name='lock' className="password_icon"/>
                          </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>
                      <div className="panel panel-default">
                        <div className="panel-heading"> Investment From:</div>

                        <div className="panel-body">
                          <div className="input_types">
                            <input id="radio1" type="radio" name="radio" value="1"/><label
                            htmlFor="radio1"><span><span></span></span>Personal</label>
                          </div>
                          <div className="input_types">
                            <input id="radio2" type="radio" name="radio" value="2"/><label
                            htmlFor="radio2"><span><span></span></span>Family Fund</label>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="form-group">
                        <input type="text" placeholder="Number of Investments" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Phone No" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Email Id" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Fcebook Id" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Linkedin Id" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Twitter Id" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Googleplus Id" className="form-control float-label"
                               id="cluster_name"/>
                        <FontAwesome name='lock' className="password_icon"/>
                      </div>
                    </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ScrollArea>
          <br className="brclear"/>
        </div>
      </div>
    )
  }
};
