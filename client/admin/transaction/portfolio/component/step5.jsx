import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'

export default class Step5 extends React.Component{
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));

    $('.uploaded_files .upload_file').change(function(){
      var FileName = $(this).val().replace(/C:\\fakepath\\/i, '');
      $(this).parents('.uploaded_files').find(".panel-body ul").prepend('<li class="doc_card" data-toggle="tooltip" data-placement="bottom" title="'+FileName+'"><span class="ml ml-minus"></span><img id="preview_file" /></li>');
      $(this).parents('.uploaded_files').find("#preview_file").attr("src", URL.createObjectURL(this.files[0]));
      $('[data-toggle="tooltip"]').tooltip({container:'body'});
    });
  }

  render(){
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <section id="moolya_admin-timeline" className="moolya_admin-container">
              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-picture">
                  <img src="/images/p_7.jpg"/>
                </div>

                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">Jan 14</span>
                </div>
              </div>

              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-movie">
                  <img src="/images/p_2.jpg"/>
                </div>
                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">18th Jan 2016<br />03:30:10</span>
                </div>
              </div>

              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-picture">
                  <img src="/images/p_3.jpg"/>
                </div>

                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">Jan 24</span>
                </div>
              </div>

              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-location">
                  <img src="/images/p_4.jpg"/>
                </div>
                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">Feb 14</span>
                </div>
              </div>

              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-location">
                  <img src="/images/p_5.jpg"/>
                </div>

                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">Feb 18</span>
                </div>
              </div>

              <div className="moolya_admin-timeline-block">
                <div className="moolya_admin-timeline-img moolya_admin-movie">
                  <img src="/images/p_6.jpg"/>
                </div>

                <div className="moolya_admin-timeline-content">
                  <h4>Portfolio has been intitated</h4>
                  <p><b>Customer Care</b></p>
                  <span className="moolya_admin-date">Feb 26</span>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-2"></div>
        </ScrollArea>
      </div>
    )
  }
};
