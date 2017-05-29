import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

let Process = `

    type ProcessType{
        _id         : String,
        date        : Date,
        processId   : String,
        processName : String,
        process     : String,
        communities : [String],
        communityNames : [String],
        userTypes   : [String],
        userTypeNames : [String],
        identity    : String,
        industrieNames : [String],
        industries  : [String],
        industries  : [String],
        industries  : [String],
        professions : [String],
        professionNames: [String],
        clusters    : [String],
        clusterNames : [String],
        states      : [String],
        stateNames  : [String],
        chapters    : [String],
        chapterNames : [String],
        subChapters : [String],
        subChapterNames : [String],
        isActive    : Boolean,
        documents   : [documentOutput]  
        processDocuments : [processDocumentOutput]
    }
    type processOutput{
        _id         : String,
         date        : Date,
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
        documents   : [documentOutput] , 
        processDocuments : [processDocumentOutput]
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
    type processDocumentOutput{
        kycCategoryId:String,
        kycCategoryName: String,
        docTypeId:String,
        docTypeName:String,
        documentId:String,
        documentDisplayName:String,
        documentName:String,
        isMandatory:Boolean,
        isActive:Boolean,
        inputLength:String,
        allowableMaxSize:String,
        allowableFormat:String,
        docMappingDef:String,
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
    
    input processDocument{
        kycCategoryId:String,
        kycCategoryName: String,
        docTypeId:String,
        docTypeName:String,
        documentId:String,
        documentDisplayName:String,
        documentName:String,
        isMandatory:Boolean,
        isActive:Boolean,
        inputLength:String,
        allowableMaxSize:String,
        allowableFormat:String,
        docMappingDef:String,
    }
    input document{
        type      :  String,
        category  :  String,
        isActive  :  Boolean
        
    }
    input processInput{
        date: Date,
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
        documents   : [document] ,
   processDocuments : [processDocument]
    }
    
    type Mutation {
       createProcess(process:processInput, moduleName:String, actionName:String):response
       updateProcess(id:String,process:processInput, moduleName:String, actionName:String):response
       upsertProcessDocument(id:String,kycCategoryId: String, docTypeId:String,documentId:String,isMandatory:Boolean,isActive:Boolean,moduleName:String, actionName:String):response
    }
    
    type Query{
      findProcess(id:String):processOutput
      findProcessDocumentForRegistration(clusterId:String,chapterId:String,subChapterId:String,userType:String,communityType:String,identityType:String,profession:String,industry:String):processOutput
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Process]);
let supportedApi = [
    {api:'createProcess', actionName:'CREATE', moduleName:"PROCESSMAPPING"},
    {api:'updateProcess', actionName:'UPDATE', moduleName:"PROCESSMAPPING"},
    {api:'upsertProcessDocument', actionName:'UPDATE', moduleName:"PROCESSMAPPING"},
    {api:'findProcess', actionName:'READ', moduleName:"PROCESSMAPPING"},
    {api:'findProcessDocumentForRegistration', actionName:'READ', moduleName:"PROCESSMAPPING"},
]
// MlResolver.MlModuleResolver.push(supportedApi)
