import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findEmailTypeActionHandler(Id) {
  const did = Id;
  /* const result = await client.query({
    query: gql`
    query  ($id: String){
        findEmailType(_id:$id){
              emailName
              aboutEmail
              emailDisplayName
              _id
              isActive
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findEmailType;
  return id */
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findMasterSetting(_id:$id){
         id:_id
        isActive
        emailTypeInfo{
             emailName
             aboutEmail
             emailDisplayName
        }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  });
  const masterSetting = result.data.findMasterSetting || {};
  const { emailName, aboutEmail, emailDisplayName } = masterSetting.emailTypeInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, emailName, aboutEmail, emailDisplayName
    };
  }
  return {};
}
