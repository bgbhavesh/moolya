
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {updateDocumentMappingActionHandler} from '../actions/updateDocumentMappingAction'
import {findDocumentMappingActionHandler} from '../actions/findDocumentMappingAction'
// import MlAssignDocument from './MlAssignDocument'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
let Select = require('react-select');

class MlEditDocumentMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:{},
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
    // this.addEventHandler.bind(this);
    return this;
  }
  componentDidMount()  {  }

  // async addEventHandler() {
  //   const resp=await this.createBackendUser();
  //   return resp;
  // }

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

  async findDocument(){
    let id=this.props.config
    const response = await findDocumentMappingActionHandler(id);

    if(response) {
      this.setState({loading:false,data:response});
      // this.setState({documentId: this.state.data.documentId});
      // this.setState({id: this.state.data._id});
      if (this.state.data.documentType) {
        let documentTypeId = this.state.data.documentType
        this.setState({documentType: documentTypeId});
      }
      if (this.state.data.kycCategory) {
        let kycCategoryId = this.state.data.kycCategory;
        this.setState({kycCategory: kycCategoryId});
      }
      if (this.state.data.allowableFormat) {
        let allowableFormatId = this.state.data.allowableFormat
        this.setState({allowableFormat: allowableFormatId});
      }
      if (this.state.data.clusters) {
        let clustersId = this.state.data.clusters;
        this.setState({clusters: clustersId});
      }
      if (this.state.data.chapters) {
        let chaptersId = this.state.data.chapters;
        this.setState({chapters: chaptersId});
      }
      if (this.state.data.subChapters) {
        let subChaptersId = this.state.data.subChapters;
        this.setState({subChapters: subChaptersId});
      }
    }
    this.setState({loading:false,data:response});

  }


  // onSubmit(){
  //   console.log(this.state.assignDocuments)
  // }

  componentWillMount() {
    const resp=this.findDocument();
    return resp;

  }
  async  updateDocument() {
    let Details = {
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
    let id   = this.refs.documentId.value;
    const response = await updateDocumentMappingActionHandler(id,Details)
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
  /*  let clusters=this.state.clusters
    clusters[0]['id']=val;*/
    this.setState({clusters:val})
  }

  optionsBySelectChapters(val){
   /* let chapters=this.state.chapters
    chapters[0]['id']=val;*/
    this.setState({chapters:val})
  }

  optionsBySelectSubChapters(val){
   /* let subChapters=this.state.subChapters
    subChapters[0]['id']=val;*/
    this.setState({subChapters:val})
  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }
  componentDidUpdate()
  {
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }
  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateDocument.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/documentMappingList")
        }
      }
    ]

    let query=gql` query{
    data:fetchCountriesSearch{label:country,value:countryCode}
    }
`;
    let clusterquery=gql`  query{
  data:fetchActiveClusters{label:countryName,value:_id}
}`;
    let chapterquery=gql`query($clusters:[String]){  
        data:fetchActiveClusterChapters(clusters:$clusters) {
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
    let subChapterOption={options: { variables: {chapters:this.state.chapters,clusters:this.state.clusters}}};

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Edit Document</h2>
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
                          <input type="text"  ref="documentId" defaultValue={this.state.data&&this.state.data.documentId} placeholder="Document Id" className="form-control float-label" id="" disabled="disabled"/>
                        </div>

                        <div className="form-group">
                          <input type="text"  ref="displayName" defaultValue={this.state.data&&this.state.data.documentDisplayName} placeholder="Display Name" className="form-control float-label" id=""/>
                        </div>


                          <Moolyaselect multiSelect={true}  placeholder={"Allowable Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.allowableFormat} queryType={"graphql"} query={documentFormatquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectAllowableFormats.bind(this)} />

                        <div className="panel panel-default">
                          <div className="panel-heading">Jurisdiction</div>
                          <div className="panel-body">


                              <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={clusterquery} isDynamic={true} id={'clusterquery'} onSelect={this.optionsBySelectClusters.bind(this)} />


                              <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />

                              <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={subChapterquery}  queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />

                            <div className="form-group">
                              <input type="text"  ref="validity" defaultValue={this.state.data&&this.state.data.validity} placeholder="Validity" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="length" defaultValue={this.state.data&&this.state.data.inputLength} placeholder="Length" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="remark" defaultValue={this.state.data&&this.state.data.remarks} placeholder="Remark" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group switch_wrap inline_switch">
                              <label className="">Status</label>
                              <label className="switch">
                                <input type="checkbox" ref="status" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
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
                  <input type="text"  ref="documentName" defaultValue={this.state.data&&this.state.data.documentName} placeholder="Name" className="form-control float-label" id=""/>
                </div>

                  <Moolyaselect multiSelect={true}  placeholder={"KYC Categories"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycCategory} queryType={"graphql"} query={kycCategoryquery}  isDynamic={true} id={'query'} onSelect={this.optionsByKycCategories.bind(this)} />

                  <Moolyaselect multiSelect={true}  placeholder={"Type of Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.documentType} queryType={"graphql"} query={documentTypequery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectDocumentType.bind(this)} />

                <div className="form-group">
                  <input type="text"  ref="allowableSize" defaultValue={this.state.data&&this.state.data.allowableMaxSize} placeholder="Allowable Size" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text"  ref="issuingAuthority" defaultValue={this.state.data&&this.state.data.issuingAuthority} placeholder="Issuing Authority" className="form-control float-label" id=""/>
                </div>
                  </form>
                </div>
              </div>

              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

            </div>


          )}
      </div>
    )
  }
};
export default MlEditDocumentMapping = formHandler()(MlEditDocumentMapping);

