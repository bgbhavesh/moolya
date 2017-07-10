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
import {fetchUserDetailsHandler} from "../actions/fetchUserDetails";

export default class MlPortfolioLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      kycApproved : null
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp;
  }

  componentDidMount(){
    this.fetchUserDetails();

  }

  async fetchPortfolioDetails() {
    const response = await fetchPortfolioDetails();
    if (response) {
      this.setState({loading: false, data: response})
    }else {
      this.setState({loading:false});
    }
  }

  async fetchUserDetails() {
    let response = await fetchUserDetailsHandler()
    if (response) {
      this.setState({kycApproved: response.status});
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

    let kycApproved =  this.state.kycApproved || ""
    let approved;
    if(kycApproved=="Approved"){
      approved =  true
    }else{
      approved = false
    }
    return (
      <div>
        {showLoader === true? (<MlLoader/>) : (
          <div>{kycApproved=="Approved"?<div>
            {(userCommunity == "Ideators") ?
              <MlAppIdeatorIdeas/> : <MlAppPortfolio config={portfolioId} communityType={userCommunity} viewMode={false}/>
            }
          </div>: <div className="app_main_wrap">

            {/*<div className="view_switch map_view"/>*/}

            <div className="app_padding_wrap no_padding">
              <div className="col-md-12">
              <div className="list_view_block">
                <div className="col-md-8 col-md-offset-4">
                  <div className="profile_container my-office-main">
                    <div className="profile_accounts">
                      <span className="ml flaticon-ml-building"></span>
                      <br />
                      </div>
                  </div>
                </div>

                <div className="col-md-12 text-center well mart100">

                  <div className="col-md-12">
                    <a href="#">Kindly complete hard registration,to create portfolio</a>
                  </div>

                </div>
            </div>
              </div>
            </div>
          </div>}</div>
        )}
      </div>

    )
  }
}
//<MlAppIdeatorIdeas/> : <MlAppPortfolio config={portfolioId} communityType={communityType}/>
