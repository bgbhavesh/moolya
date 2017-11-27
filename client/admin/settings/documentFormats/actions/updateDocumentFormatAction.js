import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateDocumentFormatActionHandler(Details) {
  const _id = Details._id;
  const docFormatName = Details.docFormatName;
  const docFormatDisplayName = Details.docFormatDisplayName;
  const about = Details.about;
  const isActive = Details.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$docFormatName: String, $docFormatDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        updateDocumentFormat(
          _id:$_id
          docFormatName: $docFormatName,
          docFormatDisplayName: $docFormatDisplayName,
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
      docFormatName,
      docFormatDisplayName,
      about,
      isActive,
      moduleName: 'DOCUMENTFORMAT',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.updateDocumentFormat;
  return id
}
