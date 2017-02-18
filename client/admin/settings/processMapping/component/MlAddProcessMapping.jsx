
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {addProcessActionHandler} from '../actions/addProcessAction'
import MlAssignDocument from './MlAssignDocument'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

let Select = require('react-select');

class MlAddProcessMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      assignDocument:[],
      process:'',
      community:'',
      userType:'',
      identity:'',
      industry:[],
      profession:[],
      cluster:[],
      state:[],
      chapter:[],
      subChapter:[],

    }
    this.addEventHandler.bind(this);
    return this;
  }
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  async addEventHandler() {
    const resp=await this.createBackendUser();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/processList");
  };

  getassignDocuments(details){
    console.log("details->"+details);
    this.setState({'assignDocuments':details})
  }


  onSubmit(){
    console.log(this.state.assignDocuments)
  }


  optionsBySelectProcess(val){
    this.setState({community:val})
  }

  async  createProcess() {
    let processDetails = {
      process:this.state.process,
      community:this.state.community,
      userType:this.state.userType,
      assignDocument:this.state.assignDocument
    }
    console.log(processDetails)
    const response = await addProcessActionHandler(processDetails)
    return response;
  }
  getAssignedDocuments(departments){
    this.setState({'assignDocument':departments})
  }

  onBackendUserTypeSelect(val){
    this.setState({userType:val.value})
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createProcess.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya'},
      {value: 'non-moolya', label: 'non-moolya'}
    ];
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;

   return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Process</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text"  ref="id" placeholder="Id" className="form-control float-label" id=""/>

                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.community} queryType={"graphql"} query={query}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectProcess.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Select name="form-field-name"  className="float-label"  options={UserTypeOptions}  value={this.state.userType}  onChange={this.onBackendUserTypeSelect.bind(this)}
                      />
                    </div>

                    <div className="form-group switch_wrap inline_switch">
                      <label className="">Overall Role Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="status"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right"  >
        <MlAssignDocument getAssignedDocuments={this.getAssignedDocuments.bind(this)}/>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
};
export default MlAddProcessMapping = formHandler()(MlAddProcessMapping);

