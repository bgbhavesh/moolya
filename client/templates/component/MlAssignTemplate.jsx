import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findStepTemplatesInfoActionHandler} from '../actions/findTemplatesInfoAction'
import {findStepTemplatesAssignmentActionHandler} from '../actions/findTemplatesAssignmentAction'
import {findTemplateStepsActionHandler} from '../actions/findTemplateAssignmentStepsAction'
import {updateTemplateAssignmentActionHandler} from '../actions/updateTemplateAssignmentAction'
import MlActionComponent from '../../commons/components/actions/ActionComponent'
import formHandler from '../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../commons/components/select/MoolyaSelect'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


let IdentityOptions = [
  {value: 'Company', label: 'Company'},
  {value: 'Individual', label: 'Individual'}
];

class MlAssignTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      process     : '',
      subProcess  : '',
      communities : '',
      userTypes   : '',
      identity    : '',
      clusters    : '',
      chapters    : '',
      subChapters : '',
      templateInfo: [],
      steps       : [],
      data        : ''
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
    if(response){
      this.setState({
        loading       : false,
        process       : response.process,
        subProcess    : response.subProcess,
        communities   : response.communityId,
        userTypes     : response.userType,
        identity      : response.identity,
        clusters      : response.clusterId,
        chapters      : response.chapterId,
        subChapters   : response.subChapterId,
        data          : response
      })
    }
  }

  async  updateTemplateAssignment() {
    let Details = {
      id                : this.props.config,
      process           : this.state.process,
      subProcess        : this.state.subProcess,
      templateProcessName       : this.state.process,
      templateSubProcessName    : this.state.subProcess,
      assignedTemplates : '',
      clusterId         : this.state.clusters,
      clusterName       : '',
      chapterId         : this.state.chapters,
      chapterName       : '',
      subChapterId      : this.state.subChapters,
      subChapterName    : '',
      communityId       : this.state.communities,
      communityName     : ''
    }
    const response = await updateTemplateAssignmentActionHandler(Details);
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

  async findSteps() {
    let subProcessId = this.state.subProcess
    const response = await findTemplateStepsActionHandler(subProcessId,this.props.stepCode);
    console.log(response)
    if(response){
      let assignedTemplates = response.steps
      let documentDetails=[]
      for(let i=0;i<assignedTemplates.length;i++){
        let json = {
          Id:assignedTemplates[i].stepId,
          stepName: assignedTemplates[i].stepName,
          href : '#'+assignedTemplates[i].stepId
        }
        documentDetails.push(json);
      }
      this.setState({"steps":documentDetails})
    }
  }


  async findTemplates() {
    let subProcessId = this.state.subProcess
    const response = await findStepTemplatesInfoActionHandler(subProcessId,this.props.stepCode);
    console.log(response)
    if(response){
      let assignedTemplates = response.assignedTemplates
      let documentDetails=[]
      for(let i=0;i<assignedTemplates.length;i++){
        let json = {
          Id:assignedTemplates[i]._id,
          templateName: assignedTemplates[i].templateName,
          view: 'Yes'
        }
        documentDetails.push(json);
      }
      this.setState({"templateInfo":documentDetails})
    }
  }

  optionsBySelectProcess(val){
    this.setState({process:val})
  }

  optionsBySelectSubProcess(val){
    this.setState({subProcess:val})
    const templates=this.findTemplates();
    this.setState({templateInfo:templates})
    //console.log(this.state.templateInfo);
    const steps=this.findSteps();
    this.setState({steps:steps})
    //console.log(this.state.steps);
  }

  optionsBySelectCommunities(val){
    this.setState({communities:val})
  }

  optionsBySelectUserType(val){
    this.setState({userTypes:val})
  }

  optionsBySelectIdentity(val){
    this.setState({identity:val.value})
  }

  optionsBySelectClusters(val){
    this.setState({clusters:val})
  }

  optionsBySelectChapters(val){
    this.setState({chapters:val})
  }

  optionsBySelectSubChapters(val){
    this.setState({subChapters:val})
  }


  switchTab(){
    console.log("switch tab")
    //this.setState({subChapters:val})
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
      data:fetchCommunityDefinition{label:name,value:code}
    }
    `;
    let fetchUsers = gql`query{
      data:FetchUserType {label:userTypeName,value:_id}
    }
    `;
    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
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
                      default={true}
                    >
                      <div className="panel panel-default">
                        <div className="panel-heading">Test</div>
                        <div className="panel-body">
                          <div className="form-group">
                            <Select name="form-field-name"value="select"  className="float-label"/>
                          </div>
                          <div className="form-group">
                            <Select name="form-field-name"value="select" className="float-label"/>
                          </div>
                          <div className="form-group">
                            <Select name="form-field-name"value="select"  className="float-label"/>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">Internal Subchapter Access</div>
                        <div className="panel-body">
                          <div className="ml_tabs">
                            <ul  className="nav nav-pills">
                              {that.state.steps.map(function(options,id) {
                                return(
                                  <li className="active">
                                    <a  href={options.href} data-toggle="tab" >{options.stepName} </a>
                                  </li>
                                )})}
                            </ul>

                            <div className="tab-content clearfix">

                            {that.state.templateInfo.map(function(options,id) {
                              return(
                                    <div className="tab-pane active" id="#1">
                                    <div className="list-group nomargin-bottom">
                                    <a className="list-group-item">{options.templateName}
                                      <FontAwesome className="btn btn-xs btn-mlBlue pull-right" name='eye'/>
                                    </a>
                                    </div>
                                    </div>
                              )})}

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

export default MlAssignTemplate = formHandler()(MlAssignTemplate);
