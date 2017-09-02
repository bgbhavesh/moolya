/**
 * Created by pankaj on 6/7/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import {fetchInternalTask} from '../actions/fetchInternalTasks';
import MlAppInternalTaskItem from './MlAppInternalTaskItem';
import MlAppInternalAssignTaskItem from './MlAppInternalAssignTaskItem';

export default class MlAppInternalRejectTask extends React.Component{

  constructor(props){
    super(props);
    this.state={
      tasks:[],
      selectTask:'',
      selectedTaskType: ''
    };
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

      var $frame = $('#centered');
      var $wrap  = $frame.parent();

      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
      });
      // $("#show").hide();
    });

    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }

    this.fetchTaskList();

  }

  async fetchTaskList() {
    let response = await fetchInternalTask(['rejected']);
    if(response){
      this.setState({
        tasks:response,
        selectTask:''
      })
    };
  }

  selectTask(task) {
    this.setState({
      selectTask: task._id ? task._id : '',
      selectedTaskType: task.type
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
          <div className="requested_input ideators_list">
            <div className="col-lg-12" id="show" style={( that.state.selectTask ? {display:'none'} : {})}>
              <div className="row">
                {that.state.tasks.map(function (task, index) {
                  return (
                    <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={index} onClick={()=>that.selectTask(task)}>
                      <div className="ideators_list_block">
                        <div className="inactive"><span>{task.name}</span></div>
                        <h3></h3>
                        <img src="/images/valuation.png" className="c_image"/>
                        <div className="block_footer">
                          <span></span>
                        </div>
                        {/*<div className="hex_outer"><img src="/images/valuation.png"/></div>*/}
                        {/*<div className="task-status pending"></div>*/}
                        {/*<h3>{task.name}</h3>*/}
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
                        <li key={index} onClick={()=>that.selectTask(task)} className={task._id == that.state.selectTask ? "active" : ''}>
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
              {
                (that.state.selectedTaskType === 'assign-task' || that.state.selectedTaskType === 'self-task')
                  ? <MlAppInternalAssignTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList} />
                  : <MlAppInternalTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList} />
              }
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};

