import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {fetchStartupPortfolioLookingFor} from '../../actions/findPortfolioStartupDetails'


export default class MlStartupViewLookingFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupLookingforList: []};
    this.fetchPortfolioStartupDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioStartupDetails();
  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchStartupPortfolioLookingFor(portfoliodetailsId);
    if (response) {
      this.setState({loading: false,startupLookingforList: response});
    }

  }
  render(){
    let that = this;
    let lookingforArray = that.state.startupLookingforList || [];
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Looking For</h2>
          <div className="col-lg-12">
            <div className="row">
              {lookingforArray && lookingforArray.map(function (details, idx) {
               return(<div className="col-lg-2 col-md-3 col-sm-4">
                <div className="team-block">
                  <img src={details.logo&&details.logo.fileUrl} className="team_img" />
                  <h3>
                    {details.lookingFor}
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
