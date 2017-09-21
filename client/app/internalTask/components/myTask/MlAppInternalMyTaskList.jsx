/**
 * Created by pankaj on 8/7/17.
 */

import React from 'react';
import {fetchSelfCreatedInternalTask} from '../../actions/fetchMyInternalTask';
import MlAppInternalAssignTaskItem from './../MlAppInternalAssignTaskItem';

export default class MlAppInternalMyTaskList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      tasks:[],
      selectTask:'',
      selectedTaskType: ''
    };
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
    });
    $(function() {
      $('.float-label').jvFloat();
    });
    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  async fetchTaskList() {
    let response = await fetchSelfCreatedInternalTask(['pending']);
    if(response){
      this.setState({
        tasks: response,
        selectTask: null
      })
    }
  }

  selectTask(task) {
    console.log(task);
    this.setState({
      selectTask: task._id ? task._id : '',
    })
  }

  updateType () {
    FlowRouter.setQueryParams({
      add: true
    });
  }

  render(){
    const that = this;
    let tasks = this.props.data || [];
    return (
      <div>
        <div className="ideators_list">
          <div className="col-lg-12" id="show">
            { that.state.selectTask ?
                <div id="details-div">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="top_block_scroller" id="centered">
                      <ul className="topscroll_listblock ideators_list">
                        {tasks.map(function (task, index) {
                          return (
                            <li key={index} onClick={()=>that.selectTask(task)} className={task._id == that.state.selectTask ? "selected_block ideators_list_block" : 'ideators_list_block'}>
                              <div className="premium">
                                <span>{task.name}</span>
                              </div>
                              <h3>{task.ownerName ? task.ownerName : "" }</h3>
                              <div className="list_icon">
                                <img src="/images/valuation.png" style={{ "margin": 0 }} className="c_image ml ml-ideator"/>
                              </div>
                              <p>{task.portfolioTitle ? task.portfolioTitle : "" }</p>
                              <div className="block_footer">
                            <span>
                              { ( task.clusterName ?  task.clusterName + " - " : '' ) + (task.communityName ? task.communityName : '') }
                            </span>
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
                    (that.state.selectedTaskType === 'assign-task' || that.state.selectedTaskType === 'self-task' || that.state.selectTask )
                      ? <MlAppInternalAssignTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList} />
                      : <div></div>
                  }
                </div>
              </div>
              :
                <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-4" >
                  <a href="" onClick={()=>that.updateType('new')} >
                    <div className="ideators_list_block add_task">
                      <div><span className="ml ml-plus "></span></div>
                      <div className="block_footer"><span>Add a task</span></div>
                    </div>
                  </a>
                </div>
                {tasks.map(function (task, index) {
                  return (
                    <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={index} onClick={()=>that.selectTask(task)}>
                      <div className="ideators_list_block">
                        <div className="premium">
                          <span>{task.name}</span>
                        </div>
                        <h3>{task.ownerName ? task.ownerName : "" }</h3>
                        <div className="list_icon">
                          <img src="/images/valuation.png" style={{ "margin": 0 }} className="c_image ml ml-ideator"/>
                        </div>
                        <p>{task.portfolioTitle ? task.portfolioTitle : "" }</p>
                        <div className="block_footer">
                          <span>
                            { ( task.clusterName ?  task.clusterName + " - " : '' ) + (task.communityName ? task.communityName : '') }
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
};
