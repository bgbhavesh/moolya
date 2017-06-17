import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MyFavourites extends React.Component{
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
                      <img src="/images/p_9.jpg" />
                    </div>
                    <h3>Mukhil <br />
                      UAE</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_11.jpg" />
                    </div>
                    <h3>Harisha Madam <br />
                      India</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_10.jpg" />
                    </div>
                    <h3>Pavan Kumar <br />
                      USA</h3>
                  </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_13.jpg" />
                    </div>
                    <h3>Sameeran <br />
                      India</h3>
                  </div>
            </div>
              <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="list_block provider_block">
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_21.jpg" />
                    </div>
                    <h3>Syamal Jaddu <br />
                      India</h3>
                  </div>
            </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="company_block">
                  <div className="premium"><span>premium</span></div>
                  <div className="company_header">
                    <img src="/images/pramathi.png" />
                  </div>
                  <h3>Pramati Technologies, Hyderabad</h3>
                  <div className="row nomargin">
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                      <div className="pie-title-center pie-passion" data-percent="90"> <span className="pie-value"></span> </div>
                      Passion
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                      <div className="pie-title-center pie-rating" data-percent="25"> <span className="pie-value"></span> </div>
                      Rating
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                      <div className="pie-title-center pie-like" data-percent="40"> <span className="pie-value"></span> </div>
                      Likes
                    </div>
                  </div>
                  <div className="row nomargin footer">
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                      <span>25%</span><br />
                      Favorites
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center center">
                      <span>25%</span><br />
                      Projects
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                      <span>25%</span><br />
                      Connect
                    </div>
                  </div>
                </div>
              </div>
            </div>

     </div>



    )
  }
};
