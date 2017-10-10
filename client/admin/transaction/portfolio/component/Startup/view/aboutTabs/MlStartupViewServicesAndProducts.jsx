/**
 * Created by vishwadeep on 21/8/17.
 */
import React from 'react';
import {render} from 'react-dom';
import NoData from '../../../../../../../commons/components/noData/noData';

export default class MlStartupViewServicesAndProducts extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Service & Products</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              <p>{this.props.serviceProductsDetails && this.props.serviceProductsDetails.spDescription ? this.props.serviceProductsDetails.spDescription : (<NoData tabName={this.props.tabName}/>)}</p>

            </div>
          </div>

        </div>
      </div>
    )
  }
};
