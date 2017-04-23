/**
 * Created by venkatsrinag on 21/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'


let TechnologiesSchema = `
    type Technologies
    {
        _id:String,
        technologyName:String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    input technologyMasterData
    {
        technologyName :String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    type Mutation 
    {
        createTechnology(technologyMasterData:technologyMasterData, moduleName:String, actionName:String):response
        updateSelectedTechnology(technologyId:String, technologyMasterData:technologyMasterData):response
    }
    type Query{
        findTechnology(technologyId:String): Technologies
        fetchTechnologies:[Technologies]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], TechnologiesSchema]);


