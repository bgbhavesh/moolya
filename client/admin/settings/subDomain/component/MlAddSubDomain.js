import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {addSubDomain} from '../actions/addSubDomainAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlAddSubDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      industry:''
    }
    this.optionsBySelectTypeOfIndustry.bind(this)
    this.createSubDomain.bind(this)
    return this;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/SubDomainList");
      else
        toastr.error(response.result);
    }
  };

  optionsBySelectTypeOfIndustry(val){
    this.setState({industry:val})
    console.log(val)
  }

  async   createSubDomain()
  {
    let subdomainInfo = {
      name: this.refs.name.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      industryId:this.state.industry,
      isActive: this.refs.isActive.checked,
      // icon:this.refs.assetIcon.files
    }

    const response = await addSubDomain(subdomainInfo)
    return response;
  }
  componentDidMount()  {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
  }
  render() {
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createSubDomain.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/SubDomainList")
        }
      }
    ]


    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }`;

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

          <div className="admin_padding_wrap">
            <h2>Create Sub Domain</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" ref="name" placeholder="Name" className="form-control float-label"/>
                  </div>
                  <br className="clearfix"/>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label"/>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.industry} queryType={"graphql"} query={industriesquery} onSelect={this.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
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

export default MlAddSubDomain = formHandler()(MlAddSubDomain);
