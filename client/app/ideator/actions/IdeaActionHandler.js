/**
 * Created by venkatsrinag on 3/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function createIdeaActionHandler(ideaDetails) {
    let idea = ideaDetails
    const result = await appClient.mutate({
        mutation: gql`
            mutation ($idea: idea) {
                createIdea(idea: $idea) {
                    success,
                    result,
                    code
                }
            }
        `,
      forceFetch:true,
      variables:{
          idea
      }
    })
    const id = result.data.createIdea;
    return id
}


export async function fetchIdeaActionHandler() {
    const result = await appClient.query({
        query: gql`
            query{
                fetchIdeas {
                    portfolioId
                    title
                    isIdeaTitlePrivate
                    description
                    isIdeaPrivate
                    userId
                    isActive
                }
            }
        `,
        forceFetch:true
    })
    const ideas = result.data.fetchIdeas;
    return ideas
}