import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let DocumentTypesSchema = `
    type DocumentTypes
    {
      docTypeName :String
      docTypeDisplayName :String
      about :String
      _id :String
      isActive :Boolean
    }
    input documentTypeObject{
        docTypeName :String,
      docTypeDisplayName :String,
      about :String,
      _id :String,
      isActive :Boolean
    }
    
   type Mutation 
    {
        updateDocumentType(_id:String, docTypeName:String, docTypeDisplayName:String, about:String, isActive:Boolean):String
        createDocumentType(documentType:documentTypeObject):String
    }
    type Query{
        findDocumentType(_id:String): DocumentTypes
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentTypesSchema]);
