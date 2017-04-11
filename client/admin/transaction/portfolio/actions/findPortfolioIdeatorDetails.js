/**
 * Created by venkatasrinag on 6/4/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findIdeatorDetailsActionHandler(portfoliodetailsId) {

  const result = await client.query({
      query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioDetails(portfoliodetailsId: $portfoliodetailsId) {
              firstName
              isfirstNamePrivate
              lastName
              islastNamePrivate
              gender
              isGenderPrivate
              dateOfBirth
              isDateOfBirthPrivate
              qualification
              isQualificationPrivate
              employmentStatus
              isEmploymentStatusPrivate
              professionalTag
              isProfessionalTagPrivate
              yearsofExperience
              isYoePrivate
              industry
              isIndustryPrivate
              profession
              isProfessionPrivate
              employerName
              isEmployerNamePrivate
              mobileNumber
              isMobileNumberPrivate
              emailId
              isEmailIdPrivate
              facebookId
              isfacebookIdPrivate
              linkedInId
              islinkedInIdPrivate
              twitterId
              isTwitterIdPrivate
              gplusId
              isGplusIdPrivate
              profilePic
            }
          }

      `,
      variables: {
        portfoliodetailsId: portfoliodetailsId
      },
      forceFetch: true
  })
  const id = result.data.fetchIdeatorPortfolioDetails;
  return id
}
