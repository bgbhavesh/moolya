import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addSubDepartmentActionHandler(SubDepartmentDetails)
{
  let subDepartment=SubDepartmentDetails;
  let availableSubDepts=subDepartment["subDepatmentAvailable"]||[];
  subDepartment["subDepatmentAvailable"] = _.map(availableSubDepts, function(o) { return _.omit(o, '__typename'); })||[];
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
        mutation ($subDepartment:subDepartmentObject,$moduleName:String, $actionName:String){
            createSubDepartment(
                subDepartment: $subDepartment,
                moduleName:$moduleName,
                actionName:$actionName
            ){
              success,
              code,
              result
            } 
         }
        `,
        variables: {
            subDepartment,
            moduleName:"SUBDEPARTMENT",
            actionName:"CREATE"
        }
    })

    const id = result.data.createSubDepartment;
  console.log(id)
    return id
}
