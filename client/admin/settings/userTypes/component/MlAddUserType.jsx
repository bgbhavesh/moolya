import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {createUserTypeActionHandler} from '../actions/createUsertypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlAddUserType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createUserType.bind(this)
    return this;
  }

  componentWillMount() {
  }

  componentDidMount(){
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
      isActive: this.refs.isActive.checked
    }
    console.log(UserTypeDetails);
    const response = await createUserTypeActionHandler(UserTypeDetails)
    return response;
  }

  // onStatusChange(e){
  //   const data=this.state.data;
  //   if(e.currentTarget.checked){
  //     this.setState({"data":{"isActive":true}});
  //   }else{
  //     this.setState({"data":{"isActive":false}});
  //   }
  // }

  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.createUserType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   // handler: async(event) => this.props.handler(this.updateUserType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/userTypeList")
        }
      }
    ];

    return (
      <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Add UserType</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    {/*<input type="text" ref="id" hidden="true"/>*/}
                    <input type="text" ref="userTypeName" placeholder="UserType Name" className="form-control float-label"/>

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
