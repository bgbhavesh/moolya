import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {fetchStartupPortfolioAwards} from '../../actions/findPortfolioStartupDetails'


export default class MlStartupViewAwards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupAwardsList: []};
    this.fetchPortfolioStartupDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioStartupDetails();
  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchStartupPortfolioAwards(portfoliodetailsId);
    if (response) {
      this.setState({loading: false,startupAwardsList: response});
    }

  }

  render(){
    let that = this;
    let awardsArray = that.state.startupAwardsList || [];
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Awards</h2>
          <div className="col-lg-12">
            <div className="row">
              {awardsArray && awardsArray.map(function (details, idx) {
                return (<div className="col-lg-2 col-md-3 col-sm-4">
                  <div className="team-block">
                    <img src={details.logo&&details.logo.fileUrl} className="team_img" />
                    <h3>
                      {details.award}
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
