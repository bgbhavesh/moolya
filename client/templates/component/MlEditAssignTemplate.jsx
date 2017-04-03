import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findTemplatesActionHandler} from '../actions/findTemplatesAction'
import {findStepTemplatesAssignmentActionHandler} from '../actions/findTemplatesAssignmentAction'
import {findTemplateStepsActionHandler} from '../actions/findTemplateAssignmentStepsAction'
import {updateTemplateAssignmentActionHandler} from '../actions/updateTemplateAssignmentAction'
import MlActionComponent from '../../commons/components/actions/ActionComponent'
import formHandler from '../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../commons/components/select/MoolyaSelect'
import MlStepAvailability from './MlStepAvailabilityComponent'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


let IdentityOptions = [
  {value: 'Company', label: 'Company'},
  {value: 'Individual', label: 'Individual'}
];

class MlEditAssignTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      process     : '',
      processName : '',
      subProcess  : '',
      subProcessName : '',
      userTypes   : '',
      identity    : '',
      clusters    : '',
      clusterName : '',
      chapters    : '',
      chapterName : '',
      subChapters : '',
      subChapterName : '',
      communities : '',
      communitiesName : '',
      templateInfo: [],
      steps       : [],
      data        : '',
      stepAvailability:[]
    }
    this.findTemplate.bind(this);
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
  componentWillMount() {
    const resp=this.findTemplate();
    return resp;
  }

  getStepAvailability(details){
    console.log(details);
    this.setState({'stepAvailability':details})
  }
  async addEventHandler() {
    const resp=await this.updateAddressType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/templates/templateList");
  };

  async findTemplate(){
    let Id=this.props.config;
    const response = await findStepTemplatesAssignmentActionHandler(Id);
    let subProcessId = response.templatesubProcess;
    if(response){
      const steps=await this.findSteps(subProcessId);
      this.setState({steps:steps||[]});
      console.log(this.state.steps);
      let stepDetails=[];
      stepDetails= steps;
      let stepName=''
      for(i=0;i<1;i++){
        stepName = stepDetails[i].stepCode;
      }
      const templates=await this.findTemplates(subProcessId,stepName);
      this.setState({templateInfo:templates||[]})
      console.log(this.state.templateInfo);
      this.setState({
        loading           : false,
        process           : response.templateprocess,
        subProcess        : response.templatesubProcess,
        processName       : response.processName,
        subProcessName    : response.subProcessName,
        communities       : response.templatecommunityId,
        userTypes         : response.templateuserType,
        identity          : response.templateidentity,
        clusters          : response.templateclusterId,
        chapters          : response.templatechapterId,
        subChapters       : response.templatesubChapterId,
        stepAvailability  : response.stepAvailability,
        clusterName       : response.templateclusterName,
        chapterName       : response.templatechapterName,
        subChapterName    : response.templatesubChapterName,
        communitiesName   : response.templatecommunityName,
        data              : response
      })
    }
  }

  async  updateTemplateAssignment() {
    let id                       = this.props.config;
    let Details = {
      templateprocess           : this.state.process,
      templatesubProcess        : this.state.subProcess,
      templateProcessName       : this.state.processName,
      templateSubProcessName    : this.state.subProcessName,
      templateclusterId         : this.state.clusters,
      templateclusterName       : this.state.clusterName,
      templatechapterId         : this.state.chapters,
      templatechapterName       : this.state.chapterName,
      templatesubChapterId      : this.state.subChapters,
      templatesubChapterName    : this.state.subChapterName,
      templatecommunityId       : this.state.communities,
      templatecommunityName     : this.state.communitiesName,
      templateuserType          : this.state.userTypes,
      templateidentity          : this.state.identity,
      stepAvailability          : this.state.stepAvailability
    }
    const response = await updateTemplateAssignmentActionHandler(id,Details);
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
  async findSteps(subProcessId) {
    //let subProcessId = this.state.subProcess
    const response = await findTemplateStepsActionHandler(subProcessId,this.props.stepCode);
    console.log(response)
    if(response){
      let steps = response.steps||[];
      return steps;
    }
    return [];
  }


  async findTemplates(subProcessId,stepName) {
    console.log(subProcessId+"--"+stepName)
    const response = await findTemplatesActionHandler(subProcessId,stepName);
    console.log(response);
    let templates=[];
    if(response){
      templates = response.templates||[];
    }
    return templates;
  }

  optionsBySelectProcess(value, calback, selObject){
    this.setState({process:value})
    this.setState({processName:selObject.label})
  }

  async optionsBySelectSubProcess(value, calback, selObject){
    this.setState({subProcess:value})
    this.setState({subProcessName:selObject.label})
    const templates=await this.findTemplates(value);
    this.setState({templateInfo:templates||[]})
    console.log(this.state.templateInfo);
    const steps=await this.findSteps();
    this.setState({steps:steps||[]});
    console.log(this.state.steps);
  }

  optionsBySelectUserType(val){
    this.setState({userTypes:val})
  }

  optionsBySelectIdentity(val){
    this.setState({identity:val.value})
  }

  optionsBySelectClusters(value, calback, selObject){
    this.setState({clusters:value})
    this.setState({clusterName:selObject.label})
  }

  optionsBySelectChapters(value, calback, selObject){
    this.setState({chapters:value})
    this.setState({chapterName:selObject.label})
  }

  optionsBySelectSubChapters(value, calback, selObject){
    this.setState({subChapters:value})
    this.setState({subChapterName:selObject.label})
  }

  optionsBySelectCommunities(value, calback, selObject){
    this.setState({communities:value})
    this.setState({communitiesName:selObject.label})
  }
  switchTab(){
    console.log("switch tab")
  }

  render(){
    let that=this;
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateTemplateAssignment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      }
    ]

    let processQuery=gql`query{
     data: FetchProcessType {
        label:processName
        value:_id
      }
    }
    `;
    let subProcessQuery=gql`query($id:String){  
      data:fetchSubProcess(id:$id) {
        value:_id
        label:subProcessName
      }  
    }`;
    let fetchcommunities = gql` query{
      data:fetchCommunityDefinitionForSelect{label:name,value:code}
    }
    `;
    let fetchUsers = gql`query{
      data:FetchUserType {label:userTypeName,value:_id}
    }
    `;
    let clusterquery=gql` query{data:fetchActiveClusters{label:countryName,value:_id}}`;
    let chapterquery=gql`query($id:String){data:fetchChapters(id:$id) {
    value:_id
    label:chapterName
      }  
    }`;
    let subChapterquery=gql`query($id:String){  
      data:fetchSubChaptersSelect(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
    let subprocessOption={options:{variables: {id:this.state.process}}};
    let chapterOption={options: { variables: {id:this.state.clusters}}};
    let subChapterOption={options: { variables: {id:this.state.chapters}}};

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_main_wrap">
              <div className="admin_padding_wrap">
                <h2>Create Template</h2>
                <div className="col-md-6 nopadding-left">
                  <div className="form_bg left_wrap">
                    <ScrollArea
                      speed={0.8}
                      className="left_wrap"
                      smoothScrolling={true}
                      default={true}
                    >
                      <form>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder={"Process"} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.process} queryType={"graphql"} query={processQuery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectProcess.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"Sub Process"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subProcess} queryType={"graphql"} query={subProcessQuery} queryOptions={subprocessOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubProcess.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'} onSelect={this.optionsBySelectClusters.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"Communities"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.communities} queryType={"graphql"} query={fetchcommunities}  isDynamic={true} id={'fetchcommunities'} onSelect={this.optionsBySelectCommunities.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"User Types"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.userTypes} queryType={"graphql"} query={fetchUsers}  isDynamic={true} id={'fetchuserTypes'} onSelect={this.optionsBySelectUserType.bind(this)} />
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"  placeholder={"Identity"}  className="float-label"  options={IdentityOptions}  value={this.state.identity}  onChange={this.optionsBySelectIdentity.bind(this)}/>
                        </div>
                      </form>
                    </ScrollArea>
                  </div>
                </div>
                <div className="col-md-6 nopadding-right">
                  <div className="form_bg left_wrap">
                    <ScrollArea
                      speed={0.8}
                      className="left_wrap"
                      smoothScrolling={true}
                      default={true}>
                      {this.state.data&&this.state.stepAvailability?(<MlStepAvailability getStepAvailability={this.getStepAvailability.bind(this)} stepDetails={this.state.data&&this.state.stepAvailability}/>):""}
                      <div className="panel panel-default">
                        <div className="panel-heading">Template Step Details</div>
                        <div className="panel-body">
                          <div className="ml_tabs">
                            <ul  className="nav nav-pills">
                              {that.state.steps.map(function(options,key) {
                                return(
                                  <li className="active" key={key}>
                                    <a  href={'#template'+key} data-toggle="tab" >{options.stepName} </a>
                                  </li>
                                )})}
                            </ul>

                            <div className="tab-content clearfix">
                              <div className="tab-pane active" >
                                <div className="list-group nomargin-bottom">
                                  {that.state.templateInfo.map(function(options,key) {
                                    return(
                                      <a className="list-group-item" key={key} id={"template"}>{options.templateName}
                                        <FontAwesome className="btn btn-xs btn-mlBlue pull-right" name='eye'/>
                                      </a>

                                    )})}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                {/*<span className="actions_switch show_act"></span>
                 <div className="bottom_actions_block show_block">
                 <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
                 <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
                 <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
                 <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
                 <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
                 </div>*/}
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
          )}
      </div>
    )
  }
};
export default MlAssignTemplate = formHandler()(MlEditAssignTemplate);
