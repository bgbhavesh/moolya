import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import {putDataIntoTheLibrary,removePortfolioFileUrl} from '../../../../../../commons/actions/mlLibraryActionHandler'

import {fetchCompanyPortfolioData} from "../../../actions/findCompanyPortfolioDetails";


export default class MlCompanyData extends React.Component{
  constructor(props){
    super(props)
    this.state={uploadedData: {balanceSheet : [],profitAndLoss:[],quaterlyReport:[],yearlyReport:[],halfYearlyReport:[],annualReport:[],cashFlow:[],
      shareHoldings:[],ratio:[],capitalStructure:[]}};
    this.loopingTheUploadedData.bind(this)
    this.libraryAction = this.libraryAction.bind(this);

  }

  async componentWillMount() {
    this.fetchPortfolioData()
  }
  async fetchPortfolioData(){
    const resp = await fetchCompanyPortfolioData(this.props.portfolioDetailsId,this.props.client)
    this.setState({
      uploadedData: resp
    })
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
    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+120));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  documentUpload(type, e) {
    let file = e.target.files[0];
    let updatedData = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {data: {[type]: [{fileUrl: '', fileName: file.name}]}}
    }
    let response =  multipartASyncFormHandler(updatedData, file, 'registration', this.onFileUploadCallBack.bind(this,type, file));
    // }else{
    //   toastr.error("Please select a Document Format")
    // }
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
      this.fetchPortfolioData();
    }
  }
  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }
  async removeDataDocument(type,fileUrl){
    if(type && fileUrl){
      let portfolioDetailsId = this.props.portfolioDetailsId;
      const resp = await removePortfolioFileUrl(portfolioDetailsId , fileUrl, "data", type);
      this.fetchPortfolioData();
    }
  }
  loopingTheUploadedData(type) {
    let data = this.state.uploadedData[`${type}`];
    let that=this;
    switch(type){
      case 'balanceSheet':
        if(data) {
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
                <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"balanceSheet",docs.fileUrl)}/>
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
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
                <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"profitAndLoss",docs.fileUrl)}/>
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
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
                <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"quaterlyReport",docs.fileUrl)}/>
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
         const display = data.map(function(docs){
          return(
            <div className="thumbnail">
              <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"yearlyReport",docs.fileUrl)}/>
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
        const display = data.map(function(docs){
          return(
            <div className="thumbnail">
              <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"halfYearlyReport",docs.fileUrl)}/>
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
        const display = data.map(function(docs){
          return(
            <div className="thumbnail">
              <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"annualReport",docs.fileUrl)}/>
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
        const display = data.map(function(docs){
          return(
            <div className="thumbnail">
              <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"cashFlow",docs.fileUrl)}/>
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
        const display = data.map(function(docs){
          return(
            <div className="thumbnail">
              <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"shareHoldings",docs.fileUrl)}/>
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
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
                <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"capitalStructure",docs.fileUrl)}/>
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
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
                <FontAwesome className="fa fa-trash-o" onClick={that.removeDataDocument.bind(that,"ratio",docs.fileUrl)}/>
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
          <div className="tab_wrap_scroll">
            <div className="col-md-6 col-sm-6 nopadding-left library-wrap">
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Balance Sheet
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'balanceSheet' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('balanceSheet')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Quaterly Report
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'quaterlyReport' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('quaterlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Yearly Report
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'yearlyReport' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('yearlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Half Yearly Report
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'halfYearlyReport' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('halfYearlyReport')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Annual Report
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'annualReport' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('annualReport')}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 nopadding-right library-wrap">
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Profit and Loss
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'profitAndLoss' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" >
                  {this.loopingTheUploadedData('profitAndLoss')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Cash Flow
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'cashFlow' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('cashFlow')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Share Holdings
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'shareHoldings' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('shareHoldings')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Capital Structure
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'capitalStructure' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('capitalStructure')}
                </div>
              </div>
              <div className="panel panel-default panel-form-view uploaded_files">
                <div className="panel-heading">
                  Ratio
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={this.documentUpload.bind(this,'ratio' )} /></span></a>
                  </div>
                </div>
                <div className="panel-body" onContextMenu={(e)=>e.preventDefault()}>
                  {this.loopingTheUploadedData('ratio')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
