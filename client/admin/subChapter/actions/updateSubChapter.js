import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function updateSubChapterActionHandler(subChapterDetails) {
  let subChapterId = subChapterDetails.subChapterId;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($subChapterId:String,$subChapterDetails:subChapterObject, $moduleName:String, $actionName:String){
        updateSubChapter(
          subChapterId:$subChapterId,
          subChapterDetails:$subChapterDetails,
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
      subChapterId:subChapterId,
      subChapterDetails:subChapterDetails,
      moduleName:"SUBCHAPTER",
      actionName:"UPDATE"
    }
  })
  const id = result.data.updateSubChapter;
  return id
}
