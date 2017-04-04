import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
var options = [
  {value: 'select', label: 'Select Country'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options1 = [
  {value: 'select', label: 'Choose registratipon type'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options2 = [
  {value: 'select', label: 'Subscription type'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options3 = [
  {value: 'select', label: 'Do you want to associate to any institution'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options4 = [
  {value: 'select', label: 'How did you know about us'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options5 = [
  {value: 'select', label: 'Select Cluster'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options6 = [
  {value: 'select', label: 'Select Chapter'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
export default class Step4 extends React.Component{
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap profilestep4">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>




                <div className="form-group">
                  <Select name="form-field-name"value="select" options={options} className="float-label"/>
                </div>




              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <Select name="form-field-name" value="select" options={options1} className="float-label"/>
                </div>




              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="/images/dummy_image2.jpg" />
                </div>
                <div className="panel-footer">
                  Template One
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
