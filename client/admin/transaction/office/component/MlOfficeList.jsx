/**
 * Created by pankaj on 6/6/17.
 */

import React from 'react';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlOfficeTableConfig} from "../config/MlOfficeConfig";

export default class EditTaxation extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.onPriorityChange = this.onPriorityChange.bind(this);
  }

  onPriorityChange(e,priority){
    e.preventDefault();
    let priorityFilter = [];
    switch(priority){
      case 'all':
        break;
      case 'priority-1':
        priorityFilter = [
          {
            fieldName:"status",
            fieldType:"List",
            operator:"$and",
            value:"Payment Received"
          },
          {
            fieldName:"paymentDetails.isPaid",
            fieldType:"Boolean",
            operator:"$and",
            value:"true"
          }
        ]
        break;
      case 'priority-2':
        priorityFilter =[
          {
            fieldName:"status",
            fieldType:"List",
            operator:"$and",
            value:"Payment Generated"
          },
          // {
          //   fieldName:"paymentDetails.isPaid",
          //   fieldType:"Boolean",
          //   operator:"$and",
          //   value:"false"
          // }
        ]
        break;
      case 'others':
        priorityFilter =[

        ]
        break;
    }
    //

    this.setState({priorityFilter});
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="ml_inner_btn">
            <a className="h_btn" onClick={e=>{this.onPriorityChange(e,'all')}}>All </a>
            <a className="h_btn ml_red" onClick={e=>this.onPriorityChange(e,'priority-1')}>1<sup>st</sup> Priority </a>
            <a className="h_btn ml_orange" onClick={e=>this.onPriorityChange(e,'priority-2')}>2<sup>nd</sup> Priority </a>
            <a className="h_btn"
               // onClick={e=>this.onPriorityChange(e,'others')}
            >Others</a>
          </div>
          <h2>Office List</h2>
          <MlTableViewContainer {...mlOfficeTableConfig} priorityFilter={this.state.priorityFilter}/>
        </div>
      </div>
    );
  }
};
