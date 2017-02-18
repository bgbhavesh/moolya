import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function updateSubChapterActionHandler(subChapterDetails) {
  let _id = subChapterDetails._id;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($subChapterId:String,$subChapterDetails:subChapterObject){
        updateSubChapter(
          subChapterId:$subChapterId,
          subChapterDetails:$subChapterDetails
        )
      }
    `,
    variables: {
      subChapterId:_id,
      subChapterDetails:subChapterDetails
    }
  })
  const id = result;
  return id
}
