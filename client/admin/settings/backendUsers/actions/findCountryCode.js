import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findCountryCode(clusterId) {
  const result = await client.query({
    query: gql`
            query($clusterId: String){  
                fetchCountryCode(clusterId:$clusterId){          
                _id          
                country      
                  
                displayName   
                url        
                about       
                capital     
                isActive     
                lat        
                lng 
                phoneNumberCode
            }
        }`,
    variables: {
      clusterId: clusterId
    },
    forceFetch: true
  });
  const id = result.data.fetchCountryCode;
  return id

}
