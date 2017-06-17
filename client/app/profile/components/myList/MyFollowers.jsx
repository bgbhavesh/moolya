import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MyFollowers extends React.Component{
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
  render(){
    return (

       <div>
<div className="row">

            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block ideator_block">
                    <div className="ideator_mask">
                      <img src="/images/p_3.jpg" />
                    </div>
                    <h3>Srinag <br />
                      UAE</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_14.jpg" />
                    </div>
                    <h3>Shikha Maheshwari <br />
                      India</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_6.jpg" />
                    </div>
                    <h3>Shankara Narayanan<br />
                      USA</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_1.jpg" />
                    </div>
                    <h3>Usha Nirmala <br />
                      India</h3>
                  </div>
            </div>
            </div>

     </div>



    )
  }
};
