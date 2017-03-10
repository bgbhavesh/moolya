import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {addLookingForActionHandler} from '../actions/addLookingForTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlAddLookingFor extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selectedCommunity:''
    }
    this.addEventHandler.bind(this);
    this.CreateLookingFor.bind(this)
    this.onCommunitySelect.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp = await this.CreateLookingFor();
    return resp;
  }

  onCommunitySelect(val) {
    this.setState({selectedCommunity: val})
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

  async  CreateLookingFor() {
    let LookingForDetails = {
      lookingForName: this.refs.lookingForName.value,
      lookingForDisplayName: this.refs.lookingForDisplayName.value,
      communityCode: this.state.selectedCommunity,
      communityName: '',
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addLookingForActionHandler(LookingForDetails)
    return response;
  }
  componentDidMount()  {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
  }
  render() {
    let query = gql` query{
  data:fetchCommunityDefinition{label:name,value:code}
}
`;

    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.CreateLookingFor.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ]

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Create Looking For</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>

                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"} placeholder="Select Community"
                                  selectedValue={this.state.selectedCommunity}
                                  query={query} isDynamic={true} onSelect={this.onCommunitySelect.bind(this)}/>

                  <div className="form-group">
                    <input type="text" ref="lookingForDisplayName" placeholder="Display Name"
                           className="form-control float-label"/>
                  </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="lookingForName" placeholder="Looking For Name"
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive"/>
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
}
;

export default MlAddLookingFor = formHandler()(MlAddLookingFor);
