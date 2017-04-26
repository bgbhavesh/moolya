import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {findStartupManagementActionHandler} from '../../actions/findPortfolioStartupDetails'


export default class MlStartupViewManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupManagementList: []};
    this.fetchPortfolioStartupDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioStartupDetails();
  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findStartupManagementActionHandler(portfoliodetailsId);
    console.log("-------------------------------------");
    console.log(response);
    if (response) {
      this.setState({loading: false,startupManagementList: response});
    }

  }

  render(){
    let that = this;
    let managementArray = that.state.statstartupManagementList || [];
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Management</h2>
          <div className="col-lg-12">
            <div className="row">
              {managementArray && managementArray.map(function (details, idx) {
                return(<div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
                <div className="team-block">
                  <img src={details.logo&&details.logo.fileUrl} className="team_img" />
                  <h3>
                    {details.firstName}<br /><b>{details.designation}</b>
                  </h3>
                </div>
              </div>)
              })}
            </div>
          </div>
        </div>


      </div>
    )
  }
}
