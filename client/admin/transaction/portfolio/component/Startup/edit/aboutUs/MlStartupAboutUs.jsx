import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {fetchDetailsStartupActionHandler} from "../../../../actions/findPortfolioStartupDetails";
import {multipartASyncFormHandler} from "../../../../../../../commons/MlMultipartFormAction";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../utils/formElemUtil";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

export default class MlStartupAboutUs extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:this.props.aboutUsDetails || {},
    }

    this.handleBlur.bind(this);

    return this;

  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.aboutUs)
    if(!empty){
      this.setState({loading: false, data: this.context.startupPortfolio.aboutUs});
    }
  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getStartupAboutUs(data)
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{aboutUs:{logo:[{fileUrl:'', fileName : fileName}]}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.fetchOnlyImages();
      }
    }
  }

  async fetchOnlyImages() {
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let dataDetails = this.state.data
      dataDetails['logo'] = response.aboutUs.logo
      this.setState({loading: false, data: dataDetails});
    }
  }
  onLockChange(field, e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }


  render(){
    const aboutUsImages = (this.state.data.logo&&this.state.data.logo.map(function (m, id) {
      return (
        <div className="upload-image" key={id}>
          <img id="output" src={m.fileUrl}/>
        </div>
      )
    }));

    return(
      <div className="requested_input">
        <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true} >
        <div className="col-lg-12">
          <div className="row">
            <h2>
              About Us
            </h2>
            <div className="panel panel-default panel-form">
              <div className="panel-body">
                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control"  name="description" id="description" defaultValue={this.state.data&&this.state.data.description} onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/>
                </div>

              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="logo" id="logoFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} multiple />
                  <label htmlFor="logoFileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
                {aboutUsImages}
              </div>
            </div>

          </div> </div>
        </ScrollArea>
      </div>
    )
  }
}
MlStartupAboutUs.contextTypes = {
  startupPortfolio: PropTypes.object,
};
