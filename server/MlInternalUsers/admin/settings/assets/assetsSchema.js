/**
 * Created by venkatsrinag on 21/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'


let AssetsSchema = `
    type Assets
    {
        _id:String,
        assetName:String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    input assetsMasterData
    {
        assetName :String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    type Mutation 
    {
        createAssets(assetsMasterData:assetsMasterData, moduleName:String, actionName:String):response
        updateSelectedAsset(assetId:String, assetsMasterData:assetsMasterData):response
    }
    type Query{
        findAsset(assetId:String): Assets
        fetchAssets:[Assets]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], AssetsSchema]);


