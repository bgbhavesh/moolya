import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findBackendUserActionHandler(userTypeId) {
  let did=userTypeId
  const result = await client.query({
    query: gql`
    
          query($id: String){
            fetchUser(userId:$id){
              _id,
              profile{
                isInternaluser,
                isExternaluser,
                email,
                InternalUprofile{
                  moolyaProfile{
                    firstName,
                  middleName,
                  lastName,
                  userType,
                  subChapter,
                  roleType,
                  assignedDepartment{
                    department,
                    subDepartment
                  },
                  displayName,
                  email,
                  contact{
                    contactNumberType,
                    countryCode,
                    number,
                    isOTPValidated
                  },
                  globalAssignment,
                  isActive,
                  userProfiles{
                    isDefault,
                    clusterId,
                    clusterName,
                    userRoles{
                      roleId,
                      roleName,
                      clusterId,
                      chapterId,
                      validFrom,
                      validTo,
                      subChapterId,
                      communityId,
                      isActive,
                      hierarchyLevel,
                      hierarchyCode
                      
                    }
                  }
                    
                  }
                }
                
              }
            }
          }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.fetchUser;
  return id
}
