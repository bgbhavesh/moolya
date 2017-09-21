import React from 'react';
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import {putDataIntoTheLibrary} from '../../../../../../commons/actions/mlLibraryActionHandler'
import {fetchInstitutionPortfolioData} from '../../../actions/findPortfolioInstitutionDetails'
import ScrollArea from "react-scrollbar";


export default class MlInstitutionEditData extends React.Component{
  constructor(props){
    super(props);
    this.state={uploadedData: {balanceSheet : [],profitAndLoss:[],quaterlyReport:[],yearlyReport:[],halfYearlyReport:[],annualReport:[],cashFlow:[],
      shareHoldings:[],ratio:[],capitalStructure:[]}};
    this.loopingTheUploadedData.bind(this)
    this.fetchInstitutionPortfolioData.bind(this)
    this.libraryAction = this.libraryAction.bind(this);

  }


  async fetchInstitutionPortfolioData(){
    const resp = await fetchInstitutionPortfolioData(this.props.portfolioDetailsId,this.props.client)
    this.setState({
      uploadedData: resp
    });
  }
  componentWillMount() {
    let portfolioId = FlowRouter.getRouteName();
    let path = FlowRouter.current().path
    if (path.indexOf("view") > 0) {
      this.setState({explore: false})
    }
    if (portfolioId !== "portfolio" || path.indexOf("view") > 0) {
      this.setState({explore: true})
    }
    if (portfolioId !== "portfolio" || path.indexOf("edit") > 0) {
      this.setState({deleteOption: true, isEndUserEdit : true})
    }
    if (portfolioId === "library") {
      this.setState({explore: false, isLibrary: true, hideLock: true, deleteOption: false})
    }
    if (portfolioId === "transaction_portfolio_EditRequests") {
      this.setState({explore: false, isAdminEdit: true})
      this.setState({hideLock: true})
    }
    this.fetchInstitutionPortfolioData()
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
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    var className = this.props.isAdmin ? "admin_header" : "app_header"
    // $('.main_wrap_scroll').height(WinHeight-($('.admin_header').outerHeight(true)+120));
    $('.main_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+120));
    if(WinWidth > 768){
      $(".main_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  /**
   * File upload based on type from different tabs
   * */
  documentUpload(type, e) {
    let file = e.target.files[0];
    let updatedData = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {data: {[type]: [{fileUrl: '', fileName: file.name}]}}
    }
    multipartASyncFormHandler(updatedData, file, 'registration', this.onFileUploadCallBack.bind(this, type, file));
  }

  onFileUploadCallBack(type, file, resp) {
    if (resp && type) {
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if (userOption) {
        let fileObjectStructure = {
          fileName: file.name,
          fileType: file.type,
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure);
      }
      this.fetchInstitutionPortfolioData();
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  loopingTheUploadedData(type) {
    let data = this.state.uploadedData[`${type}`];
    switch(type){
      case 'balanceSheet':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'profitAndLoss':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'quaterlyReport':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'yearlyReport':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'halfYearlyReport':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'annualReport':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'cashFlow':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'shareHoldings':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'capitalStructure':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
      case 'ratio':
        if(data) {
          const display = data.map(function(docs, id){
            return(
              <div className="thumbnail" key={id}>
                <img src={docs.fileUrl} style={{'width':'100px'}} />
                <div id="images" className="title">{docs.fileName}</div>
              </div>
            )
          })
          return display;
        }
        break;
    }
  }

  render(){
    return (
      <div>
        <div className="portfolio-main-wrap">
          <h2>Data</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}>
            <div className="col-md-6 col-sm-6 nopadding-left">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Balance Sheet
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'balanceSheet' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('balanceSheet')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Quaterly Report
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit ?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'quaterlyReport' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('quaterlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Yearly Report
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'yearlyReport' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('yearlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Half Yearly Report
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'halfYearlyReport' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('halfYearlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Annual Report
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'annualReport' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('annualReport')}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 nopadding-right">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Profit and Loss
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'profitAndLoss' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" >
                  {this.loopingTheUploadedData('profitAndLoss')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Cash Flow
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'cashFlow' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('cashFlow')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Share Holdings
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'shareHoldings' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('shareHoldings')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Capital Structure
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'capitalStructure' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('capitalStructure')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">
                  Ratio
                  {this.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit || this.state.isEndUserEdit?<div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'ratio' )} /></span></a>
                  </div>:""}
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('ratio')}
                </div>
              </div>
            </div>
              </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
