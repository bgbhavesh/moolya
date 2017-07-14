/**
 * Created by vishwadeep on 12/5/17.
 */

import React from "react";
import {render} from "react-dom";
import _ from "lodash";
import {fetchAllCommunitiesHandler} from "../../../../app/commons/actions/fetchCommunitiesActionHandler";
import {createOfficeActionHandler} from "../actions/createOfficeAction";
import {initalizeFloatLabel} from "../../../../../client/commons/utils/formElemUtil";

export default class MlAppNewSpokePerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showCommunityBlock: [], availableCommunities: []};
    this.handleBlur.bind(this)
    return this;
  }

  componentDidUpdate() {
    initalizeFloatLabel();
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 3,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    var $frame = $('#forcecentered');
    var $wrap = $frame.parent();
  }

  submitDetails() {
    let community = _.uniqBy(this.state.availableCommunities, 'communityId');
    let myOffice = {
      totalCount: this.refs.totalCount.value,
      principalUserCount: this.refs.principalUserCount.value,
      teamUserCount: this.refs.teamUserCount.value,
      officeName: this.refs.officeName.value,
      branchType: this.refs.branchType.value,
      officeLocation: this.refs.officeLocation.value,
      streetLocality: this.refs.streetLocality.value,
      landmark: this.refs.landmark.value,
      area: this.refs.area.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      country: this.refs.country.value,
      zipCode: this.refs.zipCode.value,
      about: this.refs.about.value,
      availableCommunities: community,
      isBeSpoke:true
    }
    let data = myOffice;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
        delete data[propName];
      }
    }
    if (data.availableCommunities.length < 1) {
      data = _.omit(data, 'availableCommunities')
    }
    let isValid = this.validateUserData(data)
    if (isValid && isValid.success) {
      const resp = this.createMyOfficeAction(data)
      // toastr.success(isValid.result);
    } else
      toastr.error(isValid.result);
  }

  validateUserData(usersData) {
    if (usersData && usersData.principalUserCount && usersData.teamUserCount && usersData.totalCount) {
      let PUC = usersData.principalUserCount ? Number(usersData.principalUserCount) : 0
      let TUC = usersData.teamUserCount ? Number(usersData.teamUserCount) : 0
      let TC = usersData.totalCount ? Number(usersData.totalCount) : 0
      // if ((PUC + TUC) > TC)  MOOLYA-2378
      if ((PUC + TUC) != TC)
        // return {success: false, result: 'Total user count cannot be less than principal and team'}
        return {success: false, result: 'Total user count should be equal to principal and team'}
      else if (!_.isEmpty(usersData.availableCommunities)) {
        let communities = usersData.availableCommunities
        let arrayCount = _.map(communities, 'userCount')
        let addArray = _.sum(arrayCount)
        // if (Number(addArray) > TUC) MOOLYA-2378
        if (Number(addArray) != TUC)
          // return {success: false, result: 'Communities Users count can not be greater than Team user count'}
          return {success: false, result: 'Communities Users count should be equal to Team user count'}
        else
          return {success: true, result: 'Validation done'}
      } else
        return {success: true, result: 'Validation done'}
    } else
      return {success: false, result: 'Please enter users Data'}
  }

  async createMyOfficeAction(myOffice) {
    const response = await createOfficeActionHandler(myOffice)
    if (response && response.success) {
      FlowRouter.go('/app/myOffice/')
      toastr.success('Office Successfully Created');
    } else {
      toastr.error(response.result);
    }
    return response;
  }

  componentWillMount() {
    const resp = this.fetchCommunities({code: 'OFB'});
    return resp;
  }

  communityType(e) {
    if (e.target.checked) {
      const communityList = this.fetchCommunities();
    } else {
      const communityList = this.fetchCommunities({code: 'OFB'});
    }
  }

  async fetchCommunities(specCode) {
    let communities = await fetchAllCommunitiesHandler();
    if (communities) {
      let communityList = []
      if (!specCode) {
        _.each(communities, function (say, item) {
          let value = _.omit(say, '__typename')
          communityList.push(value);
        })
        _.remove(communityList, {code: 'BRW'})
        this.setState({showCommunityBlock: communityList})
        return communityList;
      } else {
        let action = _.find(communities, specCode)
        action = _.omit(action, '__typename')
        communityList.push(action)
        this.setState({showCommunityBlock: communityList})
      }
    }
  }

  handleBlur(id, e) {
    if (e.target) {
      let data = this.state.availableCommunities;
      let dataBackUp = _.cloneDeep(data);
      let specificData = dataBackUp[id];
      let block = this.state.showCommunityBlock;
      if (_.isEmpty(specificData)) {
        specificData = {}
        specificData.communityName = block[id].displayName
        specificData.communityId = block[id].code
        specificData.userCount = Number(e.target.value)
        data.push(specificData)
      } else {
        specificData.communityName = block[id].displayName
        specificData.communityId = block[id].code
        specificData.userCount = Number(e.target.value)
      }
      data.splice(id, 1);
      data.splice(id, 0, specificData);
      this.setState({availableCommunities: data})
    }
  }

  backUserRoute() {
    FlowRouter.go('/app/myOffice/')
  }

  render() {
    let that = this;
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="investement-view-content">
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Subscription: Bespoke Office</div>

                    <div className="panel-body">

                      <div className="form-group">
                        <input type="number" placeholder="Total Number of Users" ref="totalCount"
                               className="form-control float-label" min="0"/>
                      </div>

                      <div className="form-group">
                        <input type="number" placeholder="Principal Users" className="form-control float-label"
                               ref="principalUserCount" min="0"/>
                      </div>
                      <div className="form-group">
                        <input type="number" placeholder="Team Members" className="form-control float-label"
                               ref="teamUserCount" min="0"/>
                      </div>
                      <div className="form-group switch_wrap switch_names">
                        <span className="state_label acLabel">Specific</span><label className="switch">
                        <input type="checkbox" onChange={this.communityType.bind(this)}/>
                        <div className="slider"></div>
                      </label>
                        <span className="state_label">All Communities</span>
                      </div>

                    </div>
                  </div>

                  <div className="panel panel-default mart20">
                    <div className="panel-heading"> User Type</div>
                    <div className="panel-body">
                      <div className="swiper-container blocks_in_form">
                        <div className="swiper-wrapper">

                          {this.state.showCommunityBlock.map(function (name, idx) {
                            return (
                              <div className="swiper-slide" key={idx}>
                                <div className="team-block marb0">
                                  <span className="ml ml-moolya-symbol"></span>
                                  <h3>
                                    {name.displayName}
                                  </h3>
                                </div>
                                <div className="form-group mart20">
                                  <input type="number" placeholder="Enter Total Numbers"
                                         onBlur={that.handleBlur.bind(that, idx)}
                                         className="form-control float-label" ref='count' min="0"/>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    <textarea rows="4" placeholder="About" className="form-control float-label" ref="about"></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Office Name" className="form-control float-label" ref="officeName"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Branch Type" className="form-control float-label" ref="branchType"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Office Location" className="form-control float-label"
                           ref="officeLocation"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Street No/Locality" className="form-control float-label"
                           ref="streetLocality"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Landmark" className="form-control float-label"
                           ref="landmark"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Area" className="form-control float-label" ref="area"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Town/City" className="form-control float-label"
                           ref="city"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="State" className="form-control float-label" ref="state"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Country" className="form-control float-label"
                           ref="country"/>
                  </div>
                  <div className="form-group">
                    <input type="number" placeholder="Zip Code" className="form-control float-label" min="0"
                           ref="zipCode"/>
                  </div>
                  {/*<div className="form-group switch_wrap inline_switch">*/}
                  {/*<label>Is Active</label>*/}
                  {/*<label className="switch">*/}
                  {/*<input type="checkbox" />*/}
                  {/*<div className="slider"></div>*/}
                  {/*</label>*/}
                  {/*</div>*/}
                  <div className="form-group">
                    <a className="mlUpload_btn" onClick={this.submitDetails.bind(this)}>Submit</a>
                    <a className="mlUpload_btn" onClick={this.backUserRoute.bind(this)}>Cancel</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};


