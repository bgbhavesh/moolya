/**
 * Created by pankaj on 19/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";

export default class MlAppActivityList extends React.Component{

  render(){
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead/>
          <div className="col-lg-12" id="show">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <a href="/app/createActivity">
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Add New</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block img_list_block notrans">
                  <img src="/images/activity_1.jpg"/>
                  <h3>Demonstrate Projects</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block img_list_block notrans">
                  <img src="/images/activity_2.jpg"/>
                  <h3>Use of Investment</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block img_list_block notrans">
                  <img src="/images/activity_3.jpg"/>
                  <h3>Estimate Subsidies</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block img_list_block notrans">
                  <img src="/images/activity_4.jpg"/>
                  <h3>Equity of Crowd Funding</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block img_list_block notrans">
                  <img src="/images/activity_5.jpg"/>
                  <h3>Debate the issues</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
