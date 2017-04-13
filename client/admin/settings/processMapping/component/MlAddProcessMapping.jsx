
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {addProcessActionHandler} from '../actions/addProcessAction'
import {updateProcessActionHandler} from '../actions/updateProcessMappingAction'
import MlAssignDocument from './MlAssignDocument'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

let Select = require('react-select');

class MlAddProcessMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      assignDocument:[],
      process     : '',
      communities : [],
      userTypes   : [],
      identity    : '',
      industries  : [],
      professions : [],
      clusters    : [],
      states      : [],
      chapters    : [],
      subChapters : [],
      isActive    : ''
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
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/processList");
      else
        toastr.error(response.result);
    }
  };

  getassignDocuments(details){
    this.setState({'assignDocuments':details})
  }

  async findDepartment(){
    let processId=this.props.config
    const response = await findProcessActionHandler(processId);
    this.setState({loading:false,data:response});
  }


  onSubmit(){
    console.log(this.state.assignDocuments)
  }

  async  createProcess() {
    let processDetails = {
      processId   : this.refs.processId.value,
      process     : this.state.process,
      communities : this.state.communities,
      userTypes   : this.state.userTypes,
      identity    : this.state.identity,
      industries  : this.state.industries,
      professions : this.state.professions,
      clusters    : this.state.clusters,
      states      : this.state.states,
      chapters    : this.state.chapters,
      subChapters : this.state.subChapters,
      isActive    : this.refs.status.checked,
      documents   : this.state.assignDocument
    }
    const response = await addProcessActionHandler(processDetails)
    return response;
  }
  getAssignedDocuments(departments){
    this.setState({'assignDocument':departments})
  }

  optionsBySelectProcess(val){
    this.setState({process:val})
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

  optionsBySelectIndustries(val){
    this.setState({industries:val})
  }

    optionsBySelectProfessions(val){
      this.setState({professions:val})
  }

  optionsBySelectClusters(val){
    this.setState({clusters:val})
  }

  optionsBySelectStates(val){
    this.setState({states:val})
  }

  optionsBySelectChapters(val){
    this.setState({chapters:val})
  }

  optionsBySelectSubChapters(val){
    this.setState({subChapters:val})
  }

  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createProcess.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/processList")
        }
      }
    ]
    let IdentityOptions = [
      {value: 'Company', label: 'Company'},
      {value: 'Individual', label: 'Individual'}
    ];
    let query=gql` query{
    data:fetchCountriesSearch{label:country,value:countryCode}
    }
`;
    let processQuery=gql`query{
 data: FetchProcessType {
    label:processName
		value:_id
  }
}
`;
    let fetchcommunities = gql` query{
  data:fetchCommunityDefinitionForSelect{label:name,value:code}
}
`;
 /*   let fetchUsers = gql`query{
  data:FetchUserType {
    label:userTypeName
    value:_id
  }
}
`;*/
    let fetchUsers = gql` query($communityId:[String]){  
    data:FetchUserTypeForMultiSelect(communityId:$communityId) {
      value:_id
      label:userTypeName
  }  }
    `;
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
`;
    let professionquery=gql` query($industry:[String]!){
    data:FetchProfessionIndustry(industry:$industry){label:professionName,value:_id}
    }
`;
    let clusterquery=gql`  query{
  data:fetchActiveClusters{label:countryName,value:_id}
}`;
    let statesQuery=gql`query($clusters:[String]){  
        data:FetchActiveStatesForCluster(clusters:$clusters) {
          value:_id
          label:name
        }  
    }`;
    let chapterquery=gql`query($states:[String],$clusters:[String]){  
        data:fetchActiveStatesChapters(states:$states,clusters:$clusters) {
          value:_id
          label:chapterName
        }  
    }`;
    let subChapterquery=gql`query($chapters:[String],$clusters:[String]){  
        data:fetchActiveChaptersSubChapters(chapters:$chapters,clusters:$clusters) {
          value:_id
          label:subChapterName
        }  
    }`;
    let stateOption={options: { variables: {clusters:this.state.clusters}}};
    let chapterOption={options: { variables: {states:this.state.states,clusters:this.state.clusters}}};
    let subChapterOption={options: { variables: {chapters:this.state.chapters,clusters:this.state.clusters}}};
    let professionOption={options: { variables: {industry:this.state.industries}}};
    let userTypeOption={options: { variables: {communityId:this.state.communities}}};
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
                      <input type="text"  ref="processId" placeholder="Process Id" className="form-control float-label"/>
                    </div>
                   <Moolyaselect multiSelect={false} placeholder={"Process"} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.process} queryType={"graphql"} query={processQuery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectProcess.bind(this)} />

                    <Moolyaselect multiSelect={true}  placeholder={"Communities"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.communities} queryType={"graphql"} query={fetchcommunities}  isDynamic={true} id={'fetchcommunities'} onSelect={this.optionsBySelectCommunities.bind(this)} />
                    <Moolyaselect multiSelect={true}  placeholder={"User Types"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.userTypes} queryType={"graphql"} query={fetchUsers} queryOptions={userTypeOption} isDynamic={true} id={'fetchuserTypes'} onSelect={this.optionsBySelectUserType.bind(this)} />
                    <div className="form-group">
                      <Select name="form-field-name"  placeholder={"Identity"}  className="float-label"  options={IdentityOptions}  value={this.state.identity}  onChange={this.optionsBySelectIdentity.bind(this)}/>
                    </div>


                      <Moolyaselect multiSelect={true}  placeholder={"Industries"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.industries} queryType={"graphql"} query={industriesquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectIndustries.bind(this)} />



                      <Moolyaselect multiSelect={true}  placeholder={"Profession"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.professions} queryType={"graphql"} query={professionquery} queryOptions={professionOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectProfessions.bind(this)} />



                      <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'} onSelect={this.optionsBySelectClusters.bind(this)} />



                      <Moolyaselect multiSelect={true}  placeholder={"State"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.states} queryType={"graphql"} query={statesQuery}  queryOptions={stateOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectStates.bind(this)} />



                      <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />

                      <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />


                    <div className="form-group switch_wrap inline_switch">
                      <label className="">Over All Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="status"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right"  >
            <div className="form_bg" >
              <div className="left_wrap">

                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <form style={{marginTop:'5px'}}>
                      <MlAssignDocument getAssignedDocuments={this.getAssignedDocuments.bind(this)} clusterId={this.state.clusters} chapterId={this.state.chapters} subChapterId={this.state.subChapters}/>
                  </form>
                </ScrollArea>
              </div>
            </div>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>
      </div>
    )
  }
};
export default MlAddProcessMapping = formHandler()(MlAddProcessMapping);

