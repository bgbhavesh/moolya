import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {createCommunityActionHandler} from '../actions/createCommunityFormAction'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
class MlAddCommunityFormComponent extends React.Component {
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
    this.createCluster()
  }

  async handleSuccess(response) {
    FlowRouter.go("/admin/dashboard");
  };

  async  createCluster() {
    let communityDetails = {
      communityName: this.refs.communityName.value,
      displayName: this.refs.displayName.value,
      selectCluster: this.refs.selectCluster.value,
      selectChapter: this.refs.selectChapter.value,
      about: this.refs.about.value,
      ismapShow: this.refs.showOnMap.checked,
      status: this.refs.status.checked
    }

    console.log(communityDetails)
    const response = await createCommunityActionHandler(communityDetails)
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
        handler: async(event) => this.props.handler(this.addEventHandler.bind(this), this.handleSuccess.bind(this))
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
          <h2>Add community details</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="communityName" placeholder="Community Name"
                         className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label"
                         id=""/>

                </div>
                <div className="form-group">
                  <select className="form-control float-label" ref="selectCluster" placeholder="Select Cluster">
                    <option>Select Cluster</option>
                    <option>India</option>
                  </select>

                </div>
                <div className="form-group">
                  <select className="form-control float-label" ref="selectChapter" placeholder="Select Chapter">
                    <option>Select Chapter</option>
                    <option>Hyderabad</option>
                  </select>

                </div>

              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group">
                <textarea placeholder="About" ref="about" className="form-control float-label" id="cl_about"></textarea>

              </div>
              <div className="form-group switch_wrap">
                <label>Show on map</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="showOnMap"/>
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
            </div>
          </div>
        </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
}
;

export default MlAddChapter = formHandler()(MlAddCommunityFormComponent);
