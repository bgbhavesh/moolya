/*
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function fetchAnnotations(documentId) {
  const result = await client.query({
    query: gql`
       query($id: String){
        data:findAnnotation(documentId:$id){
         _id
        documentId
        question {
          text
          quote
          ranges {
            start
            startOffset
            end
            endOffset
          }
        }
        isActive
        }
    }
    `,
    variables: {
      id: documentId
    },
    forceFetch: true
  });
  console.log("------------------------------------------");
  console.log(result);
  //return  result.data.findAnnotation;
  return result&&result.data?result.data.data:[];

};
*/
