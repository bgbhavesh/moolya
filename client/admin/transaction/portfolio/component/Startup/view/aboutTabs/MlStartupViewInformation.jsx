/**
 * Created by vishwadeep on 21/8/17.
 */
import React from 'react';
import {render} from 'react-dom';
import NoData from '../../../../../../../commons/components/noData/noData';

export default class MlStartupViewInformation extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Information</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body panel-body-scroll">
              <p>{this.props.informationDetails && this.props.informationDetails.informationDescription ? this.props.informationDetails.informationDescription : (<NoData tabName={this.props.tabName}/>)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
