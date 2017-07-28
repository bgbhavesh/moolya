/**
 * Created by viswhadeep on 13/5/17.
 */
import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {initalizeFloatLabel} from '../../../../../client/commons/utils/formElemUtil';
export default class MlSpokePersonDetail extends React.Component {
  componentDidMount(){
    initalizeFloatLabel();
  }
  componentDidUpdate(){
    initalizeFloatLabel();
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="investement-view-content">
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Subscription: Basic Office</div>
                    <div className="panel-body">
                      <div className="col-lg-6 col-md-6 col-sm-12 nopadding-left">
                        <p>Total Users: 10</p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-lg-6 col-md-6 col-sm-12 nopadding-left">
                        <p>Principal Users: 2</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 nopadding-right">
                        <p>Team Users: 8</p>
                      </div>

                    </div>
                  </div>

                  <div className="panel panel-default mart20">
                    <div className="panel-heading"> User Type</div>

                    <div className="panel-body">
                      <div className="col-lg-4 col-md-4 col-sm-4">
                        <div className="team-block marb0">
                          <span className="ml ml-moolya-symbol"></span>
                          <h3>
                            Office Barer
                          </h3>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4">
                        <div className="team-block marb0">
                          <span className="ml ml-moolya-symbol"></span>
                          <h3>
                            Service Provider
                          </h3>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    <textarea rows="4" placeholder="About" className="form-control float-label"  ></textarea>

                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Branch Type" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Office Location" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Street No/Locality" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Landmark" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Area" className="form-control float-label" id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Town/City" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="State" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Country" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Zip Code" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <a className="mlUpload_btn" href="/app/officeMembersDetails">Next</a> <a
                    href="#" className="mlUpload_btn">Cancel</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
