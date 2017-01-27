import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let Cluster = `
    type Chapter{
      countryId :String
      displayName :String
      about: String
      link: String
      id:String
      email:String
      showOnMap : Boolean
    }
    type Mutation {
    createCluster(input: MessageInput): Message
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Cluster]);

class Cluster {
  constructor(id, {countryId, displayName,about,link,email,showOnMap}) {
    this.id = id;
    this.countryId = countryId;
    this.displayName = displayName;
    this.about = about;
    this.link = link;
    this.email = email;
    this.showOnMap =showOnMap;
  }
}
