import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let clusterSchema = `
    type Cluster{
        _id:String
        countryName: String
        countryId :String
        displayName :String
        about: String
        link: String
        email:String
        showOnMap : Boolean
        isActive: Boolean
        countryFlag:String
        latitude:String 
        longitude:String
    }
    
    input clusterObject{
        countryId:String, 
        countryName: String
        displayName:String, 
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
        fetchCluster(_id: String):Cluster
        fetchClusters:String
    }
   
    
    type Mutation 
    {
        createCluster(cluster:clusterObject):String
        updateCluster(clusterId:String, cluster:clusterObject): String
    }    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],  clusterSchema]);
// fetchCluster:String
