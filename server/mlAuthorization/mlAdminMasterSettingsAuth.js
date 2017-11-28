/**
 * Created by vishwadeep.kapoor on 7/03/17.
 */

import MlAdminContextBasedAuthorization from '../mlAuthorization/mlAdminContextBasedAuth'

const _ = require('lodash');

class MlAdminMasterSettingsAuthorization extends MlAdminContextBasedAuthorization {
  constructor(context) {
    super(context);
  }

  authorize(action, context, requestedResource) {
    isAuthorized = false;
    let masterSettingId = '';
    switch (action) {
      case 'READ':
        masterSettingId = requestedResource._id;
        masterData = MasterSettings.findOne(masterSettingId);
        isAuthorized = this.hasAccess(context, masterData);

      case 'UPDATE':
        masterSettingId = requestedResource._id;
        masterData = MasterSettings.findOne(masterSettingId);
        isAuthorized = this.hasAccess(context, masterData)
    }
    return isAuthorized;
  }

  hasAccess(context, masterData) {
    isAuthorized = true;
    if (!context || !context.userId) {
      throw new Error('401', 'Invalid User or User not logged In');
    } else if (!masterData || !masterData.hierarchyRefId) {
      throw new Error('402', 'resource not found');
    }

    const userProfile = this.userProfile;
    if (!userProfile || !userProfile.defaultProfileHierarchyRefId) {
      throw new Error('403', 'User Profile does not have access to the resource');
    }
    const defaultProfileHierarchyRefId = userProfile.defaultProfileHierarchyRefId;
    const defaultProfileHierarchyCode = userProfile.defaultProfileHierarchyCode;
    const masterDataHierarchyRefId = masterData.hierarchyRefId;
    const masterDataHierarchCode = masterData.hierarchyCode;
    if (!masterDataHierarchyRefId || !defaultProfileHierarchyRefId || (defaultProfileHierarchyRefId !== masterDataHierarchyRefId) || (defaultProfileHierarchyCode !== masterDataHierarchCode)) {
      isAuthorized = false;
    }
    return isAuthorized;
  }
}

module.exports = MlAdminMasterSettingsAuthorization;
