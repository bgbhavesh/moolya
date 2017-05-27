/**
 * Created by venkatsrinag on 2/5/17.
 */
import React, {Component, PropTypes} from "react";
import {graphql} from "react-apollo";
import {render} from "react-dom";
import MlAppIdeatorIdeas from "../../ideators/components/MlAppIdeatorIdeas";
import MlAppPortfolio from "../../../app/commons/components/MlAppPortfolio";
import {fetchPortfolioDetails} from "../actions/fetchUserDetails";
import MlLoader from "../../../commons/components/loader/loader";

export default class MlPortfolioLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {}
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp;
  }

  async fetchPortfolioDetails() {
    const response = await fetchPortfolioDetails();
    if (response) {
      this.setState({loading: false, data: response})
    }else {
      this.setState({loading:false});
    }
  }

  render() {
    const showLoader = this.state.loading;
    // let user = Meteor.user();
    let userCommunity = ""
    // if (user.profile.externalUserProfiles.length > 1) {
    //   _.each(user.profile.externalUserProfiles, function (profile) {
    //     if (profile.isDefault) {
    //       userCommunity = profile.communityDefName
    //     }
    //   })
    // } else {
    //   userCommunity = user.profile.externalUserProfiles[0].communityDefName
    // }
    // let communityType = "";
    // let portfolioId = this.state.data._id
    let portfolioId = this.state.data.portfolioId
    if (this.state.data && this.state.data.communityType == "Funders") {
      userCommunity = "funder"
    }else {
      userCommunity = this.state.data.communityType
    }


    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="admin_main_wrap">
            {(userCommunity == "Ideators") ?
              <MlAppIdeatorIdeas/> : <MlAppPortfolio config={portfolioId} communityType={userCommunity}/>
            }
          </div>
        )}
      </div>

    )
  }
}
//<MlAppIdeatorIdeas/> : <MlAppPortfolio config={portfolioId} communityType={communityType}/>
