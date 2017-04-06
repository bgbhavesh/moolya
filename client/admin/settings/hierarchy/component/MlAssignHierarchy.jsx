import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');

var options = [
  {
    value: 'select',
    label: 'Select Tax Name'
  },
  {
    value: 'one',
    label: 'One'
  },
  {
    value: 'two',
    label: 'Two'
  }
];

export default class MlAssignHierarchy extends React.Component {
  render() {
    return (
      <div>
        <div className="row table_row_class">
          <div className="col-md-4">test</div>
          <div className="col-md-4">test2</div>
          <div className="col-md-4">test3</div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Final Approval</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                  Chapter
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                  Community
                </a>
              </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
