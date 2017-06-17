/**
 * Created by mohammed.mohasin on 16/06/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let favourites = `  
    type Mutation{
        markFavourite(resourceId:String!,resourceType:String!,isFavourite:Boolean):response
    }
    
    type Query{
        fetchFavourites:response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],favourites]);
