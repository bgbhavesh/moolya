/**
 * Created by vishwadeep on 3/8/17.
 */
/**
 * import of libs
 * */
import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

export async function fetchFavouritesHandler(portfolioId, communityCode) {
  const result = await client.query({
    query: gql `
            query($portfolioId:String, $communityCode: String){
                fetchFavouritesByPortfolio(portfolioId:$portfolioId, communityCode:$communityCode) {
                    userName
                    firstName
                    lastName
                    displayName
                    chapterName
                }
            }
        `,
    variables: {
      portfolioId,
      communityCode
    },
    forceFetch: true
  })
  const connection = result.data.fetchFavouritesByPortfolio;
  return connection
}
