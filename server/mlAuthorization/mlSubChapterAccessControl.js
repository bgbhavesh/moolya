/**
 * Created by mohammed. mohasin on 13/04/17.
 */

import MlAdminUserContext from '../mlAuthorization/mlAdminUserContext';
import MlUserContext from '../MlExternalUsers/mlUserContext';
const _ = require('lodash');
/**
 * SubChapter Access Control returns the access control for sub chapter based on Permissions(SEARCH/VIEW/TRANSACT)
 * Returns Access control object
 * hasAccess: Boolean (specifies if the context has permission(VIEW/TRANSACT) to access the sub chapter)
 * isInclusive:Boolean( true:allowed sub chapters list($in operator can be used to include)
 *                      false:private sub chapters list (($nin operator can be used to exclude))
 * subChapters: [String] (its a list of inclusive/exclusive list of sub chapters for SEARCH permission)
 * chapters: [String] (its a list of inclusive/exclusive list of  chapters for SEARCH permission)
 * */
class MlSubChapterAccessControl {
  constructor(context) {
  }

  /**
   * This method returns the access control for sub chapter based on permission
   * @param permission(eg:Search/View/Transact)
   * @param context(eg:context of user)
   * @param requestSubChapterId(subchapter id for VIEW/TRANSACT Permission)
   * @param internalCrossAccess(true: if internal user is accessing external User)
   * returns result Object with the access control(hasAccess:true/false,privateSubChapters:[],allowedSubChapters:[])
   */
  static getAccessControl(permission, context, requestSubChapterId, internalCrossAccess) {
    /** set the user context */
    var context = MlSubChapterAccessControl.setUserContext(context, requestSubChapterId);
    /** set externalUserAccess */
    // context.internalCrossAccess=internalCrossAccess?true:false;
    /** fetch context details isInternal,isMoolya */
    const isInternalUser = context.isInternalUser;
    context.internalCrossAccess = _.isBoolean(internalCrossAccess) ? internalCrossAccess : isInternalUser;
    const isMoolya = context.isMoolya;
    var requestSubChapterId = context.requestSubChapterId;
    const contextSubChapterId = context.contextSubChapterId;

    const isSelfUser = !!((_.isString(requestSubChapterId) && _.isString(contextSubChapterId) && contextSubChapterId == requestSubChapterId));
    let accessControl = {
      hasAccess: false, isInclusive: true, subChapters: [], chapters: []
    };

    /** Internal User - moolya(admin/team members) */
    if (isInternalUser && isMoolya) {
      accessControl.hasAccess = true;
      return accessControl;
    }
    /** Internal User - non moolya(subChapter admin/team members) */
    else if (isInternalUser && !isMoolya) {
      accessControl = MlSubChapterAccessControl.resolveNonMoolyaInternalAccess(permission, context);
    }
    /** External User - moolya(subChapter end users) */
    else if (!isInternalUser && isMoolya) {
      accessControl = MlSubChapterAccessControl.resolveMoolyaExternalAccess(permission, context);
    }
    /** External User - non moolya(subChapter end users) */
    else if (!isInternalUser && !isMoolya) {
      accessControl = MlSubChapterAccessControl.resolveNonMoolyaExternalAccess(permission, context);
    }
    /** Browser/Office Bearer logins */
    else {
    }
    /* for Self User */
    if (isSelfUser) {
      accessControl.hasAccess = true;
    }
    return accessControl;
  }

  static resolveMoolyaExternalAccess(permission, context) {
    /** todo: check context user SubChapterId and restrict view/transact permission for browser or others */
    const isInternalUser = context.isInternalUser;
    const contextSubChapterId = context.contextSubChapterId;
    const requestSubChapterId = context.requestSubChapterId;
    const isSelfUser = !!((_.isBoolean(requestSubChapterId) && _.isBoolean(contextSubChapterId) && contextSubChapterId == requestSubChapterId));
    let accessControl = { hasAccess: false, isInclusive: true, subChapters: null };
    /** get all private sub Chapters. */
    let privateSubChapters = [];
    const subChapter = mlDBController.findOne('MlSubChapters', { _id: requestSubChapterId }) || {};
    switch (permission) {
      case 'SEARCH':
        privateSubChapters = MlSubChapterAccessControl.getPrivateEcoSystemSubChapters(permission);
        accessControl = { hasAccess: true, isInclusive: false, subChapters: privateSubChapters };
        break;
      case 'VIEW':
        var canAccess = MlSubChapterAccessControl.canMoolyaSubChapterAccess(permission, requestSubChapterId);
        accessControl.hasAccess = (isSelfUser || subChapter.isDefaultSubChapter) ? true : canAccess;
        break;
      case 'TRANSACT':
        var canAccess = MlSubChapterAccessControl.canMoolyaSubChapterAccess(permission, requestSubChapterId);
        accessControl.hasAccess = (isSelfUser || subChapter.isDefaultSubChapter) ? true : canAccess;
        break;
    }
    return accessControl;
  }

