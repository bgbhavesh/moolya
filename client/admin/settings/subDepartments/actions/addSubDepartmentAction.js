import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addSubDepartmentActionHandler(SubDepartmentDetails)
{
  let subDepartment=SubDepartmentDetails
  /*  let subDepartmentName = SubDepartmentDetails.subDepartmentName;
    let displayName = SubDepartmentDetails.displayName;
    let aboutSubDepartment = SubDepartmentDetails.about;
    let selectCluster = SubDepartmentDetails.selectCluster;
    let isActive = SubDepartmentDetails.status;
    let isMoolya = false;
    let departmentId = "Moolya DPT ID";
    let subDepatmentAvailable = [];
*/
    const result = await client.mutate({
        mutation: gql`
        mutation ($subDepartment:subDepartmentObject){
            createSubDepartment(
                subDepartment: $subDepartment
            ) 
         }
        `,
        variables: {
            subDepartment
        }
    })
    console.log(result)
    const id = result.data.createSubDepartment;
    return id
}
