import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import StarRatings from '../../commons/components/starRatings';
import 'react-responsive-tabs/styles.css'



export default class MlAppIdeatorIdeas extends React.Component{
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
    $('.idea_details .ideas_block').click(function () {
      GetIdeaId = $(this).attr('name');
      $('.idea_details .portfolio-main-wrap .panel').slideUp();
      $('#' + GetIdeaId).slideDown();
    });
  }
  render(){
    return (
      <div className="admin_padding_wrap">
        <h2>Ideas</h2>
        <div className="main_wrap_scroll idea_details">
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
                  <div className="swiper-slide ideas_block" name="idea1"
                       style={{'backgroundImage': 'url(/images/idea_5.jpg)'}}>
                    <h3 className="rating_xs"> Penny Tracker<br/> <StarRatings/></h3>
                  </div>
                  <div className="swiper-slide ideas_block" name="idea2"
                       style={{'backgroundImage': 'url(/images/idea_2.jpg)'}}>
                    <h3 className="rating_xs">Healthy Nutrients, Food and Drinks <br/> <StarRatings/></h3>
                  </div>
                  <div className="swiper-slide ideas_block" name="idea3"
                       style={{'backgroundImage': 'url(/images/idea_6.jpg)'}}>
                    <h3 className="rating_xs">expertmile.com <br/> <StarRatings/></h3>
                  </div>

                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="col-md-2"></div>
            <br/>
            <div className="col-lg-12 col-md-12 col-sm-12 portfolio-main-wrap">
              <div className="panel panel-default panel-form-view" id="idea1">
                <div className="panel-heading">Penny Tracker</div>
                <div className="panel-body">
                  <p>A platform to connect retailers and customers and help the make all their billing needs electronic
                    and automated.</p>
                  <a href="/app/portfolio/view" className="mlUpload_btn pull-left">View</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Public</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Private</a>
                  <a href="/app/portfolio/addIdea" className="mlUpload_btn pull-left">Add New Idea</a>
                </div>
              </div>

              <div className="panel panel-default panel-form-view" id="idea2" style={{'display': 'block'}}>
                <div className="panel-heading">Healthy Nutrients, Food and Drinks</div>
                <div className="panel-body">
                  <p>The basic idea is to make healthy nutrients, food, drinks etc available pre - post workout/ daily
                    exercise/yoga or meditation, for health conscious people with the help of a mobile application.
                    Basically we need to develop a mobile app say Hulk's Chef. Practicles: The client would login into
                    the app and choose his requirement and say i need this juice continuously for a month everyday at
                    this time at this place in the app; we would make it available for them. So basically for eg we will
                    have our menu card in the app with options like pre workout, post workout, yoga special, diabetes
                    special jogging special, meditation, martial arts, special menu for people workout at beaches and
                    national park (basically open air workout). We shall have a kitchen a central hub where in we will
                    be preparing things and deliver it to the clients.</p>
                  <a href="/app/portfolio/view" className="mlUpload_btn pull-left">View</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Public</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Private</a>
                  <a href="/app/portfolio/addIdea" className="mlUpload_btn pull-left">Add New Idea</a>
                </div>
              </div>

              <div className="panel panel-default panel-form-view" id="idea3">
                <div className="panel-heading">expertmile.com - online platform for CA's to connect to the customer
                </div>
                <div className="panel-body">
                  <p>Expertmile.com is an online platform for CAs, Lawyers and other professional service people who can
                    post their listings on the website and can get connected to the clients directly. Clients get an
                    easy approach of talking to the reputed CA according to their specializations.</p>
                  <a href="/app/portfolio/view" className="mlUpload_btn pull-left">View</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Public</a>
                  <a href="#" className="mlUpload_btn pull-left">Make Private</a>
                  <a href="/app/portfolio/addIdea" className="mlUpload_btn pull-left">Add New Idea</a>
                </div>
              </div>

            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }
};
