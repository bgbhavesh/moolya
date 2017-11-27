/**
 * Created by pankaj on 24/5/17.
 */

import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findSubDepartmentActionHandler(SubDepartmentId) {
  const did = SubDepartmentId;

  const result = await client.query({
    query: gql`
    query  ($_id: String){
      findSubDepartment(_id:$_id)  {
        subDepartmentName
        displayName
        aboutSubDepartment
        departmentId
        isActive
        isMoolya
      }
    }`,
    variables: {
      _id: did
    },
    forceFetch: true
  })
  const id = result.data.findSubDepartment;
  return id
}
