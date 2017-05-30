import React from "react";
import {render} from "react-dom";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import MlLoader from "../../../commons/components/loader/loader";
import {findSubChapterActionHandler} from "../actions/findSubChapter";
import {updateSubChapterActionHandler} from "../actions/updateSubChapter";
import formHandler from "../../../commons/containers/MlFormHandler";
import _ from "lodash";
import {OnToggleSwitch, initalizeFloatLabel} from "../../utils/formElemUtil";
import {multipartASyncFormHandler} from "../../../../client/commons/MlMultipartFormAction";
import ScrollArea from "react-scrollbar";
import MlInternalSubChapterAccess from "../components/MlInternalSubChapterAccess";
import MlMoolyaSubChapterAccess from "../components/MlMoolyaSubChapterAccess";
import Moolyaselect from "../../../commons/components/select/MoolyaSelect";
import gql from "graphql-tag";
// import {getAdminUserContext} from "../../../commons/getAdminUserContext";
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');

class MlSubChapterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, internalSubChapterAccess:{}, moolyaSubChapterAccess:{}, backendUser:{}, externalUser:{}, data: {}};
    this.onStatusChangeActive = this.onStatusChangeActive.bind(this);
    this.onStatusChangeMap = this.onStatusChangeMap.bind(this);
    this.onStatusChangeNotify = this.onStatusChangeNotify.bind(this);
    this.onStatusBespokeWorkFlow = this.onStatusBespokeWorkFlow.bind(this);
    this.onStatusChangeBespokeRegistration = this.onStatusChangeBespokeRegistration.bind(this);
    this.findSubChapter.bind(this);
    this.updateSubChapter.bind(this)
    return this;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response && response.success)
      window.history.back()
    else
      toastr.error(response.result);
  }

  onStatusChangeActive(e) {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["isActive"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{isActive:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{isActive:false});
      this.setState({data:z,loading:false});
    }
  }

  onStatusChangeMap(e)
  {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["showOnMap"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{showOnMap:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{showOnMap:false});
      this.setState({data:z,loading:false});
    }
  }

  onStatusChangeNotify(e)
  {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["isEmailNotified"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{isEmailNotified:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{isEmailNotified:false});
      this.setState({data:z,loading:false});
    }
  }

  onStatusChangeBespokeRegistration(e) {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["isBespokeRegistration"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{isBespokeRegistration:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{isBespokeRegistration:false});
      this.setState({data:z,loading:false});
    }
  }
  onStatusBespokeWorkFlow(e) {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["isBespokeWorkFlow"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{isBespokeWorkFlow:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{isBespokeWorkFlow:false});
      this.setState({data:z,loading:false});
    }
  }

  async updateSubChapter() {
    let subChapterDetailsExtend = {}
    let basicObj = {
      subChapterId: this.refs.id.value,
      subChapterDisplayName: this.refs.subChapterDisplayName.value,
      aboutSubChapter: this.refs.aboutSubChapter.value,
      subChapterEmail: this.refs.subChapterEmail.value,
      isEmailNotified: this.state.data.isEmailNotified,
      showOnMap: this.refs.showOnMap.checked,
      isActive: this.refs.isActive.checked
    }
    if (!this.state.data.isDefaultSubChapter) {
      subChapterDetailsExtend = {
        subChapterUrl: this.refs.subChapterUrl.value,
        associatedSubChapters: this.state.data.associatedSubChapters || [],
        isBespokeWorkFlow: this.refs.isBespokeWorkFlow.checked,
        isBespokeRegistration: this.refs.isBespokeRegistration.checked,
        internalSubChapterAccess: this.state.internalSubChapterAccess,
        moolyaSubChapterAccess: this.state.moolyaSubChapterAccess
      }
    }
    let detailsObj = _.extend(basicObj, subChapterDetailsExtend);
    const response = await updateSubChapterActionHandler(detailsObj)
    return response;
  }

  componentWillMount() {
    const resp = this.findSubChapter();
    return resp;
  }

  componentDidUpdate()
  {
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }
  async findSubChapter() {
    let subChapterId = this.props.params;
    const response = await findSubChapterActionHandler(subChapterId);
    if(response && response.internalSubChapterAccess){
      this.setState({internalSubChapterAccess:response.internalSubChapterAccess});
    }
    if(response && response.moolyaSubChapterAccess){
      this.setState({moolyaSubChapterAccess:response.moolyaSubChapterAccess});
    }
    this.setState({loading: false, data: response});
  }
  getInternalAccessStatus(details){
    let internalSubChapterAccess={
      backendUser:details.backendUser?details.backendUser:this.state.internalSubChapterAccess.backendUser,
      externalUser:details.externalUser?details.externalUser:this.state.internalSubChapterAccess.externalUser
    }
    this.setState({internalSubChapterAccess:internalSubChapterAccess})
  }

  getMoolyaAccessStatus(details) {
    let moolyaSubChapterAccess = {
      backendUser: details.backendUser ? details.backendUser : this.state.moolyaSubChapterAccess.backendUser,
      externalUser: details.externalUser ? details.externalUser : this.state.moolyaSubChapterAccess.externalUser
    }
    this.setState({moolyaSubChapterAccess: moolyaSubChapterAccess})
  }

  selectAssociateChapter(val) {
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["associatedSubChapters"]);
    if (val) {
      var z=_.extend(updatedData,{associatedSubChapters:val});
      this.setState({data:z});
    } else {
      var z=_.extend(updatedData,{associatedSubChapters:''});
      this.setState({data:z});
    }
  }

  async onImageFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    if(file) {
      let data = {moduleName: "SUBCHAPTER", actionName: "UPDATE", subChapterId:this.state.data.id}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      return response;
    }
  }

  async onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if (result.success) {
        let subChapterId = this.props.params;
        const response = await findSubChapterActionHandler(subChapterId);
        let dataDetails = this.state.data
        let cloneBackUp = _.cloneDeep(dataDetails);
        cloneBackUp['subChapterImageLink'] = response['subChapterImageLink']
        this.setState({data: cloneBackUp});
      }
    }
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateSubChapter.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async (event) => {
          let clusterId = FlowRouter.getParam('clusterId');
          let chapterId = FlowRouter.getParam('chapterId');
          FlowRouter.go('/admin/chapters/'+clusterId+'/'+chapterId+'/'+'subChapters');

        }
      }
    ]
    let subChapterQuery=gql`query{data:fetchSubChaptersSelectNonMoolya { value:_id, label:subChapterName}}`;
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (

          <div className="admin_padding_wrap">
            <h2>Sub-Chapter Details</h2>
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
                    <input type="text" placeholder="Sub-Chapter Name" ref="subChapterName" readOnly
                           className="form-control float-label" defaultValue={this.state.data && this.state.data.subChapterName} disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" ref="subChapterDisplayName"
                           className="form-control float-label" defaultValue={this.state.data && this.state.data.subChapterDisplayName}/>
                  </div>
                  {(this.state.data.isDefaultSubChapter) ? <div></div> : <div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={true} placeholder="Related Sub-Chapters"
                                    className="form-control float-label" valueKey={'value'} labelKey={'label'}
                                    selectedValue={this.state.data.associatedSubChapters} queryType={"graphql"}
                                    query={subChapterQuery} isDynamic={true}
                                    onSelect={this.selectAssociateChapter.bind(this)}/>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group">
                      <input type="text" ref="state" placeholder="State" className="form-control float-label"
                             defaultValue={this.state.data && this.state.data.stateName} readOnly="true"/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="subChapterEmail" placeholder="Sub-Chapter Email ID"
                             defaultValue={this.state.data && this.state.data.subChapterEmail}
                             className="form-control float-label"/>
                      <div className="email_notify">
                        <div className="input_types">
                          <input ref="isEmailNotified" type="checkbox" name="checkbox"
                                 checked={this.state.data.isEmailNotified}
                                 onChange={this.onStatusChangeNotify.bind(this)}/>
                          <label htmlFor="checkbox1"><span> </span>Notify</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="subChapterUrl" placeholder="Sub-Chapter URL"
                             defaultValue={this.state.data && this.state.data.subChapterUrl}
                             className="form-control float-label"/>
                    </div>
                  </div>
                  }
                  <div className="form-group">
                  <textarea placeholder="About" ref="aboutSubChapter" defaultValue={this.state.data && this.state.data.aboutSubChapter}
                    className="form-control float-label">
                  </textarea>
                  </div>
                </form>
              </div>
            </div>
            {(this.state.data.isDefaultSubChapter)?
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
                          <span>Upload Pic</span>
                          <input type="file" className="upload" onChange={this.onImageFileUpload.bind(this)}/>
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src={this.state.data && this.state.data.subChapterImageLink ? this.state.data.subChapterImageLink : '/images/def_profile.png'} />
                          {/*<img src="/images/ideator_01.png"/>*/}
                        </div>
                      </div>
                      <br className="brclear"/>
                      <div className="form-group">
                        <input type="text" ref="state" placeholder="State" className="form-control float-label"
                               defaultValue={this.state.data && this.state.data.stateName} readOnly="true"/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref="subChapterEmail" placeholder="Sub-Chapter Email ID"
                               defaultValue={this.state.data && this.state.data.subChapterEmail}
                               className="form-control float-label"/>
                        <div className="email_notify">
                          <div className="input_types">
                            <input ref="isEmailNotified" type="checkbox" name="checkbox"
                                   checked={this.state.data.isEmailNotified}
                                   onChange={this.onStatusChangeNotify.bind(this)}/>
                            <label htmlFor="checkbox1"><span> </span>Notify</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label>Show on Map</label>
                        <label className="switch">
                          <input type="checkbox" ref="showOnMap" checked={this.state.data && this.state.data.showOnMap}
                                 onChange={this.onStatusChangeMap.bind(this)}/>
                          <div className="slider"></div>
                        </label>
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" ref="isActive" checked={this.state.data && this.state.data.isActive}
                                 onChange={this.onStatusChangeActive.bind(this)}/>
                          <div className="slider"></div>
                        </label>
                      </div>
                    </form>
                  </ScrollArea>
                </div>
              </div>
            :
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
                          <span>Profile Pic</span>
                          <input type="file" className="upload" onChange={this.onImageFileUpload.bind(this)}/>
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
              </div>}
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName" />
        </div>
        )}
      </div>
    )
  }
};

export default MoolyaUpdateSubChapter = formHandler()(MlSubChapterDetails);
