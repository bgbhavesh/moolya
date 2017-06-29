/**
 * Created by pankaj on 29/6/17.
 */
import React from 'react';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';

export default class MlAppSetCalendarTimmingSettings extends React.Component{
  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <br/>
          {/*<ul className="list-group hour_blocks_wrap">
           <li className="list-group-item"></li>
           <li className="list-group-item">test</li>
           <li className="list-group-item"></li>
           </ul>*/}
          <div className="wrap_left">
            <div className="col-md-6 nopadding-left">
              <div className="panel panel-default">
                <div className="panel-heading">Selected work timings</div>
                <div className="panel-body">
                  <div className="form-group col-md-6 nopadding-left">
                    <input type="text" className="form-control float-label" placeholder="Start time"/>
                  </div>
                  <div className="form-group col-md-6 nopadding-right">
                    <input type="text" className="form-control float-label" placeholder="End time"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="panel panel-default input_head">
                <div className="panel-heading">
                  <div className="form-group pull-left nomargin-bottom">
                    <div className="input_types">
                      <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Set break time</label>
                    </div>
                    <br className="brclear"/>
                  </div>
                  <span className="see-more pull-right"><a href=""><FontAwesome name='plus'/></a></span>
                </div>
                <div className="panel-body">
                  <div className="form-group col-md-6 nopadding-left">
                    <input type="text" className="form-control float-label" placeholder="Start time"/>
                  </div>
                  <div className="form-group col-md-6 nopadding-right">
                    <input type="text" className="form-control float-label" placeholder="End time"/>
                  </div>
                </div>
              </div>
            </div>
            <br className="brclear"/>
            <div className="panel panel-default input_head">
              <div className="panel-heading">
                <div className="form-group pull-left nomargin-bottom">
                  <div className="input_types">
                    <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Clone the work timings</label>
                  </div>
                  <br className="brclear"/>
                </div>
              </div>
              <div className="panel-body checkbox_group">
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-primary active">
                      Monday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-success active">
                      Tuesday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-info active">
                      Wednesday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-warning active">
                      Thursday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-danger active">
                      Friday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-info active">
                      Saturday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-primary active">
                      Sunday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default active">
                      All Days
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap_right">
            <ul>
              <li className="active">Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
              <li>Sun</li>
            </ul>
          </div>
        </ScrollArea>
      </div>
    )
  }
};

