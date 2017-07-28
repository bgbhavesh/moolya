import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import CalenderHead from './calendarHead';

export default class CalCreateTask extends React.Component{
  componentDidMount()
  {

    $(function() {
      $('.float-label').jvFloat();
    });

    var WinWidth = $(window).width();
    if(WinWidth > 768){
      $(".app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
    }

  }

  clickHandlers(type){
    this.props.componentToLoad(type)
  }

  render(){
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <CalenderHead />
          <div className="col-md-12">
            <ul className="cal_afternoon">
              <li className="pull-left"><a href="/app/calCreateAppointment"><FontAwesome name='plus'/> Add a Task</a></li>
              <li className="pull-right"><span className="day_icon"></span> Afternoon / 12.00pm - 06.00pm</li>
            </ul>
          </div>
          <div className="col-md-12 nopadding">
            <div className="col-md-6">
              <div className="panel panel-default cal_view_task pending">
                <div className="panel-heading"><span className="ml ml-startup"></span>Startup Name <span className="pull-right">Status : <b className="status">Pending</b></span></div>
                <div className="panel-body">
                  <div className="col-md-12 nopadding">
                    <div className="col-md-3 nopadding text-center">
                      <img src="/images/p_13.jpg" className="image" />
                    </div>
                    <div className="col-md-9">
                      <br />
                      <div className="form-group">
                        <input type="text" placeholder="Task Type" className="form-control float-label" id="" value="Valutation"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Task Name" className="form-control float-label" id="" value="Ratna pro"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 nopadding att_members" >
                    <ul className="users_list">
                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Venu</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_34.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Ramya</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_13.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Sameer</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_1.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Usha</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 nopadding">
                    <div className="ml_btn">
                      <a href="#" id="save_contact" className="save_btn">Call</a>
                      <a href="" id="cancel_contact" className="cancel_btn" onClick={this.clickHandlers.bind(this, 'appointmentDetails')}>View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default cal_view_task confirmed">
                <div className="panel-heading"><span className="ml ml-startup"></span>Startup Name <span className="pull-right">Status : <b className="status">Confirmed</b></span></div>
                <div className="panel-body">
                  <div className="col-md-12 nopadding">
                    <div className="col-md-3 nopadding text-center">
                      <img src="/images/p_1.jpg" className="image" />
                    </div>
                    <div className="col-md-9">
                      <br />
                      <div className="form-group">
                        <input type="text" placeholder="Task Type" className="form-control float-label" id="" value="Valutation"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Task Name" className="form-control float-label" id="" value="Ratna pro"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 nopadding att_members" >
                    <ul className="users_list">
                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Venu</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_34.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Ramya</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_13.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Sameer</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_1.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Usha</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 nopadding">
                    <div className="ml_btn">
                      <a href="#" id="save_contact" className="save_btn">Call</a>
                      <a href="#" id="cancel_contact" className="cancel_btn">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="panel panel-default cal_view_task confirmed">
                <div className="panel-heading"><span className="ml ml-startup"></span>Startup Name <span className="pull-right">Status : <b className="status">Confirmed</b></span></div>
                <div className="panel-body">
                  <div className="col-md-12 nopadding">
                    <div className="col-md-3 nopadding text-center">
                      <img src="/images/p_10.jpg" className="image" />
                    </div>
                    <div className="col-md-9">
                      <br />
                      <div className="form-group">
                        <input type="text" placeholder="Task Type" className="form-control float-label" id="" value="Valutation"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Task Name" className="form-control float-label" id="" value="Ratna pro"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 nopadding att_members" >
                    <ul className="users_list">
                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Venu</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_34.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Ramya</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_13.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Sameer</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_1.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Usha</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 nopadding">
                    <div className="ml_btn">
                      <a href="#" id="save_contact" className="save_btn">Call</a>
                      <a href="#" id="cancel_contact" className="cancel_btn">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="panel panel-default cal_view_task confirmed">
                <div className="panel-heading"><span className="ml ml-startup"></span>Startup Name <span className="pull-right">Status : <b className="status">Confirmed</b></span></div>
                <div className="panel-body">
                  <div className="col-md-12 nopadding">
                    <div className="col-md-3 nopadding text-center">
                      <img src="/images/p_34.jpg" className="image" />
                    </div>
                    <div className="col-md-9">
                      <br />
                      <div className="form-group">
                        <input type="text" placeholder="Task Type" className="form-control float-label" id="" value="Valutation"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Task Name" className="form-control float-label" id="" value="Ratna pro"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 nopadding att_members" >
                    <ul className="users_list">
                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Venu</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_34.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Ramya</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_13.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Sameer</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/images/p_1.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>Usha</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 nopadding">
                    <div className="ml_btn">
                      <a href="#" id="save_contact" className="save_btn">Call</a>
                      <a href="#" id="cancel_contact" className="cancel_btn">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
};
