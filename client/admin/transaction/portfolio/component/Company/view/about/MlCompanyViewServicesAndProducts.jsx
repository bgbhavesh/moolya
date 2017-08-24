/**
 * Created by Birendra on 21/8/17.
 */
import React from 'react';
import {render} from 'react-dom';


export default class MlCompanyViewServicesAndProducts extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Service & Products</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              <p>{this.props.serviceProductsDetails && this.props.serviceProductsDetails.spDescription ? this.props.serviceProductsDetails.spDescription : ""}</p>

            </div>
          </div>

        </div>
      </div>
    )
  }
};
