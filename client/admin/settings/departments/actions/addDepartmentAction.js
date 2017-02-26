import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDepartmentActionHandler(DepartmentDetails) {
  let departmentName = DepartmentDetails.departmentName;
  let displayName = DepartmentDetails.displayName;
  let departmentDesc = DepartmentDetails.aboutDepartment;
  let isActive = DepartmentDetails.departmentStatus;
  let isMoolya = DepartmentDetails.appType;
  let departmentAvailable = DepartmentDetails.departmentAvailablity;
/*
  var arrayLength = departmentAvailable.length;
  for (var j = 0; j < arrayLength; j++) {
    let clusters = departmentAvailable[j].cluster;
    departmentAvailable[j].cluster=null;
    let clustersList = [];
    if(isMoolya==true){
      clustersList.push({
          "clusterId" : clusters
        });

    }else{
      for(var i in clusters) {
        var cluster = clusters[i];
        clustersList.push({
          "clusterId" : cluster
        });
      }
    }

    departmentAvailable[j].cluster=clustersList;
  }*/

  const result = await client.mutate({
    mutation: gql`
    mutation  ($departmentName: String, $displayName: String, $departmentDesc: String, $isMoolya: Boolean, $departmentAvailable: [DepatmentAvailable], $isActive: Boolean, $moduleName:String!, $actionName:String!){
        createDepartment(
          department :{
          departmentName: $departmentName,
          displayName: $displayName,
          departmentDesc: $departmentDesc,
          isMoolya :$isMoolya,
          depatmentAvailable: $departmentAvailable,
          isActive :$isActive
          },
          moduleName:$moduleName,
          actionName:$actionName
        ) 
      }
    `,
    variables: {
      departmentName,
      displayName,
      departmentDesc,
      isMoolya,
      departmentAvailable,
      isActive,
      moduleName:"DEPARTMENT",
      actionName:"CREATE"
    }
  })
  const id = result.data.CreateDepartment;
  return id
}
