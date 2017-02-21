import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let DocumentMapping = `

   type DocumentMapping{
        documentId   : String
        document : String
        documentDisplayName : String
        validity    : String
        inputLength : String
        remarks     : String
        allowableMaxSize  : String
        issuingAuthority  : String
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
      input documentObject{
        documentId : String,
        documentDisplayName  : String,
        allowableFormat : [allowableFormat],
        clusters    : [clusters],
        chapters    : [chapters],
        subChapters : [subChapters],
        validity    : String,
        inputLength      : String,
        remarks      : String,
        documentName   : String,
        kycCategory  : [kycCategory],
        documentType   : [documentType],
        allowableMaxSize  : String,
        issuingAuthority   : String,
        isActive    : Boolean
      }
      
     
      type Mutation {
         createDocument(document:documentObject): String
      }
     
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentMapping]);

