/**
 * Created by vishwadeep on 18/5/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function addSubChapterActionHandler(subChapterDetails) {
  let subChapter = subChapterDetails;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($subChapter:subChapterObject, $moduleName:String, $actionName:String){
        createSubChapter(
          subChapter:$subChapter,
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
      subChapter:subChapter,
      moduleName:"SUBCHAPTER",
      actionName:"CREATE"
    }
  })
  const id = result.data.createSubChapter;
  return id
}
