import gql from 'graphql-tag';
import { client } from '../../../core/apolloConnection';

export async function addBackendUserActionHandler(userObjectDetails, loginUserDetails) { /* adding user context for others admins */
  const user = userObjectDetails
  const clusterId = loginUserDetails.clusterId
  const chapterId = loginUserDetails.chapterId
  const subChapterId = loginUserDetails.subChapterId
  const communityId = loginUserDetails.communityId
  const result = await client.mutate({
    mutation: gql`
       mutation  ($user: userObject!,$clusterId: String, $chapterId: String, $subChapterId: String, $communityId: String){
        createUser(          
          user :$user,
          clusterId: $clusterId,
          chapterId: $chapterId,
          subChapterId: $subChapterId,
          communityId: $communityId
        ){
            success,
            code,
            result
        }
      }
    `,
    variables: {
      user,
      clusterId,
      chapterId,
      subChapterId,
      communityId
    }
  });
  const id = result.data.createUser;
  return id
}
// , $moduleName:String, $actionName:String   /* removing useless code*/

// moduleName:$moduleName,
//   actionName:$actionName
//
// moduleName:"USERS",
//   actionName:"CREATE",
