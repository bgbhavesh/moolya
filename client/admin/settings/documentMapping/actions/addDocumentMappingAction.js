import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDocumentMappingActionHandler(Details) {

  // let clustersList = Details.clusters;
  // let clusters = [];
  // for(var i in clustersList) {
  //   var cluster = clustersList[i];
  //   clusters.push({
  //     "id" : cluster
  //   });
  // }
  // Details.clusters=clusters;
  //
  // let chapterList = Details.chapters;
  // let chapters = [];
  // for(var i in chapterList) {
  //   var chapter = chapterList[i];
  //   chapters.push({
  //     "id" : chapter
  //   });
  // }
  // Details.chapters=chapters;
  //
  // let subChapterList = Details.subChapters;
  // let subChapters = [];
  // for(var i in subChapterList) {
  //   var subChapter = subChapterList[i];
  //   subChapters.push({
  //     "id" : subChapter
  //   });
  // }
  // Details.subChapters=subChapters;
  //
  // let allowableFormatList = Details.allowableFormat;
  // let allowableFormats = [];
  // for(var i in allowableFormatList) {
  //   var allowableFormat = allowableFormatList[i];
  //   allowableFormats.push({
  //     "id" : allowableFormat
  //   });
  // }
  // Details.allowableFormat=allowableFormats;
  //
  // let kycCategoryList = Details.kycCategory;
  // let kycCategories = [];
  // for(var i in kycCategoryList) {
  //   var kycCategory = kycCategoryList[i];
  //   kycCategories.push({
  //     "id" : kycCategory
  //   });
  // }
  // Details.kycCategory=kycCategories;
  //
  // let documentTypeList = Details.documentType;
  // let documentTypes = [];
  // for(var i in documentTypeList) {
  //   var documentType = subChapterList[i];
  //   documentTypes.push({
  //     "id" : documentType
  //   });
  // }
  // Details.documentType=documentTypes;

  const result = await client.mutate({
    mutation: gql`
        mutation ($document:documentObject){
            createDocument(
                document: $document
            ) 
         }
        `,
    variables: {
      document: Details
    }
  })
  console.log(result)
  const id = result.data.createDocument;
  return id
}
