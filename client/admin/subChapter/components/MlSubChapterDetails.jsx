import React from 'react';
import {render} from 'react-dom';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import {findSubChapterActionHandler} from '../actions/findSubChapter'
import {updateSubChapterActionHandler} from '../actions/updateSubChapter'
import formHandler from '../../../commons/containers/MlFormHandler';
import _ from 'lodash';


class MlSubChapterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}};
    this.onStatusChangeActive = this.onStatusChangeActive.bind(this);
    this.onStatusChangeMap = this.onStatusChangeMap.bind(this);
    this.onStatusChangeNotify = this.onStatusChangeNotify.bind(this);
    this.findSubChapter.bind(this);
    this.updateSubChapter.bind(this)
    return this;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/dashboard");
  };

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

  async updateSubChapter() {
    let subChapterDetails = {
      _id: this.refs.id.value,
      subChapterDisplayName: this.refs.subChapterDisplayName.value,
      aboutSubChapter: this.refs.aboutSubChapter.value,
      // subChapterImageLink: this.refs.subChapterImageLink.value,
      subChapterEmail: this.refs.subChapterEmail.value,
      // isEmailNotified: this.refs.isEmailNotified.value,
      showOnMap: this.refs.showOnMap.checked,
      isActive: this.refs.isActive.checked
    }

    // updateSubChapterActionHandler(subChapterDetails)
    const response = await updateSubChapterActionHandler(subChapterDetails)
    return response;
  }

  componentWillMount() {
    const resp = this.findSubChapter();
    return resp;
  }

  async findSubChapter() {
    let subChapterId = this.props.params;
    const response = await findSubChapterActionHandler(subChapterId);
    this.setState({loading: false, data: response});
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateSubChapter.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
     // let chapterData=this.state.data;
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Sub-Chapter Details</h2>
          <form>
            <div className="col-md-6">
              <div className="form_bg">
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
                  <div className="form-group">
                  <textarea placeholder="About" ref="aboutSubChapter" defaultValue={this.state.data && this.state.data.aboutSubChapter}
                    className="form-control float-label">
                  </textarea>
                  </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                  <div className="form-group">
                    <div className="fileUpload mlUpload_btn">
                      <span>Profile Pic</span>
                      <input type="file" className="upload" ref="subChapterImageLink"/>
                    </div>
                    <div className="previewImg ProfileImg">
                      <img src={this.state.data && this.state.data.subChapterImageLink}/>
                      {/*<img src="/images/ideator_01.png"/>*/}
                    </div>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group">
                    <input type="text" ref="state" placeholder="State" className="form-control float-label"
                           defaultValue={this.state.data && this.state.data.stateName}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="subChapterEmail" placeholder="Sub-Chapter Email ID"
                           defaultValue={this.state.data && this.state.data.subChapterEmail}
                           className="form-control float-label"/>
                    <div className="email_notify">
                      <div className="input_types">
                        <input ref="isEmailNotified" type="checkbox" name="checkbox"
                               defaultChecked="0"
                               onChange={this.onStatusChangeNotify.bind(this)}/>
                        <label htmlFor="checkbox1"><span> </span>Notify</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Show on Map</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="showOnMap" checked={this.state.data && this.state.data.showOnMap}
                      onChange={this.onStatusChangeMap.bind(this)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Status</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data && this.state.data.isActive}
                        onChange={this.onStatusChangeActive.bind(this)} />
                      <div className="slider"></div>
                    </label>
                  </div>
              </div>
            </div>
          </form>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName" />
          </div>

        </div>
        )}
      </div>
    )
  }
};

export default MoolyaUpdateSubChapter = formHandler()(MlSubChapterDetails);
