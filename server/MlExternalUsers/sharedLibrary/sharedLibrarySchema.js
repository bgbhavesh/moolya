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
    
     type AdminShareList {
      _id : String
      createdAt : Date
      createdBy : String
      userId : String
      profileId : String
      email : String
      mobileNumber : String
      cluster : String
      chapter : String
      subChapter : String
      community : String
      transactionType : String
    }
    
      type SharedOutput {
      users: [userDetails]
      files: [fileDetails]
      sharedEndDate: Date
      sharedStartDate: Date
      isSignedUrl: Boolean
      isDownloadable: Boolean
    }
    
    type sharedConnections {
      userId: String
      profilePic: String
      displayName: String
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
      fetchSharedLibraryDetails(sharedId:String):SharedOutput
      getMySharedConnections: [sharedConnections]
      fetchSharedLibrary(userId: String): SharedOutput
 }
 
 type Mutation{
      updateSharedLibrary(id: String,files:sharedInput): response
      createSharedLibrary(detailsInput:sharedInput):response
 }`;

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], sharedLibrarySchema ]);

let supportedApi = [
  {api:'fetchSharedLibraryDetails', actionName:'READ', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'fetchSharedLibrary', actionName:'READ', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'createSharedLibrary', actionName:'CREATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'updateSharedLibrary', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true}
];

MlResolver.MlModuleResolver.push(supportedApi);
