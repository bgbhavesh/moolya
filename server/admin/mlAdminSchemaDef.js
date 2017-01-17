/**
 * Created by venkatasrinag on 17/1/17.
 */
import { Meteor } from 'meteor/meteor';
import {mergeStrings} from 'gql-merge'

const testSchema1 =
    `type Query {
        hello: String
    }
`

const testSchema2 =
    `type Query {
    world: String
    }
`

const testMutattion =
    `type Mutation {
        incrementCount(id: String): String 
    }`

const testMutattion2 =
    `
    type Mutation {
        incrementCount(id: String): String 
    }`


const MlSchemaDef = mergeStrings([testMutattion, testMutattion2, testSchema1, testSchema2])

module.exports = MlSchemaDef;
