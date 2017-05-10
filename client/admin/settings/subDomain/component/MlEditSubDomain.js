import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findSubDomainActionHandler} from '../actions/findSubDomainAction'
import {updateSelectedSubDomainActionHandler} from '../actions/updateSubDomainAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditSubDomain extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}, industry:" "};
    this.updateSelectedSubDomain.bind(this)
    this.findSubDomain.bind(this);
    this.onStatusChange.bind(this);
    this.optionsBySelectTypeOfIndustry.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findSubDomain();
    return resp;
  }
  componentDidMount(){
  }
  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  optionsBySelectTypeOfIndustry(value){
    this.setState({industry:value})
  }

  async handleError(response) {
    alert(response)
  };

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/subDomainList");
      else
        toastr.error(response.result);
    }
  }

  async findSubDomain(){
    let subDomainId = this.props.config
    const response = await findSubDomainActionHandler(subDomainId);
    this.setState({loading:false,data:response});
  }

  async  updateSelectedSubDomain() {
    let subDomainDetails = {
      name: this.refs.name.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      industryId:this.state.industry,
      isActive: this.refs.isActive.checked
    }
    console.log(this.props)

    const response = await updateSelectedSubDomainActionHandler(this.props.config, subDomainDetails)
    return response;
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateSelectedSubDomain.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },

      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/subDomainList")
        }
      }
    ];
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }`;


    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

          <div className="admin_padding_wrap">
            <h2>Edit Sub Domain</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    {/*<input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>*/}
                    <input type="text" ref="name" placeholder="Name" className="form-control float-label" defaultValue={this.state.data.name}/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.about}></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" defaultValue={this.state.data.displayName}/>
                  </div>

                  <div className="form-group">
                    <Moolyaselect multiSelect={false} ref="indutryType" placeholder="Select Industry"
                                  className="form-control float-label" selectedValue = {this.state.industry}
                                  valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={industriesquery}
                                  onSelect={this.optionsBySelectTypeOfIndustry.bind(this)}
                                  isDynamic={true} />
                    {console.log(this.state.data)}
                  </div>


                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
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

export default MlEditSubDomain = formHandler()(MlEditSubDomain);
