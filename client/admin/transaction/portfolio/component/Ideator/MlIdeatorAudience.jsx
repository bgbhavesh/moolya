import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorAudienceActionHandler} from '../../actions/findPortfolioIdeatorDetails'

export default class MlIdeatorAudience extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this)
    this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  componentDidMount()
  {
    OnLockSwitch();
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
    dataVisibilityHandler();
  }

  onClick(field,e){
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
    this.props.getAudience(this.state.data)
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findIdeatorAudienceActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, data: response});
    }
  }

  render(){
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div className="requested_input">
        <h2>Audience</h2>
        <div className="col-lg-12">
          <div className="row">
            <div className="panel panel-default panel-form">
              <div className="panel-heading">
                Object
              </div>
              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={this.state.data.description} name="description" onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAudiencePrivate" onClick={this.onClick.bind(this, "isAudiencePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" s/>
                </div>

              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onchange="loadFile(event)" multiple />
                  <label for="fileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
                <div className="upload-image"><img id="output"/></div>
                <div className="upload-image"></div>
                <div className="upload-image"></div>
              </div>
            </div>

          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
