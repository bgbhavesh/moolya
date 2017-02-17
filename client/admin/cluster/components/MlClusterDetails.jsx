import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {createClusterActionHandler} from '../actions/createCluster'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import {findClusterTypeActionHandler} from '../actions/findCluster'
import formHandler from '../../../commons/containers/MlFormHandler';
class MlClusterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}};
    this.addEventHandler.bind(this);
    this.createCluster.bind(this)
    this.findCluster.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findCluster();
    return resp;
  }

  async findCluster() {
    let clusterId = this.props.params;
    const response = await findClusterTypeActionHandler(clusterId);
    this.setState({loading: false, data: response});
  }


  // componentDidMount() {
  //   $('.switch input').change(function () {
  //     if ($(this).is(':checked')) {
  //       $(this).parent('.switch').addClass('on');
  //       $(this).val(true)
  //     } else {
  //       $(this).parent('.switch').removeClass('on');
  //       $(this).val(false)
  //     }
  //   });
  // }

  onStatusChange(e) {
    const data = this.state.data;
    if (e.currentTarget.checked) {
      this.setState({"data": {"isActive": true}});
    } else {
      this.setState({"data": {"isActive": false}});
    }
  }

  async addEventHandler() {
    const resp = await this.createCluster();
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
      "countryId": "c101",
      "countryFlag": "https://s3.ap-south-1.amazonaws.com/moolya-app-images/countries-flag/small/India.png",
      "about": "India",
      "displayName": "India",
      "email": "moolya@moolya.in",
      "showOnMap": false,
      "isActive": false,
      "moduleName": "CLUSTER",
      "actionName": "CREATE"
    }
    const response = await createClusterActionHandler(clusterDetails)
    return response;
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateTemplateType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <form >
                <h2>Edit Cluster Details</h2>
                <div className="col-md-6">
                  <div className="form_bg">
                    <div className="form-group">
                      <input type="text" ref="countryName" placeholder="Cluster Name"
                             defaultValue={this.state.data && this.state.data.countryName}
                             className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="displayName" placeholder="Display Name"
                             defaultValue={this.state.data && this.state.data.displayName}
                             className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <textarea ref="about" placeholder="About"
                                defaultValue={this.state.data && this.state.data.about}
                                className="form-control float-label">
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form_bg">
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
                      <input type="text" ref="email" placeholder="email"
                             defaultValue={this.state.data && this.state.data.email}
                             className="form-control float-label"/>
                    </div>
                    <div className="form-group switch_wrap">
                      <label>Show on map</label><br/>
                      <label className="switch">
                        <input type="checkbox" ref="showOnMap" checked={this.state.data && this.state.data.showOnMap}
                               onChange={this.onStatusChange.bind(this)}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <div className="form-group switch_wrap">
                      <label>Status</label><br/>
                      <label className="switch">
                        <input type="checkbox" ref="isActive" checked={this.state.data && this.state.data.isActive}
                               onChange={this.onStatusChange.bind(this)}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </div>
                </div>

              </form>
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />
          </div>)}
      </div>
    )
  }
}
;

export default MoolyaAddCluster = formHandler()(MlClusterDetails);
