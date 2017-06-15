/**
 * Created by venkatsrinag on 6/5/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let connections = `
    type User{
        userid:String,
        userName:String,
        isFavourite:Boolean,
        isBlock:Boolean
    }
    
    type Connection{
        _id:String,
        toUser:User,
        requestedFrom:String,
        createdBy:String,
        updatedBy:String,
        isAccepted:Boolean,
        isDenied:Boolean,
        resendCount:Int
    }
    
    input user{
        userid:String,
        userName:String,
        isFavourite:Boolean,
        isBlock:Boolean
    }
    
    input connection{
        toUser:user,
        requestedFrom:String,
        createdBy:String,
        updatedBy:String,
        isAccepted:Boolean,
        isDenied:Boolean,
        resendCount:Int
    }
    
    type Mutation{
        connectionRequest(resourceId:String!,resourceType:String!):response
        acceptConnection(connectionId:String!):response
        rejectConnection(connectionId:String!):response
    }
    
    type Query{
        fetchConnections:[Connection]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],connections]);
