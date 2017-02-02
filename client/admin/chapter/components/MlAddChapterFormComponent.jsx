import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {createChapterActionHandler} from '../actions/createChapterFormAction'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
class MlAddChapterFormComponent extends React.Component {
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
      } else {
        $(this).parent('.switch').removeClass('on');
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
    let chapterDetails = {
      clusterName: this.refs.clusterName.value,
      chapterName: this.refs.chapterName.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      chapterImage: this.refs.chapterImage.value,
      state: this.refs.state.value,
      email: this.refs.email.value,
      ismapShow: this.refs.showOnMap.checked,
      status: this.refs.status.checked
    }

    console.log(chapterDetails)
    const response = await createChapterActionHandler(chapterDetails)
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
          <form>
            <h2>Create chapter details</h2>
            <div className="col-md-6">
              <div className="form_bg">
                <div className="form-group ">
                  <input type="text" ref="clusterName" placeholder="Cluster Name" className="form-control float-label"
                         id="cluster_name"/>

                </div>
                <div className="form-group">
                  <input type="text" ref="chapterName" placeholder="Chapter Name" className="form-control float-label"
                         id="chapter_name"/>

                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label"
                         id="displayname"/>

                </div>
                <div className="form-group">
    <textarea ref="about" placeholder="About" className="form-control float-label" id="cl_about">
    </textarea>

                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="chapterImage" placeholder="Chapter image" className="form-control float-label"
                         id="ch_image"/>

                </div>
                <div className="form-group">
                  <input type="text" ref="state" id="state" placeholder="State" className="form-control float-label"/>

                </div>
                <div className="form-group">
                  <input type="text" ref="email" id="email" placeholder="Chapter Email ID"
                         className="form-control float-label"/>

                </div>
                <div className="form-group switch_wrap">
                  <label>Show on map</label><br/>
                  <label className="switch">
                    <input ref="showOnMap" type="checkbox"/>
                    <div className="slider"></div>
                  </label>
                </div>
                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input ref="status" type="checkbox"/>
                    <div className="slider"></div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

      </div>
    )
  }
}
;

export default MlAddChapter = formHandler()(MlAddChapterFormComponent);
