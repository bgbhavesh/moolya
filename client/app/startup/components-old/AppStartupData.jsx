import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');


export default class AppStartupData extends React.Component{
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
      <div className="col-lg-12 nopadding">
        <h2>Datas</h2>
        <div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Balance Sheet <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_balance.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Profit & Loss <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_loss.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Cash Flow <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_cashflow.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Quarterly Report <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_quarterly.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_capital.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_yearly.jpg"/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Halfyearly Report <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_half.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Capital Structure <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_capital.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Yearly Report <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_yearly.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Anual Report <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_annual2.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Radio <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_radio.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 library-wrap">
            <div className="panel panel-default">
              <div className="panel-heading">
                Share Holdings <span className="see-more pull-right"><a href=""><FontAwesome name='lock'/></a>&nbsp;&nbsp;&nbsp;<a href=""><FontAwesome name='trash-o'/></a></span>
              </div>
              <div className="panel-body">
                <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/data_sharing.jpg"/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
                <div className="thumbnail"><FontAwesome name='lock'/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
