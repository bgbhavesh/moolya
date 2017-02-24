import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateTitleActionHandler(TitleDetails) {
  let _id=TitleDetails.id;
  let titleName = TitleDetails.titleName;
  let titleDisplayName = TitleDetails.titleDisplayName;
  let aboutTitle = TitleDetails.aboutTitle;
  let isActive = TitleDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$titleName: String, $titleDisplayName: String, $aboutTitle: String,$isActive: Boolean){
        UpdateTitle(
          _id:$_id
          titleName: $titleName,
          titleDisplayName: $titleDisplayName,
          aboutTitle: $aboutTitle,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      titleName,
      titleDisplayName,
      aboutTitle,
      isActive
    }
  })
  const id = result;
  return id
}
