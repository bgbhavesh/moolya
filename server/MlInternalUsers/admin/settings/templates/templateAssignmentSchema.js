import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let TemplateAssignment = `        
    type SubProcess{
            _id             : String
            processName     : String
            subProcessName  : String
            createdBy       : String      
            createdDate     : String
            steps           : [step]      
    }
    type step{
            stepId   : String
            stepCode : String
            stepName : String
            isActive : String    
    }
    type template{
            stepCode    : String
            stepName    : String
            templateCode: String
            templateName: String
            isActive          : Boolean
            createdDate       : String
    }
    type stepsTemplates{
            step        : String
            template    : String
    }
    type TemplateAssignment{
            _id                       : String           
            templateprocess           : String
            templatesubProcess        : String
            templateProcessName       : String
            templateSubProcessName    : String
            assignedTemplates         : [template]    
            createdBy                 : String      
            createdDate               : String  
            templateclusterId         : String
            templateclusterName       : String
            templatechapterId         : String
            templatechapterName       : String
            templatesubChapterId      : String
            templatesubChapterName    : String
            templatecommunityId       : String
            templatecommunityName     : String
            templateuserType          : String     
            templateidentity          : String        
            stepAvailability          : [stepsTemplates]       
    }
    input stepInput{
            stepCode    : String
            stepName    : String
            templateCode: String
            templateName: String
            isActive          : Boolean
            createdDate       : String
    }
    input stepsTemplatesInput{
            step        : String
            template    : String
    }
    input templateInput{
            id                        : String
            templateprocess           : String
            templatesubProcess        : String
            templateProcessName       : String
            templateSubProcessName    : String
            assignedTemplates         : [stepInput]    
            createdBy                 : String      
            createdDate               : String  
            templateclusterId         : String
            templateclusterName       : String
            templatechapterId         : String
            templatechapterName       : String
            templatesubChapterId      : String
            templatesubChapterName    : String
            templatecommunityId       : String
            templatecommunityName     : String
            templateuserType          : String     
            templateidentity          : String 
            stepAvailability          : [stepsTemplatesInput]
    }
    type Query{
            findTemplateSteps(id: String):SubProcess           
            fetchAssignedTemplate(process:String,subProcess:String,stepCode:String,recordId:String):template
            fetchSubProcess(id:String):[SubProcess]      
            findAssignedTemplates(id:String):TemplateAssignment
    }
    type Mutation{
            createTemplateAssignment(template : templateInput):response
            updateTemplateAssignment(id:String,template:templateInput):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],TemplateAssignment]);
