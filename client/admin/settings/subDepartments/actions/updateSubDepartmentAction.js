import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateSubDepartmentActionHandler(SubDepartmentDetails) {

  let _id = SubDepartmentDetails._id;
  let details = {
    subDepartmentName: SubDepartmentDetails.subDepartmentName,
    displayName: SubDepartmentDetails.displayName,
    aboutSubDepartment: SubDepartmentDetails.aboutSubDepartment,
    selectCluster: SubDepartmentDetails.selectCluster,
    email: SubDepartmentDetails.email,
    isActive:SubDepartmentDetails.isActive
  }

  const result = await client.mutate({
    mutation: gql`
    mutation ($subDepartmentId:String,$subDepartment:subDepartmentObject){
        updateSubDepartment(
          subDepartmentId:$subDepartmentId,
          subDepartment:$subDepartment
        )
      }
    `,
    variables: {
      subDepartmentId:_id,
      subDepartment:details
    }
  })
  console.log(result)
  const id = result;
  return id
}
