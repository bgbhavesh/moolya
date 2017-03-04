
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

let Select = require('react-select');

class MlEditDocumentMapping extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:{},
      clusters: [{id:''}],
      chapters:[{id:''}],
      subChapters:[{id:''}],
      allowableFormat:[{id:''}],
      isActive:false,
      documentId   : '',
      displayName  : '',
      validity    : '',
      length      : '',
      remark      : '',
      documentName   : '',
      kycCategory  : [{id:''}],
      documentType   : [{id:''}],
      allowableSize  : '',
      issuingAuthority   : '',
    }
    // this.addEventHandler.bind(this);
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
        let documentTypeId = this.state.data.documentType[0].id;
        this.setState({documentType: [{id: documentTypeId}]});
      }
      if (this.state.data.kycCategory) {
        let kycCategoryId = this.state.data.kycCategory[0].id;
        this.setState({kycCategory: [{id: kycCategoryId}]});
      }
      if (this.state.data.allowableFormat) {
        let allowableFormatId = this.state.data.allowableFormat[0].id;
        this.setState({allowableFormat: [{id: allowableFormatId}]});
      }
      if (this.state.data.clusters) {
        let clustersId = this.state.data.clusters[0].id;
        this.setState({clusters: [{id: clustersId}]});
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
    let allowableFormat=this.state.allowableFormat
    allowableFormat[0]['id']=val;
    this.setState({allowableFormat:allowableFormat})
  }

  optionsBySelectDocumentType(val){
    let documentType=this.state.documentType
    documentType[0]['id']=val;
    this.setState({documentType:documentType})
  }

  optionsByKycCategories(val){
    let kycCategory=this.state.kycCategory
    kycCategory[0]['id']=val;
    this.setState({kycCategory:kycCategory})
  }

  optionsBySelectClusters(val){
    let clusters=this.state.clusters
    clusters[0]['id']=val;
    this.setState({clusters:clusters})
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

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
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
        actionName: 'logout',
        handler: null
      }
    ]

    let query=gql` query{
    data:fetchCountriesSearch{label:country,value:countryCode}
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

    let chapterOption={options: { variables: {id:this.state.clusters[0].id}}};
    let subChapterOption={options: { variables: {id:this.state.chapters[0].id}}};
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
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

                        <div className="form-group">
                          <Moolyaselect multiSelect={true}  placeholder={"Allowable Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.allowableFormat[0].id} queryType={"graphql"} query={documentFormatquery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectAllowableFormats.bind(this)} />
                        </div>
                        <div className="panel panel-default">
                          <div className="panel-heading">Jurisdiction</div>
                          <div className="panel-body">

                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters[0].id} queryType={"graphql"} query={clusterquery} isDynamic={true} id={'clusterquery'} onSelect={this.optionsBySelectClusters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters[0].id} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <Moolyaselect multiSelect={true}  placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters[0].id} queryType={"graphql"} query={subChapterquery}  queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)} />
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="validity" defaultValue={this.state.data&&this.state.data.validity} placeholder="Validity" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="length" defaultValue={this.state.data&&this.state.data.inputLength} placeholder="Length" className="form-control float-label" id=""/>
                            </div>
                            <div className="form-group">
                              <input type="text"  ref="remark" defaultValue={this.state.data&&this.state.data.remark} placeholder="Remark" className="form-control float-label" id=""/>
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
                        <br className="brclear"/>


                      </form>
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="col-md-6 nopadding-right"  >
                <div className="form-group">
                  <input type="text"  ref="documentName" defaultValue={this.state.data&&this.state.data.documentName} placeholder="Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"KYC Categories"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycCategory[0].id} queryType={"graphql"} query={kycCategoryquery}  isDynamic={true} id={'query'} onSelect={this.optionsByKycCategories.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Type of Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.documentType[0].id} queryType={"graphql"} query={documentTypequery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectDocumentType.bind(this)} />
                </div>
                <div className="form-group">
                  <input type="text"  ref="allowableSize" defaultValue={this.state.data&&this.state.data.allowableMaxSize} placeholder="Allowable Size" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text"  ref="issuingAuthority" defaultValue={this.state.data&&this.state.data.issuingAuthority} placeholder="Issuing Authority" className="form-control float-label" id=""/>
                </div>
              </div>

              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

            </div>


          </div>)}
      </div>
    )
  }
};
export default MlEditDocumentMapping = formHandler()(MlEditDocumentMapping);

