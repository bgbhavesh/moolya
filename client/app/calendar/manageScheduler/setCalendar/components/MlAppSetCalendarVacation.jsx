/**
 * Created by pankaj on 5/7/17.
 */

import React from 'react';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';

export default class MlAppSetCalendarVacation extends React.Component{
  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step3">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <form>
              <div className="form-group">
                <span className="placeHolder active">Choose break type</span>
                <select className="form-control"><option>Vacation</option></select>
              </div>
              <div className="form-group">
                <input className="form-control float-label" defaultValue="02-02-2017" placeholder="Start date"/>
              </div>
              <div className="form-group">
                <input className="form-control float-label" defaultValue="23:00:59" placeholder="Start time"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Allow booking on start date & end date</label>
                </div>
                <br className="brclear"/>
              </div>
            </form>
          </div>
          <div className="col-md-6 nopadding-right">
            <form>
              <div className="form-group">
                <input className="form-control float-label" placeholder="Vacation name" defaultValue={'Family trip'}/>
              </div>
              <div className="form-group">
                <input className="form-control float-label" defaultValue="02-03-2017" placeholder="End date"/>
              </div>
              <div className="form-group">
                <input className="form-control float-label" defaultValue="02:45:30" placeholder="End time"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Auto cancel all the appointments</label>
                </div>
                <br className="brclear"/>
              </div>
            </form>
          </div>


        </ScrollArea>
      </div>
    )
  }
};
