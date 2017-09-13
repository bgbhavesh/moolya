/**
 * Created by vishwadeep on 12/9/17.
 */

import React from 'react';
import {render} from 'react-dom';

export default class MlAnchorObjective extends React.Component {
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });

    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 25,
      slidesPerView: 2,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });

  }

  render() {
    return (
      <div className="col-md-12 nopadding">
        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
          <div className="panel panel-default">
            <div className="panel-heading">Objective
              <div className="pull-right block_action"><img src="../images/add.png"/></div>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <textarea placeholder="Enter Text here..." className="form-control float-label"></textarea>
              </div>
              <br className="brclear"/>
              <div className="form-group switch_wrap inline_switch">
                <label className="">Status</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>

              <br className="brclear"/>
            </div>
          </div>
        </div>
        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">Objective
              <div className="pull-right block_action"><img src="../images/add.png"/></div>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <textarea placeholder="Enter Text here..." className="form-control float-label"></textarea>
              </div>
              <br className="brclear"/>
              <div className="form-group switch_wrap inline_switch">
                <label className="">Status</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>

              <br className="brclear"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
