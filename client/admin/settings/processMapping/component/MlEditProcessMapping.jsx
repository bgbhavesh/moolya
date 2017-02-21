
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {updateProcessActionHandler} from '../actions/updateProcessMappingAction'
import {findProcessActionHandler} from '../actions/findProcessAction'
import MlAssignDocument from './MlAssignDocument'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

let Select = require('react-select');

class MlEditProcessMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id          : '',
      processId   : '',
      assignDocument:[],
      process     : '',
      communities : [{id:''}],
      userTypes   : [{id:''}],
      identity    : '',
      industries  : [{id:''}],
      professions : [{id:''}],
      clusters    : [{id:''}],
      states      : [{id:''}],
      chapters    : [{id:''}],
      subChapters : [{id:''}],
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

    FlowRouter.go("/admin/settings/processList");
  };

  getassignDocuments(details){
    console.log("details->"+details);
    this.setState({'assignDocuments':details})
  }

  async findProcess(){
    let pid=this.props.config
    const response = await findProcessActionHandler(pid);

    if(response) {
      this.setState({loading: false, data: response});
      this.setState({processId: this.state.data.processId});
      this.setState({id: this.state.data._id});
      if (this.state.data.process) {
        this.setState({process: this.state.data.process});
      }
      if (this.state.data.communities) {
        let communityId = this.state.data.communities[0].id;
        this.setState({communities: [{id: communityId}]});
      }
      if (this.state.data.userTypes) {
        let userTypesId = this.state.data.userTypes[0].id;
        this.setState({userTypes: [{id: userTypesId}]});
      }
      if (this.state.data.industries) {
        let industriesId = this.state.data.industries[0].id;
        this.setState({industries: [{id: industriesId}]});
      }
      if (this.state.data.professions) {
        let professionsId = this.state.data.professions[0].id;
        this.setState({professions: [{id: professionsId}]});
      }
      if (this.state.data.clusters) {
        let clustersId = this.state.data.clusters[0].id;
        this.setState({clusters: [{id: clustersId}]});
      }
      if (this.state.data.states) {
        let statesId = this.state.data.states[0].id;
        this.setState({states: [{id: statesId}]});
      }
      if (this.state.data.chapters) {
        let chaptersId = this.state.data.chapters[0].id;
        this.setState({chapters: [{id: chaptersId}]});
      }
      if (this.state.data.subChapters) {
        let subChaptersId = this.state.data.subChapters[0].id;
        this.setState({subChapters: [{id: subChaptersId}]});
      }
    }
    this.setState({loading:false,data:response});

  }


  onSubmit(){
    console.log(this.state.assignDocuments)
  }

  componentWillMount() {
    const resp=this.findProcess();
    return resp;

  }
  async  updateProcess() {
    let processDetails = {
      processId   : this.state.processId,
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
     let id       = this.state.id;
     let process  = processDetails;
    console.log(processDetails)
    const response = await updateProcessActionHandler(id,process)
    return response;
  }
  getAssignedDocuments(departments){
    this.setState({'assignDocument':departments})
  }

  optionsBySelectProcess(val){
    this.setState({process:val})
  }

  optionsBySelectCommunities(val){
    let community=this.state.communities
    community[0]['id']=val;
    this.setState({communities:community})
  }

  optionsBySelectUserType(val){
    let userTypes=this.state.userTypes
    userTypes[0]['id']=val;
    this.setState({userTypes:userTypes})
  }

  optionsBySelectIdentity(val){
    this.setState({identity:val})
  }

  optionsBySelectIndustries(val){
    let industries=this.state.industries
    industries[0]['id']=val;
    this.setState({industries:industries})
  }

  optionsBySelectProfessions(val){
    let professions=this.state.professions
    professions[0]['id']=val;
    this.setState({professions:professions})
  }

  optionsBySelectClusters(val){
    let clusters=this.state.clusters
    clusters[0]['id']=val;
    this.setState({clusters:clusters})
  }

  optionsBySelectStates(val){
    let states=this.state.states
    states[0]['id']=val;
    this.setState({states:states})
  }

  optionsBySelectChapters(val){
    let chapters=this.state.chapters
    chapters[0]['id']=val;
    this.setState({chapters:chapters})
  }

  optionsBySelectSubChapters(val){
    let subChapters=this.state.subChapters
    subChapters[0]['id']=val;
    this.setState({subChapters:subChapters})
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
        handler: async(event) => this.props.handler(this.updateProcess.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
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
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
`;
    let professionquery=gql` query{
    data:fetchProfessions{label:professionName,value:_id}
    }
`;
    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery=gql`query($id:String){  
  data:fetchChapters(id:$id) {
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

    let chapterOption={options: { variables: {id:this.state.clusters}}};
    let subChapterOption={options: { variables: {id:this.state.chapters}}};
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
                      <input type="text"   readOnly="true" defaultValue={this.state.processId} placeholder="process Id" className="form-control float-label" id=""/>
                    </div>


                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder={"process"} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.process} queryType={"graphql"} query={query}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectProcess.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Community"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.communities[0].id} queryType={"graphql"} query={query}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectCommunities.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"UserType"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.userTypes[0].id} queryType={"graphql"} query={query}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectUserType.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Select name="form-field-name"  placeholder={"Identity"}  className="float-label"  options={IdentityOptions}  value={this.state.identity}  onChange={this.optionsBySelectIdentity.bind(this)}/>
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Industries"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.industries[0].id} queryType={"graphql"} query={industriesquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectIndustries.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Profession"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.professions[0].id} queryType={"graphql"} query={professionquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectProfessions.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters[0].id} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'} onSelect={this.optionsBySelectClusters.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"State"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.states[0].id} queryType={"graphql"} query={query}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectStates.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters[0].id} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters[0].id} queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />
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
export default MlEditProcessMapping = formHandler()(MlEditProcessMapping);

