/**
 * Created by vishwadeep.kapoor on 07/04/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../admin/mlAdminSchemaDef'
let AuditLogSchema = ` 
      type AuditLogs{
            _id: String
           collectionName:String
           moduleName:String
           collectionName:String
           previousValue:String
           currentValue:String
           action:String
           field:String
           fieldName:String
           docId:String
      }
      
      type Query{

      }
    
    type Mutation{

     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],AuditLogSchema]);