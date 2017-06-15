/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let followSchema = `
     type Followings{
        _id:String,
        followerId:User,
        followerEmail:String,
        followedBy:String,
        followedByEmail:String,
        isActive:Boolean,
        updatedOn:Boolean,
        updatedBy:String
    }
    
    type Mutation{
        followUser(resourceId:String!,resourceType:String!,follow:Boolean):response
    }
    
     type Query{
        followersList:Followings
        followingsList:Followings
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],followSchema]);
