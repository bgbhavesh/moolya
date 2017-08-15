import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef';
import MlResolver from '../../commons/mlResolverDef'

let sharedLibrarySchema = `

    type userDetails{
      userId: String
      profileId: Boolean
    }
    
    type fileDetails{
      url: String
      fileName: String
      fileType: String
      libraryDocumentId: String
    }
    
     type Share{
      _id: String
      user: userDetails
      owner: userDetails
      file: fileDetails
      sharedEndDate: Date
      sharedStartDate: Date
      isSignedUrl: Boolean
      isDownloadable: Boolean
      createdBy: String
      createdAt: Date
      updatedAt: Date
      updatedBy: String
      isActive: Boolean
    }
    
    input userInput{
      userId: String
      profileId: String
    }
    
    input fileInput{
      url: String
      fileName: String
      fileType: String
      libraryDocumentId: String
    }
    
    
    input sharedInput {
      users: [userInput]!
      files: [fileInput]!
      sharedEndDate: Date
      sharedStartDate: Date
      isSignedUrl: Boolean
      isDownloadable: Boolean
    }
   

 type Query{
      fetchSharedLibrary(userId:String):[Details]
 }
 
 type Mutation{
      updateSharedLibrary(id: String,files:sharedInput): response
      createSharedLibrary(detailsInput:sharedInput):response
 }`;

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], sharedLibrarySchema ]);

let supportedApi = [
  {api:'fetchSharedLibrary', actionName:'READ', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'createSharedLibrary', actionName:'CREATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'updateSharedLibrary', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true}
];

MlResolver.MlModuleResolver.push(supportedApi);
