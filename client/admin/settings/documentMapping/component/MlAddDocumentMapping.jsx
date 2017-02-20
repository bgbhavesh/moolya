import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {addDocumentMappingActionHandler} from '../actions/addDocumentMappingAction'
// import MlAssignDocument from './MlAssignDocument'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

let Select = require('react-select');

class MlAddDocumentMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      clusters: [],
      chapters:[],
      subChapters:[],
      isActive:false,
      documentId   : '',
      displayName  : '',
      validity    : '',
      length      : '',
      remark      : '',
      documentName   : '',
      kycCategories  : [],
      documentType   : [],
      allowableSize  : [],
      issuingAuthority   : [],
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

    FlowRouter.go("/admin/settings/documentMappingList");
  };

  // getassignDocuments(details){
  //   console.log("details->"+details);
  //   this.setState({'assignDocuments':details})
  // }
  //
  //
  // onSubmit(){
  //   console.log(this.state.assignDocuments)
  // }

  async  createDocument() {
    let documentDetails = {

      documentDisplayName  : this.refs.displayName.value,
      allowableFormat : this.state.allowableFormats,
      clusters    : this.state.clusters,
      chapters    : this.state.chapters,
      subChapters : this.state.subChapters,
      validity    : this.refs.validity.value,
      inputLength      : this.refs.length.value,
      remarks      : this.refs.remark.value,
      documentName   : this.refs.documentName.value,
      kycCategory  : this.state.kycCategories,
      documentType   : this.state.documentType,
      allowableMaxSize  : this.refs.allowableSize.value,
      issuingAuthority   : this.refs.issuingAuthority.value,
      isActive    : this.refs.status.checked,
    }
    // console.log(processDetails)
    const response = await addDocumentMappingActionHandler(documentDetails)
    return response;
  }
  // getassignDocumentToClusters(details){
  //   console.log("details->"+details);
  //   this.setState({'assignDocumentToClusters':details})
  // }
  // AssignassignDocumentToClusters(id){
  //   this.setState({
  //     assignDocumentToClusters: this.state.assignDocumentToClusters.concat([{cluster: '',chapter:'',subChapter:'',isActive:false }])
  //   });
  // }
  //
  // RemoveAssignassignDocumentToClusters(id,event){
  //   let assignRoleToClusters;
  //   assignDocumentToClusters= this.state.assignDocumentToClusters.filter(function(object,index){
  //     return id !== index;
  //   });
  //   this.setState({
  //     assignDocumentToClusters: assignDocumentToClusters
  //   })
  // }
  // optionsBySelectCluster(index, selectedIndex){
  //   let availabilityDetails=this.state.assignDocumentToClusters
  //   availabilityDetails[index]['cluster']=selectedIndex
  //   this.setState({assignDocumentToClusters:availabilityDetails})
  //   this.props.getassignDocumentToClusters(this.state.assignDocumentToClusters)
  // }
  //
  // optionsBySelectChapter(index, selectedIndex){
  //   let availabilityDetails=this.state.assignDocumentToClusters
  //   availabilityDetails[index]['chapter']=selectedIndex
  //   this.setState({assignDocumentToClusters:availabilityDetails})
  //   this.props.getassignDocumentToClusters(this.state.assignDocumentToClusters)
  // }
  //
  // optionsBySelectSubChapter(index, selectedIndex){
  //   let availabilityDetails=this.state.assignDocumentToClusters
  //   availabilityDetails[index]['subChapter']=selectedIndex
  //   this.setState({assignDocumentToClusters:availabilityDetails})
  //   this.props.getassignDocumentToClusters(this.state.assignDocumentToClusters)
  // }


  optionsBySelectAllowableFormats(val){
    this.setState({allowableFormats:val})
  }

  optionsBySelectDocumentType(val){
    this.setState({documentType:val})
  }

  optionsByKycCategories(val){
    this.setState({kycCategories:val})
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
        handler: async(event) => this.props.handler(this.createDocument.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let cluster=gql`query{data:fetchClustersForMap{label:displayName,value:_id}}`;

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Document</h2>
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
                      <input type="text"  ref="documentId" placeholder="Document Id" className="form-control float-label" id=""/>
                    </div>

                    <div className="form-group">
                      <input type="text"  ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                    </div>

                    <div className="form-group">
                      <Moolyaselect multiSelect={true}  placeholder={"Allowable Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.allowableFormats} queryType={"graphql"} query={cluster}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectAllowableFormats.bind(this)} />
                    </div>
                    <div className="panel panel-default">
                          <div className="panel-heading">Jurisdiction</div>
                          <div className="panel-body">

                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={cluster} isDynamic={true} id={'query'} onSelect={this.optionsBySelectClusters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={cluster} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={cluster}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="validity" placeholder="Validity" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="length" placeholder="Length" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="remark" placeholder="Remark" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group switch_wrap inline_switch">
                              <label className="">Status</label>
                              <label className="switch">
                                <input type="checkbox" ref="status"/>
                                <div className="slider"></div>
                              </label>
                            </div>
                          </div>
                    </div>
                    <br className="brclear"/>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right"  >
            <div className="form-group">
              <input type="text"  ref="documentName" placeholder="Name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true}  placeholder={"KYC Categories"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycCategories} queryType={"graphql"} query={cluster}  isDynamic={true} id={'query'} onSelect={this.optionsByKycCategories.bind(this)} />
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true}  placeholder={"Type of Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.documentType} queryType={"graphql"} query={cluster}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectDocumentType.bind(this)} />
            </div>
            <div className="form-group">
              <input type="text"  ref="allowableSize" placeholder="Allowable Size" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text"  ref="issuingAuthority" placeholder="Issuing Authority" className="form-control float-label" id=""/>
            </div>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
};
export default MlAddDocumentMapping = formHandler()(MlAddDocumentMapping);

