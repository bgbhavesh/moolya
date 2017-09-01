/**
 * Created by viswhadeep on 13/5/17.
 */
/**
 * import of libs and routes
 * */
import React, {Component} from "react";
import {render} from "react-dom";
import gql from 'graphql-tag'
import {initalizeFloatLabel} from "../../../../../client/commons/utils/formElemUtil";

export default class MlSpokePersonDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      branchType:""
    }
  }
  /**
   * Initialize labels
   * */
  componentDidMount() {
    initalizeFloatLabel();
  }

  componentDidUpdate() {
    initalizeFloatLabel();
  }

  optionsBySelectOfficeType(index, selectedIndex){
      this.setState({branchType: index})
  }

  /**
   * UI to be render
   * */
  render() {
    let query = gql`query () {
        data: getOfficeType{label:displayName, value:code}
      }`
    var props = this.props.officeData?this.props.officeData:{}
    var that = this
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
                        <p>Total Users: {props.teamUserCount}</p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-lg-6 col-md-6 col-sm-12 nopadding-left">
                        <p>Principal Users: {props.principalUserCount}</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 nopadding-right">
                        <p>Team Users: {props.teamUserCount}</p>
                      </div>

                    </div>
                  </div>

                  <div className="panel panel-default mart20">
                    <div className="panel-heading"> User Type</div>

                    <div className="panel-body">
                      {props.availableCommunities.map(function (item, say) {
                        return (
                          <div className="col-lg-4 col-md-4 col-sm-4" key={say}>
                            <div className="team-block marb0">
                              <span className="ml ml-moolya-symbol"></span>
                              <h3>
                                {item.communityName}
                              </h3>
                            </div>
                            <div className="form-group mart20">
                              <input type="text" placeholder="User Count" defaultValue={item.userCount}
                                     className="form-control float-label" disabled={true}/>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    <textarea rows="4" placeholder="About" className="form-control float-label"></textarea>

                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    {/*<input type="text" placeholder="Office Type" className="form-control float-label"*/}
                           {/*defaultValue={props.branchType}/>*/}
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"} query={query} isDynamic={true}
                                  onSelect={that.optionsBySelectOfficeType.bind(that)}
                                  selectedValue={that.state.branchType}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Office Location" className="form-control float-label"
                           defaultValue={props.officeLocation}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Street No/Locality" className="form-control float-label"
                           defaultValue={props.streetLocality}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Landmark" className="form-control float-label"
                           defaultValue={props.landmark}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Area" className="form-control float-label"
                           defaultValue={props.area}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Town/City" className="form-control float-label"
                           defaultValue={props.city}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="State" className="form-control float-label"
                           defaultValue={props.state}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Country" className="form-control float-label"
                           defaultValue={props.country}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Zip Code" className="form-control float-label"
                           defaultValue={props.zipCode}/>
                  </div>
                  <div className="form-group">
                    <a className="mlUpload_btn" href="/app/officeMembersDetails">Next</a>
                    <a href="#" className="mlUpload_btn">Cancel</a>
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
