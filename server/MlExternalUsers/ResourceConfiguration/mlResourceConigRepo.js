/**
 * Created by venkatsrinag on 9/4/17.
 */
import _ from 'lodash'

class MlResourceConfigRepo {
  constructor() {
  }

  defaultResourceConfig() {
    const self = this;
    const resources = MlResources.find().fetch();
    if (resources.length == 0) {
      return;
    }
    _.each(resources, (resource) => {
      let allowedCommunities = [];
      switch (resource.code) {
        case 'OFFICE': {
          allowedCommunities = ['FUN']
        }
          break;

        case 'MANAGESCHEDULE': {
          allowedCommunities = ['SPS', 'FUN']
        }
          break;
      }
      self.insertConfigToDB(allowedCommunities, resource.code)
    })
  }

  updateResourceConfig() {
  }

  getResourceConfig(communityCode) {
    return MlResourceConfig.find({ 'community.communityCode': communityCode }).fetch();
  }

  insertConfigToDB(allowedCommunities, resourceCode) {
    _.each(allowedCommunities, (communityCode) => {
      const communityDef = MlCommunityDefinition.findOne({ code: communityCode });
      if (!communityDef) {
        console.log('some thing went wrong with database')
      } else {
        const resourceConfig = {};
        resourceConfig.community = {
          communityName: communityDef.name,
          communityCode: communityDef.code,
          communityDefId: communityDef._id
        }
        resourceConfig.resourceCode = resourceCode
        resourceConfig.isActive = true
        MlResourceConfig.update({ resourceCode, 'community.communityCode': communityCode }, { $set: resourceConfig }, { upsert: true })
      }
    })
  }
}

const mlResourceConfigRepo = new MlResourceConfigRepo();
Object.freeze(mlResourceConfigRepo);
export default mlResourceConfigRepo;
