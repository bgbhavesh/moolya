import gql from 'graphql-tag';
/* import {client} from "../../../admin/core/apolloConnection"; */
import mlTemplateEngine from './mlTemplateEngine';
export async function fetchAssignedTemplate(process, subProcess, stepCode, recordId, mode, client) {
  const connection = client || {};
  const result = await connection.query({
    query: gql`
    query ($process:String,$subProcess:String,$stepCode:String,$recordId:String, $mode:String){
        fetchAssignedTemplate(process: $process,subProcess: $subProcess,stepCode: $stepCode,recordId:$recordId, mode:$mode) {
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
      process,
      subProcess,
      stepCode,
      recordId,
      mode
    },
    forceFetch: true
  });
  const templateData = result.data.fetchAssignedTemplate;
  return templateData;
}

export async function fetchTemplateHandler(specs) {
  const {
    process, subProcess, stepCode, recordId, fetchTemplate, templateName, userType, mode, connection
  } = specs;
  let template = null;
  if (!fetchTemplate && templateName && userType) {
    template = mlTemplateEngine.fetchTemplate(subProcess, templateName, userType, mode);
  } else {
    const assignedTemplate = await fetchAssignedTemplate(process, subProcess, stepCode, recordId, mode, connection) || {};
    template = mlTemplateEngine.fetchTemplate(subProcess, assignedTemplate.templateName, userType, mode);
  }
  return template;
}
