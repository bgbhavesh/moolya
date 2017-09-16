/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import { findAnchorUserActionHandler } from '../../actions/fetchAnchorUsers'
import { findBackendUserActionHandler } from '../../../transaction/internalRequests/actions/findUserAction'
import CDNImage from '../../../../commons/components/CDNImage/CDNImage';
import MlAnchorUserGrid from '../../../../commons/components/anchorInfo/MlAnchorUserGrid';
var FontAwesome = require('react-fontawesome');

//todo:// floatlabel initialize
export default class MlAnchorList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      userData: {}
    };
    this.getAnchorUserDetails = this.getAnchorUserDetails.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.updateProfileData = this.updateProfileData.bind(this);
    this.updateInternalUprofileData = this.updateInternalUprofileData.bind(this);
    return this
  }

  componentWillMount() {
    const resp = this.getAnchorUsers()
    return resp
  }
  handleUserClick(id, event) {
    console.log('on user Click', id);
    const resp = this.getAnchorUserDetails(id);
    return resp;

  }

  updateInternalUprofileData(field, value) {
    const state = JSON.parse(JSON.stringify(this.state));
    if (!state.userData) state.userData = {};
    if (!state.userData.profile) state.userData.profile = {};
    if (!state.userData.profile.InternalUprofile) state.userData.profile.InternalUprofile = {};
    if (!state.userData.profile.InternalUprofile.moolyaProfile) {
      state.userData.profile.InternalUprofile.moolyaProfile = {};
    }
    state.userData.profile.InternalUprofile.moolyaProfile[field] = value;
    this.setState(state, () => {
      this.sendDatatoParent(this.state.userData);
    });
  }

  updateProfileData(field, value) {
    const state = JSON.parse(JSON.stringify(this.state));
    if (!state.userData) state.userData = {};
    if (!state.userData.profile) state.userData.profile = {};
    state.userData.profile[field] = value;
    this.setState(state, () => {
      this.sendDatatoParent(this.state.userData);
    });
  }

  deepClone(obj) {
    if (!obj || obj === true) { // this also handles boolean as true and false
      return obj;
    }
    const objType = typeof (obj);
    if (objType === 'number' || objType === 'string') { // add your immutables here
      return obj;
    }
    let result = Array.isArray(obj) ? [] : !obj.constructor ? {} : new obj.constructor();
    if (obj instanceof Map) {
      for (let key of obj.keys())
        result.set(key, this.deepClone(obj.get(key)));
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key !== '__typename'
      && key !== 'clusterName' && key !== 'chapterName'
     && key !== 'communityName' && key !== 'subChapterName')
        result[key] = this.deepClone(obj[key]);
    }
    return result;
  }

  // filterObject(obj, key) {
  //   for (var i in obj) {
  //     if (!obj.hasOwnProperty(i)) continue;
  //     if (typeof obj[i] == 'object') {
  //       filterObject(obj[i], key);
  //     } else if (i == key) {
  //       delete key;
  //     }
  //   }
  //   return obj;
  // }

  async getAnchorUserDetails(id) {
    var response = await findBackendUserActionHandler(id);
    response = this.deepClone(response);
    this.setState({ userData: response });
    return response;
  }

  async getAnchorUsers() {
    var data = this.props.data
    var response = await findAnchorUserActionHandler(data)
    console.log('anchor user list', response)
    this.setState({ data: response })
    return response
  }

  sendDatatoParent(data) {
    this.props.getUserDetails(data)
  }

  render() {
    const _this = this
    let profilePic = this.state.userData && this.state.userData.profile && this.state.userData.profile.genderType == 'female' ? '/images/female.jpg' : '/images/def_profile.png';
    let Img = this.state.userData && this.state.userData.profile && this.state.userData.profile.profileImage ? this.state.userData.profile.profileImage : profilePic;
    return (
      <div>
        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
          <div className="row">
            <div className="left_wrap left_user_blocks">
              <MlAnchorUserGrid users={_this.state.data} classnames="col-md-4 col-sm-6" clickHandler={_this.handleUserClick} />
            </div>
          </div>
        </div>
        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-right">

          {/*<h3>User Details</h3>*/}
          <div className="left_wrap">
            <ScrollArea
              speed={0.8}
              className="left_wrap"
            >
              <form>
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Upload Pic</span>
                    <input type="file" className="upload" />
                  </div>
                  <div className="previewImg ProfileImg">
                    <img src={Img} />
                  </div>
                </div>
                <br className="brclear" />
                <div className="form-group">
                  <input type="text" placeholder="First Name" className="form-control float-label"
                    value={this.state.userData && this.state.userData.profile && this.state.userData.profile.firstName}
                    onChange={event => this.updateProfileData('firstName', event.target.value)} />

                </div>
                <div>
                  <div className="form-group">
                    <input type="text" id="AssignedAs" placeholder="Middle Name" className="form-control float-label"
                      value={this.state.userData && this.state.userData.profile && this.state.userData.profile.middleName}
                      onChange={event => this.updateProfileData('middleName', event.target.value)} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Last Name" className="form-control float-label"
                      value={this.state.userData && this.state.userData.profile && this.state.userData.profile.lastName}
                      onChange={event => this.updateProfileData('lastName', event.target.value)} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label"
                      value={this.state.userData && this.state.userData.profile && this.state.userData.profile.InternalUprofile &&
                        this.state.userData.profile.InternalUprofile.moolyaProfile && this.state.userData.profile.InternalUprofile.moolyaProfile.displayName ?
                        this.state.userData.profile.InternalUprofile.moolyaProfile.displayName : ""}
                      onChange={event => this.updateInternalUprofileData('displayName', event.target.value)} />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="About" className="form-control float-label"></textarea>
                  </div>
                  <div className="form-group">
                    <input disabled type="text" placeholder="Contact Number" className="form-control float-label"
                      value={this.state.userData && this.state.userData.profile && this.state.userData.profile.InternalUprofile &&
                        this.state.userData.profile.InternalUprofile.moolyaProfile && this.state.userData.profile.InternalUprofile.moolyaProfile.contact
                        && this.state.userData.profile.InternalUprofile.moolyaProfile.contact.length ?
                        this.state.userData.profile.InternalUprofile.moolyaProfile.contact[0].number : ""} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Email Id" className="form-control float-label" disabled
                      value={this.state.userData && this.state.userData.profile && this.state.userData.profile.email}
                       />
                  </div>

                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Social Links
                    </div>
                    <div className="panel-body">


                      <div className="ml_tabs">
                        <ul className="nav nav-pills">
                          <li className="active">
                            <a href="#3a" data-toggle="tab">Linkdin&nbsp;<b><FontAwesome name='minus-square' /></b></a>
                          </li>
                          <li>
                            <a href="#4a" data-toggle="tab">Facebook&nbsp;<b><FontAwesome name='minus-square' /></b></a>
                          </li>
                          <li>
                            <a href="#" className="add-contact"><FontAwesome name='plus-square' /> Add Social Links</a>
                          </li>
                        </ul>

                        <div className="tab-content clearfix">
                          <div className="tab-pane active" id="1a">
                            <div className="form-group">
                              <select className="form-control">
                                <option>Select type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Enter URL" className="form-control float-label" id="" />
                            </div>
                          </div>
                          <div className="tab-pane" id="2a">
                            <div className="form-group">
                              <select className="form-control">
                                <option>social link Type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                            </div>
                            <div className="ml_btn">
                              <a href="#" className="save_btn">Save</a>
                              <a href="#" className="cancel_btn">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br className="brclear" />
                <div className="form-group switch_wrap inline_switch">
                  <label className="">Status</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
