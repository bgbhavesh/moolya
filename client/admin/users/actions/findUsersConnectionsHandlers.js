/**
 * Created by vishwadeep on 27/7/17.
 */
/**
 * import of libs
 * */
import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

export async function fetchConnectionHandler(portfolioId, communityCode) {
  const result = await client.query({
    query: gql `
            query($portfolioId:String, $communityCode: String){
                fetchConnectionsByPortfolio(portfolioId:$portfolioId, communityCode:$communityCode) {
                    userName
                    firstName
                    lastName
                    displayName
                }
            }
        `,
    variables: {
      portfolioId,
      communityCode
    },
    forceFetch: true
  })
  const connection = result.data.fetchConnectionsByPortfolio;
  return connection
}
