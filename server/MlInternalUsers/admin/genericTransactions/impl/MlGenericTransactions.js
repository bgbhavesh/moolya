
/**
 * Created by muralidhar on 17/05/17.
 */
import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import _ from 'lodash';
import _underscore from 'underscore';

class MlGenericTransactions {
  assignTransaction(transactionType, transactionId, params, context) {
    const resp = MlResolver.MlMutationResolver.assignTransaction('', { params, collection: this.collectionConfig().get(transactionType), transactionId }, context, '')
    if (resp.success) {
      return resp;
    }
    const code = 401;
    const result = { message: 'Not available in hierarchy' }
    const response = new MlRespPayload().errorPayload(result, code);
    console.log(response);
    return response;
  }

  unAssignTransaction(transactionType, transactionId, context) {
    const resp = MlResolver.MlMutationResolver.unAssignTransaction('', { collection: this.collectionConfig().get(transactionType), transactionId }, context, '')
    if (resp.success) {
      return resp;
    }
    const code = 401;
    const result = { message: 'Not available in hierarchy' }
    const response = new MlRespPayload().errorPayload(result, code);
    console.log(response);
    return response;
  }

  selfAssignTransaction(transactionType, transactionId, userId, context) {
    /*
        1) Allow users to self assign only if their role is in hierarchy
        2) If not, throw error.
       */
    let clusterId = null;
    let subChapterId = null;
    let defaultRole = {};
    let hierarchyAssignment = [];

    const user = mlDBController.findOne('users', { _id: userId });

    if (!user.profile.isSystemDefined) {
      /*
           Using transactionId to find 'clusterId'
           */
      if (transactionType == 'Registration') {
        var reg = mlDBController.findOne('MlRegistration', { transactionId: transactionId[0] });
        if (reg) { clusterId = reg.registrationInfo.clusterId; }
        subChapterId = reg.registrationInfo.subChapterId;
      }
      if (transactionType == 'Portfolio') {
        var reg = mlDBController.findOne('MlPortfolioDetails', { transactionId: transactionId[0] });
        if (reg) { clusterId = reg.clusterId; }
        subChapterId = reg.subChapterId;
      }

      if (clusterId) {
        /*
               Finding default role or highest role using 'clusterId' of loggedIn user
               */
        let hirarichyLevel = [];
        const userProfile = _.find(user.profile.InternalUprofile.moolyaProfile.userProfiles, { clusterId });
        const userProfileData = userProfile || {};
        const userRolesData = userProfileData && userProfileData.userRoles ? userProfileData.userRoles : [];

        hirarichyLevel = _underscore.pluck(userRolesData, 'hierarchyLevel') || [];

        hirarichyLevel.sort((a, b) => b - a);

        for (let i = 0; i < userRolesData.length; i++) {
          if ((userRolesData[i].hierarchyLevel == hirarichyLevel[0]) && userRolesData[i].isActive) {
            defaultRole = userRolesData[i]
            break
          }
        }
      }

      /*
           Checking if roleId of highest role has hierarchy
           */
      let isDefaultSubChapter = true
      if (defaultRole && defaultRole.subChapterId != 'all') {
        isDefaultSubChapter = mlDBController.findOne('MlSubChapters', { _id: defaultRole.subChapterId }).isDefaultSubChapter;
      }
      hierarchyAssignment = mlDBController.find('MlHierarchyAssignments', {
        $and: [
          { clusterId: { $in: [clusterId, 'All'] } },
          { isDefaultSubChapter },
          { teamStructureAssignment: { $elemMatch: { roleId: defaultRole.roleId } } }
        ]
      }).fetch();
    }

    /*
          If hierarchy, allow users to self assign otherwise block them and throw error.
       */
    if ((hierarchyAssignment && hierarchyAssignment.length > 0) || user.profile.isSystemDefined) {
      const resp = MlResolver.MlMutationResolver.selfAssignTransaction('', { collection: this.collectionConfig().get(transactionType), transactionId }, context, '');
      if (resp.success) {
        return resp;
      }
      const code = 401;
      const result = { message: 'Not available in hierarchy' }
      const response = new MlRespPayload().errorPayload(result, code);
      // console.log(response);
      return response;
    }
    const code = 401;
    const result = { message: 'Not available in hierarchy' }
    const response = new MlRespPayload().errorPayload(result, code);
    // console.log(response);
    return response;
  }

  updateTransactionStatus(transactionType, transactionId, status, context) {
    const resp = MlResolver.MlMutationResolver.updateTransactionStatus('', { collection: this.collectionConfig().get(transactionType), transactionId, status }, context, '');
    if (!resp.success) {
      return resp;
    }
    const code = 401;
    const result = { message: 'Transaction Error' }
    const response = new MlRespPayload().errorPayload(result, code);
    console.log(response);
    return response;
  }

  validateTransaction(transactionType, transactionId) {
    const resp = MlResolver.MlMutationResolver.validateTransaction('', { collection: this.collectionConfig().get(transactionType), transactionId, status }, context, '');
    if (!resp.success) {
      return resp;
    }
    const code = 401;
    const result = { message: 'Transaction Error' }
    const response = new MlRespPayload().errorPayload(result, code);
    console.log(response);
    return response;
  }

  collectionConfig() {
    const collection = new Map([['Registration', 'MlRegistration'], ['Portfolio', 'MlPortfolioDetails'], ['InternalRequests', 'MlRequests']]);
    return collection
  }
}

const mlGenericTransactions = new MlGenericTransactions();
Object.freeze(mlGenericTransactions);

export default mlGenericTransactions;

