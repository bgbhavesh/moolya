/**
 * Created by venkatasrinag on 6/4/17.
 */
export async function findPortfolioActionHandler(portfolioId) {
  let regId = portfolioId
  const result = await client.query({
      query: gql`
          query($id: String){
              fetchPortfolioDetails(portfolioId:$id){
                  transcationType:String,
                  name:String,
                  contactNumber:Int,
                  communityType:String,
                  cluster:String,
                  chapter:String,
                  subChapter:String,
                  subscriptionType:String,
                  source:String,
                  createdBy:String,
                  status:String,
                  assignedTo:String,
                  progress:String,
                  isPublic:Boolean,
                  isGoLive:Boolean,
                  isActive:Boolean
              }
          }
      `,
      variables: {
          id: regId
      },
      forceFetch: true
  })
  const id = result.data.fetchPortfolioDetails;
  return id
}
