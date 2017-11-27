import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateDocumentTypeActionHandler(DocTypeDetails) {
  const _id = DocTypeDetails.id;
  const docTypeName = DocTypeDetails.docTypeName;
  const docTypeDisplayName = DocTypeDetails.docTypeDisplayName;
  const about = DocTypeDetails.about;
  const isActive = DocTypeDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String,$docTypeName: String, $docTypeDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
            updateDocumentType(
                _id:$_id
                docTypeName: $docTypeName,
                docTypeDisplayName: $docTypeDisplayName,
                about: $about,
                isActive :$isActive,
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
      _id,
      docTypeName,
      docTypeDisplayName,
      about,
      isActive,
      moduleName: 'DOCUMENTTYPE',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.updateDocumentType;
  return id
}
