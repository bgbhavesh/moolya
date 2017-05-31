import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {createRequestsActionHandler} from '../actions/createRequests'

export default class CreateRequestComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      show:true,
      requestType:null,
      cluster:null,
      chapter:null,
      subChapter:null,
      community:null
    };
    return this;
  }

  componentWillReceiveProps(newProps){
    let popup=newProps.openPopUp
    if(popup){
      this.setState({show:true})
    }
  }
  async  optionsBySelectRequestType(value){
    this.setState({requestTypeId:value})
    //   console.log(this.state.requestType)
  }
  async createRequest(){
    let requests={
      requestTypeId:this.state.requestTypeId,
      requestDescription:this.refs.about.value,
      cluster:this.state.cluster,
      chapter:this.state.chapter,
      subChapter:this.state.subChapter,
      community:this.state.community,
      communityName: " ",
      requestsStatus:{
        code: "1",
        description:"requested"
      },
      userId:Meteor.userId(),
      requestId: " ",
      status:"Pending",
      transactionCreatedDate: new Date()
    }
    const response = await createRequestsActionHandler(requests);
    if(response.success){
      this.props.refreshList();
      this.setState({show:false,requestType:null})
      // this.toggle();
      // this.findRequestDetails();
      toastr.success("Request is created successfully");
      FlowRouter.go("/admin/transactions/requestedList");

    }else{
      this.setState({show:false,requestType:null})
      toastr.error(response.result);
      // this.toggle();
      this.setState({requestType:null})
      FlowRouter.go("/admin/transactions/requestedList");
    }

  }

  optionsBySelectCluster(index, selectedIndex){
    this.setState({cluster:index})
  }

  optionsBySelectChapter(index, selectedIndex){
    this.setState({chapter:index})
  }

  optionsBySelectSubChapter(index, selectedIndex){
    this.setState({subChapter:index})
  }

  optionsBySelectCommunity(index, selectedIndex){
    this.setState({community:index})
  }

  cancel(){
    //this.state.show = false
    this.setState({show:false})
    FlowRouter.go("/admin/transactions/requestedList");/*/transactions/registrationRequested");*/
  }

  render() {
    let requestTypeQuery=gql`query{
      data:FetchRequestType {
        label:requestName
        value:_id
      }
    }`;
   /* let clusterquery=gql`query{ data:fetchActiveClusters{label:countryName,value:_id}}`;

    let chapterquery=gql`query($id:String){
    data:fetchChapters(id:$id) {
        value:_id,
        label:chapterName
      }
    }`;*/

    let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`;

    /*let subChapterquery=gql`query($chapterId:String,$clusterId:String){
        data:fetchSubChaptersSelectMoolya(chapterId:$chapterId,clusterId:$clusterId) {
          value:_id
          label:subChapterName
        }
    }`;*/
    let clusterQuery = gql`query{
     data:fetchContextClusters {
        value:_id
        label:countryName
      }
    }
    `;
    let chapterQuery = gql`query($id:String){  
      data:fetchContextChapters(id:$id) {
        value:_id
        label:chapterName
      }  
    }`;

    let subChapterQuery= gql`query($id:String){  
      data:fetchContextSubChapters(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;

    let communityQuery=gql`query($clusterId:String, $chapterId:String, $subChapterId:String){
      data:fetchCommunitiesForRolesSelect(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId) {
          value:code
          label:name
      }
    }`;
    let chapterOption={options: { variables: {id:this.state.cluster}}};
    let subChapterOption={options: { variables: {id:this.state.chapter}}}
   /* let chapterOption={options: { variables: {id:this.state.cluster}}};
    let subchapterOption={options: { variables: {chapterId:this.state.chapter,clusterId:this.state.cluster}}};*/
    let communityOption={options: { variables: {clusterId:this.state.cluster, chapterId:this.state.chapter, subChapterId:this.state.subChapter}}};

    return (
      <div className="popover-custom-class">
        {this.state.show==true?
          <div className="panel panel-default-bottom col-md-12">
            <div className="mrgn-btm">
              <label>Create Request</label>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Request type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.requestTypeId} queryType={"graphql"} query={requestTypeQuery} onSelect={this.optionsBySelectRequestType.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true} id={'country'} onSelect={this.optionsBySelectCluster.bind(this)} />
            </div>

            <div className="form-group">
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery}  isDynamic={true} id={'chapter'} reExecuteQuery={true} queryOptions={chapterOption} onSelect={this.optionsBySelectChapter.bind(this)} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select SubChapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapter} queryType={"graphql"} query={subChapterQuery}  isDynamic={true} id={'subChapter'} reExecuteQuery={true} queryOptions={subChapterOption} onSelect={this.optionsBySelectSubChapter.bind(this)} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.community} queryType={"graphql"} query={communityQuery}  isDynamic={true} id={'community'} reExecuteQuery={true} queryOptions={communityOption} onSelect={this.optionsBySelectCommunity.bind(this)} />
              </div>
            </div>
            <div className="assign-popup">
              <a data-toggle="tooltip" title="Submit" data-placement="top" onClick={this.createRequest.bind(this)} className="hex_btn hex_btn_in">
                <span className="ml ml-save"></span>
              </a>
              <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in" onClick={this.cancel.bind(this)}>
                <span className="ml ml-delete"></span>
              </a>
            </div>

          </div>
          :<div></div>}
      </div>

    )
  }
}
