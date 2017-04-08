import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let clusterSchema = `
    type Cluster{
        _id:String
        countryName: String
        countryId :String
        displayName :String
        clusterCode:String
        about: String
        link: String
        email:String
        showOnMap : Boolean
        
        isActive: Boolean
        countryFlag:String
        latitude:String 
        longitude:String
        status:status
    }
    type status{
      code: String
      description: String
    }
      input clusterUpdateObject{
        _id:String,
        countryName: String
        displayName:String, 
        clusterCode:String,
        about:String,  
        email:String, 
        showOnMap:Boolean, 
        isActive:Boolean
    }
    
    input clusterObject{
        countryId:String, 
        countryName: String
        displayName:String,
        clusterCode:String,
        about:String, 
        countryFlag:String, 
        email:String, 
        showOnMap:Boolean, 
        isActive:Boolean, 
        moduleName:String, 
        actionName:String, 
        latitude:String, 
        longitude:String        
    }
    
    type Query{ 
        fetchCluster(_id: String, moduleName:String!, actionName:String!):Cluster
        fetchClustersForMap:[Cluster]
        fetchActiveClusters:[Cluster]
    }
   
    
    type Mutation 
    {
        createCluster(cluster:clusterObject, moduleName:String, actionName:String):String
        upsertCluster(clusterId:String, cluster:clusterObject, moduleName:String!, actionName:String!): response
        updateCluster(clusterId:String, clusterDetails:clusterUpdateObject, moduleName:String!, actionName:String!):String
    }    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], clusterSchema]);
