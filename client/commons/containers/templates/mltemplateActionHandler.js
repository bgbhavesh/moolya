import gql from "graphql-tag";
import {client} from "../../../admin/core/apolloConnection";
import mlTemplateEngine from "./mlTemplateEngine";
export async function fetchAssignedTemplate(process,subProcess,stepCode,recordId) {
  const result = await client.query({
    query: gql`
    query ($process:String,$subProcess:String,$stepCode:String,$recordId:String){
        fetchAssignedTemplate(process: $process,subProcess: $subProcess,stepCode: $stepCode,recordId:$recordId) {
           templateCode
           templateName
           templateDescription
           stepName
           stepCode
           isActive    
        }
      }
    `,
    variables: {
      process: process,
      subProcess:subProcess,
      stepCode:stepCode,
      recordId:recordId
    },
    forceFetch: true
  });
  const templateData = result.data.fetchAssignedTemplate;
  return templateData;
}

export async function fetchTemplateHandler(specs){

  let {process,subProcess,stepCode,recordId,fetchTemplate,templateName,userType}=specs;
  let template=null;
  if(!fetchTemplate&&templateName&&userType){
    template=mlTemplateEngine.fetchTemplate(subProcess,templateName,userType);
  }else{
     let assignedTemplate= await fetchAssignedTemplate(process,subProcess,stepCode,recordId)||{};
     template=mlTemplateEngine.fetchTemplate(subProcess,assignedTemplate.templateName,userType);
  }
  return template;
}
