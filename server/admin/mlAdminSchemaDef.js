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

const typeDefinitions = `
type menu {
  image: String
  link:String
  name:String
  id:String
  isLink:Boolean
  isMenu:Boolean
  subMenu:[menu]
  
}

type LeftNavQuery {
  mlLeftNav( name: String): mlLeftNav
}

type mlLeftNav{
  image: String
  link:String
  name:String
  id:String
  isLink:Boolean
  isMenu:Boolean
  subMenu:[menu]
}
schema {
  query: LeftNavQuery
}
`;
const MlSchemaDef = mergeStrings([testMutattion, testMutattion2, testSchema1, testSchema2, typeDefinitions])

module.exports = MlSchemaDef;
