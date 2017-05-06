/**
 * Created by vishwadeep on 6/5/17.
 */

import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from 'lodash'

export async function fetchfunderPortfolioInvestor(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchfunderPortfolioInvestor(portfoliodetailsId: $portfoliodetailsId) {
                  dateOfInvestment
                  isDateOfInvestmentPrivate
                  companyName
                  isCompanyNamePrivate
                  typeOfFundingId
                  typeOfFundingName
                  isTypeOfFundingPrivate
                  aboutInvestment
                  isAboutInvestmentPrivate
                  isPrivate
                  investmentAmount 
                  isInvestmentAmountPrivate 
                  index
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchfunderPortfolioInvestor;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}
