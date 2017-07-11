import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import StarRatings from '../../commons/components/StarRatings'



export default class AppStartupAboutUs extends React.Component{
  componentDidMount(){}
  render(){
    return (
      <div>
        <div className="col-md-6 col-sm-12 nopadding">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">About Us <a href="/app/appStartupDetailsView" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h'/></a></div>
            <div className="panel-body panel-body-scroll" style={{'height':'384px'}}>
              <h4>Haptik</h4>
              <p>Haptik, Inc. provides a personal assistant application for users to get their service-related issues resolved by connecting them with experts from various enterprises. The company’s application offers information in the areas of shopping deals and coupons, food delivery, mobile plans and recharge, travel, utilities and repairs, Web check-in, restaurant reservations, service centers, and wellness; and transactional messages to remind users about their important daily tasks. Its application allows users to file a complaint or service request, check PNR or train status, find flight schedules and prices, find car or bike prices, check movie timings, and others. The company was founded in 2013 and is based in Mumbai, India.</p>
              <p>The app is  available in India on the iOS & Android platforms starting 31.3.14.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 nopadding-right">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">Rating <a href="/admin/startupPortfolioView" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h'/></a></div>
            <div className="panel-body rating_small">
              <StarRatings/>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6 col-sm-12 nopadding-left">
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Clients <a href="/app/appStartupDetailsView" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h'/></a></div>
              <div className="panel-body text-center panel-body-scroll">
                <img src="/images/client_01.png"/>
                <img src="/images/client_02.png"/>
                <img src="/images/client_03.png"/>
              </div>
            </div></div>
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Service & Products <a href="/app/appStartupDetailsView" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h'/></a></div>
              <div className="panel-body panel-body-scroll">
                <p>Haptik is a smartphone application that allows users to communicate with company experts over messaging. Think of Whatsapp - but instead between support experts and their users.</p>
                <p>Haptik is Everyone’s Personal Assistant to get things done on chat.</p>
              </div>
            </div></div>
          </div>
          <div className="col-md-6 col-sm-12 nopadding"><div className="panel panel-default panel-form-view">
            <div className="panel-heading">Information <a href="/app/appStartupDetailsView" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h'/></a></div>
            <div className="panel-body panel-body-scroll" style={{'height':'274px'}}>
              <ul className="list-info">
                <li>Chat-based commerce-platform Haptik adds ‘SmartWallet’, to improve UI with machine learning</li>
                <li>Haptik, an India-based mobile concierge service, raises $11.2M from Times Internet</li>
                <li>Haptik onboards NLP expert Dan Roth to improve the technology layer under its 150+ chat experts</li>
                <li>Haptik, the Whatsapp for customer support raises $1 million from Kalaari Capital</li>
                <li>Haptik, the Whatsapp to chat with brands, releases its 10 day scorecard</li>
                <li>Ex-Director of Flurry India, Aakrit Vaish starts up Haptik riding on the messaging wave</li>
              </ul>
            </div>
          </div></div>

        </div>
      </div>
    )
  }
};
