import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let ClusterSchema = `
    type Cluster{
      countryId :String
      displayName :String
      about: String
      link: String
      _id:String
      email:String
      showOnMap : Boolean
      countryFlag:String
      latitude:String 
      longitude:String
    }
   
    
    type Mutation 
    {
        createCluster(countryId:String, displayName:String, about:String, link:String, email:String, showOnMap:Boolean, isActive:Boolean, moduleName:String, actionName:String, latitude:String, longitude:String):String
    }    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ClusterSchema]);
