/**
 * Created by pankaj on 20/6/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import {fetchInternalTask} from '../actions/fetchInternalTasks';
import MlAppInternalTaskItem from './MlAppInternalTaskItem';

export default class MlAppInternalPendingTask extends React.Component{

  constructor(props){
    super(props);
    this.state={
      tasks:[],
      selectTask:''
    }
    this.fetchTaskList = this.fetchTaskList.bind(this);
  }

  componentDidMount() {
    var WinWidth = $(window).width();
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

    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }

    this.fetchTaskList();

  }

  async fetchTaskList() {
    let response = await fetchInternalTask(['pending']);
    if(response){
      this.setState({
        tasks:response,
        selectTask:''
      })
    };
  }

  selectTask(id) {
    this.setState({
      selectTask:id
    })
  }

  render(){
    const that = this;
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
            <div className="col-lg-12" id="show" style={( that.state.selectTask ? {display:'none'} : {})}>
              <div className="row">
                {that.state.tasks.map(function (task, index) {
                  return (
                    <div className="col-lg-2 col-md-4 col-sm-4" key={index} onClick={()=>that.selectTask(task._id)}>
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><img src="/images/valuation.png"/></div>
                        <div className="task-status pending"></div>
                        <h3>{task.name}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div id="details-div" style={( that.state.selectTask ? {} : {display:'none'})}>
            <div className="col-lg-12">
              <div className="row">
                <div className="top_block_scroller" id="centered">
                  <ul className="topscroll_listblock">
                    {that.state.tasks.map(function (task, index) {
                      return (
                        <li key={index} onClick={()=>that.selectTask(task._id)}>
                          <div className="list_block list_block_intrests notrans">
                            <div className="hex_outer"><img src="/images/valuation.png"/></div>
                            <h3>{task.name}</h3>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <MlAppInternalTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList} />
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};