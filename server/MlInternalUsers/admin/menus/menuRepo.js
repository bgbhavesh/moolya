/**
 * Created by venkatsrinag on 9/4/17.
 */
import mlResourceConfigRepo from '../../../MlExternalUsers/ResourceConfiguration/mlResourceConigRepo'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
import _ from 'lodash'

class MenuRepo{
  constructor(){
  }

  findProfileResources(menuObject, context){
    var menu = _.cloneDeep(menuObject);
    var userProfile = new MlUserContext().userProfileDetails(context.userId)||{};
    if(userProfile && userProfile.communityDefCode){
      var resources = mlResourceConfigRepo.getResourceConfig(userProfile.communityDefCode)
      if(resources.length > 0){
        _.each(resources, function (resource) {
          switch (resource.resourceCode){
            case 'OFFICE':{
              var office = {
                "image": "ml ml-institutions",
                "link": "/app/myOffice",
                "isLink": true,
                "isMenu": true,
                "name": "My Office",
                "uniqueId": "myOffice",
                "hideSubMenu": true,
                "subMenu": [{
                  "link": "/app/addOffice",
                  "isLink": true,
                  "isMenu": false,
                  "name": "Add Office",
                  "uniqueId": "addOffice",
                  "subMenusId": "myOffice"
                }]
              }
              // menu.menu.push(office)
              menu.menu.splice(4, 0, office)
            }
            break;
          }
        })
      }
    }
    return menu;
  }

  findCalendarResources(menuObject, context){
    var menu = _.cloneDeep(menuObject);
    var userProfile = new MlUserContext().userProfileDetails(context.userId)||{};
    if(userProfile && userProfile.communityDefCode){
      var resources = mlResourceConfigRepo.getResourceConfig(userProfile.communityDefCode)
      if(resources.length > 0){
        _.each(resources, function (resource) {
          switch (resource.resourceCode){
            case 'MANAGESCHEDULE':{
              var item = {
                  "image":"fa fa-calendar-check-o",
                  "link": "/app/calendar/manageSchedule/all/activityList",
                  "isLink" : true,
                  "isMenu" : true,
                  "name" : "Manage Schedule",
                  "uniqueId" : "calendar_manageSchedule"
              }
              menu.menu.push(item)
            }
            break;
          }
        })
      }
    }

    return menu;
  }
}

var menuRepo = new MenuRepo()
export default menuRepo;
