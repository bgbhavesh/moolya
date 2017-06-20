/**
 * Created by mohammed.mohasin on 19/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let viewSchema = `
    type Counter{
      actionName:String,
      count:Int  
    }
    type Query{
        fetchInteractionsCount(resourceId:String!,resourceType:String!,actionNames:[String]):[Counter]     
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],viewSchema]);
