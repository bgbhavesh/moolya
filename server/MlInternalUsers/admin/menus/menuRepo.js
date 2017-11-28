/**
 * Created by venkatsrinag on 9/4/17.
 */
import mlResourceConfigRepo from '../../../MlExternalUsers/ResourceConfiguration/mlResourceConigRepo'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
import _ from 'lodash'

class MenuRepo {
  constructor() {
  }

  findProfileResources(menuObject, context) {
    const menu = _.cloneDeep(menuObject);
    const userProfile = new MlUserContext().userProfileDetails(context.userId) || {};
    if (userProfile && userProfile.communityDefCode) {
      const resources = mlResourceConfigRepo.getResourceConfig(userProfile.communityDefCode)
      if (resources.length > 0) {
        _.each(resources, (resource) => {
          switch (resource.resourceCode) {
            case 'OFFICE': {
              const office = {
                image: 'ml ml-institutions',
                link: '/app/myOffice',
                isLink: true,
                isMenu: true,
                name: 'Digital Office',
                uniqueId: 'myOffice',
                hideSubMenu: true,
                subMenu: [{
                  link: '/app/addOffice',
                  isLink: true,
                  isMenu: false,
                  name: 'Add Office',
                  uniqueId: 'addOffice',
                  subMenusId: 'myOffice'
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

  findCalendarResources(menuObject, context) {
    const menu = _.cloneDeep(menuObject);
    const userProfile = new MlUserContext().userProfileDetails(context.userId) || {};
    const registerId = userProfile.registrationId;
    const regData = MlRegistration.findOne({ _id: registerId, status: { $ne: 'REG_USER_APR' } });
    if (regData) {
      menu.menu.forEach((data, index, arr) => {
        if (['mycalendar', 'calendar_share', 'calendar_office'].indexOf(data.uniqueId) >= 0) {
          arr[index].isDisabled = true
        }
      });
    }
    if (userProfile && userProfile.communityDefCode) {
      const resources = mlResourceConfigRepo.getResourceConfig(userProfile.communityDefCode)
      if (resources.length > 0) {
        _.each(resources, (resource) => {
          switch (resource.resourceCode) {
            case 'MANAGESCHEDULE': {
              const item = {
                image: 'ml my-ml-manage_schedule',
                link: '/app/calendar/manageSchedule/all/activityList',
                isLink: true,
                isMenu: true,
                name: 'Manage Schedule',
                uniqueId: 'calendar_manageSchedule'
              }
              menu.menu.push(item)
            }
              break;
            case 'OFFICE': {
              menu.menu.forEach((data, index, arr) => {
                if (data.uniqueId === 'calendar_office') {
                  arr[index].isDisabled = false
                }
              })
            }
              break;
          }
        })
      }
    }

    return menu;
  }
}

const menuRepo = new MenuRepo()
export default menuRepo;
