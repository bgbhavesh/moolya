
import React from 'react';

export default class MlCompanyViewAbout extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>About Us</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
              <p>{this.props.aboutUsDetails && this.props.aboutUsDetails.companyDescription ? this.props.aboutUsDetails.companyDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
