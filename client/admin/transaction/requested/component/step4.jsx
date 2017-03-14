import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class Step4 extends React.Component{
componentDidMount()
  { 
  	var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step2"> 
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
<div className="col-md-6 nopadding-left">
          <div className="form_bg">
              <form>
            <div className="form-group">
              <input type="text" placeholder="LinkedIn" className="form-control float-label" id=""/> 
              <FontAwesome name="linkedin-square" className="password_icon"/>       
            </div> 
            <div className="form-group">
              <input type="text" placeholder="Facebook" className="form-control float-label" id=""/> 
              <FontAwesome name="facebook-square" className="password_icon"/>       
            </div>
            <div className="form-group">
              <input type="text" placeholder="twitter" className="form-control float-label" id=""/> 
              <FontAwesome name="twitter-square" className="password_icon"/>        
            </div>
            <div className="form-group">
              <input type="text" placeholder="Youtube" className="form-control float-label" id=""/>  
              <FontAwesome name="youtube-square" className="password_icon"/>      
            </div>
            <div className="form-group">
              <input type="text" placeholder="Google plus" className="form-control float-label" id=""/>  
              <FontAwesome name="google-plus-square" className="password_icon"/>      
            </div>  
            
            
            
          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
    	<div className="form-group steps_pic_upload">
                        <div className="previewImg ProfileImg">
                           <img src="/images/ideator_01.png"/>
                        </div>
                        <div className="fileUpload mlUpload_btn">
                           <span>Profile Pic</span>
                           <input type="file" className="upload" />
                        </div>
                        
                     </div>
    </form>
      </div>
    </div>
    </ScrollArea>
      </div>     
    )
  }
};