import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addEntityActionHandler} from '../actions/addEntityTypeAction'
class MlAddEntity extends React.Component {
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createEntity.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp = await this.createEntity();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/entityList");
      else
        toastr.error(response.result);
    }
  };

  async  createEntity() {
    let EntityDetails = {
      entityName: this.refs.entityName.value,
      entityDisplayName: this.refs.entityDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addEntityActionHandler(EntityDetails)
    return response;
  }

  render() {
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createEntity.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    // const showLoader=this.state.loading;
    return (
      <div>
        {/*{showLoader===true?( <div className="loader_wrap"></div>):(*/}
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Create Entity</h2>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="entityName" placeholder="Entity Name"
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" className="form-control float-label"></textarea>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="entityDisplayName" placeholder="Display Name"
                           className="form-control float-label"/>
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
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />
          </div>
          {/*)}*/}
      </div>
    )
  }
}
;

export default MlAddEntity = formHandler()(MlAddEntity);