  static resolveNonMoolyaExternalAccess(permission, context) {
    const isInternalUser = context.isInternalUser;
    const contextSubChapterId = context.contextSubChapterId;
    const requestSubChapterId = context.requestSubChapterId;
    const subChapter = mlDBController.findOne('MlSubChapters', { _id: contextSubChapterId }) || {};
    const ecoSystemAccessPermission = (subChapter.moolyaSubChapterAccess || {}).externalUser || {};
    /** check for ecosystem access permission for context user subChapter */
    const scEcoSysSearch = _.isBoolean(ecoSystemAccessPermission.canSearch) ? ecoSystemAccessPermission.canSearch : false;
    const scEcoSysView = _.isBoolean(ecoSystemAccessPermission.canView) ? ecoSystemAccessPermission.canView : false;
    const scEcoSysTransact = _.isBoolean(ecoSystemAccessPermission.canTransact) ? ecoSystemAccessPermission.canTransact : false;
    const canSearch = scEcoSysTransact ? true : (scEcoSysView ? true : scEcoSysSearch);
    const canView = scEcoSysTransact ? true : scEcoSysView;
    const canTransact = scEcoSysTransact;

    let accessControl = { hasAccess: false, isInclusive: true, subChapters: null };
    /** check for  context user specific subChapter ['subChapterId'] */
    let allowedSubChapters = [contextSubChapterId];
    /** get all related sub Chapters. */
    const relatedObj = MlSubChapterAccessControl.getRelatedSubChapters(isInternalUser, contextSubChapterId, permission);
    allowedSubChapters = allowedSubChapters.concat(relatedObj.relatedSubChapters);

    switch (permission) {
      case 'SEARCH':
        if (canSearch) {
          const privateSubChapters = MlSubChapterAccessControl.getNonRelatedPrivateEcoSystemSubChapters(permission, allowedSubChapters) || [];
          accessControl = { hasAccess: true, isInclusive: false, subChapters: privateSubChapters };
        } else {
          accessControl = { hasAccess: true, isInclusive: true, subChapters: allowedSubChapters };
        }
        break;
      case 'VIEW':
        if (canView) {
          accessControl.hasAccess = MlSubChapterAccessControl.canNonMoolyaSubChapterAccess(permission, requestSubChapterId, allowedSubChapters);
        } else {
          accessControl.hasAccess = !(_.lastIndexOf(allowedSubChapters, requestSubChapterId) < 0);
        }
        break;
      case 'TRANSACT':
        if (canTransact) {
          accessControl.hasAccess = MlSubChapterAccessControl.canNonMoolyaSubChapterAccess(permission, requestSubChapterId, allowedSubChapters);
        } else {
          accessControl.hasAccess = !(_.lastIndexOf(allowedSubChapters, requestSubChapterId) < 0);
        }
        break;
    }
    return accessControl;
  }

  static resolveNonMoolyaInternalAccess(permission, context) {
    const isInternalUser = context.isInternalUser;
    const contextSubChapterId = context.contextSubChapterId;
    const contextChapterId = context.contextChapterId;
    const requestSubChapterId = context.requestSubChapterId;
    let accessControl = {
      hasAccess: false, isInclusive: true, subChapters: [], chapters: []
    };
    /** Add context user specific subChapter */
    let allowedSubChapters = [contextSubChapterId];
    let allowedChapters = [contextChapterId];
    /** Non-Moolya can access external Users as well hence we are checking the externalUserAccess */
    // var accessInternalUser=context.internalCrossAccess?context.internalCrossAccess:isInternalUser;
    const accessInternalUser = _.isBoolean(context.internalCrossAccess) ? context.internalCrossAccess : isInternalUser;
    /** get all related sub Chapters. */
    const relatedObj = MlSubChapterAccessControl.getRelatedSubChapters(accessInternalUser, contextSubChapterId, permission);
    allowedSubChapters = allowedSubChapters.concat(relatedObj.relatedSubChapters);
    allowedChapters = allowedChapters.concat(relatedObj.relatedChapters);
    switch (permission) {
      case 'SEARCH':
        accessControl = {
          hasAccess: true,
          isInclusive: true,
          subChapters: allowedSubChapters,
          chapters: allowedChapters
        };
        break;
      case 'VIEW':
        accessControl.hasAccess = !(_.lastIndexOf(allowedSubChapters, requestSubChapterId) < 0);
        break;
      case 'TRANSACT':
        // accessControl.hasAccess = _.lastIndexOf(allowedSubChapters, requestSubChapterId) < 0 ? false : true;
        accessControl = {
          hasAccess: !(_.lastIndexOf(allowedSubChapters, requestSubChapterId) < 0),
          isInclusive: true,
          subChapters: allowedSubChapters,
          chapters: allowedChapters
        }
        break;
    }
    return accessControl;
  }

