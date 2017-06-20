/**
 * Created by pankaj on 20/6/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class MlAppInternalPendingTask extends React.Component{
  componentDidMount()
  {  var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $(".swiper-slide .team-block").click(function(){
      $(this).toggleClass("active");
    });

    $("#show").click(function(){
      $("#details-div").show();

      var mySwiper = new Swiper('.blocks_in_form', {
        speed: 400,
        spaceBetween:20,
        slidesPerView:3,
        pagination: '.swiper-pagination',
        paginationClickable: true
      });
      var $frame = $('#centered');
      var $wrap  = $frame.parent();

      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt:0,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

      });
      $("#show").hide();
    });
    $(function() {
      $('.float-label').jvFloat();
    });
    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}
  }
  render(){
    return (
      <div className="main_wrap_scroll">
        <ScrollArea
          speed={0.8}
          className="main_wrap_scroll"
          smoothScrolling={true}
          default={true}
        >
          <h2>Area of Intrests</h2>
          <div className="requested_input">
            <div className="col-lg-12" id="show">
              <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-4">
                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/valuation.png"/></div>
                    <div className="task-status pending"></div>
                    <h3>Valuation</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-4">
                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/document.png"/></div>
                    <div className="task-status pending"></div>
                    <h3>Asses</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-4">
                  <div className="list_block list_block_intrests notrans">
                    <div className="hex_outer"><img src="/images/discuss.png"/></div>
                    <div className="task-status rejected"></div>
                    <h3>Discuss</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="details-div" style={{display:'none'}}>
            <div className="col-lg-12">
              <div className="row">
                <div className="top_block_scroller" id="centered">
                  <ul className="topscroll_listblock">
                    <li>
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><img src="/images/valuation.png"/></div>
                        <h3>Valuation</h3>
                      </div>
                    </li>
                    <li>
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><img src="/images/document.png"/></div>
                        <h3>Asses</h3>
                      </div>
                    </li>
                    <li>
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><img src="/images/discuss.png"/></div>
                        <h3>Discuss</h3>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="investement-view-content">
                  <div className="col-md-6">
                    <div className="form_bg">
                      <form>
                        <div className="panel panel-default">
                          <div className="panel-heading"> Task: Valuation </div>
                          <div className="panel-body">
                            Stage: Shortlist
                          </div>
                        </div>
                        <div className="panel panel-default mart20">
                          <div className="panel-heading"> Attached Documents </div>
                          <div className="panel-body">
                            <div className="swiper-container conversation-slider blocks_in_form">
                              <div className="swiper-wrapper">
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                                <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form_bg">
                      <div className="panel panel-default">
                        <div className="panel-heading"> Date & Time: 27/08/16 | 10.40 AM </div>
                        <div className="panel-body">
                          <p>Cleint: Mahesh & CO</p>
                          <p>Comunity: Startup</p>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading"> Attendies </div>

                        <div className="panel-body">
                          <ul className="users_list well well-sm">
                            <li>
                              <a href="#">
                                <span></span>
                                <img src="/images/p_5.jpg" /><br />
                                <div className="tooltiprefer">
                                  <span>Shiva</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="green"></span>
                                <img src="/images/p_7.jpg" /><br />
                                <div className="tooltiprefer">
                                  <span>Pavani</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span></span>
                                <img src="/images/p_2.jpg" /><br />
                                <div className="tooltiprefer">
                                  <span>Sirisha</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="green"></span>
                                <img src="/images/p_8.jpg" /><br />
                                <div className="tooltiprefer">
                                  <span>Sameeran</span>
                                </div>
                              </a>
                            </li>
                          </ul>

                        </div>
                      </div>
                      <div className="form-group ml_btn">
                        <a href="#" className="cancel_btn">Accept</a> <a href="#" className="save_btn">Reject</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
