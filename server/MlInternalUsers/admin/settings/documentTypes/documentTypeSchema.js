import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
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
        updateDocumentType(_id:String, docTypeName:String, docTypeDisplayName:String, about:String, isActive:Boolean, moduleName:String, actionName:String):response
        createDocumentType(documentType:documentTypeObject, moduleName:String, actionName:String):response
    }
    type Query{
        findDocumentType(_id:String): DocumentTypes
        fetchDocumentsType:[DocumentTypes]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentTypesSchema]);
