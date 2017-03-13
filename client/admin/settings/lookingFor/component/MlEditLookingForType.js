import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findLookingForActionHandler} from '../actions/findLookingForTypeAction'
import {updateLookingForTypeActionHandler} from '../actions/updateLookingForTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditLookingForType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.updateLookingForType.bind(this)
    this.findLookingForType.bind(this);
    this.onCommunitySelect.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findLookingForType();
    return resp;
  }
  componentDidMount(){
    /*if(this.state.data.isActive){
     $('#status').prop('checked', true);
     }*/
  }
  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }
  onCommunitySelect(val) {
    if(val){
      this.setState({selectedCommunity: val})
    }else {
      this.setState({selectedCommunity: this.state.data.communityCode})
    }
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/lookingForList");
      else
        toastr.error(response.result);
    }
  };

  async findLookingForType(){
    let LookingForTypeId=this.props.config
    const response = await findLookingForActionHandler(LookingForTypeId);
    this.setState({loading:false,data:response});
    this.onCommunitySelect();
  }
  async  updateLookingForType() {
    let LookingForType = {
      id: this.refs.id.value,
      lookingForName: this.refs.lookingForName.value,
      lookingForDisplayName: this.refs.lookingForDisplayName.value,
      communityCode: this.state.selectedCommunity,
      communityName: '',
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateLookingForTypeActionHandler(LookingForType)
    return response;

  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
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
        handler: async(event) => this.props.handler(this.updateLookingForType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Edit Looking For</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="lookingForName" placeholder="Name" defaultValue={this.state.data&&this.state.data.lookingForName}
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about} className="form-control float-label"></textarea>
                  </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="lookingForDisplayName" placeholder="Display Name"
                           className="form-control float-label" defaultValue={this.state.data&&this.state.data.lookingForDisplayName}/>
                  </div>

                    <Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"}
                                  selectedValue={this.state.selectedCommunity}
                                  query={query} isDynamic={true} onSelect={this.onCommunitySelect.bind(this)}/>

                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                  </form>
                </div>
              </div>

            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />
          </div>)}
      </div>

    )
  }
};

export default MlEditLookingForType = formHandler()(MlEditLookingForType);
