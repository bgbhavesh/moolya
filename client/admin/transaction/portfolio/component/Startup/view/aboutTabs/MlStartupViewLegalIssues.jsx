import React from 'react';
import {render} from 'react-dom';

export default class MlStartupViewLegalIssues extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Legal Issue</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
              <p>{this.props.legalIssueDetails && this.props.legalIssueDetails.legalDescription ? this.props.legalIssueDetails.legalDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};