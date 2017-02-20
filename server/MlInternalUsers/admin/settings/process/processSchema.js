import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Process = `

    type ProcessType{
        _id         : String
        processId   : String
        process     : String  
        isActive    : Boolean
    }
    
    input community{
        id   :  String
    }    
    input userType{
        id   :  String
    }    
    input industry{
        id   :  String
    }    
    input profession{
        id   :  String
    }    
    input cluster{
        id   :  String
    }    
    input state{
        id   :  String
    }    
    input chapter{
        id   :  String
    }
    input subChapter{
        id   :  String
    }
    input document{
        type      :  String
        category  :  String
        isActive  :  Boolean
        
    }
    
    input processInput{
        processId   : String,
        process     : String,
        communities : [community],
        userTypes   : [userType],
        identity    : String,
        industries  : [industry],
        professions : [profession],
        clusters    : [cluster],
        states      : [state],
        chapters    : [chapter],
        subChapters : [subChapter],
        isActive    : Boolean,
        documents   : [document]  
    }
    
    type Mutation {
       createProcess(process:processInput): String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Process]);


