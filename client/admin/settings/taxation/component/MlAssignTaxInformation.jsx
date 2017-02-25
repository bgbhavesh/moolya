import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
var Select = require('react-select');

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];
function logChange(val) {
  console.log("Selected: " + val);
}
export default class MlAssignTaxInformation extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div id={this.props.id} className="accordian-body collapse">

        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Tax
            Information</a></li>
          <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Applicable
            States</a></li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="home">
            <table className="table table-striped">
              <thead>

              <tr>
                <td><br /><br /><Select
                  name="form-field-name"
                  options={options}
                  onChange={logChange}
                /></td>
                <td><textarea placeholder="About" className="form-control float-label" id="cl_about">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        </textarea></td>

              </tr>

              </thead>

            </table>
          </div>
          <div role="tabpanel" className="tab-pane" id="profile">
            <table className="table table-striped">
              <thead>
              <tr>
                <td>
                  <div className="form-group">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>All Status</label></div>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>Andhra Pradesh</label></div>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>Telangana</label></div>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>Goa</label></div>
                  </div>
                </td>
              </tr>

              </thead>

            </table>
          </div>
        </div>

      </div>
    )
  }
}
