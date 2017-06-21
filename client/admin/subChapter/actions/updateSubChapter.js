import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function updateSubChapterActionHandler(ClusterId, ChapterId, subChapterDetails) {
  let clusterId = ClusterId;
  let chapterId = ChapterId;
  let subChapterId = subChapterDetails.subChapterId;
  let subChapter = subChapterDetails;

  subChapter.moolyaSubChapterAccess = _.omit(subChapter.moolyaSubChapterAccess,'__typename');
  // subChapter.moolyaSubChapterAccess.backendUser=_.omit(subChapter.moolyaSubChapterAccess.backendUser,'__typename');
  subChapter.moolyaSubChapterAccess.externalUser=_.omit(subChapter.moolyaSubChapterAccess.externalUser,'__typename');

  subChapter.internalSubChapterAccess = _.omit(subChapter.internalSubChapterAccess,'__typename');
  subChapter.internalSubChapterAccess.backendUser=_.omit(subChapter.internalSubChapterAccess.backendUser,'__typename');
  subChapter.internalSubChapterAccess.externalUser=_.omit(subChapter.internalSubChapterAccess.externalUser,'__typename');

  const result = await client.mutate({
    mutation: gql`
    mutation  ($clusterId:String, $chapterId:String, $subChapterId:String,$subChapterDetails:subChapterObject, $moduleName:String, $actionName:String){
        updateSubChapter(
          clusterId:$clusterId,
          chapterId:$chapterId,
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
      clusterId:clusterId,
      chapterId:chapterId,
      subChapterId:subChapterId,
      subChapterDetails:subChapter,
      moduleName:"SUBCHAPTER",
      actionName:"UPDATE"
    }
  })
  const id = result.data.updateSubChapter;
  return id
}
