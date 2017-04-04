import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
var options = [
  {value: 'select', label: 'Select user type'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options1 = [
  {value: 'select', label: 'Citizenship'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options2 = [
  {value: 'select', label: 'Employment Status'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options3 = [
  {value: 'select', label: 'Industry'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options4 = [
  {value: 'select', label: 'Profession'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
export default class Step2 extends React.Component{
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step2">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >

          <div className="row portfolio_subscription">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Current Subscription
                </div>
                <div className="panel-body">
                  <div className="col-lg-6 nopadding">
                    <div className="current">

                      <div className="col-lg-4 nopadding">
                        <img src="/images/dummy_image.png" />
                      </div>
                      <div className="col-lg-8 nopadding-right">
                        <h4>Subscription Name</h4>
                        <div className="content_body">
                          <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          </ScrollArea>
                        </div>
                        <div className="content_footer">
                          Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-6 nopadding">
                    <div className="current">

                      <div className="col-lg-4 nopadding">
                        <img src="/images/dummy_image.png" />
                      </div>
                      <div className="col-lg-8 nopadding-right">
                        <h4>Subscription Name</h4>
                        <div className="content_body">
                          <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          </ScrollArea>
                        </div>
                        <div className="content_footer">
                          Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  {/*<div className="col-lg-6 nopadding">
                   <div className="current">

                   <div className="col-lg-4 nopadding">
                   <img src="/images/dummy_image.png" />
                   </div>
                   <div className="col-lg-8 nopadding-right">
                   <h4>Test</h4>
                   <div className="content_body">
                   <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                   </ScrollArea>
                   </div>
                   <div className="content_footer">
                   Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                   </div>
                   </div>

                   </div>
                   </div>*/}
                </div>
              </div>
            </div>



            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Choose Subscription
                </div>
                <div className="panel-body">
                  <div className="col-lg-6 nopadding">
                    <div className="choose">

                      <div className="col-lg-4 nopadding">
                        <img src="/images/dummy_image.png" />
                      </div>
                      <div className="col-lg-8 nopadding-right">
                        <h4>Subscription Name</h4>
                        <div className="content_body">
                          <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          </ScrollArea>
                        </div>
                        <div className="content_footer">
                          Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-6 nopadding">
                    <div className="choose">

                      <div className="col-lg-4 nopadding">
                        <img src="/images/dummy_image.png" />
                      </div>
                      <div className="col-lg-8 nopadding-right">
                        <h4>Subscription Name</h4>
                        <div className="content_body">
                          <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          </ScrollArea>
                        </div>
                        <div className="content_footer">
                          Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  {/*<div className="col-lg-6 nopadding">
                   <div className="choose">

                   <div className="col-lg-4 nopadding">
                   <img src="/images/dummy_image.png" />
                   </div>
                   <div className="col-lg-8 nopadding-right">
                   <h4>Test</h4>
                   <div className="content_body">
                   <ScrollArea speed={0.8} className="content_body" smoothScrolling={true} default={true} >
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                   </ScrollArea>
                   </div>
                   <div className="content_footer">
                   Valid Till : 25th Feb 2016 <b>Rs.8000 5000</b> <a href="#" className="purchased">Purchased</a>
                   </div>
                   </div>

                   </div>
                   </div>*/}
                </div>
              </div>
            </div>



          </div>
        </ScrollArea>
      </div>
    )
  }
};