  /**
   * This method returns the values for the search
   * @param permission(eg:Search)
   * @param requestSubChapter(eg:optional)
   * returns result Object which contains private sub chapters list(all private sub chapters)
   */
  static getPrivateEcoSystemSubChapters(permission, requestSubChapterId) {
    let privateSubChapters = [];
    switch (permission) {
      case 'SEARCH':
        privateSubChapters = mlDBController.find('MlSubChapters', {
          isDefaultSubChapter: false, 'moolyaSubChapterAccess.externalUser.canSearch': false, 'moolyaSubChapterAccess.externalUser.canView': false, 'moolyaSubChapterAccess.externalUser.canTransact': false
        }).fetch();
    }
    const privateSubChaptersList = _.map(privateSubChapters, '_id');
    return privateSubChaptersList;
  }

  /** get private ecosystem non-moolya subChapters */
  static canMoolyaSubChapterAccess(permission, requestSubChapterId) {
    const privateSubChapters = [];
    let accessCount = 0;
    let hasAccess = false;
    switch (permission) {
      case 'VIEW':
        accessCount = mlDBController.find('MlSubChapters', {
          isDefaultSubChapter: false,
          _id: requestSubChapterId,
          $or: [{ 'moolyaSubChapterAccess.externalUser.canView': true },
            { 'moolyaSubChapterAccess.externalUser.canTransact': true }]
        }).count();
        break;
      case 'TRANSACT':
        accessCount = mlDBController.find('MlSubChapters', {
          isDefaultSubChapter: false,
          _id: requestSubChapterId,
          'moolyaSubChapterAccess.externalUser.canTransact': true
        }).count();
    }
    if (accessCount > 0) {
      hasAccess = true
    }

    return hasAccess;
  }

  /**
   * This method constructs the values for the search
   * @param permission(eg:Search)
   * @param relatedSubChapters(eg:allowed sub chapters)
   * returns result Object which contains private sub chapters list(excluding the related subchapters)
   */
  static getNonRelatedPrivateEcoSystemSubChapters(permission, relatedSubChapters) {
    let privateSubChapters = [];
    switch (permission) {
      case 'SEARCH':
        privateSubChapters = mlDBController.find('MlSubChapters', {
          isDefaultSubChapter: false,
          _id: { $nin: relatedSubChapters },
          'moolyaSubChapterAccess.externalUser.canSearch': false,
          'moolyaSubChapterAccess.externalUser.canView': false,
          'moolyaSubChapterAccess.externalUser.canTransact': false
        }).fetch();
    }
    const privateSubChaptersList = _.map(privateSubChapters, '_id');
    return privateSubChaptersList;
  }

  /** check for view/transact access for nonMoolyaSubChapter Access */
  static canNonMoolyaSubChapterAccess(permission, requestSubChapterId, relatedSubChapters) {
    let hasAccess = false;
    let accessCount = 0;
    /** check if requested subchapter is part of relatedSubChapter or self */
    if (_.isArray(relatedSubChapters)) {
      accessCount = _.indexOf(relatedSubChapters, requestSubChapterId) < 0 ? 0 : 1;
    }
    if (accessCount <= 0) {
      switch (permission) {
        case 'VIEW':
          /** conditions 1)moolya sub chapter check 2)non-moolya sub chapter+view/transact access check */
          accessCount = mlDBController.find('MlSubChapters', {
            $or: [{ isDefaultSubChapter: true, _id: requestSubChapterId },
              {
                isDefaultSubChapter: false,
                'moolyaSubChapterAccess.externalUser.canView': true,
                _id: requestSubChapterId
              },
              {
                isDefaultSubChapter: false,
                'moolyaSubChapterAccess.externalUser.canTransact': true,
                _id: requestSubChapterId
              }
            ]
          }).count();
          break;
        case 'TRANSACT':
          /** conditions 1)moolya sub chapter check 2)non-moolya sub chapter+transact access check */
          accessCount = mlDBController.find('MlSubChapters', {
            $or: [{ isDefaultSubChapter: true, _id: requestSubChapterId },
              {
                isDefaultSubChapter: false,
                'moolyaSubChapterAccess.externalUser.canTransact': true,
                _id: requestSubChapterId
              }
            ]
          }).count();
          break;
      }
    }
    if (accessCount > 0) {
      hasAccess = true
    }

    return hasAccess;
  }

