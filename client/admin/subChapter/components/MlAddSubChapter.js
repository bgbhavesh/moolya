/**
 * Created by vishwadeep on 18/5/17.
 */

import React from "react";
import {render} from "react-dom";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import MlLoader from "../../../commons/components/loader/loader";
import {findChapterActionHandler} from "../actions/findChapterDetails";
import formHandler from "../../../commons/containers/MlFormHandler";
import _ from "lodash";
import {OnToggleSwitch, initalizeFloatLabel} from "../../utils/formElemUtil";
import ScrollArea from "react-scrollbar";
import {addSubChapterActionHandler} from "../actions/addSubChapter";
import MlInternalSubChapterAccess from "../components/MlInternalSubChapterAccess";
import MlMoolyaSubChapterAccess from "../components/MlMoolyaSubChapterAccess";
import Moolyaselect from "../../../commons/components/select/MoolyaSelect";
import gql from "graphql-tag";
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');


class MlAddSubChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      internalSubChapterAccess: {},
      moolyaSubChapterAccess: {},
      backendUser: {},
      externalUser: {},
      data: {}
    };
    this.onStatusChangeActive = this.onStatusChangeActive.bind(this);
    this.onStatusChangeMap = this.onStatusChangeMap.bind(this);
    this.onStatusChangeNotify = this.onStatusChangeNotify.bind(this);
    this.onStatusBespokeWorkFlow = this.onStatusBespokeWorkFlow.bind(this);
    this.onStatusChangeBespokeRegistration = this.onStatusChangeBespokeRegistration.bind(this);
    this.findChapterDetails.bind(this);
    // this.findChapterActionHandler.bind(this);
    // this.updateSubChapter.bind(this)
    return this;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response && !response.success)
      toastr.error(response.result);
    else
      window.history.back()
  }

  onStatusChangeActive(e) {
    let updatedData = this.state.data || {};
    updatedData = _.omit(updatedData, ["isActive"]);
    if (e.currentTarget.checked) {
      var z = _.extend(updatedData, {isActive: true});
      this.setState({data: z, loading: false});
    } else {
      var z = _.extend(updatedData, {isActive: false});
      this.setState({data: z, loading: false});
    }
  }

  onStatusChangeMap(e) {
    let updatedData = this.state.data || {};
    updatedData = _.omit(updatedData, ["showOnMap"]);
    if (e.currentTarget.checked) {
      var z = _.extend(updatedData, {showOnMap: true});
      this.setState({data: z, loading: false});
    } else {
      var z = _.extend(updatedData, {showOnMap: false});
      this.setState({data: z, loading: false});
    }
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    updatedData = _.omit(updatedData, ["isEmailNotified"]);
    if (e.currentTarget.checked) {
      var z = _.extend(updatedData, {isEmailNotified: true});
      this.setState({data: z, loading: false});
    } else {
      var z = _.extend(updatedData, {isEmailNotified: false});
      this.setState({data: z, loading: false});
    }
  }

  onStatusChangeBespokeRegistration(e) {
    let updatedData = this.state.data || {};
    updatedData = _.omit(updatedData, ["isBespokeRegistration"]);
    if (e.currentTarget.checked) {
      var z = _.extend(updatedData, {isBespokeRegistration: true});
      this.setState({data: z, loading: false});
    } else {
      var z = _.extend(updatedData, {isBespokeRegistration: false});
      this.setState({data: z, loading: false});
    }
  }

  onStatusBespokeWorkFlow(e) {
    let updatedData = this.state.data || {};
    updatedData = _.omit(updatedData, ["isBespokeWorkFlow"]);
    if (e.currentTarget.checked) {
      var z = _.extend(updatedData, {isBespokeWorkFlow: true});
      this.setState({data: z, loading: false});
    } else {
      var z = _.extend(updatedData, {isBespokeWorkFlow: false});
      this.setState({data: z, loading: false});
    }
  }

  async addSubChapter() {
    var dataGet = this.state.data;
    dataGet = _.omit(dataGet, '__typename')
    dataGet.subChapterDisplayName = this.refs.subChapterDisplayName.value
    dataGet.aboutSubChapter = this.refs.aboutSubChapter.value
    dataGet.subChapterName = this.refs.subChapterName.value
    dataGet.associatedSubChapters = this.state.selectedChapter || []
    dataGet.showOnMap = this.refs.showOnMap.checked
    dataGet.isActive = this.refs.isActive.checked
    dataGet.isBespokeWorkFlow = this.refs.isBespokeWorkFlow.checked
    dataGet.isBespokeRegistration = this.refs.isBespokeRegistration.checked
    dataGet.internalSubChapterAccess = this.state.internalSubChapterAccess
    dataGet.moolyaSubChapterAccess = this.state.moolyaSubChapterAccess
    let data = dataGet;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
        delete data[propName];
      }
    }

    if (_.isEmpty(data.associatedSubChapters) && data.associatedSubChapters.length<1){
      data = _.omit(data, 'associatedSubChapters')
    }
    if(_.isEmpty(data.internalSubChapterAccess)){
      data = _.omit(data, 'internalSubChapterAccess')
    }
    if(_.isEmpty(data.moolyaSubChapterAccess)){
      data = _.omit(data, 'moolyaSubChapterAccess')
    }
    const response = await addSubChapterActionHandler(data)
    return response;
  }

  componentWillMount() {
    const resp = this.findChapterDetails();
    return resp;
  }

  componentDidMount() {
    console.log(this.state.data)
  }

  componentDidUpdate() {
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight - (90 + $('.admin_header').outerHeight(true)));
    OnToggleSwitch(true, true);
    initalizeFloatLabel();
  }

  async findChapterDetails() {
    console.log(this.props);
    let chapterId = this.props ? this.props.chapterId : ''
    if (chapterId) {
      const response = await findChapterActionHandler(chapterId);
      this.setState({loading: false, data: response});
    } else {
      this.setState({loading: false, data: ''})
    }
  }

  getInternalAccessStatus(details) {
    let internalSubChapterAccess = {
      backendUser: details.backendUser ? details.backendUser : this.state.internalSubChapterAccess.backendUser,
      externalUser: details.externalUser ? details.externalUser : this.state.internalSubChapterAccess.externalUser
    }
    this.setState({internalSubChapterAccess: internalSubChapterAccess})
  }

  getMoolyaAccessStatus(details) {
    let moolyaSubChapterAccess = {
      backendUser: details.backendUser ? details.backendUser : this.state.moolyaSubChapterAccess.backendUser,
      externalUser: details.externalUser ? details.externalUser : this.state.moolyaSubChapterAccess.externalUser
    }
    this.setState({moolyaSubChapterAccess: moolyaSubChapterAccess})
  }

  selectAssociateChapter(val) {
    if (val) {
      this.setState({selectedChapter: val})
    } else {
      this.setState({selectedChapter: ''})
    }
  }
  render() {
    var options = [
      {value: 'Chapter 1', label: 'Chapter 1'},
      {value: 'Chapter 2', label: 'Chapter 2'}
    ];

    let clusterquery=gql`query{data:fetchSubChaptersSelectNonMoolya { value:_id, label:subChapterName}}`;

    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.addSubChapter.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          let clusterId = this.props.clusterId;
          let chapterId = this.props.chapterId;
          FlowRouter.go('/admin/chapters/' + clusterId + '/' + chapterId + '/' + 'subChapters');
        }
      }
    ]
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (

          <div className="admin_padding_wrap">
            <h2>Add Sub-Chapter Details</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group ">
                    <input type="text" ref="id" defaultValue={this.state.data && this.state.data.id} hidden="true"/>
                    <input type="text" placeholder="Cluster Name" ref="clusterName" readOnly
                           defaultValue={this.state.data && this.state.data.clusterName}
                           className="form-control float-label" disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Chapter Name" ref="chapterName" className="form-control float-label"
                           readOnly defaultValue={this.state.data && this.state.data.chapterName} disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub-Chapter Name" ref="subChapterName"
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" ref="subChapterDisplayName"
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    {/*<Select name="form-field-name" placeholder="Associated Chapters" className="float-label"*/}
                            {/*options={options} value={this.state.selectedChapter}*/}
                            {/*onChange={this.selectAssociateChapter.bind(this)}/>*/}
                    <Moolyaselect multiSelect={true} placeholder="Associated Chapters"
                                  className="form-control float-label" valueKey={'value'} labelKey={'label'}
                                  selectedValue={this.state.selectedChapter} queryType={"graphql"}
                                  query={clusterquery} isDynamic={true}
                                  onSelect={this.selectAssociateChapter.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="About" ref="aboutSubChapter" className="form-control float-label"></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrollling={true}
                  default={true}
                >
                  <form>
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Add Pic</span>
                        <input type="file" className="upload"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img
                          src={this.state.data && this.state.data.subChapterImageLink ? this.state.data.subChapterImageLink : '/images/def_profile.png'}/>
                      </div>
                    </div>

                    <br className="brclear"/>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="col-md-6">
                          <div className="form-group switch_wrap inline_switch">
                            <label className="">Status</label>
                            <label className="switch">
                              <input type="checkbox" ref="isActive"
                                     checked={this.state.data && this.state.data.isActive}
                                     onChange={this.onStatusChangeActive.bind(this)}/>
                              <div className="slider"></div>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group switch_wrap inline_switch">
                            <label className="">Show on Map</label>
                            <label className="switch">
                              <input type="checkbox" ref="showOnMap"
                                     checked={this.state.data && this.state.data.showOnMap}
                                     onChange={this.onStatusChangeMap.bind(this)}/>
                              <div className="slider"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="input_types">
                              <input type="checkbox" ref="isBespokeRegistration"
                                     checked={this.state.data && this.state.data.isBespokeRegistration}
                                     onChange={this.onStatusChangeBespokeRegistration.bind(this)}/>
                              <label htmlFor="bespoke_reg"><span></span>Bespoke Registration</label></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="input_types">
                              <input type="checkbox" ref="isBespokeWorkFlow"
                                     checked={this.state.data && this.state.data.isBespokeWorkFlow}
                                     onChange={this.onStatusBespokeWorkFlow.bind(this)}/>
                              <label htmlFor="bespoke_workflow"><span></span>Bespoke Workflow</label></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">Internal Subchapter Access</div>
                      <MlInternalSubChapterAccess getInternalAccessStatus={this.getInternalAccessStatus.bind(this)}
                                                  assignedDetails={this.state.internalSubChapterAccess}/>
                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">Moolya Subchapter Access</div>
                      <MlMoolyaSubChapterAccess getMoolyaAccessStatus={this.getMoolyaAccessStatus.bind(this)}
                                                assignedDetails={this.state.moolyaSubChapterAccess}/>
                    </div>
                  </form>
                </ScrollArea>
              </div>
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
        )}
      </div>
    )
  }
}
;

export default MoolyaUpdateSubChapter = formHandler()(MlAddSubChapter);
