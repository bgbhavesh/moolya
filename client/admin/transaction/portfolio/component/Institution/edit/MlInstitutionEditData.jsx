import React from 'react';
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import {fetchInstitutionPortfolioData} from '../../../actions/findPortfolioInstitutionDetails'


export default class MlInstitutionEditData extends React.Component{
  constructor(props){
    super(props);
    this.state={uploadedData: {}};
    this.loopingTheUploadedData.bind(this)
  }

  async componentWillMount() {
    const resp = await fetchInstitutionPortfolioData(this.props.portfolioDetailsId,this.props.client)
    this.setState({
      uploadedData: resp
    });
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
    this.setState({uploadType: type})
    let file = e.target.files[0];
    this.setState({fileType:file.type,fileName:file.name });
    let fileType = file.type
    let typeShouldBe = _.compact(fileType.split('/'));
    // if (file  && typeShouldBe && typeShouldBe[1]==="pdf" && typeShouldBe[1]==="image") {
    let data = {moduleName: "PROFILE", actionName: "UPDATE"}
    let response =  multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,type, file));
    // }else{
    //   toastr.error("Please select a Document Format")
    // }
  }


  onFileUploadCallBack(type, file, resp) {
    let that = this;
    let data = this.state.uploadedData;
    if (resp && type) {
      var link = $.parseJSON(resp).result;
      if( data && data[`${type}`] ) {
        data[`${type}`].push({fileUrl:link,fileName:file.name})
      }else {
        let tempArray = [];
        tempArray.push({fileUrl:link,fileName:file.name})
        data[`${type}`] = tempArray;
      }
      this.setState({uploadedData: data}, function(){
        that.props.getDataDetails(this.state.uploadedData, 'data')
      });
    }
  }

  loopingTheUploadedData(type) {
    let data = this.state.uploadedData[`${type}`];
    switch(type){
      case 'balanceSheet':
        if(data) {
          const display = data.map(function(docs){
            return(
              <div className="thumbnail">
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
            <div className="col-md-6 col-sm-6 nopadding-left">
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
            <div className="col-md-6 col-sm-6 nopadding-right">
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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
              <div className="panel panel-default">
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