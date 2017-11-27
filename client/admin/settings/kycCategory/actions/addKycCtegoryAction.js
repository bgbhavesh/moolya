import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addKycCategoryActionHandler(Details) {
  const docCategoryName = Details.docCategoryName;
  const docCategoryDisplayName = Details.docCategoryDisplayName;
  const about = Details.about;
  const isActive = Details.isActive;

  const result = await client.mutate({
    mutation: gql`
        mutation ($kycCategory:kycCategoryObject, $moduleName:String, $actionName:String){
            createKycCategory(
                kycCategory: $kycCategory,
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
      kycCategory: Details,
      moduleName: 'DOCUMENTCATEGORIES',
      actionName: 'CREATE'
    }
  })
  const id = result.data.createKycCategory;
  return id
}
