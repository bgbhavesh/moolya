import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addBusinessTypeActionHandler(BusinessTypeDetails) {
  let businessTypeName = BusinessTypeDetails.businessTypeName;
  let businessTypeDisplayName = BusinessTypeDetails.businessTypeDisplayName;
  let about = BusinessTypeDetails.about;
  let isActive = BusinessTypeDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($businessTypeName: String, $businessTypeDisplayName: String, $about:String, $isActive: Boolean){
        CreateBusinessType(
          businessTypeName: $businessTypeName,
          businessTypeDisplayName: $businessTypeDisplayName,
          about:$about,
          isActive :$isActive
        )
      }
    `,
    variables: {
      businessTypeName,
      businessTypeDisplayName,
      about,
      isActive
    }
  })
  const id = result.data.CreateBusinessType;
  return id
}
