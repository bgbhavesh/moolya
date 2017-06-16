import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'
import MlResolver from '../../../commons/mlResolverDef'

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
        fetchExternalUserMenu(image: String, link: String, name: String, id: String, isLink: Boolean, isMenu: Boolean): MlMenu
        fetchExternalUserProfileMenu(image: String, link: String, name: String, id: String, isLink: Boolean, isMenu: Boolean): MlMenu
        fetchExploreMenu(image: String, link: String, name: String, id: String, isLink: Boolean, isMenu: Boolean): MlMenu
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Menu]);
let supportedApi = [{api:'FetchMenu', actionName:'READ', isWhiteList: true, moduleName:"MENU"}, {api:'fetchExternalUserMenu', actionName:'READ', isWhiteList: true, moduleName:"MENU"}, {api:'fetchExternalUserProfileMenu', isWhiteList: true, actionName:'READ', moduleName:"MENU"}];
MlResolver.MlModuleResolver.push(supportedApi)
