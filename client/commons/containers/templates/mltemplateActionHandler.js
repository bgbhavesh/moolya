import gql from "graphql-tag";
import {client} from "../../../admin/core/apolloConnection";

export async function fetchAssignedTemplate(process,subProcess,stepCode,recordId) {
  const result = await client.query({
    query: gql`
    query ($process:String,$subProcess:String,$stepCode:String){
        fetchAssignedTemplate(process: $process,subProcess: $subProcess,stepCode: $stepCode,$recordId:recordId) {
           templateCode
           templateName
           templateDescription
           stepName
           stepCode
           isActive
           userType
        }
      }
    `,
    variables: {
      process: process,
      subProcess:subProcess,
      stepCode:stepCode,
      recordId:recordId
    },
    fetchPolicy: 'cache-first'
  });
  const templateData = result.data.fetchAssignedTemplate;
  return templateData;
}
