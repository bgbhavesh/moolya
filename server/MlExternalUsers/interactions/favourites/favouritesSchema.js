/**
 * Created by mohammed.mohasin on 16/06/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let favourites = `  
    type Mutation{
        markFavourite(resourceId:String!,resourceType:String!,isFavourite:Boolean):response
    }
    
     type FavouriteUser{
        id:String,
        userId:String,
        userName:String,
        firstName:String,
        lastName:String,
        displayName:String,
        profileImage:String,
        profileId:String,
        countryName:String,
        communityName:String,
        communityCode:String,
        
    }
    
    type Query{
        fetchFavourites:[FavouriteUser]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],favourites]);
