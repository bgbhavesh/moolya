import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let Menu = `
    type Menu{
      image: String
      link: String
      name: String
      uniqueId:String
      isLink:Boolean
      isMenu:Boolean
      isDisabled:Boolean
      subMenu:[Menu]
      dynamicLink:Boolean
      subMenuMappingId:String
      subMenusId:String
      hideSubMenu:Boolean
      showInBreadCrum:Boolean
    }
    type MlMenu 
    {
      name: String
      id:String
      menu:[Menu]
    }
    type Query {
        FetchMenu(image: String, link: String, name: String, id: String, isLink: Boolean, isMenu: Boolean): MlMenu
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Menu]);
