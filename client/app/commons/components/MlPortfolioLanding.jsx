/**
 * Created by venkatsrinag on 2/5/17.
 */
import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { render } from 'react-dom';
import MlAppIdeatorIdeas from '../../ideator/components/MlAppIdeatorIdeas'

export default class MlPortfolioLanding extends Component {
  constructor(props){
      super(props);
  }

  render(){
      let user = Meteor.user();
      let userCommunity =  ""
      _.each(user.profile.externalUserProfile, function (profile) {
          if(profile.isDefault){
              userCommunity = profile.communityDefName
          }
      })

      return(
          <div className="admin_main_wrap">
              {(userCommunity=="Ideators")?
                <MlAppIdeatorIdeas/>:<MlAppIdeatorIdeas/>
              }
          </div>
      )
  }
}
