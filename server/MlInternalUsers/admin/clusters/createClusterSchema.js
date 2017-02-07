import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let ClusterSchema = `
    type Cluster{
      countryId :String
      displayName :String
      about: String
      link: String
      id:String
      email:String
      showOnMap : Boolean
      countryFlag:String
    }
   
    
    type Mutation 
    {
        createCluster(countryId:String,displayName:String,about:String,link:String,email:String,showOnMap:Boolean,isActive:Boolean):String
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ClusterSchema]);
