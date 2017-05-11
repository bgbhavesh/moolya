/**
 * Created by venkatsrinag on 2/5/17.
 */
import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { render } from 'react-dom';
import MlAppIdeatorIdeas from '../../ideators/components/MlAppIdeatorIdeas'
import MlAppPortfolio from '../../../app/commons/components/MlAppPortfolio'
import {fetchPortfolioDetails} from '../actions/fetchUserDetails'

export default class MlPortfolioLanding extends Component {
  constructor(props){
      super(props);
      this.state={
        loading:false,
        data:{}
      }
      this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
    // this.setState({loading:true})
    this.fetchPortfolioDetails()
  }

  async fetchPortfolioDetails() {
    const response = await fetchPortfolioDetails();
    if(response){
      this.setState({loading:false, data:response})
    }
  }

  render(){
      let user = Meteor.user();
      let userCommunity =  ""
      if(user.profile.externalUserProfiles.length>1){
        _.each(user.profile.externalUserProfiles, function (profile) {
          if(profile.isDefault){
            userCommunity = profile.communityDefName
          }
        })
      }else{
        userCommunity = user.profile.externalUserProfiles[0].communityDefName
      }
      let communityType="";
      let portfolioId= this.state.data._id
      if(this.state.data && this.state.data.communityType=="Funders"){
        communityType ="funder"
      }


      return(
          <div className="admin_main_wrap">
              {(userCommunity=="Ideators")?
                <MlAppIdeatorIdeas/>:<MlAppPortfolio config={portfolioId} communityType={communityType}/>
              }
          </div>
      )
  }
}
