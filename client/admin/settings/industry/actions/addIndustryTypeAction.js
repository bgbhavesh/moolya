import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addIndustryActionHandler(IndustryDetails) {
  let industryName = IndustryDetails.industryName;
  let industryDisplayName = IndustryDetails.industryDisplayName;
  let about = IndustryDetails.about;
  let isActive = IndustryDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($industryName: String, $industryDisplayName: String, $about: String,$isActive: Boolean){
        CreateIndustry(
          industryName: $industryName,
          industryDisplayName: $industryDisplayName,
          about: $about,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      industryName,
      industryDisplayName,
      about,
      isActive
    }
  })
  const id = result.data.CreateIndustry;
  return id
}
