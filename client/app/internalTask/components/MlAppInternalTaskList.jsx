/**
 * Created by pankaj on 9/9/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import { fetchInternalTask } from '../actions/fetchInternalTasks';
import MlAppInternalTaskItem from './MlAppInternalTaskItem';
import MlAppInternalAssignTaskItem from './MlAppInternalAssignTaskItem';
import NoDataList from '../../../commons/components/noData/noDataList';
import MlLoader from '../../../commons/components/loader/loader';

export default class MlAppInternalTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectTask: '',
      selectedTaskType: ''
    };
  }

  componentDidMount() {
    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    $('.swiper-slide .team-block').click(function () {
      $(this).toggleClass('active');
    });

    $('#show').click(() => {
      $('#details-div').show();
      const $frame = $('#centered');
      const $wrap = $frame.parent();

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
        dynamicHandle: 1
      });

      // $("#show").hide();
    });

    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 20));
    if (WinWidth > 768) {
      $('.tab_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }

  async fetchTaskList() {
    const response = await fetchInternalTask(['pending']);
    if (response) {
      this.setState({
        tasks: response,
        selectTask: ''
      })
    }
  }

  selectTask(task) {
    console.log('task', task);
    this.setState({
      selectTask: task._id ? task._id : '',
      selectedTaskType: task.type,
      client: task.ownerName
    })
  }
  getTaskType(moduleName) {
    switch (moduleName) {
      case 'myPendingInternalTask':
        return 'Pending Tasks'
        break;
      case 'myCurrentInternalTask':
        return 'Current Tasks'
        break;
      case 'myCompletedInternalTask':
        return 'Completed Tasks'
        break;
      case 'myRejectedInternalTask':
        return 'Rejected Tasks'
        break;
      default:
        return 'Tasks'
      // do nothing
    }
  }
  render() {
    const that = this;
    const tasks = that.props.data;
    const config = this.props.config;
    return (
      <div>
        {config.loading === true ? (<MlLoader/>) : (
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <h2>Area of Intrests</h2>

              {
                that.state.selectTask ?
                  <div id="details-div">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="top_block_scroller" id="centered">
                          <ul className="topscroll_listblock ideators_list">
                            {tasks && !tasks.length ? <NoDataList moduleName={this.getTaskType(config.moduleName)}/> : (
                              <div>
                                {tasks.map((task, index) => (
                                  <li
                                    key={index} onClick={() => that.selectTask(task)}
                                    className={task._id == that.state.selectTask ? 'selected_block ideators_list_block' : 'ideators_list_block'}>
                                    <div className="premium">
                                      <span>{task.name}</span>
                                    </div>
                                    <h3>{task.ownerName ? task.ownerName : ''}</h3>
                                    <div className="list_icon">
                                      {/* <img src={task.profileImage ? task.profileImage : "/images/valuation.png"}
                                   style={{"margin": 0}} className="c_image ml ml-ideator"/> */}
                                      <span className="ml my-ml-my_list_2"></span>
                                    </div>
                                    <p>{task.portfolioTitle ? task.portfolioTitle : ''}</p>
                                    <div className="block_footer">
                                      <span>
                                        {(task.clusterName ? `${task.clusterName} - ` : '') + (task.communityName ? task.communityName : '')}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            )
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        (that.state.selectedTaskType === 'assign-task' || that.state.selectedTaskType === 'self-task')
                          ? <MlAppInternalAssignTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList}/>
                          : <MlAppInternalTaskItem taskId={that.state.selectTask} fetchTaskList={this.fetchTaskList} client={this.state.client}/>
                      }
                    </div>
                  </div>
                  :
                  <div className="requested_input ideators_list">
                    <div className="col-lg-12" id="show">
                      <div className="row">
                        {tasks && !tasks.length ? <NoDataList moduleName={this.getTaskType(config.moduleName)}/> : (
                          <div>
                            {tasks.map((task, index) => (
                              <div
                                className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={index}
                                onClick={() => that.selectTask(task)}>
                                <div className="ideators_list_block">
                                  <div className="premium">
                                    <span>{task.name}</span>
                                  </div>
                                  <h3>{task.ownerName ? task.ownerName : ''}</h3>
                                  <div className="list_icon">
                                    {/* <img src={task.profileImage ? task.profileImage : "/images/valuation.png"} */}
                                    {/* style={{"margin": 0}} className="c_image ml ml-ideator"/> */}
                                    <span className="ml my-ml-my_list_2"></span>
                                  </div>
                                  <p>{task.portfolioTitle ? task.portfolioTitle : ''}</p>
                                  <div className="block_footer">
                                    <span>
                                      {(task.clusterName ? `${task.clusterName} - ` : '') + (task.communityName ? task.communityName : '')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
              }
            </ScrollArea>
          </div>
        )}
      </div>
    )
  }
}
