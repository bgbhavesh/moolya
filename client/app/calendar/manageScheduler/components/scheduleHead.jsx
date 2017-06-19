import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export default class ScheduleHead extends React.Component{
  componentDidMount()
  {
    $('.users_list li').click(function(){
      if($(this).next('li').hasClass('sub_list_wrap')) {
        $(this).toggleClass('active_user')
        $(this).next('.sub_list_wrap').toggleClass('hidden_list');
      }
    });
  }
  render(){
    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li>
            <a href="#">
              <img src="/images/p_5.jpg" /><br />
              <div className="tooltiprefer">
                <span>All</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon_bg"> <span className="icon_lg ml ml-funder"></span></span><br />
              <div className="tooltiprefer">
                <span>Funder</span>
              </div>
            </a>
          </li>
          <li className="active_user">
            <a href="#">
              <span className="icon_bg"><span className="icon_lg ml ml-ideator"></span></span><br />
              <div className="tooltiprefer">
                <span>Ideator</span>
              </div>
            </a>
          </li>
          <li className="sub_list_wrap">{/*hidden_list*/}
            <ul className="sub_list">
              <li className="active_user">
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-file-text-o"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Activity</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-list-alt"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Task Master</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-puzzle-piece"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Services</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Calendar</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
};
