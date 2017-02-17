import React from 'react';
import {render} from 'react-dom';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import {findSubChapterActionHandler} from '../actions/findSubChapter'

export default class MlSubChapterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}};
    // this.onStatusChangeActive = this.onStatusChangeActive.bind(this);
    // this.onStatusChangeMap = this.onStatusChangeMap.bind(this);
    this.findSubChapter.bind(this);
    this.updateSubChapter.bind(this)
    return this;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    console.log('final roleback');
    // FlowRouter.go("/admin/dashboard");
  };


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
  }

  async  updateSubChapter() {
    console.log('edit clicked');
    // let subChapterDetails = {
    //   _id: this.refs.id.value,
    //   countryName: this.refs.countryName.value,
    //   displayName: this.refs.displayName.value,
    //   about: this.refs.about.value,
    //   email: this.refs.email.value,
    //   showOnMap: this.refs.showOnMap.checked,
    //   isActive: this.refs.isActive.checked
    // }
    // const response = await updateSubChapterActionHandler(subChapterDetails)
    // return response;
  }

  componentWillMount() {
    const resp = this.findSubChapter();
    return resp;
  }

  async findSubChapter() {
    let subChapterId = this.props.params;
    findSubChapterActionHandler(subChapterId)
    // const response = await findSubChapterActionHandler(subChapterId);
    // this.setState({loading: false, data: response});
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

    // const showLoader = this.state.loading;
    return (
      <div>
        {/*{showLoader === true ? ( <div className="loader_wrap"></div>) : (*/}
          <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Sub-Chapter Details</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                  <div className="form-group ">
                    <input type="text" ref="id" defaultValue="" hidden="true"/>
                    <input type="text" placeholder="Cluster Name" ref="clusterName" className="form-control float-label"
                           readOnly defaultValue=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Chapter Name" ref="chapterName" className="form-control float-label"
                           readOnly defaultValue=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub-Chapter Name" ref="subChapterName" readOnly
                           className="form-control float-label" defaultValue=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" ref="subChapterDisplayName"
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                  <textarea placeholder="About" ref="aboutSubChapter" className="form-control float-label">
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
                      <img src="/images/ideator_01.png"/>
                    </div>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group">
                    <input type="text" ref="state" placeholder="State" className="form-control float-label"
                           defaultValue="Telangana"/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="subChapterEmail" placeholder="Sub-Chapter Email ID"
                           className="form-control float-label"/>
                    <div className="email_notify">
                      <div className="input_types">
                        <input ref="isEmailNotified" type="checkbox" name="checkbox" value="1"/>
                        <label htmlFor="checkbox1"><span> </span>Notify</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Show on Map</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="showOnMap"/>
                      <div className="slider"></div>
                    </label>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Status</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="isActive"/>
                      <div className="slider"></div>
                    </label>
                  </div>
              </div>
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName" />
          </div>
        </div>
          {/*)}*/}
      </div>
    )
  }
};
