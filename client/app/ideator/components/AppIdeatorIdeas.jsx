import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import StarRatings from '../../commons/components/starRatings';
import 'react-responsive-tabs/styles.css'



export default class AppIdeatorIdeas extends React.Component{
  componentDidMount()
  {
    var swiper = new Swiper('.ideas_swiper', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide:1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      }
    });
  }
  render(){
    return (
      <div>
        <h2>Ideas</h2>
        <div className="main_wrap_scroll">
          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
            <div className="col-md-2"></div>

            <div className="col-md-8">
              <div className="swiper-container ideas_swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide ideas_block" style={{'background-image':'url(/images/idea_5.jpg)'}}>
                    <h3 className="rating_xs">Penny Tracker <br/> <StarRatings/></h3>
                  </div>
                  <div className="swiper-slide ideas_block" style={{'background-image':'url(/images/idea_2.jpg)'}}>
                    <h3 className="rating_xs">Healthy nutrients, Food and Drinks <br/> <StarRatings/></h3>
                  </div>
                  <div className="swiper-slide ideas_block" style={{'background-image':'url(/images/idea_6.jpg)'}}>
                    <h3 className="rating_xs">Online platform for CA's <br/> <StarRatings/></h3>
                  </div>

                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="col-md-2"></div>
            <br/>
            <div className="col-lg-12 col-md-12 col-sm-12 portfolio-main-wrap">

              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">Healthy nutrients, Food and Drinks</div>
                <div className="panel-body">

                  <p>The basic idea is to make healthy nutrients, food, drinks etc available pre - post workout/ daily exercise/yoga or meditation, for health conscious people with the help of a mobile application. Basically we need to develop a mobile app say Hulk's Chef. Practicles: The client would login into the app and choose his requirement and say i need this juice continuously for a month everyday at this time at this place in the app; we would make it available for them. So basically for eg we will have our menu card in the app with options like pre workout, post workout, yoga special, diabetes special jogging special, meditation, martial arts, special menu for people workout at beaches and national park (basically open air workout). We shall have a kitchen a central hub where in we will be preparing things and deliver it to the clients.</p>
                  <span className="pull-right rating_small">
                    <StarRatings/>
                    Updated : 26/05/2016
                  </span>

                  <a href="#" className="mlUpload_btn pull-left">View Idea</a>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }
};
