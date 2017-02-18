import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let DocumentFormatsSchema = `
    type DocumentFormats
    {
      docFormatName :String
      docFormatDisplayName :String
      about :String
      _id :String
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
        updateDocumentFormat(_id:String, docFormatName:String, docFormatDisplayName:String, about:String, isActive:Boolean):String
        createDocumentFormat(documentFormat:documentFormatObject):String
    }
    type Query{
        findDocumentFormat(_id:String): DocumentFormats
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentFormatsSchema]);
