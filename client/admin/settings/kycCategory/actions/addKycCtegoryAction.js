import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addKycCategoryActionHandler(Details)
{
  let docCategoryName = Details.docCategoryName;
  let docCategoryDisplayName = Details.docCategoryDisplayName;
  let about = Details.about;
  let isActive = Details.isActive;

  const result = await client.mutate({
    mutation: gql`
        mutation ($kycCategory:kycCategoryObject){
            createKycCategory(
                kycCategory: $kycCategory
            ) 
         }
        `,
    variables: {
      kycCategory: Details
    }
  })
  console.log(result)
  const id = result.data.createKycCategory;
  return id
}
