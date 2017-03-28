import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Template = `        
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
    type TemplateAssignment{
            _id               : String
            process           : String
            subProcess        : String
            templateProcessName       : String
            templateSubProcessName    : String
            assignedTemplates : [template]    
            createdBy         : String      
            createdDate       : String         
    }
    input stepInput{
            stepCode    : String
            stepName    : String
            templateCode: String
            templateName: String
            isActive          : Boolean
            createdDate       : String
    }
    input templateInput{
            id                : String
            process           : String
            subProcess        : String
            templateProcessName       : String
            templateSubProcessName    : String
            assignedTemplates : [stepInput]    
            createdBy         : String      
            createdDate       : String  
            clusterId         : String
            clusterName       : String
            chapterId         : String
            chapterName       : String
            subChapterId      : String
            subChapterName    : String
            communityId       : String
            communityName     : String
            userType          : String     
            identity          : String                               
    }
    type Query{
            findTemplateSteps(id: String):SubProcess
            findStepAssignedTemplates(id: String,stepCode:String):TemplateAssignment
            fetchAssignedTemplate(process:String,subProcess:String,stepCode:String,recordId:String):template
            fetchSubProcess(id:String):[SubProcess]
            updateTemplate(id:String,template:templateInput):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Template]);
