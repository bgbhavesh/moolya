import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {createUserTypeActionHandler} from '../actions/createUsertypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlAddUserType extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      communityCode:''
    }
    this.addEventHandler.bind(this);
    this.createUserType.bind(this)
    this.onCommunitySelect.bind(this)
    return this;
  }

  onCommunitySelect(val, callback, selObject) {
    this.setState({communityCode: val, communityName : selObject.label})
  }

  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async addEventHandler() {
    /*const resp=await this.updateUserType()
     return resp;*/
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/UserTypeList");
      else
        toastr.error(response.result);
    }
  };

  async createUserType() {
    let UserTypeDetails = {
      userTypeName: this.refs.userTypeName.value,
      displayName: this.refs.displayName.value,
      userTypeDesc: this.refs.userTypeDesc.value,
      communityCode: this.state.communityCode,
      communityName: this.state.communityName,
      isActive: this.refs.isActive.checked
    }
    const response = await createUserTypeActionHandler(UserTypeDetails)
    return response;
  }

  render(){
    let query = gql` query{
       data:fetchCommunityDefinition{label:name,value:code}
    }
    `;

    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.createUserType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/userTypeList")
        }
      }
    ];

    return (
      <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Add User Type</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                labelKey={'label'} queryType={"graphql"} placeholder="Select Community"
                                selectedValue={this.state.communityCode}
                                query={query} isDynamic={true} onSelect={this.onCommunitySelect.bind(this)}/>
                  <div className="form-group">
                    <input type="text" ref="userTypeName" placeholder="User Type Name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea  ref="userTypeDesc" placeholder="About" className="form-control float-label"></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" />
                      <div className="slider"></div>
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />

          </div>
        </div>
    )
  }
};

export default MlAddUserType = formHandler()(MlAddUserType);
