import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addDocumentTypeActionHandler(DocTypeDetails) {
  const docTypeName = DocTypeDetails.docTypeName;
  const docTypeDisplayName = DocTypeDetails.docTypeDisplayName;
  const about = DocTypeDetails.about;
  const isActive = DocTypeDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
        mutation ($documentType:documentTypeObject, $moduleName:String, $actionName:String){
            createDocumentType(
                documentType: $documentType,
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
      documentType: DocTypeDetails,
      moduleName: 'DOCUMENTTYPE',
      actionName: 'CREATE'
    }
  })
  const id = result.data.createDocumentType;
  return id
}
