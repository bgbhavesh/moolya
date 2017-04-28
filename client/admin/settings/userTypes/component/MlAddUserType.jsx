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
import {mlFieldValidations} from '../../../../commons/validations/mlfieldValidation'
class MlAddUserType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communityCode: ''
    }
    this.addEventHandler.bind(this);
    this.createUserType.bind(this)
    this.onCommunitySelect.bind(this)
    return this;
  }

  onCommunitySelect(val, callback, selObject) {
    this.setState({communityCode: val, communityName: selObject.label})
  }

  componentDidMount() {
    initalizeFloatLabel();
    OnToggleSwitch(true, true);
    var WinHeight = $(window).height();
    $('.admin_main_wrap ').height(WinHeight - $('.admin_header').outerHeight(true));
  }

  async addEventHandler() {
    /*const resp=await this.updateUserType()
     return resp;*/
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response) {
      if (response.success)
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
    console.log(this.state.communityCode);
    let errorValidation = this.state.communityCode;
    if (this.state.communityCode === " " ) {
        toastr.error("Community is required");
      }
      else {
        const response = await createUserTypeActionHandler(UserTypeDetails)
        return response;
      }
    }

    v


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
            <h2>Add User Category</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <Moolyaselect ref="Community " multiSelect={false} className="form-control float-label" valueKey={'value'}
                                labelKey={'label'} queryType={"graphql"} placeholder="Select Community"
                                selectedValue={this.state.communityCode} onBlur={this.validation.bind(this)}
                                query={query} isDynamic={true} onSelect={this.onCommunitySelect.bind(this)} data-required={true} data-errMsg="Name is required"/>

                  <div className="form-group">
                    <input type="text" ref="userTypeName" placeholder="User Category Name" className="form-control float-label"/>
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
