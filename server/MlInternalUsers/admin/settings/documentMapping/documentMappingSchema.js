import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let DocumentMapping = `
     type DocumentMapping{
        documentId   : String
        documentName : String
        allowableMaxSize  : String
        allowableFormat : [String]
        clusters :[String]
        kycCategory  : [String]
        isActive : Boolean
     }
     
     type allowableFormatOutput{
          id   :  String
      }    
      type clustersOutput{
          id   :  String
      } 
       type chaptersOutput{
          id   :  String
      }    
      type subChaptersOutput{
          id   :  String
      } 
      type kycCategoryOutput{
          id   :  String
      }    
      type documentTypeOutput{
          id   :  String
      } 
   type DocumentOutput{
        _id:String
        documentId   : String
        documentName : String
        documentDisplayName : String
        validity    : String
        inputLength : String
        remarks     : String
        allowableMaxSize  : String
        issuingAuthority  : String
        allowableFormat : [String]
        clusters :[String]
        chapters    : [String]
        subChapters : [String]
        kycCategory  : [String]
        docCategoryName: String
        documentType   : [String]
        isActive : Boolean
      }
      input allowableFormat{
          id   :  String
      }    
      input clusters{
          id   :  String
      }    
      input chapters{
          id   :  String
      }    
      input subChapters{
          id   :  String
      }
      input kycCategory{
          id   :  String
      }
      input documentType{
          id   :  String
      }
      input documentInput{
        documentId : String,
        documentDisplayName  : String,
        allowableFormat : [String],
        clusters    : [String],
        chapters    : [String],
        subChapters : [String],
        validity    : String,
        inputLength : String,
        remarks     : String,
        documentName : String,
        kycCategory  : [String],
        documentType : [String],
        allowableMaxSize  : String,
        issuingAuthority  : String,
        isActive    : Boolean
      }
      
     
      type Mutation {
         createDocument(document:documentInput, moduleName:String, actionName:String):response
         updateDocument(documentId:String,document:documentInput, moduleName:String, actionName:String):response
      }
      type Query{
        findDocument(documentId:String): DocumentOutput
        findDocuments: [DocumentOutput]
        findProcessDocuments(kycId:String,processId:String): [DocumentOutput]
        fetchKycDocProcessMapping(documentTypeId:String,clusterId:[String],chapterId:[String],subChapterId:[String]):[DocumentOutput]
      }
     
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentMapping]);

