import _ from 'lodash';
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext';
import MlAdminContextQueryConstructor from './mlAdminContextQueryConstructor';
import MlSubChapterAccessControl from '../../../../../server/mlAuthorization/mlSubChapterAccessControl'
MlChaptersTemp = new Mongo.Collection('mlChaptersTemp');

const mergeQueries = function (userFilter, serverFilter) {
  let query = userFilter || {};
  if (_.isEmpty(query)) {
    query = serverFilter || {};
  } else {
    query = { $and: [userFilter, serverFilter] };
  }
  return query;
}
const CoreModules = {
  MlClusterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    const resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    // let query=contextQuery;
    const countriesId = [];
    const activeCluster = [];
    const activeCountries = mlDBController.find('MlCountries', { isActive: true }, context, { sort: { country: 1 } }).fetch();
    activeCountries.map((country) => {
      countriesId.push(country._id);
    })
    const Clusters = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();

    countriesId.map((id) => {
      Clusters.map((cluster) => {
        if (cluster.countryId == id) {
          activeCluster.push(cluster);
        }
      })
    })
    const data = activeCluster;
    // const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
    return { totalRecords: Clusters.length, data };
  },
  MlChapterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    if (!fieldsProj.sort) {
      fieldsProj.sort = {
        chapterName: 1
      }
    }

    const pipeline = [];
    let resultantQuery = {};
    const clusterId = requestParams && requestParams.clusterId && requestParams.clusterId != 'all' ? requestParams.clusterId : null;
    if (clusterId) {
      if ((!_.isEmpty(contextQuery)) && _.indexOf(contextQuery._id, 'all') < 0) {
        resultantQuery = { clusterId };
        if (Object.keys(userFilterQuery).length) {
          resultantQuery = mergeQueries(resultantQuery, userFilterQuery);
        }
        pipeline.push({ $match: { _id: { $in: contextQuery._id } } });
      } else {
        pipeline.push({ $match: { clusterId } });
        resultantQuery = userFilterQuery;
      }
    } else {
      resultantQuery = mergeQueries(userFilterQuery, contextQuery);
    }
    pipeline.push({
      $lookup: {
        from: 'mlCities', localField: 'cityId', foreignField: '_id', as: 'cityInfo'
      }
    });
    pipeline.push({ $match: { 'cityInfo.isActive': true } });
    if (resultantQuery) {
      pipeline.push({ $match: resultantQuery });
    }
    if (fieldsProj.sort) {
      pipeline.push({ $sort: fieldsProj.sort });
    }
    if (fieldsProj.skip) {
      pipeline.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      pipeline.push({ $limit: parseInt(fieldsProj.limit) });
    } else {
      pipeline.push({ $out: 'mlChaptersTemp' });
    }
    let myAggregateCheck = mlDBController.aggregate('MlChapters', pipeline, context);
    if (!fieldsProj.limit) {
      myAggregateCheck = MlChaptersTemp.find({}).fetch();
    }
    const mytotalRecords = MlChapters.find(resultantQuery, fieldsProj).count();
    return { totalRecords: mytotalRecords, data: myAggregateCheck };
  },
  MlSubChapterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    let resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    // let query=contextQuery;
    const chapterId = requestParams && requestParams.chapterId ? requestParams.chapterId : null;
    const clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
    if (chapterId) {
      // resultantQuery = mergeQueries(resultantQuery, {"chapterId":chapterId})
      resultantQuery = mergeQueries({ chapterId }, userFilterQuery);
      if (!_.isEmpty(contextQuery) && _.indexOf(contextQuery._id, 'all') < 0) {
        resultantQuery = mergeQueries(resultantQuery, { _id: { $in: contextQuery._id } });
      }
    }
    const data = MlSubChapters.find(resultantQuery, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlChapters', resultantQuery, context, fieldsProj).count();
    return { totalRecords, data };
  },
  MlCommunityRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    // TODO:User Data Context Query
    // Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query = {};
    // User selection filter.
    const subChapterId = requestParams && requestParams.subChapterId ? requestParams.subChapterId : null;
    if (subChapterId) {
      query = { subChapterId };
    }

    // const data= MlCommunity.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlCommunity', query, context, fieldsProj).fetch();
    // const totalRecords = MlCommunity.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlCommunity', query, context, fieldsProj).count();
    return { totalRecords, data };
  },
  MlMasterSettingsRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    // TODO:User Data Context Query
    // Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let serverQuery = {};
    let query = {};
    // User selection filter.
    const settingsType = requestParams && requestParams.settingsType ? requestParams.settingsType : null;
    const userId = requestParams && requestParams.userId ? requestParams.userId : null;
    // as it is cluster level settings
    const userProfile = new MlAdminUserContext().userProfileDetails(userId);
    const hierarchyRedId = userProfile.defaultProfileHierarchyRefId;
    serverQuery = { hierarchyRefId: hierarchyRedId, type: settingsType };

    query = mergeQueries(userFilterQuery, serverQuery);
    // const data= MlMasterSettings.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlMasterSettings', query, context, fieldsProj).fetch();
    // const totalRecords=MlMasterSettings.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlMasterSettings', query, context, fieldsProj).count();

    return { totalRecords, data };
  },
  /**
   * @Note 1) sending registrationId from client need to update it as docId from the client.
   *       2) if(1) changes to be made in users about transaction also, using registrationId there.
   * */
  MlAuditLogRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context, userSpecificSearch) => {
    let data = [],
      totalRecords = 0;
    if (!fieldsProj.sort) {
      fieldsProj.sort = { timeStamp: -1 }
    }
    requestParams = requestParams || null;
    const reqArray = requestParams.moduleName.split(',');
    const serverQuery = { moduleName: { $in: reqArray } };
    if (requestParams && requestParams.registrationId) { serverQuery.docId = requestParams.registrationId; }
    // construct context query with $in operator for each fields
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    _.each(resultantQuery, (r) => {
      if (_.isArray(r)) {
        r.push('all');
      }
    });
    // FIX for Issue: MOOLYA=2361
    const serverFilterQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(resultantQuery, serverQuery), '$and');
    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    // Fix for Issue: MOOLYA-2361
    const result = CoreModules.MlAuditHistorySearchResult(requestParams.moduleName, resultantQuery, serverFilterQuery, userFilterQuery, fieldsProj, context, userSpecificSearch);
    if (result.resultsFetched) {
      data = result.data || []; totalRecords = result.totalRecords || 0;
    } else {
      data = MlAudit.find(resultantQuery, fieldsProj).fetch();
      totalRecords = mlDBController.find('MlAudit', resultantQuery, context, fieldsProj).count();
    }
    data.map((doc, index) => {
      let userObj;
      if (doc && doc.userId) {
        userObj = Meteor.users.findOne({ _id: doc.userId }) || {};
      }
      // let firstName = userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.firstName ? userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.firstName : "";
      // let lastName = userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.lastName ? userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.lastName : "";
      const firstName = userObj && userObj.profile && userObj.profile.firstName ? userObj.profile.firstName : '';
      const lastName = userObj && userObj.profile && userObj.profile.lastName ? userObj.profile.lastName : '';
      data[index].userName = firstName && lastName ? `${firstName} ${lastName}` : doc.userName
    })
    return { totalRecords, data };
  },

  MlHierarchySubChapterRepo: (requestParams, contextQuery, fieldsProj, context) => {
    let nonMoolyaQuery = {};
    let moolyaQuery = {};
    const processedData = []
    // User selection filter.
    const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
    if (userProfile.hierarchyLevel == 4) {
      const clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
      if (clusterId) {
        nonMoolyaQuery = { clusterId, isDefaultSubChapter: false };
        moolyaQuery = { clusterId, isDefaultSubChapter: true }
      }
      const nonMoolya = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).fetch();
      const moolya = mlDBController.findOne('MlSubChapters', moolyaQuery, context, fieldsProj);
      if (moolya && moolya.isDefaultSubChapter === true) {
        processedData.push(moolya)
        if (nonMoolya) {
          nonMoolya.map((doc, id) => {
            processedData.push(doc)
          })
        }
      }
      data = processedData
      var totalRecords = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).count();
      return { totalRecords: totalRecords + 1, data };
    }
    const subChapters = userProfile.defaultSubChapters
    const clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
    nonMoolyaQuery = { clusterId, _id: { $in: subChapters }, isDefaultSubChapter: false };
    var data = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).fetch();
    var totalRecords = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).count();
    return { totalRecords, data };
  },
  MlInternalRequestRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const type = requestParams && requestParams.type ? requestParams.type : '';
    const contextFieldMap = {
      clusterId: 'cluster',
      chapterId: 'chapter',
      subChapterId: 'subChapter',
      communityId: 'communityId',
      communityCode: 'community'
    };
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    // construct context query with $in operator for each fields
    const userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    let serverQuery = {};
    switch (type) {
      // custom restriction for registration
      case 'requested':
        serverQuery = { status: { $in: ['Pending', 'WIP'] } };
        break;
      case 'approved':
        serverQuery = { status: 'Approved' };
        break;
      case 'rejected':
        serverQuery = { status: 'Rejected' };
        break;
    }
    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    if (!fieldsProj.sort) {
      fieldsProj.sort = { transactionCreatedDate: -1 }
    }

    const data = MlRequests.find(resultantQuery, fieldsProj).fetch() || [];
    const totalRecords = MlRequests.find(resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },
  MlTemplatesAssignmentRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const contextFieldMap = {
      clusterId: 'templateclusterId',
      chapterId: 'templatechapterId',
      subChapterId: 'templatesubChapterId',
      communityId: 'communityId',
      communityCode: 'templatecommunityCode'
    };
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    // this is specific to template assignment
    // community is is not captured in template assignment
    _.omit(resultantQuery, ['communityId']);
    // add all for each option
    _.each(resultantQuery, (r) => {
      if (_.isArray(r)) {
        r.push('all');
      }
    });

    // construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');

    if (!fieldsProj.sort) {
      fieldsProj.sort = { createdDate: -1 }
    }

    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery), '$and');
    const data = MlTemplateAssignment.find(resultantQuery, fieldsProj).fetch();
    const totalRecords = MlTemplateAssignment.find(resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },
  MlRegistrationRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const type = requestParams && requestParams.type ? requestParams.type : '';
    const contextFieldMap = {
      clusterId: 'registrationInfo.clusterId',
      chapterId: 'registrationInfo.chapterId',
      subChapterId: 'registrationInfo.subChapterId',
      communityId: 'registrationInfo.communityId',
      communityCode: 'registrationInfo.registrationType'
    };
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    // construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    let serverQuery = {};
    switch (type) {
      // custom restriction for registration
      case 'requested':
        serverQuery = { status: { $nin: ['REG_USER_APR', 'REG_ADM_REJ', 'REG_USER_REJ'] } };
        break;
      case 'approved':
        serverQuery = { status: 'REG_USER_APR' };
        break;
      case 'rejected':
        serverQuery = { status: { $in: ['REG_ADM_REJ', 'REG_USER_REJ'] } };
        break;
    }

    // To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = { 'registrationInfo.registrationDate': -1 }
    }

    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const result = [];
    let data = MlRegistration.find(resultantQuery, fieldsProj).fetch() || [];
    const totalRecords = MlRegistration.find(resultantQuery, fieldsProj).count();
    data.map((doc, index) => {
      let object;
      object = doc.registrationInfo;
      object._id = doc._id;
      object.registrationStatus = doc.status;
      if (doc.allocation && doc.allocation.assigneeId) {
        // object.assignedUser = doc.allocation.assignee
        const user = mlDBController.findOne('users', { _id: doc.allocation.assigneeId });
        object.assignedUser = `${user.profile.firstName} ${user.profile.lastName}`
        object.assignedUserId = doc.allocation.assigneeId
        object.allocationStatus = doc.allocation.allocationStatus
      }
      /* else{
       object.assignedUser = "Un Assigned"
       } */
      result.push(object);
    });
    data = result;
    return { totalRecords, data };
  },
  MlPortfolioRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const type = requestParams && requestParams.type ? requestParams.type : '';
    // construct context query with $in operator for each fields
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    let serverQuery = {};
    switch (type) {
      // custom restriction for registration
      case 'requested':
        // serverQuery = {'status': {'$in': ['WIP', 'Yet To Start', 'Go Live']}};
        serverQuery = { status: { $nin: ['PORT_LIVE_NOW'] } };
        if (!fieldsProj.sort) {
          fieldsProj.sort = { createdAt: -1 }
        }
        break;
      case 'approved':
        serverQuery = { status: 'PORT_LIVE_NOW' };
        if (!fieldsProj.sort) {
          fieldsProj.sort = { transactionUpdatedDate: -1 }
        }
        break;
    }
    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const data = MlPortfolioDetails.find(resultantQuery, fieldsProj).fetch() || [];
    const totalRecords = MlPortfolioDetails.find(resultantQuery, fieldsProj).count();
    data.map((doc, index) => {
      if (doc.allocation && doc.allocation.assigneeId) {
        // doc.assignedUser = doc.allocation.assignee
        const user = mlDBController.findOne('users', { _id: doc.allocation.assigneeId });
        doc.assignedUser = `${user.profile.firstName} ${user.profile.lastName}`
        doc.assignedUserId = doc.allocation.assigneeId
        doc.allocationStatus = doc.allocation.allocationStatus
      }
    });
    return { totalRecords, data };
  },
  MlTransactionLogRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    const type = requestParams && requestParams.transactionTypeName ? requestParams.transactionTypeName : '';
    let serverQuery = {};
    const query = {};
    if (!fieldsProj.sort) {
      fieldsProj.sort = { createdAt: -1 }
    }
    switch (type) {
      case 'interactions':
        serverQuery = { transactionTypeName: 'interaction' };
        break;
      case 'system':
        serverQuery = { transactionTypeName: 'system' };
        break;
      case 'conversations':
        serverQuery = { transactionTypeName: 'conversation' };
        break;
    }
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const data = mlDBController.find('MlTransactionsLog', resultantQuery, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlTransactionsLog', resultantQuery, context, fieldsProj).count();
    return { totalRecords, data };
  },

  MlProcessTransactionRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const contextFieldMap = {};
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);

    // community is is not captured in process transaction
    _.omit(resultantQuery, ['communityId']);

    // construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    const serverQuery = {};
    // To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = { dateTime: -1 }
    }

    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const result = [];
    const data = MlProcessTransactions.find(resultantQuery, fieldsProj).fetch() || [];
    const totalRecords = MlProcessTransactions.find(resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },

  MlShareTransactionRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const contextFieldMap = {
      clusterId: 'owner.clusterId',
      chapterId: 'owner.chapterId',
      subChapterId: 'owner.subChapterId',
      communityId: 'owner.communityId',
      communityCode: 'owner.communityCode'
    };
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);

    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    const pipeline = [];

    if (Object.keys(resultantQuery).length) {
      pipeline.push({ $match: resultantQuery });
    }

    pipeline.push({ $match: userFilterQuery });

    pipeline.push(
      {

        $group: {
          _id: '$sharedId',
          userId: { $first: '$owner.userId' },
          profileId: { $first: '$owner.profileId' },
          createdAt: { $first: '$createdAt' },
          totalRecords: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users', localField: 'userId', foreignField: '_id', as: 'contactInfo'
        }
      },
      { $unwind: '$contactInfo' },
      { $addFields: { userProfiles: { $cond: [{ $isArray: '$contactInfo.profile.externalUserProfiles' }, '$contactInfo.profile.externalUserProfiles', [{}]] } } },
      {
        $addFields: {
          userProfiles: {
            $filter: {
              input: '$userProfiles',
              as: 'userProfile',
              cond: { $eq: ['$$userProfile.profileId', '$profileId'] }
            }
          }
        }
      },
      { $unwind: '$userProfiles' },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          createdBy: '$contactInfo.profile.displayName',
          userId: '$userId',
          profileId: '$profileId',
          email: '$contactInfo.profile.email',
          mobileNumber: '$contactInfo.profile.mobileNumber',
          cluster: '$userProfiles.clusterName',
          chapter: '$userProfiles.chapterName',
          subChapter: '$userProfiles.subChapterName',
          community: '$userProfiles.communityName',
          transactionType: 'Share',
          totalRecords: 1
        }
      }
    )

    if (fieldsProj.sort) {
      pipeline.push({ $sort: fieldsProj.sort });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    if (fieldsProj.skip) {
      pipeline.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      pipeline.push({ $limit: parseInt(fieldsProj.limit) });
    }
    const data = mlDBController.aggregate('MlSharedLibrary', pipeline);

    const totalRecords = mlDBController.find('MlSharedLibrary', resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },


  MlOfficeTransactionRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    // var contextFieldMap = {
    //   'clusterId': 'clusterId',
    //   'chapterId': 'chapterId',
    //   'subChapterId': 'subChapterId',
    //   'communityId': 'communityId'
    // };
    // var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    // resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');

    // construct context query with $in operator for each fields
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    const serverQuery = {};
    // To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = { dateTime: -1 }
    }

    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');
    const pipleline = []
    if (Object.keys(resultantQuery).length) {
      pipleline.push({ $match: resultantQuery });
    }
    pipleline.push(
      {
        $lookup: {
          from: 'users', localField: 'userId', foreignField: '_id', as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'mlOffice', localField: 'officeId', foreignField: '_id', as: 'office'
        }
      },
      { $unwind: '$office' },
      {
        $project: {
          userName: '$user.profile.displayName',
          dateTime: 1,
          userId: 1,
          paymentDetails: 1,
          transactionId: 1,
          clusterName: 1,
          chapterName: 1,
          subChapterName: 1,
          communityName: 1,
          status: 1,
          profileId: '$office.profileId'
        }
      }
    )

    if (fieldsProj.sort) {
      pipleline.push({ $sort: fieldsProj.sort });
    }
    if (fieldsProj.skip) {
      pipleline.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      pipleline.push({ $limit: parseInt(fieldsProj.limit) });
    }
    const data = mlDBController.aggregate('MlOfficeTransaction', pipleline);
    const totalRecords = mlDBController.find('MlOfficeTransaction', resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },
  MlDocumentRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const type = requestParams && requestParams.type ? requestParams.type : '';
    const contextFieldMap = {
      clusterId: 'clusters',
      chapterId: 'chapters',
      subChapterId: 'subChapters',
      communityId: 'communities'
    };
    /* database keys issue */
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    // add all for each option
    _.each(resultantQuery, (r) => {
      if (_.isArray(r)) {
        r.push('all');
      }
    });
    // construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    let serverQuery = {};

    serverQuery = { isActive: true };
    // To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = { date: -1 }
    }

    // todo: internal filter query should be constructed.
    // resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const result = [];

    let data = null
    data = MlProcessMapping.find(resultantQuery, fieldsProj).fetch() || [];
    data.map((doc, index) => {
      const industryIds = [];
      const communityIds = [];
      const clusterIds = [];
      const stateIds = [];
      const chapterIds = [];
      const subChapterIds = [];
      const professionIds = [];
      const userTypeIds = [];
      const processTypes = MlprocessTypes.findOne({ _id: doc.process });
      doc.communities.map((ids) => {
        communityIds.push(ids)
      });
      const communityData = MlCommunityDefinition.find({ code: { $in: communityIds } }).fetch() || [];
      const communityNames = []; // @array of strings
      communityData.map((doc) => {
        communityNames.push(doc.name)
      });
      doc.industries.map((ids) => {
        industryIds.push(ids)
      });
      const industryData = MlIndustries.find({ _id: { $in: industryIds } }).fetch() || [];
      const industryNames = []; // @array of strings
      industryData.map((doc) => {
        industryNames.push(doc.industryName)
      });
      doc.professions.map((ids) => {
        professionIds.push(ids)
      });
      const professionData = MlProfessions.find({ _id: { $in: professionIds } }).fetch() || [];
      const professionNames = []; // @array of strings
      professionData.map((doc) => {
        professionNames.push(doc.professionName)
      });
      doc.clusters.map((ids) => {
        clusterIds.push(ids)
      });
      const clusterData = MlClusters.find({ _id: { $in: clusterIds } }).fetch() || [];
      const clusterNames = []; // @array of strings
      clusterData.map((doc) => {
        clusterNames.push(doc.clusterName)
      });
      doc.states.map((ids) => {
        stateIds.push(ids)
      });
      const stateData = MlStates.find({ _id: { $in: stateIds } }).fetch() || [];
      const stateNames = []; // @array of strings
      stateData.map((doc) => {
        stateNames.push(doc.name)
      });
      doc.chapters.map((ids) => {
        chapterIds.push(ids)
      });
      const chapterData = MlChapters.find({ _id: { $in: chapterIds } }).fetch() || [];
      const chapterNames = []; // @array of strings
      chapterData.map((doc) => {
        chapterNames.push(doc.chapterName)
      });

      doc.subChapters.map((ids) => {
        subChapterIds.push(ids)
      });
      const subChapterData = MlSubChapters.find({ _id: { $in: subChapterIds } }).fetch() || [];
      const subChapterNames = []; // @array of strings
      subChapterData.map((doc) => {
        subChapterNames.push(doc.subChapterName)
      });
      doc.userTypes.map((ids) => {
        userTypeIds.push(ids)
      });
      const userTypeData = MlUserTypes.find({ _id: { $in: userTypeIds } }).fetch() || [];
      const userTypeNames = []; // @array of strings
      userTypeData.map((doc) => {
        userTypeNames.push(doc.userTypeName)
      });

      data[index].communityNames = communityNames || [];
      data[index].professionNames = professionNames || [];
      data[index].industryNames = industryNames || [];
      data[index].clusterNames = clusterNames || [];
      data[index].stateNames = stateNames || [];
      data[index].chapterNames = chapterNames || [];
      data[index].subChapterNames = subChapterNames || [];
      data[index].userTypeNames = userTypeNames || [];

      data[index].processName = processTypes.processName;
    });
    const totalRecords = MlProcessMapping.find(resultantQuery, fieldsProj).count();
    return { totalRecords, data };
  },
  MlServiceCardsTransactionRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    if (!fieldsProj.sort) {
      fieldsProj.sort = { updatedAt: -1 }
    }
    const serverQuery = {
      isBeSpoke: false,
      //      'isCurrentVersion': true,
      isReview: true
    };
    const query = {};
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');
    const service = MlServiceCardDefinition.find(resultantQuery, fieldsProj).fetch();
    const data = [];
    service.map((details, index) => {
      data.push(details)
      const userData = mlDBController.find('users', { 'profile.externalUserProfiles.profileId': details.profileId }).fetch();
      userData.map((list) => {
        data[index].email = list.username;
        list.profile.externalUserProfiles.map((user) => {
          if (details.profileId === user.profileId) { data[index].userDetails = user; }
        });
      });
    });
    const totalRecords = mlDBController.find('MlServiceCardDefinition', resultantQuery, context, fieldsProj).count();
    return { totalRecords, data };
  },
  MlHierarchyClusterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    let resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    const countriesId = [];
    const activeCluster = [];
    const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
    if (userProfile.hierarchyLevel == 4) {
      const activeCountries = mlDBController.find('MlCountries', { isActive: true }, context, { sort: { country: 1 } }).fetch();
      activeCountries.map((country) => {
        countriesId.push(country._id);
      })
      const Clusters = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
      countriesId.map((id) => {
        Clusters.map((cluster) => {
          if (cluster.countryId == id) {
            activeCluster.push(cluster);
          }
        })
      })
      const data = activeCluster;
      const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
      return { totalRecords: totalRecords + 1, data };
    }
    const clusterIds = userProfile && userProfile.defaultCluster ? userProfile.defaultCluster : [];
    resultantQuery = { _id: { $in: [clusterIds] } }
    const data = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
    return { totalRecords, data };
  },

  /**
   * hierarcy department fetch repo
   * */
  MlHierarchyDepartmentsRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    const list = [];
    const subChapter = mlDBController.findOne('MlSubChapters', { _id: requestParams.subChapterId }, context) || {}
    let depQuery = {}
    if (subChapter.isDefaultSubChapter) { depQuery = { $and: [{ isMoolya: true }, { 'depatmentAvailable.cluster': { $in: ['all', requestParams.clusterId] } }] } } else if (!subChapter.isDefaultSubChapter) { depQuery = { $and: [{ 'depatmentAvailable.cluster': { $in: ['all', requestParams.clusterId] } }, { depatmentAvailable: { $elemMatch: { subChapter: { $in: ['all', requestParams.subChapterId] } } } }] } }
    depQuery = mergeQueries(depQuery, userFilterQuery);

    const piplelineQuery = []
    piplelineQuery.push(
      { $match: depQuery },
      {
        $lookup: {
          from: 'mlSubDepartments',
          localField: '_id',
          foreignField: 'departmentId',
          as: 'subDepartmentDetails'
        }
      },
      { $unwind: { path: '$subDepartmentDetails', preserveNullAndEmptyArrays: true } },
      {
        $project:
          {
          	_id: 0,
          	departmentId: '$_id',
          	departmentName: 1,
          	subDepartmentId: '$subDepartmentDetails._id',
          	subDepartmentName: '$subDepartmentDetails.subDepartmentName',
          	isMoolya: '$isMoolya',
          	isActive: '$isActive',
          	clusterId: requestParams.clusterId,
          	subChapterId: requestParams.subChapterId
          }
      },
      {
        $lookup:
          {
          	from: 'mlSubChapters',
          	localField: 'subChapterId',
          	foreignField: '_id',
          	as: 'subChapterDetails'
          }
      },
      {
        $unwind: {
          path: '$subChapterDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          departmentId: 1,
          departmentName: 1,
          subDepartmentId: 1,
          subDepartmentName: 1,
          isMoolya: 1,
          isActive: 1,
          clusterId: 1,
          subChapterId: 1,
          isDefaultSubChapter: '$subChapterDetails.isDefaultSubChapter'
        }
      }
    )

    const counterQuery = _.clone(piplelineQuery)
    counterQuery.push({ $count: 'totalRecords' })
    const totalRecordsCount = mlDBController.aggregate('MlDepartments', counterQuery);

    if (fieldsProj.sort) {
      piplelineQuery.push({ $sort: fieldsProj.sort });
    }
    if (fieldsProj.skip) {
      piplelineQuery.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      piplelineQuery.push({ $limit: parseInt(fieldsProj.limit) });
    }
    const data = mlDBController.aggregate('MlDepartments', piplelineQuery);
    // let resp = mlDBController.find('MlDepartments', depQuery, context).fetch()
    //
    // resp.map(function (department) {
    //   let subDepartments = MlSubDepartments.find({"departmentId": department._id}).fetch();
    //   subDepartments.map(function (subDepartment) {
    //     let defaultSubChapter = JSON.parse(requestParams.defaultSubChapter);
    //     let deptAndSubDepartment = {
    //       departmentId: department._id,
    //       departmentName: department.departmentName,
    //       subDepartmentId: subDepartment._id,
    //       subDepartmentName: subDepartment.subDepartmentName,
    //       isMoolya: department.isMoolya,
    //       isActive: department.isActive,
    //       clusterId: requestParams.clusterId,
    //       subChapterId:requestParams.subChapterId,
    //       isDefaultSubChapter:defaultSubChapter
    //     }
    //     list.push(deptAndSubDepartment)
    //   })
    // })
    //
    // data = list
    return {
      totalRecords: totalRecordsCount && totalRecordsCount.length ? totalRecordsCount[0].totalRecords : 0,
      data
    };
  },
  /**
   * user module repo handler
   * */
  MlUsersRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const contextFieldMap = {
      clusterId: 'registrationInfo.clusterId',
      chapterId: 'registrationInfo.chapterId',
      subChapterId: 'registrationInfo.subChapterId',
      communityId: 'registrationInfo.communityId',
      communityCode: 'registrationInfo.registrationType'
    };
    let resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    /** construct context query with $in operator for each fields */
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    // var nonMoolyaContext = mlNonMoolyaAccess.getExternalUserCanSearch(context)
    // if (!_.isBoolean(nonMoolyaContext)){
    //   resultantQuery['registrationInfo.subChapterId'] = {$in: nonMoolyaContext.subChapters}
    //   resultantQuery['registrationInfo.chapterId'] = {$in: nonMoolyaContext.chapters}
    // }
    const dataContext = MlSubChapterAccessControl.getAccessControl('SEARCH', context, null, false)
    if (dataContext && dataContext.hasAccess && dataContext.subChapters && dataContext.subChapters.length > 0) {
      resultantQuery['registrationInfo.subChapterId'] = { $in: dataContext.subChapters }
      resultantQuery['registrationInfo.chapterId'] = { $in: dataContext.chapters }
    }
    if (!fieldsProj.sort) {
      fieldsProj.sort = {
        'registrationInfo.registrationDate': -1
      }
    }
    const serverQuery = { emails: { $elemMatch: { verified: true } } };
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');
    // var data = MlRegistration.find(resultantQuery, fieldsProj).fetch() || [];
    const piplelineQuery = []
    if (resultantQuery) { piplelineQuery.push({ $match: resultantQuery }); }

    piplelineQuery.push({
      $group: {
        _id: '$registrationInfo.userName',
        registrationId: { $first: '$_id' },
        firstName: { $first: '$registrationInfo.firstName' },
        lastName: { $first: '$registrationInfo.lastName' },
        clusterName: { $first: '$registrationInfo.clusterName' },
        chapterName: { $first: '$registrationInfo.chapterName' },
        registrationType: { $first: '$registrationInfo.registrationType' },
        subChapterName: { $first: '$registrationInfo.subChapterName' },
        accountType: { $first: '$registrationInfo.accountType' },
        userName: { $first: '$registrationInfo.userName' }
      }
    })

    if (fieldsProj.sort) {
      piplelineQuery.push({ $sort: fieldsProj.sort });
    }
    if (fieldsProj.skip) {
      piplelineQuery.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      piplelineQuery.push({ $limit: parseInt(fieldsProj.limit) });
    }
    const data = mlDBController.aggregate('MlRegistration', piplelineQuery);

    const totalRecords = MlRegistration.find(resultantQuery, fieldsProj).count();

    // var result = []
    // data.map(function (doc, index) {
    //   let object;
    //   object = doc.registrationInfo;
    //   object._id = doc._id;
    //   result.push(object);
    // });
    // var a = _.uniqBy(result, 'userName');
    // console.log(a.length)
    return { totalRecords, data };
  },

  MlUsersTransaction(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    let result = [];
    const reg = mlDBController.findOne('MlRegistration', { _id: requestParams.registrationId }, context)

    const pipeline = [{ $match: { _id: reg.registrationInfo.userId } },
      {
        $lookup: {
          from: 'mlRegistration', localField: '_id', foreignField: 'registrationInfo.userId', as: 'registration'
        }
      },
      {
        $lookup: {
          from: 'mlPortfolioDetails', localField: '_id', foreignField: 'userId', as: 'portfolio'
        }
      },
      {
        $lookup: {
          from: 'mlTransactionsLog', localField: '_id', foreignField: 'userId', as: 'transactionLog'
        }
      },
      {
        $project: {
          registration: {
            $map:
          {
          	input: '$registration',
          	as: 'reg',
          	in:
            {
            	createdAt: '$$reg.registrationInfo.registrationDate', transactionId: '$$reg.transactionId', transactionType: '$$reg.registrationInfo.transactionType', cluster: '$$reg.registrationInfo.clusterName', chapter: '$$reg.registrationInfo.chapterName', community: '$$reg.registrationInfo.communityName', status: '$$reg.status'
            }
          }
          },
          portfolio: {
            $map:
            {
            	input: '$portfolio',
            	as: 'port',
            	in:
              {
              	createdAt: '$$port.createdAt', transactionId: '$$port.transactionId', transactionType: '$$port.transactionType', cluster: '$$port.clusterName', chapter: '$$port.chapterName', community: '$$port.communityName', status: '$$port.status'
              }
            }
          },
          transactionLog: {
            $map:
            {
            	input: '$transactionLog',
            	as: 'trans',
            	in:
              {
              	createdAt: '$$trans.createdAt', transactionId: '$$trans._id', transactionType: '$$trans.transactionTypeName', cluster: '$$trans.clusterName', chapter: '$$trans.chapterName', community: '$$trans.communityName', status: '$$trans.activity'
              }
            }
          }
        }
      },
      { $project: { data: { $concatArrays: ['$registration', '$portfolio', '$transactionLog'] } } },
      // {'$addFields': { 'data.totalRecords': { $size: "$data" } } },
      { $unwind: '$data' },
      { $replaceRoot: { newRoot: '$data' } }
    ];

    result = mlDBController.aggregate('users', pipeline, context);

    const data = result;
    const totalRecords = data.length;

    return { totalRecords, data };
  },

  MlAppointmentsRepo(requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    const piplelineQuery = [
      { $match: userFilterQuery },
      { $match: { transactionTypeId: 'appointment' } },
      {
        $lookup: {
          from: 'mlAppointments',
          localField: 'docId',
          foreignField: 'appointmentId',
          as: 'scAppointment'
        }
      },
      {
        $unwind: {
          path: '$scAppointment',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'mlPayment',
          localField: 'docId',
          foreignField: 'resourceId',
          as: 'scOrder'
        }
      },
      {
        $unwind: {
          path: '$scOrder',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: '$_id',
          appointmentId: '$docId',
          createdBy: '$userName',
          emailId: '$emailId',
          source: '',
          transactionType: '$activity',
          cluster: '$clusterName',
          chapter: '$chapterName',
          subChapter: '$subChapterName',
          community: '$communityName',
          createdAt: '$createdAt',
          status: { $ifNull: ['$scOrder.status', '$scAppointment.status'] }
        }
      }
    ];


    if (fieldsProj.sort) {
      piplelineQuery.push({ $sort: fieldsProj.sort });
    } else {
      piplelineQuery.push({ $sort: { createdAt: -1 } });
    }
    if (fieldsProj.skip) {
      piplelineQuery.push({ $skip: parseInt(fieldsProj.skip) });
    }
    if (fieldsProj.limit) {
      piplelineQuery.push({ $limit: parseInt(fieldsProj.limit) });
    }
    const data = mlDBController.aggregate('MlTransactionsLog', piplelineQuery);

    const totalRecords = mlDBController.find('MlTransactionsLog', { transactionTypeId: 'appointment' }).count();

    return { totalRecords, data };
  },
  /**
   * Returns the history records for modules by aggregation (lookup with related collections).
   * @param module(eg:REGISTRATION)
   * @param resultantQuery  complete query of serverQuery and userFilter
   * @param serverQuery  server query with context
   * @param userFilter  user filter query
   * @param userSpecificSearch true if user has searched/filtered the records.
   * returns result Object containing history records for modules by aggregation (lookup with related collections).
   */
  MlAuditHistorySearchResult(module, resultantQuery, serverQuery, userFilter, fieldsProj, context, userSpecificSearch) {
    const result = { resultsFetched: false, data: [], totalRecords: 0 };
    let pipeline = [],
      foreignKeySearch = userSpecificSearch || false;
    const limitskipsort = [{ $sort: fieldsProj.sort }, { $skip: fieldsProj.skip || 0 }, { $limit: fieldsProj.limit }];
    const searchQueryParam = {
      foriegnKeys: ['docRef'],
      lookupQuery: {
        $lookup: {
          from: 'mlRegistration', localField: 'docId', foreignField: '_id', as: 'refRecord'
        }
      },
      unwindQuery: { $unwind: { path: '$refRecord', preserveNullAndEmptyArrays: true } },
      projectQuery: {
        $project: {
          clusterId: 1, chapterId: 1, subChapterId: 1, communityId: 1, communityCode: 1, moduleName: 1, userAgent: 1, userId: 1, userName: 1, docId: 1, fieldName: 1, field: 1, currentValue: 1, previousValue: 1, timeStamp: 1, docRef: '$refRecord.transactionId'
        }
      }
    };
    switch (module) {
      case 'REGISTRATION':
        result.resultsFetched = true;
        break;
      case 'PORTFOLIO,PORTFOLIOLIBRARY':
        result.resultsFetched = true; searchQueryParam.lookupQuery = {
          $lookup: {
            from: 'mlPortfolioDetails', localField: 'docId', foreignField: '_id', as: 'refRecord'
          }
        };
        break;
    }
    if (result.resultsFetched === true) {
      pipeline = [{ $match: serverQuery }, searchQueryParam.lookupQuery, searchQueryParam.unwindQuery, searchQueryParam.projectQuery];
      if (foreignKeySearch)pipeline.push({ $match: resultantQuery });

      if (!foreignKeySearch) { // check if user has enabled(filter/search)
        result.totalRecords = mlDBController.find('MlAudit', resultantQuery, context, fieldsProj).count();
      } else {
        const counterQuery = _.clone(pipeline); counterQuery.push({ $count: 'totalRecords' })
        const totalRecordsCount = mlDBController.aggregate('MlAudit', counterQuery, context);
        result.totalRecords = totalRecordsCount && totalRecordsCount.length ? totalRecordsCount[0].totalRecords : 0;
      }

      pipeline = pipeline.concat(limitskipsort);

      result.data = mlDBController.aggregate('MlAudit', pipeline, context);
    }
    return result;
  }

}


export default CoreModulesRepo = CoreModules;
