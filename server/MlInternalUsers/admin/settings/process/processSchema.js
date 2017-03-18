import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Process = `

    type ProcessType{
        _id         : String,
        processId   : String,
        process     : String,
        communities : [String],
        userTypes   : [String],
        identity    : String,
        industries  : [String],
        professions : [String],
        clusters    : [String],
        states      : [String],
        chapters    : [String],
        subChapters : [String],
        isActive    : Boolean,
        documents   : [documentOutput]  
    }
    type processOutput{
        _id         : String,
        processId   : String,
        process     : String,
        communities : [String],
         userTypes   : [String],
        identity    : String,
        industries  : [String],
        professions : [String],
        clusters    : [String],
        states      : [String],
        chapters    : [String],
        subChapters : [String],
        isActive    : Boolean,
        documents   : [documentOutput]  
    }
    
    
    type communityOutput{
        id   :  String
    }    
    type userTypeOutput{
        id   :  String,
        name : String,
    }    
    type industryOutput{
        id   :  String
    }    
    type professionOutput{
        id   :  String
    }    
    type clusterOutput{
        id   :  String
    }    
    type stateOutput{
        id   :  String
    }    
    type chapterOutput{
        id   :  String
    }
    type subChapterOutput{
        id   :  String
    }
    type documentOutput{
        type      :  String
        category  :  String
        isActive  :  Boolean
        categoryName: String
        
    }
    
    input community{
        id   :  String
    }    
    input userType{
        id   :  String,
        name : String,
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
        communities : [String],
        userTypes   : [String],
        identity    : String,
        industries  : [String],
        professions : [String],
        clusters    : [String],
        states      : [String],
        chapters    : [String],
        subChapters : [String],
        isActive    : Boolean,
        documents   : [document]  
    }
    
    type Mutation {
       createProcess(process:processInput, moduleName:String, actionName:String):response
       updateProcess(id:String,process:processInput, moduleName:String, actionName:String):response
    }
    
    type Query{
      findProcess(id:String):processOutput
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Process]);


