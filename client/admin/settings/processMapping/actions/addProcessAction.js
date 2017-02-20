import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addProcessActionHandler(ProcessInput) {
  /*let communityList = ProcessInput.communities;
  let communities = [];
  for(var i in communityList) {
    var community = communityList[i];
    communities.push({
      "id" : community
    });
  }
  ProcessInput.communities=communities;

    let userTypesList = ProcessInput.userTypes;
  let userTypes = [];
  for(var i in userTypesList) {
    var community = userTypesList[i];
    userTypes.push({
      "id" : community
    });
  }
  ProcessInput.userTypes=userTypes;

  let industriesList = ProcessInput.industries;
  let industries = [];
  for(var i in industriesList) {
    var community = industriesList[i];
    industries.push({
      "id" : community
    });
  }
  ProcessInput.industries=industries;*/

  //let process = {ProcessInput:processDetails};
  const result = await client.mutate({
    mutation: gql`
     mutation ($ProcessInput :processInput){
        createProcess(
          process : $ProcessInput
        )
      } `,
    variables: {
     ProcessInput
    }
  })
  const id = result.data.createProcess;
  return id
}
