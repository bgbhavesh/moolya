/**
 * Created by Birendra on 21/8/17.
 */
import React from 'react';
import {render} from 'react-dom';

export default class MlCompanyViewInformation extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Information</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
              <p>{this.props.informationDetails && this.props.informationDetails.informationDescription ? this.props.informationDetails.informationDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