  /** get related subChapters */
  static getRelatedSubChapters(isInternalUser, subChapterId, permission) {
    const matchQuery = MlSubChapterAccessControl.constructRelatedSubChapterQuery(isInternalUser, permission);
    const pipeline = [{
      $match: { subChapters: { $elemMatch: { subChapterId } }, isActive: true }
    },
    { $unwind: '$subChapters' },
    {
      $match: { 'subChapters.subChapterId': { $ne: subChapterId } }
    },
    {
      $match: matchQuery
    },
    {
      $project: { _id: '$subChapters.subChapterId', chapterId: '$subChapters.chapterId' }
    }
    ];
    const relatedObj = mlDBController.aggregate('MlRelatedSubChapters', pipeline);
    const relatedSubChapters = _.map(relatedObj, '_id');
    const relatedChapters = _.map(relatedObj, 'chapterId');
    return { relatedSubChapters, relatedChapters };
  }

  /** constructor query for related sub Chapters */
  static constructRelatedSubChapterQuery(isInternalUser, permission) {
    let matchQuery = null;
    /** Business requirement specific query */
    /** Todo: change the 'subChapters' key(subChapters.externalUser.canSearch) is hardcoded in query constructor, make it parameterised */
    switch (permission) {
      case 'SEARCH':
        matchQuery = { $or: [{ 'externalUser.canSearch': true }, { 'externalUser.canView': true }, { 'externalUser.canTransact': true }] };
        if (isInternalUser) {
          matchQuery = { $or: [{ 'backendUser.canSearch': true }, { 'backendUser.canView': true }, { 'backendUser.canTransact': true }] };
        }
        break;
      case 'VIEW':
        matchQuery = { $or: [{ 'externalUser.canView': true }, { 'externalUser.canTransact': true }] };
        if (isInternalUser) {
          matchQuery = { $or: [{ 'backendUser.canView': true }, { 'backendUser.canTransact': true }] };
        }
        break;
      case 'TRANSACT':
        matchQuery = { 'externalUser.canTransact': true };
        if (isInternalUser) {
          matchQuery = { 'backendUser.canTransact': true };
        }
    }
    return matchQuery;
  }

  static fetchSubChapterDetails(subChapterId) {
    const subChapter = mlDBController.findOne('MlSubChapters', { _id: subChapterId }) || {};
    return subChapter;
  }

  static setUserContext(context, requestSubChapterId) {
    const userId = context.userId;
    context.requestSubChapterId = requestSubChapterId;
    let userProfile = new MlAdminUserContext()._userDefaultProfileDetails(userId);
    /** if its internal user */
    if (userProfile && userProfile.isInternaluser) {
      context.isInternalUser = userProfile.isInternaluser;
      context.isMoolya = _.isBoolean(userProfile.isMoolya) ? userProfile.isMoolya : false;
      /** todo:Provision for multi subchapter access control */
      context.contextSubChapterId = _.isArray(userProfile.defaultSubChapters) ? userProfile.defaultSubChapters[0] : null;
      context.contextChapterId = _.isArray(userProfile.defaultChapters) ? userProfile.defaultChapters[0] : null;
    }
    /** if its external user */
    else {
      context.isInternalUser = false;
      userProfile = new MlUserContext().userProfileDetails(userId);
      if (userProfile && !userProfile.isInternaluser) {
        const contextSubChapterId = userProfile.subChapterId ? userProfile.subChapterId : null;
        const contextChapterId = userProfile.chapterId ? userProfile.chapterId : null;
        context.contextSubChapterId = contextSubChapterId;
        context.contextChapterId = contextChapterId;
        const subChapter = MlSubChapterAccessControl.fetchSubChapterDetails(contextSubChapterId);
        context.isMoolya = _.isBoolean(subChapter.isDefaultSubChapter) ? subChapter.isDefaultSubChapter : false;
      }
    }

    return context;
  }
}
module.exports = MlSubChapterAccessControl;
