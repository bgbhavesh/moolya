/**
 * Created by venkatasrinag on 20/2/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findUserDepartmentypeActionHandler(userId) {
  let did=userId
  const result = await client.query({
    query: gql`
      query ($id: String) {
        data: fetchUserDepSubDep(userId: $id) {
          profile {
            InternalUprofile {
              moolyaProfile {
                assignedDepartment {
                  department
                  subDepartment
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
  const id = result.data.data;
  return id
}
