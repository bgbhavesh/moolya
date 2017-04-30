import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class AppIdeatorPnS extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });


  }
  render(){
    return (

      <div>

        <h2>Problems and Solutions </h2>

        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#1a" data-toggle="tab">Problems</a>
            </li>
            <li><a href="#2a" data-toggle="tab">Solutions</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      <p>We Identified the problem of Individuals who are unable to take care of their healthy lifestyle needs. That might be because of the lack of time or lack of opportunities. For example, an IT employee spends most of his time infront of their desktop / laptop. Though they are concerned about their health, they’re bounded to that work style. They will be happy if somebody helps them to practice healthy lifestyle.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="2a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      <p>Help individuals to maintain healthy lifestyle through our simple yet effective app. The app will ask for few inputs about their health conditions, lifestyle,  and our app will give them the diet plan, workout plan to maintain a healthy lifestyle. Along with this, They can simply choose and order healthy nutrients, foods, protein shakes from our kitchen.</p>

                    </div>
                  </div></div>
              </div>
            </div>


          </div>

        </div>

      </div>



    )
  }
};
