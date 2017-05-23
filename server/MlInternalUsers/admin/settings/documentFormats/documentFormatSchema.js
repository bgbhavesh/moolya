import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let DocumentFormatsSchema = `
    type DocumentFormats
    {
      docFormatName :String
      docFormatDisplayName :String
      about :String
      _id :String
      createdDateTime: Date
      isActive :Boolean
    }
    input documentFormatObject{
        docFormatName :String,
        docFormatDisplayName :String,
        about :String,
        _id :String,
        isActive :Boolean
    }
    
   type Mutation 
    {
        updateDocumentFormat(_id:String, docFormatName:String, docFormatDisplayName:String, about:String, isActive:Boolean , moduleName:String, actionName:String):response
        createDocumentFormat(documentFormat:documentFormatObject, moduleName:String, actionName:String):response
    }
    type Query{
        findDocumentFormat(_id:String): DocumentFormats
        fetchDocumentsFormat:[DocumentFormats]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentFormatsSchema]);
