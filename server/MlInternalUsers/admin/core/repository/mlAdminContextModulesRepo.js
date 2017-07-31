import _ from "lodash";
import MlAdminUserContext from "../../../../mlAuthorization/mlAdminUserContext";
import MlAdminContextQueryConstructor from "./mlAdminContextQueryConstructor";
MlChaptersTemp = new Mongo.Collection('mlChaptersTemp');

let mergeQueries=function(userFilter,serverFilter)
{
  let query=userFilter||{};
    if (_.isEmpty(query)) {
      query = serverFilter||{};
    } else {
      query = {$and: [userFilter,serverFilter]};
    }
    return query;
}
let CoreModules = {
  MlClusterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    //let query=contextQuery;
    let countriesId = [];
    let activeCluster = [];
    let activeCountries = mlDBController.find('MlCountries', {isActive: true}, context, {sort: {country: 1}}).fetch();
    activeCountries.map(function (country) {
      countriesId.push(country._id);
    })
    let Clusters = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
    countriesId.map(function (id) {
      Clusters.map(function (cluster) {
        if (cluster.countryId == id) {
          activeCluster.push(cluster);
        }
      })
    })
    const data = activeCluster;
    const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlChapterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {

    if (!fieldsProj.sort) {
      fieldsProj.sort = {
        chapterName: 1
      }
    }

    let pipeline = [];
    let resultantQuery = {};
    let clusterId = requestParams && requestParams.clusterId && requestParams.clusterId != 'all' ? requestParams.clusterId : null;
    if (clusterId) {
      if ((!_.isEmpty(contextQuery)) && _.indexOf(contextQuery._id, "all") < 0) {
        resultantQuery = {"clusterId": clusterId};
        if (Object.keys(userFilterQuery).length) {
          resultantQuery = mergeQueries(resultantQuery, userFilterQuery);
        }
        pipeline.push({'$match': {_id: {$in: contextQuery._id}}});
      } else {
        pipeline.push({'$match': {"clusterId": clusterId}});
        resultantQuery = userFilterQuery;
      }
    } else {
      resultantQuery = mergeQueries(userFilterQuery, contextQuery);
    }
    pipeline.push({$lookup: {from: 'mlCities', localField: 'cityId', foreignField: '_id', as: 'cityInfo'}});
    pipeline.push({$match: {'cityInfo.isActive': true}});
    if (resultantQuery) {
      pipeline.push({$match: resultantQuery});
    }
    if (fieldsProj.sort) {
      pipeline.push({$sort: fieldsProj.sort});
    }
    if (fieldsProj.skip) {
      pipeline.push({$skip: parseInt(fieldsProj.skip)});
    }
    if (fieldsProj.limit) {
      pipeline.push({$limit: parseInt(fieldsProj.limit)});
    } else {
      pipeline.push({$out: "mlChaptersTemp"});
    }
    let myAggregateCheck = mlDBController.aggregate('MlChapters', pipeline, context);
    if (!fieldsProj.limit) {
      myAggregateCheck = MlChaptersTemp.find({}).fetch();
    }
    const mytotalRecords = MlChapters.find(resultantQuery, fieldsProj).count();
    return {totalRecords: mytotalRecords, data: myAggregateCheck};
  },
  MlSubChapterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    //let query=contextQuery;
    let chapterId = requestParams && requestParams.chapterId ? requestParams.chapterId : null;
    let clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
    if (chapterId) {
      // resultantQuery = mergeQueries(resultantQuery, {"chapterId":chapterId})
      resultantQuery = mergeQueries({"chapterId": chapterId}, userFilterQuery);
      if (!_.isEmpty(contextQuery) && _.indexOf(contextQuery._id, "all") < 0) {
        resultantQuery = mergeQueries(resultantQuery, {_id: {$in: contextQuery._id}});
      }
    }
    const data = MlSubChapters.find(resultantQuery, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlChapters', resultantQuery, context, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlCommunityRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query = {};
    //User selection filter.
    let subChapterId = requestParams && requestParams.subChapterId ? requestParams.subChapterId : null;
    if (subChapterId) {
      query = {"subChapterId": subChapterId};
    }

    // const data= MlCommunity.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlCommunity', query, context, fieldsProj).fetch();
    // const totalRecords = MlCommunity.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlCommunity', query, context, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};

  },
  MlMasterSettingsRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let serverQuery = {};
    let query = {};
    //User selection filter.
    let settingsType = requestParams && requestParams.settingsType ? requestParams.settingsType : null;
    let userId = requestParams && requestParams.userId ? requestParams.userId : null;
    //as it is cluster level settings
    let userProfile = new MlAdminUserContext().userProfileDetails(userId);
    let hierarchyRedId = userProfile.defaultProfileHierarchyRefId;
    serverQuery = {"hierarchyRefId": hierarchyRedId, type: settingsType};

    query = mergeQueries(userFilterQuery, serverQuery);
    // const data= MlMasterSettings.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlMasterSettings', query, context, fieldsProj).fetch();
    // const totalRecords=MlMasterSettings.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlMasterSettings', query, context, fieldsProj).count();

    return {totalRecords: totalRecords, data: data};

  },

  MlAuditLogRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    if (!fieldsProj.sort) {
      fieldsProj.sort = {timeStamp: -1}
    }
    let serverQuery = {};
    let query = {};
    let userContextQuery = {};
    requestParams = requestParams ? requestParams : null;
    let reqArray = requestParams.moduleName.split(',');
    serverQuery = {moduleName: {$in: reqArray}}
    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};



    //construct context query with $in operator for each fields
    let resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');

    //resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');


    if (!fieldsProj.sort) {
      fieldsProj.sort = {'createdDate': -1}
    }

    _.each(resultantQuery, function (r) {
      if (_.isArray(r)) {
        r.push('all');
      }
    });

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery,serverQuery), '$and');
/*    if (userProfile.hierarchyLevel == 4) {
      userContextQuery = {}
    } else if (userProfile.hierarchyLevel == 3) {
      let clusterIds = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : [];
      userContextQuery = {clusterId: {$in: [clusterIds]}}
    } else if (userProfile.hierarchyLevel == 2) {
      let chapterIds = userProfile && userProfile.defaultChapters ? userProfile.defaultChapters : [];
      userContextQuery = {chapterId: {$in: [chapterIds]}}
    } else if (userProfile.hierarchyLevel == 1) {
      let subChapterIds = userProfile && userProfile.defaultSubChapters ? userProfile.defaultSubChapters : [];
      userContextQuery = {subChapterId: {$in: [subChapterIds]}}
    }else if (userProfile.hierarchyLevel == 0) {
      let communityIds = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : [];
      userContextQuery = {clusterId: {$in: [communityIds]}}
    }
    query = mergeQueries( userFilterQuery, serverQuery);
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(query, userContextQuery), '$and');*/

    const data = MlAudit.find(resultantQuery,fieldsProj).fetch();
    data.map(function (doc, index) {
      let userObj;
      if (doc && doc.userId) {
        userObj = Meteor.users.findOne({_id: doc.userId}) || {};
      }

      let firstName = userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.firstName ? userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.firstName : "";
      let lastName = userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.lastName ? userObj && userObj.profile && userObj.profile.InternalUprofile && userObj.profile.InternalUprofile.moolyaProfile && userObj.profile.InternalUprofile.moolyaProfile.lastName : "";
      data[index].userName = firstName && lastName ? firstName + " " + lastName : doc.userName
    })
    const totalRecords = mlDBController.find('MlAudit', query, context, fieldsProj).count();

    return {totalRecords: totalRecords, data: data};
  },

  MlHierarchySubChapterRepo: (requestParams, contextQuery, fieldsProj, context) => {
    let nonMoolyaQuery = {};
    let moolyaQuery = {};
    var processedData = []
    //User selection filter.
    var userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
    if(userProfile.hierarchyLevel == 4){
      let clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
      if (clusterId) {
        nonMoolyaQuery = {"clusterId": clusterId, isDefaultSubChapter: false};
        moolyaQuery = {"clusterId": clusterId, isDefaultSubChapter: true}
      }
      var nonMoolya = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).fetch();
      var moolya = mlDBController.findOne('MlSubChapters', moolyaQuery, context, fieldsProj);
      if (moolya && moolya.isDefaultSubChapter === true) {
        processedData.push(moolya)
        if (nonMoolya) {
          nonMoolya.map(function (doc, id) {
            processedData.push(doc)
          })
        }
      }
      data = processedData
      var totalRecords = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).count();
      return {totalRecords: totalRecords + 1, data: data};
    }else{
      let subChapters = userProfile.defaultSubChapters
      let clusterId = requestParams && requestParams.clusterId ? requestParams.clusterId : null;
      nonMoolyaQuery = {"clusterId": clusterId,"_id":{'$in':subChapters}, isDefaultSubChapter: false};
      var data = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).fetch();
      var totalRecords = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).count();
      return {totalRecords: totalRecords , data: data};
    }
  },
  MlInternalRequestRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var type = requestParams && requestParams.type ? requestParams.type : "";
    var contextFieldMap = {
      'clusterId': 'cluster',
      'chapterId': 'chapter',
      'subChapterId': 'subChapter',
      'communityId': 'communityId',
      'communityCode': 'community'
    };
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    //construct context query with $in operator for each fields
    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    var serverQuery = {};
    switch (type) {
      //custom restriction for registration
      case 'requested':
        serverQuery = {'status': {'$in': ['Pending', 'WIP']}};
        break;
      case 'approved':
        serverQuery = {'status': "Approved"};
        break;
      case 'rejected':
        serverQuery = {'status': "Rejected"};
        break;
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    var data = MlRequests.find(resultantQuery, fieldsProj).fetch() || [];
    var totalRecords = MlRequests.find(resultantQuery, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlTemplatesAssignmentRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var contextFieldMap = {
      'clusterId': 'templateclusterId',
      'chapterId': 'templatechapterId',
      'subChapterId': 'templatesubChapterId',
      'communityId': 'communityId',
      'communityCode': 'templatecommunityCode'
    };
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    //this is specific to template assignment
    //community is is not captured in template assignment
    _.omit(resultantQuery, ['communityId']);
    //add all for each option
    _.each(resultantQuery, function (r) {
      if (_.isArray(r)) {
        r.push('all');
      }
    });

    //construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');

    if (!fieldsProj.sort) {
      fieldsProj.sort = {'createdDate': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery), '$and');
    var data = MlTemplateAssignment.find(resultantQuery, fieldsProj).fetch();
    var totalRecords = MlTemplateAssignment.find(resultantQuery, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlRegistrationRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var type = requestParams && requestParams.type ? requestParams.type : "";
    var contextFieldMap = {
      'clusterId': 'registrationInfo.clusterId',
      'chapterId': 'registrationInfo.chapterId',
      'subChapterId': 'registrationInfo.subChapterId',
      'communityId': 'registrationInfo.communityId',
      'communityCode': 'registrationInfo.registrationType'
    };
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    //construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    var serverQuery = {};
    switch (type) {
      //custom restriction for registration
      case 'requested':
        serverQuery = {'status': {'$in': ['Yet To Start', 'WIP']}};
        break;
      case 'approved':
        serverQuery = {'status': "Approved"};
        break;
      case 'rejected':
        serverQuery = {'status': "Rejected"};
        break;
    }

    //To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = {'registrationInfo.registrationDate': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    var result = [];
    var data = MlRegistration.find(resultantQuery, fieldsProj).fetch() || [];
    var totalRecords = MlRegistration.find(resultantQuery, fieldsProj).count();
    data.map(function (doc, index) {
      let object;
      object = doc.registrationInfo;
      object._id = doc._id;
      object.registrationStatus = doc.status;
      if (doc.allocation) {
        object.assignedUser = doc.allocation.assignee
        object.assignedUserId = doc.allocation.assigneeId
      }
      /*else{
       object.assignedUser = "Un Assigned"
       }*/
      result.push(object);
    });
    data = result;
    return {totalRecords: totalRecords, data: data};
  },
  MlPortfolioRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var type = requestParams && requestParams.type ? requestParams.type : "";
    //construct context query with $in operator for each fields
    var resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    var serverQuery = {};
    switch (type) {
      //custom restriction for registration
      case 'requested':
        serverQuery = {'status': {'$in': ['WIP', 'Yet To Start', 'Go Live']}};
        if (!fieldsProj.sort) {
          fieldsProj.sort = {'createdAt': -1}
        }
        break;
      case 'approved':
        serverQuery = {'status': "gone live"};
        if (!fieldsProj.sort) {
          fieldsProj.sort = {'transactionUpdatedDate': -1}
        }
        break;
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    var data = MlPortfolioDetails.find(resultantQuery, fieldsProj).fetch() || [];
    var totalRecords = MlPortfolioDetails.find(resultantQuery, fieldsProj).count();
    data.map(function (doc, index) {
      if (doc.allocation) {
        doc.assignedUser = doc.allocation.assignee
        doc.assignedUserId = doc.allocation.assigneeId
      }
    });
    return {totalRecords: totalRecords, data: data};
  },
  MlTransactionLogRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    var type = requestParams && requestParams.transactionTypeName ? requestParams.transactionTypeName : "";
    var serverQuery = {};
    let query = {};
    if (!fieldsProj.sort) {
      fieldsProj.sort = {createdAt: -1}
    }
    switch (type) {
      case 'interactions':
        serverQuery = {'transactionTypeName': "interaction"};
        break;
      case 'system':
        serverQuery = {'transactionTypeName': "system"};
        break;
      case 'conversations':
        serverQuery = {'transactionTypeName': "conversation"};
        break;
    }
    var resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    const data = mlDBController.find('MlTransactionsLog', resultantQuery, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlTransactionsLog', resultantQuery, context, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};

  },

  MlProcessTransactionRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {

    var contextFieldMap = {};
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);

    //community is is not captured in process transaction
    _.omit(resultantQuery, ['communityId']);

    //construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    var serverQuery = {};
    //To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = {'dateTime': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    var result = [];
    var data = MlProcessTransactions.find(resultantQuery, fieldsProj).fetch() || [];
    var totalRecords = MlProcessTransactions.find(resultantQuery, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlOfficeTransactionRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var contextFieldMap = {
      'clusterId': 'clusterId',
      'chapterId': 'chapterId',
      'subChapterId': 'subChapterId',
      'communityId': 'communityId'
    };
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);

    //construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    var serverQuery = {};
    //To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = {'dateTime': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    let pipleline = [
      {'$lookup': {from: 'users', localField: 'userId', 'foreignField': '_id', as: 'user'}},
      {'$unwind': '$user'},
      {
        '$project': {
          'userName': '$user.profile.displayName',
          'dateTime': 1,
          'userId': 1,
          'paymentDetails': 1,
          'transactionId': 1,
          'clusterName': 1,
          'chapterName': 1,
          'subChapterName': 1,
          'communityName': 1,
          'status': 1,
          'profileId': '$user.profile.externalUserProfiles.profileId'
        }
      }
    ];
    if (Object.keys(resultantQuery).length) {
      pipleline.push({'$match': resultantQuery});
    }
    if (fieldsProj.sort) {
      pipleline.push({'$sort': fieldsProj.sort});
    }
    if (fieldsProj.skip) {
      pipleline.push({'$skip': parseInt(fieldsProj.skip)});
    }
    if (fieldsProj.limit) {
      pipleline.push({'$limit': parseInt(fieldsProj.limit)});
    }
    var data = mlDBController.aggregate('MlOfficeTransaction', pipleline);
    var totalRecords = mlDBController.find('MlOfficeTransaction', resultantQuery, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlDocumentRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var type = requestParams && requestParams.type ? requestParams.type : "";
    var contextFieldMap = {
      'clusterId': 'clusters',
      'chapterId': 'chapters',
      'subChapterId': 'subChapters',
      'communityId': 'communities'
    };
    /*database keys issue*/
    var resultantQuery = MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery, contextFieldMap);
    //add all for each option
    _.each(resultantQuery, function (r) {
      if (_.isArray(r)) {
        r.push('all');
      }
    });
    //construct context query with $in operator for each fields
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(resultantQuery, '$in');
    var serverQuery = {};

    serverQuery = {'isActive': true};
    //To display the latest record based on date
    if (!fieldsProj.sort) {
      fieldsProj.sort = {'date': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');

    var result = [];

    let data = null
    data = MlProcessMapping.find(resultantQuery, fieldsProj).fetch() || [];
    data.map(function (doc, index) {
      let industryIds = [];
      let communityIds = [];
      let clusterIds = [];
      let stateIds = [];
      let chapterIds = [];
      let subChapterIds = [];
      let professionIds = [];
      let userTypeIds = [];
      let processTypes = MlprocessTypes.findOne({_id: doc.process});
      doc.communities.map(function (ids) {
        communityIds.push(ids)
      });
      const communityData = MlCommunityDefinition.find({code: {$in: communityIds}}).fetch() || [];
      let communityNames = [];  //@array of strings
      communityData.map(function (doc) {
        communityNames.push(doc.name)
      });
      doc.industries.map(function (ids) {
        industryIds.push(ids)
      });
      const industryData = MlIndustries.find({_id: {$in: industryIds}}).fetch() || [];
      let industryNames = [];  //@array of strings
      industryData.map(function (doc) {
        industryNames.push(doc.industryName)
      });
      doc.professions.map(function (ids) {
        professionIds.push(ids)
      });
      const professionData = MlProfessions.find({_id: {$in: professionIds}}).fetch() || [];
      let professionNames = [];  //@array of strings
      professionData.map(function (doc) {
        professionNames.push(doc.professionName)
      });
      doc.clusters.map(function (ids) {
        clusterIds.push(ids)
      });
      const clusterData = MlClusters.find({_id: {$in: clusterIds}}).fetch() || [];
      let clusterNames = [];  //@array of strings
      clusterData.map(function (doc) {
        clusterNames.push(doc.clusterName)
      });
      doc.states.map(function (ids) {
        stateIds.push(ids)
      });
      const stateData = MlStates.find({_id: {$in: stateIds}}).fetch() || [];
      let stateNames = [];  //@array of strings
      stateData.map(function (doc) {
        stateNames.push(doc.name)
      });
      doc.chapters.map(function (ids) {
        chapterIds.push(ids)
      });
      const chapterData = MlChapters.find({_id: {$in: chapterIds}}).fetch() || [];
      let chapterNames = [];  //@array of strings
      chapterData.map(function (doc) {
        chapterNames.push(doc.chapterName)
      });

      doc.subChapters.map(function (ids) {
        subChapterIds.push(ids)
      });
      const subChapterData = MlSubChapters.find({_id: {$in: subChapterIds}}).fetch() || [];
      let subChapterNames = [];  //@array of strings
      subChapterData.map(function (doc) {
        subChapterNames.push(doc.subChapterName)
      });
      doc.userTypes.map(function (ids) {
        userTypeIds.push(ids)
      });
      const userTypeData = MlUserTypes.find({_id: {$in: userTypeIds}}).fetch() || [];
      let userTypeNames = [];  //@array of strings
      userTypeData.map(function (doc) {
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
    var totalRecords = MlProcessMapping.find(resultantQuery, fieldsProj).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlServiceCardsTransactionRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    var service = MlServiceCardDefinition.find({'isBeSpoke': false, 'isCurrentVersion': true, 'isReview': true}).fetch();
    var data = [];
    service.map(function(details, index) {
      data.push(details)
      var userData = mlDBController.find('users', {'profile.externalUserProfiles.profileId': details.profileId}).fetch();
      userData.map(function (list) {
        data[index].email = list.username;
        list.profile.externalUserProfiles.map(function (user) {
          data[index].userDetails = user;
        });
      });
    });
    var totalRecords = MlServiceCardDefinition.find({}).count();
    return {totalRecords: totalRecords, data: data};
  },
  MlHierarchyClusterRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
    var countriesId = [];
    var activeCluster = [];
    var userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
    if(userProfile.hierarchyLevel == 4){
      let activeCountries = mlDBController.find('MlCountries', {isActive: true}, context, {sort: {country: 1}}).fetch();
      activeCountries.map(function (country) {
        countriesId.push(country._id);
      })
      let Clusters = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
      countriesId.map(function (id) {
        Clusters.map(function (cluster) {
          if (cluster.countryId == id) {
            activeCluster.push(cluster);
          }
        })
      })
      const data = activeCluster;
      const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
      return {totalRecords: totalRecords+1, data: data};
    }else{
      let clusterIds = userProfile && userProfile.defaultCluster ? userProfile.defaultCluster : [];
      resultantQuery = {_id: {$in: [clusterIds]}}
      var data = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
      var totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
      return {totalRecords: totalRecords , data: data};
    }
  },

  /**
   * hierarcy department fetch repo
   * */
  MlHierarchyDepartmentsRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context) => {
    let list = [];
    var subChapter = mlDBController.findOne('MlSubChapters', {_id: requestParams.subChapterId}, context) || {}
    var depQuery = {}
    if (subChapter.isDefaultSubChapter)
      depQuery = {$and: [{isMoolya: true}, {"depatmentAvailable.cluster": {$in: ["all", requestParams.clusterId]}}]}
    else if (!subChapter.isDefaultSubChapter)
      depQuery = {$and: [{"depatmentAvailable.cluster": {$in: ["all", requestParams.clusterId]}}, {"depatmentAvailable": {$elemMatch: {subChapter: {$in: ['all', requestParams.subChapterId]}}}}]}
    let resp = mlDBController.find('MlDepartments', depQuery, context).fetch()

    resp.map(function (department) {
      let subDepartments = MlSubDepartments.find({"departmentId": department._id}).fetch();
      subDepartments.map(function (subDepartment) {
        let defaultSubChapter = JSON.parse(requestParams.defaultSubChapter);
        let deptAndSubDepartment = {
          departmentId: department._id,
          departmentName: department.departmentName,
          subDepartmentId: subDepartment._id,
          subDepartmentName: subDepartment.subDepartmentName,
          isMoolya: department.isMoolya,
          isActive: department.isActive,
          clusterId: requestParams.clusterId,
          subChapterId:requestParams.subChapterId,
          isDefaultSubChapter:defaultSubChapter
        }
        list.push(deptAndSubDepartment)
      })
    })

    data = list
    //todo: pagination need to be taken.
    return {totalRecords: data.length, data: data};
  },
  // let resp = mlDBController.find('MlDepartments', {
  //   $and: [
  //     {isMoolya:true},
  //     {"depatmentAvailable.cluster": {$in: ["all", requestParams.clusterId]}}
  //   ]
  // }, context).fetch()

  /**
   * user module repo handler
   * */
  MlUsersRepo: function (requestParams, userFilterQuery, contextQuery, fieldsProj, context) {
    /**type can be used to differ in the server query by using the same repo service*/
    // var type = requestParams && requestParams.type ? requestParams.type : "";
    /**construct context query with $in operator for each fields*/
    var resultantQuery = MlAdminContextQueryConstructor.constructQuery(contextQuery, '$in');
    if (!fieldsProj.sort) {
      fieldsProj.sort = {'registrationInfo.registrationDate': -1}
    }
    var serverQuery = {emails: {$elemMatch: {verified: true}}};
    resultantQuery = MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery, resultantQuery, serverQuery), '$and');
    var data = MlRegistration.find(resultantQuery, fieldsProj).fetch() || [];
    var totalRecords = MlRegistration.find(resultantQuery, fieldsProj).count();
    //todo://need to replace this loop by sending reponse of [Type: @RegistrationResponse] in place of [--RegistrationInfo]
    var result = []
    data.map(function (doc, index) {
      let object;
      object = doc.registrationInfo;
      object._id = doc._id;
      result.push(object);
    });
    data = result;
    return {totalRecords: totalRecords, data: data};
  }

}


export default CoreModulesRepo =  CoreModules;
