/**
 * Created by viswadeep on 2/5/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');

export default class MlProfileSettings extends React.Component{
  componentDidMount()
  {

  }
  render(){
    return (
      <div className="app_main_wrap paddingtop20">
        <div className="col-md-12">
          <h2>My Settings</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form-group">
              <input type="text" placeholder="Rupee" className="form-control float-label" id=""/>
              <FontAwesome name='inr' className="input_icon"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="US Metric" className="form-control float-label" id=""/>
              <FontAwesome name='info' className="input_icon"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input type="text" placeholder="English" className="form-control float-label" id=""/>
              <FontAwesome name='language' className="input_icon"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="IST" className="form-control float-label" id=""/>
              <FontAwesome name='clock-o' className="input_icon"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
