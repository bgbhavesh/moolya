import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

export default class MlDetailsNotesComponent extends React.Component {
  render() {
    let that=this;
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#details${that.props.id}`} data-toggle="tab">Details</a>
          </li>
          <li><a href={`#notes${that.props.id}`} data-toggle="tab">Notes</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`details${that.props.id}`}>
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <input type="text" placeholder="Requested for" defaultValue={that.props.transaction.transactionTypeName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device name" defaultValue="HP-Laptop" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device ID" defaultValue="1234-AB" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="profile_block">
                  <img src="/images/p_1.jpg" />
                  <span>
                  Miland<br />Hyderabad,India
                </span>
                </div>
              </div>

            </div>
          </div>
          <div className="tab-pane" id={`notes${that.props.id}`}>
            <div className="row">
              <div className="col-md-8 nopadding">
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" placeholder="Approval for" defaultValue="Edit Chapter" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Department" defaultValue="Admin" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Role" defaultValue="Cluster Admin" className="form-control float-label" id=""/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" placeholder="Device name" defaultValue="Ipad Pro" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub-Department" defaultValue="Sys-Admin" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Device ID" defaultValue="AP-123-KYC-123" className="form-control float-label" id=""/>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="ml_btn">
                    <a href="#" className="save_btn">View</a>
                    <a href="#" className="cancel_btn">Actions</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="profile_block">
                  <img src="/images/p_1.jpg" />
                  <span>
                  Miland<br />Hyderabad,India
                </span>
                </div>
              </div>



            </div>
          </div>


        </div>

      </div>

    );
  }
}
