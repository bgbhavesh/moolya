import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MyFollowings extends React.Component{
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
                      <img src="/images/p_2.jpg" />
                    </div>
                    <h3>Sirisha <br />
                      UAE</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_4.jpg" />
                    </div>
                    <h3>Shakshi Simha <br />
                      India</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_5.jpg" />
                    </div>
                    <h3>Shiva Kumar<br />
                      USA</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_12.jpg" />
                    </div>
                    <h3>Balakrishna <br />
                      India</h3>
                  </div>
            </div>
            </div>

     </div>



    )
  }
};
