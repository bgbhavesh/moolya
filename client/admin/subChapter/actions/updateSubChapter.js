import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';

export async function updateSubChapterActionHandler(ClusterId, ChapterId, subChapterDetails) {
  const clusterId = ClusterId;
  const chapterId = ChapterId;
  const subChapterId = subChapterDetails.subChapterId;
  const subChapter = _.omit(subChapterDetails, 'subChapterId');
  subChapter.objective = subChapter.objective && subChapter.objective.map(({ description, status }) => ({
    description, status
  }));
  subChapter.contactDetails = subChapter.contactDetails && subChapter.contactDetails.map(det => _.omit(det, '__typename'))

  subChapter.moolyaSubChapterAccess = _.omit(subChapter.moolyaSubChapterAccess, '__typename');
  subChapter.moolyaSubChapterAccess.externalUser = _.omit(subChapter.moolyaSubChapterAccess.externalUser, '__typename');

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
      clusterId,
      chapterId,
      subChapterId,
      subChapterDetails: subChapter,
      moduleName: 'SUBCHAPTER',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.updateSubChapter;
  return id
}
