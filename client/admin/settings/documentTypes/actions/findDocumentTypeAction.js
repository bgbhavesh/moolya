import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDocumentTypeActionHandler(documentTypeId)
{
  let did=documentTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findDocumentType(_id:$id){
         _id
        docTypeName
        docTypeDisplayName
        isActive
        about
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findDocumentType;
  console.log("DAta "+id);
  return id
}
