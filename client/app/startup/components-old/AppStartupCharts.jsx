import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class AppStartupCharts extends React.Component{
  componentDidMount()
  {  }
  render(){
    return (
      <div className="col-lg-12 nopadding">
        <h2>Charts</h2>
        <div>


          <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 library-wrap">

            <div className="panel panel-default">
              <div className="panel-heading">
                Employment of Company
              </div>
              <div className="panel-body">
                <img src="/images/chart_1.jpg"  className="img-responsive"/>
              </div>
            </div>


          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 library-wrap">

            <div className="panel panel-default">
              <div className="panel-heading">
                Profit, Revenue & Liability
              </div>
              <div className="panel-body">
                <img src="/images/chart_2.jpg"  className="img-responsive"/>
              </div>
            </div>


          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 library-wrap">

            <div className="panel panel-default">
              <div className="panel-heading">
                Review of Company
              </div>
              <div className="panel-body">
                <img src="/images/chart_3.jpg"  className="img-responsive"/>
              </div>
            </div>


          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 library-wrap">

            <div className="panel panel-default">
              <div className="panel-heading">
                Employee Breakup at Department Level
              </div>
              <div className="panel-body">
                <img src="/images/chart_4.jpg"  className="img-responsive"/>
              </div>
            </div>


          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-sm-12 library-wrap">

            <div className="panel panel-default">
              <div className="panel-heading">
                Shares
              </div>
              <div className="panel-body">
                <img src="/images/chart_5.jpg"  className="img-responsive"/>
              </div>
            </div>


          </div>


        </div>
      </div>
    )
  }
};
