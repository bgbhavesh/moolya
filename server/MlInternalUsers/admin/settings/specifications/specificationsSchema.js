import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Specification = `        
    type Specification{
      specificationName :String
      specificationDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateSpecification(_id:String,specificationName:String,specificationDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateSpecification(_id:String,specificationName:String,specificationDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindSpecification(_id: String):Specification
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Specification]);
