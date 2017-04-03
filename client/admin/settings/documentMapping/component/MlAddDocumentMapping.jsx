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
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';

let Select = require('react-select');

class MlAddDocumentMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      clusters: [],
      chapters:[],
      subChapters:[],
      allowableFormat:[],
      isActive:false,
      documentId   : '',
      displayName  : '',
      validity    : '',
      length      : '',
      remark      : '',
      documentName   : '',
      kycCategory  : [],
      documentType   : [],
      allowableSize  : '',
      issuingAuthority   : '',
    }
    this.addEventHandler.bind(this);
    return this;
  }
  componentDidMount()
  {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
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
        FlowRouter.go("/admin/settings/documentMappingList");
      else
        toastr.error(response.result);
    }
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
      documentId : this.refs.documentId.value,
      documentDisplayName  : this.refs.displayName.value,
      allowableFormat : this.state.allowableFormat,
      clusters    : this.state.clusters,
      chapters    : this.state.chapters,
      subChapters : this.state.subChapters,
      validity    : this.refs.validity.value,
      inputLength      : this.refs.length.value,
      remarks      : this.refs.remark.value,
      documentName   : this.refs.documentName.value,
      kycCategory  : this.state.kycCategory,
      documentType   : this.state.documentType,
      allowableMaxSize  : this.refs.allowableSize.value,
      issuingAuthority   : this.refs.issuingAuthority.value,
      isActive    : this.refs.status.checked,
    }
    const response = await addDocumentMappingActionHandler(documentDetails)
    return response;
  }

  optionsBySelectAllowableFormats(val){
   /* let allowableFormat=this.state.allowableFormat
    allowableFormat[0]['id']=val;*/
    this.setState({allowableFormat:val})
  }

  optionsBySelectDocumentType(val){
   /* let documentType=this.state.documentType
    documentType[0]['id']=val;*/
    this.setState({documentType:val})
  }

  optionsByKycCategories(val){
    /*let kycCategory=this.state.kycCategory
    kycCategory[0]['id']=val;*/
    this.setState({kycCategory:val})
  }

  optionsBySelectClusters(val){
   /* let clusters=this.state.clusters
    clusters[0]['id']=val;*/
    this.setState({clusters:val})
  }

  optionsBySelectChapters(val){
   /* let chapters=this.state.chapters
    chapters[0]['id']=val;*/
    this.setState({chapters:val})
  }

  optionsBySelectSubChapters(val){
    /*let subChapters=this.state.subChapters
    subChapters[0]['id']=val;*/
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
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createDocument.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    // let cluster=gql`query{data:fetchClustersForMap{label:displayName,value:_id}}`;

    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery=gql`query($clusters:[String]){  
        data:fetchActiveClusterChapters(clusters:$clusters) {
          value:_id
          label:chapterName
        }  
    }`;
    let subChapterquery=gql`query($chapters:[String]){  
        data:fetchActiveChaptersSubChapters(chapters:$chapters) {
          value:_id
          label:subChapterName
        }  
    }`;
    let kycCategoryquery=gql`query{  
  data:fetchKYCCategories{
    value:_id
    label:docCategoryName
  }  
}`;
    let documentTypequery=gql`query{  
  data:fetchDocumentsType{
    value:_id
    label:docTypeName
  }  
}`;
    let documentFormatquery=gql`query{  
  data:fetchDocumentsFormat{
    value:_id
    label:docFormatName
  }  
}`;

    let chapterOption={options: { variables: {clusters:this.state.clusters}}};
    let subChapterOption={options: { variables: {chapters:this.state.chapters}}};

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


                      <Moolyaselect multiSelect={true}  placeholder={"Allowable Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.allowableFormat} queryType={"graphql"} query={documentFormatquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectAllowableFormats.bind(this)} />

                    <div className="panel panel-default">
                      <div className="panel-heading">Jurisdiction</div>
                      <div className="panel-body">


                          <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectClusters.bind(this)} />


                          <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />


                          <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />

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


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right"  >
            <div className="form_bg">
              <form>
            <div className="form-group">
              <input type="text"  ref="documentName" placeholder="Name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true}  placeholder={"KYC Categories"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycCategory} queryType={"graphql"} query={kycCategoryquery}  isDynamic={true} id={'query'} onSelect={this.optionsByKycCategories.bind(this)} />
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true}  placeholder={"Type of Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.documentType} queryType={"graphql"} query={documentTypequery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectDocumentType.bind(this)} />
            </div>
            <div className="form-group">
              <input type="text"  ref="allowableSize" placeholder="Allowable Size" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text"  ref="issuingAuthority" placeholder="Issuing Authority" className="form-control float-label" id=""/>
            </div>
              </form>
            </div>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
};
export default MlAddDocumentMapping = formHandler()(MlAddDocumentMapping);

