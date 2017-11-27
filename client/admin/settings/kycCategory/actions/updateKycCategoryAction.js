import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateKycCategoryActionHandler(Details) {
  const _id = Details._id;
  const docCategoryName = Details.docCategoryName;
  const docCategoryDisplayName = Details.docCategoryDisplayName;
  const about = Details.about;
  const isActive = Details.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$docCategoryName: String, $docCategoryDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        updateKycCategory(
          _id:$_id
          docCategoryName: $docCategoryName,
          docCategoryDisplayName: $docCategoryDisplayName,
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
      docCategoryName,
      docCategoryDisplayName,
      about,
      isActive,
      moduleName: 'DOCUMENTCATEGORIES',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.updateKycCategory;
  return id
}
