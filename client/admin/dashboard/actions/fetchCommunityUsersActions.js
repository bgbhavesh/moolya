import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function fetchCommunityUsersHandler(clusterId,chapterId,subChapterId,userType) {
  // let did = subChapterId
  const result = await client.query({
    query: gql`
     query($clusterId:String, $chapterId:String, $subChapterId:String, $userType:String){
          data:fetchUsersForDashboard(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, userType:$userType){
              totalRecords
              data{
                  ...on BackendUsers{
                      _id,
                      profile{
                          isInternaluser,
                          isExternaluser,
                          isActive,
                          email,
                          InternalUprofile{
                              moolyaProfile{
                                userType,
                                roleType,
                                displayName,
                                globalAssignment,
                                isActive
                              }
                          }    
                      }
                  }
              }      
          }
      }
    `,
    variables: {
      clusterId:clusterId,
      chapterId:chapterId,
      subChapterId:subChapterId,
      userType: userType
    },
    forceFetch: true
  })
  const id = result.data.data.data;
  console.log(result.data);
  return id
}