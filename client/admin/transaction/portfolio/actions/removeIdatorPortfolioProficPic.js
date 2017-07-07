import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function removePortfolioProfilePic(portfoliodetailsId) {

  const result = await client.mutate({
    mutation: gql`
     mutation($portfoliodetailsId: String){
           removeIdetaorProfilePic(portfoliodetailsId:$portfoliodetailsId) {
            success
            code
            result
          }
        }
    `,
    variables: {
      portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.removeIdetaorProfilePic;
  return id
}
