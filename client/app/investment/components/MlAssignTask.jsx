/**
 * Created by pankaj on 19/6/17.
 */
import React from "react";
var FontAwesome = require('react-fontawesome');

export default class MlAssignTask extends React.Component {
  render(){
    return(
      <div className="popover">
        <h1>Attached Documents <a href="#" className="pull-right">Add</a></h1>
        <ul className="doc_upload">
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
        </ul>

        <div className="clearfix" />
        <h1>Set priority of attendes <a href="#" className="pull-right attendes-btn">Add</a><a href="#" className="pull-right close-btn" style={{'display':'none'}}>Close</a></h1>
        <ul className="img_upload ul-hide">
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
        </ul>
        <div className="clearfix" />
        <div className="add-attendes" style={{'display':'none'}}>
          <h2><span className="pull-left popover-search"><div className="form-group">
              <input type="text" placeholder="Search here" className="form-control float-label" id=""></input>
            </div></span>
          </h2>
          <div className="clearfix" />
          <div className="col-md-6">
            <ul className="img_upload">
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="img_upload">
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
              <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
            </ul>
          </div>
        </div>
        <div className="clearfix" />
        <hr/>
        <div className="form-group">
          <textarea placeholder="Notes / Remarks" className="form-control float-label" id=""></textarea>
        </div>
        <div className="clearfix" />
        <a href="#" className="save_btn">Assign</a>
      </div>
    )
  }
}
