import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {fetchDetailsStartupActionHandler} from '../../actions/findPortfolioStartupDetails'


export default class MlStartupViewTechnologies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupBranchesList: []};
  }
  componentWillMount(){
    this.fetchPortfolioStartupDetails();
  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false,startupBranchesList: response});
    }

  }

  render(){
    let that = this;
    let branchesArray = that.state.startupBranchesList || [];
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Technologies</h2>
          <div className="col-lg-12">
            <div className="row">
              {branchesArray && branchesArray.technologies && branchesArray.technologies.map(function (details, idx) {
                return(<div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
                  <div className="team-block">
                    <img src={details.logo&&details.logo.fileUrl} className="team_img"/>
                    <h3>
                      {details.technology} <br />
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
