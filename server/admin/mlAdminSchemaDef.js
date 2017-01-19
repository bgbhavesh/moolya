/**
 * Created by venkatasrinag on 17/1/17.
 */
import { Meteor } from 'meteor/meteor';
import {mergeStrings} from 'gql-merge'

const schema = `
  schema{
      query: Query
  }
`
// const testSchema1 =
//     `type Query {
//         hello: String
//     }
// `
//
// const testSchema2 =
//     `type Query {
//         world: String
//     }
// `
//
// const testMutattion =
//     `type Mutation {
//         incrementCount(id: String): String
//     }`
//
// const testMutattion2 =
//     `
//     type Mutation {
//         incrementCount(id: String): String
//     }`

const leftNav = `
    type MlLeftNav 
    {
      image: String
      link: String
      name: String
      id:String
      isLink:Boolean
      isMenu:Boolean
    }
    type Query {
        LeftNav(image: String, link: String, name: String, id: String, isLink: Boolean, isMenu: Boolean): [MlLeftNav]
    }
`

const MlSchemaDef = mergeStrings([leftNav, schema])

module.exports = MlSchemaDef;
