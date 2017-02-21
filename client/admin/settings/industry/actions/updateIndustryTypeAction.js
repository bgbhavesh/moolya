import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateIndustryTypeActionHandler(IndustryType) {
  let _id=IndustryType.id;
  let industryName = IndustryType.industryName;
  let industryDisplayName = IndustryType.industryDisplayName;
  let about = IndustryType.about;
  let isActive = IndustryType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$industryName: String, $industryDisplayName: String, $about: String,$isActive: Boolean){
        UpdateIndustry(
          _id:$_id
          industryName: $industryName,
          industryDisplayName: $industryDisplayName,
          about: $about,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      industryName,
      industryDisplayName,
      about,
      isActive
    }
  })
  const id = result;
  return id
}
