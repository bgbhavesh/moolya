import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findProcessActionHandler(processId) {

  const result = await client.query({
    query: gql`
    query  ($id: String){
         findProcess(id:$id)  {
         _id
         processId
        process
        communities{
          id
        }
        userTypes{
          id
        }    
        identity
        industries{
          id
        }
        professions{
          id
        }
        clusters{
          id
        }
        states{
          id
        }
        chapters{
          id
        }
        subChapters{
          id
        }
        isActive
         documents{
          type
          category
          isActive
        }
  }
}
    `,
    variables: {
      id:processId
    }
  })
  const id = result.data.findProcess;
  return id
}
