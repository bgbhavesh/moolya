import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addTitleActionHandler(TitleDetails) {
  let titleName = TitleDetails.titleName;
  let titleDisplayName = TitleDetails.titleDisplayName;
  let aboutTitle = TitleDetails.aboutTitle;
  let isActive = TitleDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($titleName: String, $titleDisplayName: String, $aboutTitle: String,$isActive: Boolean){
        CreateTitle(
          titleName: $titleName,
          titleDisplayName: $titleDisplayName,
          aboutTitle: $aboutTitle,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      titleName,
      titleDisplayName,
      aboutTitle,
      isActive
    }
  })
  const id = result.data.CreateTitle;
  return id
}
