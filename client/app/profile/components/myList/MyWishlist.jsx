import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MyWishlist extends React.Component{
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

            <div className="col-md-4 col-sm-4 col-lg-3">
              <a href="/app/startupDetails1">
              <div className="company_block">
                <div className="regular"><span>Starter</span></div>
                <div className="company_header">
                  <img src="/images/startup_02.png" />
                </div>
                <h3>Zomato<br/><span>New Delhi</span></h3>
              <div className="row nomargin">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-passion" data-percent="80"> <span className="pie-value"></span> </div>
                  Passion
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-rating" data-percent="70"> <span className="pie-value"></span> </div>
                  Rating
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-like" data-percent="82"> <span className="pie-value"></span> </div>
                  Likes
                </div>
              </div>
              <div className="row nomargin footer">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>75%</span><br />
                  Favourites
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>54%</span><br />
                  Projects
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>82%</span><br />
                  Connect
                </div>
              </div>
              </div>
              </a>
            </div>

            <div className="col-md-4 col-sm-4 col-lg-3">
              <a href="/app/startupDetails">
                  <div className="company_block">
                  <div className="premium"><span>premium</span></div>
                  <div className="company_header">
                    <img src="/images/startup_01.png" />
                  </div>
                  <h3>Haptik<br/><span>Mumbai</span></h3>
                  <div className="row nomargin">
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                      <div className="pie-title-center pie-passion" data-percent="80"> <span className="pie-value"></span> </div>
                      Passion
                    </div>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                      <div className="pie-title-center pie-rating" data-percent="50"> <span className="pie-value"></span> </div>
                      Rating
                    </div>
                    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                      <div className="pie-title-center pie-like" data-percent="56"> <span className="pie-value"></span> </div>
                      Likes
                    </div>
                  </div>
                  <div className="row nomargin footer">
                  <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                    <span>75%</span><br />
                    Favourites
                  </div>
                  <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                    <span>45%</span><br />
                    Projects
                  </div>
                  <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                    <span>60%</span><br />
                    Connect
                  </div>
                </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-3">
              <a href="/app/startupDetails2">
              <div className="company_block">
                <div className="premium"><span>premium</span></div>
                <div className="company_header">
                  <img src="/images/startup_05.png" />
                </div>
                <h3>Mobikwik<br/><span>Bangalore</span></h3>
              <div className="row nomargin">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-passion" data-percent="90"> <span className="pie-value"></span> </div>
                  Passion
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-rating" data-percent="55"> <span className="pie-value"></span> </div>
                  Rating
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-like" data-percent="70"> <span className="pie-value"></span> </div>
                  Likes
                </div>
              </div>
              <div className="row nomargin footer">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>75%</span><br />
                  Favourites
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>63%</span><br />
                  Projects
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>75%</span><br />
                  Connect
                </div>
              </div>
              </div>
              </a>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-3">
              <a href="/app/startupDetails3">
              <div className="company_block">
                <div className="regular"><span>starter</span></div>
                <div className="company_header">
                  <img src="/images/startup_06.png" />
                </div>
                <h3>Coupon India<br/><span>Mumbai</span></h3>
              <div className="row nomargin">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-passion" data-percent="85"> <span className="pie-value"></span> </div>
                  Passion
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-rating" data-percent="76"> <span className="pie-value"></span> </div>
                  Rating
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <div className="pie-title-center pie-like" data-percent="68"> <span className="pie-value"></span> </div>
                  Likes
                </div>
              </div>
              <div className="row nomargin footer">
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>52%</span><br />
                  Favourites
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>45%</span><br />
                  Projects
                </div>
                <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                  <span>56%</span><br />
                  Connect
                </div>
              </div>
              </div>
              </a>
            </div>
          </div>

     </div>



    )
  }
};
