/**
 * Created by venkatasrinag on 27/2/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findChaptersTypeHandler(clusterId) {
  let clusterid = clusterId;
  const result = await client.query({
    query: gql`
      query ($clusterId:String) {
        data: fetchChapters(id:$clusterId) 
        {
            _id,
            chapterName
        }
      }
    `,
    variables: {
      clusterId:clusterid
    },
    forceFetch:true
  })
  const id = result.data.data;
  return id
}
