import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {createClusterActionHandler} from '../actions/createCluster'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
class MlAddClusterFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createCluster.bind(this)
    return this;
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
        $(this).val(true)
      } else {
        $(this).parent('.switch').removeClass('on');
        $(this).val(false)
      }
    });
  }

  async addEventHandler() {
   const resp=await this.createCluster();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/cluster");
  };

  async  createCluster() {
    let clusterDetails = {
      clusterName: this.refs.clusterName.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      uploadImage: this.refs.uploadImage.value,
      email: this.refs.email.value,
      ismapShow: this.refs.ismapShow.checked,
      status: this.refs.status.checked
    }
    const response = await createClusterActionHandler(clusterDetails)
    return response;

  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createCluster.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <form >
            <h2>Add Cluster</h2>
            <div className="col-md-6">
              <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="clusterName" placeholder="Cluster Name" className="form-control float-label"
                         id=""/>

                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label"
                         id=""/>

                </div>
                <div className="form-group">
                  <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>

                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                {/* <form>*/}
                <div className="form-group ">

                  <div className="fileUpload mlUpload_btn">
                    <span>Upload Image</span>
                    <input type="file" ref="uploadImage" className="upload"/>
                  </div>
                  <div className="previewImg">
                    <img src="/images/india.png"/>
                  </div>

                </div>
                <br className="brclear"/>
                <div className="form-group ">
                  <input type="text" id="email" ref="email" placeholder="email" className="form-control float-label"/>

                </div>
                <div className="form-group switch_wrap">
                  <label>Show on map</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="ismapShow"/>
                    <div className="slider"></div>
                  </label>
                </div>
                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="status"/>
                    <div className="slider"></div>
                  </label>
                </div>
                {/* </form>*/}
              </div>
            </div>

          </form>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>
    )
  }
}
;

export default MoolyaAddCluster = formHandler()(MlAddClusterFormComponent);
