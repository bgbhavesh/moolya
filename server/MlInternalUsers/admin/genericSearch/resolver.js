  import MlResolver from '../../../commons/mlResolverDef'
import getQuery from "../genericSearch/queryConstructor";
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext';
import mlTransactionsListRepo from '../../admin/transactions/mlTransactionsListRepo'


let mergeQueries=function(userFilter,serverFilter){
  let query=userFilter||{};
  if (_.isEmpty(query)) {
    query = serverFilter||{};
  } else {
    query = {$and: [userFilter,serverFilter]};
  }
  return query;
}

MlResolver.MlQueryResolver['SearchQuery'] = (obj, args, context, info) =>{
    let totalRecords=0;
  const findOptions = {
              skip: args.offset,
  };
  // `limit` may be `null`
  if (args.limit > 0) {
    findOptions.limit = args.limit;
  }

  let query={};
  if (args.fieldsData){
    query = getQuery.searchFunction(args);
  }
  if(args.sortData){
    let sortObj = getQuery.sortFunction(args);
    findOptions.sort=sortObj||{};
  }

  let action="READ";

  //to resolve the type in data _resolveType for Union
  context.module=args.module;

  //Authorization layer

  if(args.module=="cluster"){
    data= MlClusters.find({},findOptions).fetch();
    totalRecords=MlClusters.find({},findOptions).count();
  }

  if(args.module=="chapter"){
    data= MlChapters.find({},findOptions).fetch();
    totalRecords=MlChapters.find({},findOptions).count();
  }
  if(args.module=="subChapter"){
    data= MlSubChapters.find({},findOptions).fetch();
    totalRecords=MlSubChapters.find({},findOptions).count();
  }

  if (args.module == "department") {
    var userProfileDep = new MlAdminUserContext().userProfileDetails(context.userId);
    var queryChange;
    if (userProfileDep.defaultSubChapters.indexOf("all") < 0) {
      userProfileDep.defaultSubChapters.push('all')
      var serverQuery = {$and: [{isMoolya: false}, {isSystemDefined: false}, {depatmentAvailable: {$elemMatch: {subChapter: {$in: userProfileDep.defaultSubChapters}}}}]}
      queryChange = mergeQueries(query, serverQuery);
    }else {
      queryChange = query
    }
    data = MlDepartments.find(queryChange, findOptions).fetch() || [];
    data.map(function (doc, index) {
      let clusterIds = [];
      let chapterIdsArray = [];
      let subchapterIdsArray = [];

      var departments = doc && doc.depatmentAvailable ? doc.depatmentAvailable : [];
      departments.map(function (department) {
        let currentDepClusterIds = department && department.cluster && department.cluster ? department.cluster : [];
        clusterIds = clusterIds.concat(currentDepClusterIds);

        let chapterId = department && department.chapter && department.chapter ? department.chapter : "";
        if (chapterId != "all") {
          chapterIdsArray.push(chapterId);
        }
        let subchapterId = department && department.subChapter && department.subChapter ? department.subChapter : "";
        if (subchapterId != "all") {
          subchapterIdsArray.push(subchapterId);
        }
      });
      const clusterData = MlClusters.find({_id: {$in: clusterIds}}).fetch() || [];
      const chapterData = MlChapters.find({_id: {$in: chapterIdsArray}}).fetch() || [];
      const subchapterData = MlSubChapters.find({_id: {$in: subchapterIdsArray}}).fetch() || [];

      var clusterNames = _.pluck(clusterData, 'clusterName') || [];
      var chapterNamesArray = _.pluck(chapterData, 'chapterName') || [];
      var subchapterNamesArray = _.pluck(subchapterData, 'subChapterName') || [];

      data[index].clustersList = clusterNames || [];
      data[index].chaptersList = chapterNamesArray || [];
      data[index].subChapterList = subchapterNamesArray || [];
    });

    totalRecords = MlDepartments.find({}, findOptions).count();
  }

  if(args.module=="subDepartment"){
    var userProfileSub = new MlAdminUserContext().userProfileDetails(context.userId);
    var queryChange;
    if (userProfileSub.defaultSubChapters.indexOf("all") < 0) {
      userProfileSub.defaultSubChapters.push('all')
      var serverQuery ={$and: [{isMoolya: false}, {isSystemDefined: false},  {subDepatmentAvailable: {$elemMatch: {subChapter: {$in:userProfileSub.defaultSubChapters}}}}]}
      queryChange = mergeQueries(query, serverQuery);
    }else {
      queryChange = query
    }
    data = MlSubDepartments.find(queryChange, findOptions).fetch();

    data.map(function (doc,index) {
      let clusterIds = [];
      let chapterIdsArray = [];
      let subchapterIdsArray = [];
      let departments=doc&&doc.subDepatmentAvailable?doc.subDepatmentAvailable:[];
      const departmentDetails =  MlDepartments.findOne({_id : doc.departmentId}).departmentName || "";
      departments.map(function (department) {
        let currentDepClusterIds = department&&department.cluster&&department.cluster?department.cluster:[];
        //let currentDepClusterIds = _.pluck(clustersIds,"clusterId") || [];
        clusterIds = clusterIds.concat(currentDepClusterIds);
        let chapterId =  department&&department.chapter&&department.chapter?department.chapter:"";
        if(chapterId != "all"){
          chapterIdsArray.push(chapterId);
        }
        let subchapterId =  department&&department.subChapter&&department.subChapter?department.subChapter:"";
        if(subchapterId != "all"){
          subchapterIdsArray.push(subchapterId);
        }
      });
      const clusterData =  MlClusters.find( { _id: { $in: clusterIds } } ).fetch() || [];
      const chapterData =  MlChapters.find( { _id: { $in: chapterIdsArray } } ).fetch() || [];
      const subchapterData =  MlSubChapters.find( { _id: { $in: subchapterIdsArray } } ).fetch() || [];

      var clusterNames = _.pluck(clusterData, 'clusterNames') || [];
      var chapterNamesArray = _.pluck(chapterData, 'chapterName') || [];
      var subchapterNamesArray = _.pluck(subchapterData, 'subChapterName') || [];

      data[index].departmentAliasName = departmentDetails || "";
      data[index].clustersList = clusterNames || [];
      data[index].chaptersList = chapterNamesArray || [];
      data[index].subChapterList = subchapterNamesArray || [];

    });

    totalRecords=MlSubDepartments.find({},findOptions).count();
  }
  if(args.module=="request"){
    data= MlRequestType.find(query,findOptions).fetch();
    totalRecords=MlRequestType.find(query,findOptions).count();
  }
  if(args.module=="countries"){
    data= MlCountries.find(query,findOptions).fetch();
    totalRecords=MlCountries.find(query,findOptions).count();
  }
  if(args.module=="states"){
    let countries = MlCountries.find({"isActive": true}).fetch();
    let allIds=_.pluck(countries,'_id');
      let ary = MlStates.find({$and:[{"countryId":{$in:allIds}},query]},findOptions).fetch();

      _.each(ary,function (item,key) {
        _.each(countries, function (s,v) {
          if (item.countryId == s._id)
            item.countryName = s.country;
        })
      })
      data=ary;
      totalRecords = MlStates.find({$and:[{"countryId":{$in:allIds}},query]},findOptions).count();
  }

  if(args.module=="cities"){
    let countries = MlCountries.find({"isActive": true}).fetch();
    let states = MlStates.find({"isActive": true}).fetch();
    let allIds=_.pluck(states,'_id');
    let cities = MlCities.find({$and:[{"stateId":{$in:allIds}},query]},findOptions).fetch();
    _.each(cities,function (item,key) {
      _.each(states, function (s,v) {
        if (item.stateId == s._id)
          item.stateId = s.name;
      })
      _.each(countries, function (s,v) {
        if (item.countryId == s._id)
          item.countryCode = s.country;
      })
    })
    data=cities;
    totalRecords = MlCities.find({$and:[{"stateId":{$in:allIds}},query]},findOptions).count();
  }

  if(args.module=="userType"){
    data= MlUserTypes.find(query,findOptions).fetch();
    totalRecords=MlUserTypes.find(query,findOptions).count();
  }

  if(args.module=="roleType"){
    data= MlRoleTypes.find(query,findOptions).fetch();
    totalRecords=MlRoleTypes.find(query,findOptions).count();
  }

  if(args.module=="documentType"){
    data= MlDocumentTypes.find(query,findOptions).fetch();
    totalRecords=MlDocumentTypes.find(query,findOptions).count();
  }

  if(args.module=="documentFormat"){
    data= MlDocumentFormats.find(query,findOptions).fetch();
    totalRecords=MlDocumentFormats.find(query,findOptions).count();
  }
  if(args.module=="kycCategory"){
    data= MlDocumentCategories.find(query,findOptions).fetch();
    totalRecords=MlDocumentCategories.find(query,findOptions).count();
  }
  if(args.module=="documentMapping"){
    data= MlDocumentMapping.find(query,findOptions).fetch();
    data.map(function (doc,index) {
      let clusterIds =[];
      let kycCategoryIds = [];
      let allowableFormatIds = [];
      doc.clusters.map(function (ids) {
        clusterIds.push(ids)
      });
      const clusterData =  MlClusters.find( { _id: { $in: clusterIds } } ).fetch() || [];
      let clusterNames = [];  //@array of strings
      clusterData.map(function (doc) {
        clusterNames.push(doc.clusterName)
      });

      doc.kycCategory.map(function (ids) {
        kycCategoryIds.push(ids)
      });
      const kycCategoryData =  MlDocumentCategories.find( { _id: { $in: kycCategoryIds } } ).fetch() || [];
      let kycCategoryNames = [];  //@array of strings
      kycCategoryData.map(function (doc) {
        kycCategoryNames.push(doc.docCategoryName)
      });

      doc.allowableFormat.map(function (ids) {
        allowableFormatIds.push(ids)
      });
      const allowableFormatData =  MlDocumentFormats.find( { _id: { $in: allowableFormatIds } } ).fetch() || [];
      let allowableFormatNames = [];  //@array of strings
      allowableFormatData.map(function (doc) {
        allowableFormatNames.push(doc.docFormatName)
      });

      data[index].clusters = clusterNames || [];
      data[index].kycCategory = kycCategoryNames || [];
      data[index].allowableFormat = allowableFormatNames || [];

    });
    totalRecords=MlDocumentMapping.find(query,findOptions).count();
  }
  if(args.module=="transaction"){
    data= MlTransactionTypes.find(query,findOptions).fetch();
    totalRecords=MlTransactionTypes.find(query,findOptions).count();
  }
  if(args.module=="accountType"){
    data= MlAccountTypes.find(query,findOptions).fetch();
    totalRecords=MlAccountTypes.find(query,findOptions).count();
  }

  if(args.module == 'Users'){
    var curUserProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    var queryChange;
    if (curUserProfile.defaultSubChapters.indexOf("all") < 0) {   //sub-chapter_admin non-moolya
      queryChange = {$and: [{'profile.isMoolya': false}, {'profile.InternalUprofile.moolyaProfile.subChapter': {$in: curUserProfile.defaultSubChapters}}, {'profile.isExternaluser': false}]}
    } else {
      queryChange = {'profile.isExternaluser': false}   //platform_admin
    }
    let queryList = mergeQueries(query, queryChange);
    data = Meteor.users.find(queryList, findOptions).fetch();

    data.map(function (doc,index) {
      var hirarichyLevel=[]
      var roleNames = []
      let userProfiles=doc&&doc.profile.InternalUprofile.moolyaProfile.userProfiles?doc.profile.InternalUprofile.moolyaProfile.userProfiles:[];
      userProfiles.map(function (doc,index) {
        if(doc.isDefault) {
          let userRoles = doc && doc.userRoles ? doc.userRoles : [];
          hirarichyLevel = _.pluck(userRoles, 'hierarchyLevel') || [];
          hirarichyLevel.sort(function (a, b) {
            return b - a
          });
          for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].hierarchyLevel == hirarichyLevel[0]) {
              roleNames.push(userRoles[i].roleName);
              break
            }
          }
        }
      });
      data[index].roleNames = roleNames || [];
    });

    totalRecords=Meteor.users.find(queryList,findOptions).count();
  }
  if(args.module == 'roles'){
    data= MlRoles.find(query,findOptions).fetch();
    data.map(function (doc,index) {
      let departmentsIdsArray = [];
      let subdepartmentsIdsArray = [];
      let clusterIdsArray = [];
      let chapterIdsArray = [];
      let subchapterIdsArray = [];

      let assignRolesData=doc&&doc.assignRoles?doc.assignRoles:[];
      assignRolesData.map(function (doc) {
        departmentsIdsArray.push(doc.department);
        subdepartmentsIdsArray.push(doc.subDepartment);
        clusterIdsArray.push(doc.cluster);
        chapterIdsArray.push(doc.chapter);
        subchapterIdsArray.push(doc.subChapter);
      });

      const departmentData =  MlDepartments.find({ _id: { $in: departmentsIdsArray } } ).fetch() || [];
      const subdepartmentData = MlSubDepartments.find( { _id: { $in: subdepartmentsIdsArray } } ).fetch() || [];
      const clusterData =  MlClusters.find( { _id: { $in: clusterIdsArray } } ).fetch() || [];
      const chapterData =  MlChapters.find( { _id: { $in: chapterIdsArray } } ).fetch() || [];
      const subchapterData =  MlSubChapters.find( { _id: { $in: subchapterIdsArray } } ).fetch() || [];

      let departmentNames = [];  //@array of strings
      departmentData.map(function (doc) {
        departmentNames.push(doc.departmentName)
      });

      let subdepartmentsNames = [];  //@array of strings
      subdepartmentData.map(function (doc) {
        subdepartmentsNames.push(doc.subDepartmentName)
      });


      let clusterNames = [];  //@array of strings
      clusterData.map(function (doc) {
        clusterNames.push(doc.clusterName)
      });

      let chapterNamesArray = [];
      chapterData.map(function (doc) {
        chapterNamesArray.push(doc.chapterName)
      });

      let subchapterNamesArray = [];
      subchapterData.map(function (doc) {
        subchapterNamesArray.push(doc.subChapterName)
      });

      data[index].departmentsList = departmentNames || [];
      data[index].subdepartmentsList = subdepartmentsNames || [];
      data[index].clustersList = clusterNames || [];
      data[index].chaptersList = chapterNamesArray || [];
      data[index].subChapterList = subchapterNamesArray || [];
    });
    totalRecords=MlRoles.find(query,findOptions).count();
  }

  if(args.module=="industry"){
    data= MlIndustries.find(query,findOptions).fetch();
    totalRecords=MlIndustries.find(query, findOptions).count();
  }
  if(args.module=="award"){
    data= MlAwards.find(query,findOptions).fetch();
    totalRecords=MlAwards.find(query, findOptions).count();
  }
  if(args.module=="specification"){
    data= MlSpecifications.find(query,findOptions).fetch();
    totalRecords=MlSpecifications.find(query,findOptions).count();
  }
  if(args.module=="profession"){
    data= MlProfessions.find(query,findOptions).fetch();
    totalRecords=MlProfessions.find(query,findOptions).count();
  }
  if(args.module=="entity"){
    data= MlEntity.find(query,findOptions).fetch();
    totalRecords=MlEntity.find(query,findOptions).count();
  }
  if(args.module=="stageOfCompany"){
    data= MlStageOfCompany.find(query,findOptions).fetch();
    totalRecords=MlStageOfCompany.find(query,findOptions).count();
  }
  if(args.module=="process"){
    data= MlProcessMapping.find(query,findOptions).fetch();
    data.map(function (doc,index) {
      let industryIds=[];
      let communityIds=[];
      let clusterIds=[];
      let stateIds=[];
      let chapterIds=[];
      let professionIds=[];
      let processTypes=MlprocessTypes.findOne({_id:doc.process});
      doc.communities.map(function (ids) {
        communityIds.push(ids)
      });
      const communityData =  MlCommunityDefinition.find( { code: { $in: communityIds } } ).fetch() || [];
      let communityNames = [];  //@array of strings
      communityData.map(function (doc) {
        communityNames.push(doc.name)
      });
      doc.industries.map(function (ids) {
        industryIds.push(ids)
      });
      const industryData =  MlIndustries.find( { _id: { $in: industryIds } } ).fetch() || [];
      let industryNames = [];  //@array of strings
      industryData.map(function (doc) {
        industryNames.push(doc.industryName)
      });
      doc.professions.map(function (ids) {
        professionIds.push(ids)
      });
      const professionData =  MlProfessions.find( { _id: { $in: professionIds } } ).fetch() || [];
      let professionNames = [];  //@array of strings
      professionData.map(function (doc) {
        professionNames.push(doc.professionName)
      });
      doc.clusters.map(function (ids) {
        clusterIds.push(ids)
      });
      const clusterData =  MlClusters.find( { _id: { $in: clusterIds } } ).fetch() || [];
      let clusterNames = [];  //@array of strings
      clusterData.map(function (doc) {
        clusterNames.push(doc.clusterName)
      });
      doc.states.map(function (ids) {
        stateIds.push(ids)
      });
      const stateData =  MlStates.find( { _id: { $in: stateIds } } ).fetch() || [];
      let stateNames = [];  //@array of strings
      stateData.map(function (doc) {
        stateNames.push(doc.name)
      });
      doc.chapters.map(function (ids) {
        chapterIds.push(ids)
      });
      const chapterData =  MlChapters.find( { _id: { $in: chapterIds } } ).fetch() || [];
      let chapterNames = [];  //@array of strings
      chapterData.map(function (doc) {
        chapterNames.push(doc.chapterName)
      });
      data[index].communities= communityNames || [];
      data[index].professions= professionNames || [];
      data[index].industries= industryNames || [];
      data[index].clusters = clusterNames || [];
      data[index].states = stateNames || [];
      data[index].chapters = chapterNames || [];
      data[index].processName=processTypes.processName;

    });
    totalRecords=MlProcessMapping.find(query,findOptions).count();
  }
  if(args.module=="processdocument"){
    data= MlProcessMapping.find({isActive:true},query,findOptions).fetch();
    data.map(function (doc,index) {
      let industryIds=[];
      let communityIds=[];
      let clusterIds=[];
      let stateIds=[];
      let chapterIds=[];
      let subChapterIds=[];
      let professionIds=[];
      let userTypeIds=[];
      let processTypes=MlprocessTypes.findOne({_id:doc.process});
      doc.communities.map(function (ids) {
        communityIds.push(ids)
      });
      const communityData =  MlCommunityDefinition.find( { code: { $in: communityIds } } ).fetch() || [];
      let communityNames = [];  //@array of strings
      communityData.map(function (doc) {
        communityNames.push(doc.name)
      });
      doc.industries.map(function (ids) {
        industryIds.push(ids)
      });
      const industryData =  MlIndustries.find( { _id: { $in: industryIds } } ).fetch() || [];
      let industryNames = [];  //@array of strings
      industryData.map(function (doc) {
        industryNames.push(doc.industryName)
      });
      doc.professions.map(function (ids) {
        professionIds.push(ids)
      });
      const professionData =  MlProfessions.find( { _id: { $in: professionIds } } ).fetch() || [];
      let professionNames = [];  //@array of strings
      professionData.map(function (doc) {
        professionNames.push(doc.professionName)
      });
      doc.clusters.map(function (ids) {
        clusterIds.push(ids)
      });
      const clusterData =  MlClusters.find( { _id: { $in: clusterIds } } ).fetch() || [];
      let clusterNames = [];  //@array of strings
      clusterData.map(function (doc) {
        clusterNames.push(doc.clusterName)
      });
      doc.states.map(function (ids) {
        stateIds.push(ids)
      });
      const stateData =  MlStates.find( { _id: { $in: stateIds } } ).fetch() || [];
      let stateNames = [];  //@array of strings
      stateData.map(function (doc) {
        stateNames.push(doc.name)
      });
      doc.chapters.map(function (ids) {
        chapterIds.push(ids)
      });
      const chapterData =  MlChapters.find( { _id: { $in: chapterIds } } ).fetch() || [];
      let chapterNames = [];  //@array of strings
      chapterData.map(function (doc) {
        chapterNames.push(doc.chapterName)
      });

      doc.subChapters.map(function (ids) {
        subChapterIds.push(ids)
      });
      const subChapterData =  MlSubChapters.find( { _id: { $in: subChapterIds } } ).fetch() || [];
      let subChapterNames = [];  //@array of strings
      subChapterData.map(function (doc) {
        subChapterNames.push(doc.subChapterName)
      });
      doc.userTypes.map(function (ids) {
        userTypeIds.push(ids)
      });
      const userTypeData =  MlUserTypes.find( { _id: { $in: userTypeIds } } ).fetch() || [];
      let userTypeNames = [];  //@array of strings
      userTypeData.map(function (doc) {
        userTypeNames.push(doc.userTypeName)
      });

      data[index].communityNames= communityNames || [];
      data[index].professionNames= professionNames || [];
      data[index].industrieNames= industryNames || [];
      data[index].clusterNames = clusterNames || [];
      data[index].stateNames = stateNames || [];
      data[index].chapterNames = chapterNames || [];
      data[index].subChapterNames = subChapterNames || [];
      data[index].userTypeNames = userTypeNames || [];

      data[index].processName=processTypes.processName;

    });
    totalRecords=MlProcessMapping.find({isActive:true},query,findOptions).count();
  }
  if(args.module=="businessType"){
    data= MlBusinessType.find(query,findOptions).fetch();
    totalRecords=MlBusinessType.find(query,findOptions).count();
  }
  if(args.module=="citizenship"){
    data= MlCitizenship.find(query,findOptions).fetch();
    totalRecords=MlCitizenship.find(query,findOptions).count();
  }
  if(args.module=="lookingFor"){
    data= MlLookingFor.find(query,findOptions).fetch();
    totalRecords=MlLookingFor.find(query,findOptions).count();
  }

  if(args.module=="Assets"){
    data= MlAssets.find(query,findOptions).fetch();
    totalRecords=MlAssets.find(query,findOptions).count();
  }

  if(args.module=="Technologies"){
    data= MlTechnologies.find(query,findOptions).fetch();
    totalRecords=MlTechnologies.find(query,findOptions).count();
  }
  if(args.module=="FundingType"){
    data= MlFundingTypes.find(query,findOptions).fetch();
    totalRecords=MlFundingTypes.find(query,findOptions).count();
  }

  if(args.module=="EmployeeType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="tax"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="taxation"){
    data= MlTaxation.find(query,findOptions).fetch();
    totalRecords=MlTaxation.find(query,findOptions).count();
  }
  if(args.module=="title"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="regional"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="language"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="dateAndTime"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="numericalFormat"){
    data= MlGlobalSettings.find(query, findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query, findOptions).count();
  }
  if(args.module=="addressType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="CompanyType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="emailType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="contactType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="socialLinks"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="gender"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  /*if(args.module=="registrationInfo"){
    let userID=context.userId,isPlatformAdmin=false,hirarichyLevel=[],clusterId='',chapterId=[]
    //get user details iterate through profiles match with role and get clusterId
    let user = mlDBController.findOne('users', {_id: userID}, context)
    let userProfiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
    userProfiles.map(function (doc,index) {
      if(doc.isDefault) {
        let userRoles = doc && doc.userRoles ? doc.userRoles : [];
        for (let i = 0; i < userRoles.length; i++) {
          let role = userRoles[i];
          if(role.clusterId=="all"){
            isPlatformAdmin = true
          }else if(role.clusterId!="all" && role.chapterId=="all" && role.subChapterId=="all" && role.communityId=="all"){
            clusterId = userRoles[i].clusterId;
          }else if(role.clusterId!="all" && role.chapterId!="all" && role.subChapterId=="all" && role.communityId=="all"){
            chapterId.push(userRoles[i].chapterId)
          }
        }
      }
    });
    if(isPlatformAdmin){
      let result=[];
      let serverQueryList ={$or: [{status:"Rejected"}, {status: "Pending"}]}
      let queryCountList = mergeQueries(query,serverQueryList);
      data= MlRegistration.find(queryCountList,findOptions).fetch()||[];
      data.map(function (doc,index) {
          let object ;
          object = doc.registrationInfo;
          object._id = doc._id;
          object.registrationStatus =doc.status;
          object.canAssign = false;
          object.canUnAssign = false;
          result.push(object);
      });
      data = result;
      let serverQuery ={$or: [{status:"Rejected"}, {status: "Pending"}]}
      let queryCount = mergeQueries(query,serverQuery);
      totalRecords=MlRegistration.find(queryCount,findOptions).count();
    }
    else if(clusterId!='' || chapterId.length>=1){
      let result=[];
      let serverQueryList = {$and: [{$or: [{"registrationInfo.clusterId":clusterId},{"registrationInfo.chapterId":{$in: [chapterId]}}]},{$or:[{status:"Rejected"},{status: "Pending"}]}]}
      let queryCountList = mergeQueries(query,serverQueryList);
      data= MlRegistration.find(queryCountList,findOptions).fetch();
        data.map(function (doc,index) {
            let object ;
            object = doc.registrationInfo;
            object._id = doc._id;
            object.registrationStatus =doc.status;
            result.push(object);

        });
      let serverQuery ={$and: [{$or: [{"registrationInfo.clusterId":clusterId},{"registrationInfo.chapterId":{$in: [chapterId]}}]},{$or:[{status:"Rejected"},{status: "Pending"}]}]}
      let queryCount = mergeQueries(query,serverQuery);
      data = mlTransactionsListRepo.processAssignmentTransactions(result,context.userId);
      //data = result;
      totalRecords=MlRegistration.find(queryCount,findOptions).count();
    }
  }*/
  if(args.module=="registrationInfo"){
    data= MlRegistration.find(query,findOptions).fetch();
    let result=[];
    data.map(function (doc,index) {
      let object ;
      object = doc.registrationInfo;
      object._id = doc._id;
      object.transactionId = doc.transactionId
      result.push(object);
    });
    data = result;
    totalRecords=MlRegistration.find(query,findOptions).count();
  }

  if(args.module=="registrationApprovedInfo"){
    let userID=context.userId,hirarichyLevel=[],clusterIds=[]
    //get user details iterate through profiles match with role and get clusterId
    let user = mlDBController.findOne('users', {_id: userID}, context)
    let userProfiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
    userProfiles.map(function (doc,index) {
      if(doc.isDefault) {
        let userRoles = doc && doc.userRoles ? doc.userRoles : [];
        userRoles.map(function (doc, index) {
          hirarichyLevel.push(doc.hierarchyLevel)

        });
        hirarichyLevel.sort(function (a, b) {
          return b - a
        });
        for (let i = 0; i < userRoles.length; i++) {
          if (userRoles[i].hierarchyLevel == hirarichyLevel[0]) {
            clusterIds.push(userRoles[i].clusterId);
            break
          }
        }
      }
    });
    if(clusterIds.length>=1){
      let serverQueryList ={status:"Approved"}
      let queryCountList = mergeQueries(query,serverQueryList);
      data= MlRegistration.find(queryCountList,findOptions).fetch();
      let result=[];
      if(clusterIds[0]=="all"){
        data.map(function (doc,index) {
          if(doc.status=='Approved'){
            let object ;
            object = doc.registrationInfo;
            object._id = doc._id;
            object.registrationStatus =doc.status;
            result.push(object);
          }
        });
      }else{
        data.map(function (doc,index) {
          if(doc.status=='Approved'&&doc.registrationInfo.clusterId==clusterIds[0]){
            let object ;
            object = doc.registrationInfo;
            object._id = doc._id;
            object.registrationStatus =doc.status;
            result.push(object);
          }
        });
      }

      let serverQuery = {status:'Approved'}
      let queryCount = mergeQueries(query,serverQuery);
      data = result;
      totalRecords = MlRegistration.find(queryCount,findOptions).count();
    }

  }

  if(args.module == "Portfoliodetails"){
      data = MlPortfolioDetails.find(query,findOptions).fetch();
      // totalRecords = data.length;
      totalRecords = MlPortfolioDetails.find(query,findOptions).count();
  }

  if(args.module=="templates"){
    data= MlTemplates.find(query,findOptions).fetch();
    totalRecords=MlTemplates.find(query,findOptions).count();
  }
  if(args.module=="templateAssignment"){
    data= MlTemplateAssignment.find(query,findOptions).fetch();
    totalRecords=MlTemplateAssignment.find(query,findOptions).count();
  }
  if(args.module=="hierarchy"){
    data= MlHierarchy.find(query,findOptions).fetch();
    let list = []
    data.map(function (doc,index) {
      let entry = {"_id":doc._id,"level":doc.level,"module":doc.module,"role":doc.role}
      list.push(entry)
    })
    data=list
    totalRecords=MlHierarchy.find(query,findOptions).count();
  }
  if(args.module=="filters"){
    data= MlFilters.find(query,findOptions).fetch();
    totalRecords=MlFilters.find(query,findOptions).count();
  }
  if(args.module=="FunderPortfolio"){
    data= MlFunderPortfolio.find(query,findOptions).fetch();
    totalRecords=MlFunderPortfolio.find(query,findOptions).count();
  }

  if(args.module=="SubDomain"){
    var domain= MlSubDomain.find(query,findOptions).fetch();
    let modArray =[]
    _.each(domain, function(item){
      var industryName = MlIndustries.findOne({_id:item.industryId}).industryName;
      var obj = item;
      obj.industryId = industryName;
      modArray.push(obj)
    })
    data= modArray
    totalRecords=MlSubDomain.find(query,findOptions).count();
  }

  return {'totalRecords':totalRecords,'data':data};
}

MlResolver.MlUnionResolver['SearchResult']= {
  __resolveType(data, context, info){

    var module=context.module||"";
    var resolveType='';
    switch(module) {
      case "cluster":resolveType= 'Cluster';break;
      case "chapter":resolveType= 'Chapter';break;
      case "subChapter":resolveType= 'SubChapter';break;
      case "department":resolveType= 'Department';break;
      case "subDepartment":resolveType= 'SubDepartment';break;
      case "countries":resolveType= 'Countries';break;
      case "states":resolveType= 'States';break;
      case "cities":resolveType= 'Cities';break;
      case "userType":resolveType= 'UserTypes';break;
      case "roleType":resolveType= 'RoleTypes';break;
      case "process":resolveType='ProcessType';break;
      case "processdocument":resolveType='ProcessType';break;
      case "request":resolveType='Requests';break;
      case "tax":resolveType='Tax';break;
      case "taxation":resolveType='taxation';break;
      case "registrationInfo":resolveType= 'RegistrationInfo';break;
      case "registrationApprovedInfo":resolveType= 'RegistrationInfo';break;
      case "FunderPortfolio":resolveType= 'FunderPortfolio';break;
      case "Portfoliodetails":resolveType= 'Portfoliodetails';break;
      case "documentType":resolveType= 'DocumentTypes';break;
      case "documentFormat":resolveType= 'DocumentFormats';break;
      case "kycCategory":resolveType= 'KycCategories';break;
      case "documentMapping":resolveType= 'DocumentMapping';break;
      case "transaction":resolveType= 'Transaction';break;
      case "accountType":resolveType= 'Account';break;
      case "templates":resolveType= 'TemplateDetails';break;
      case "templateAssignment":resolveType= 'TemplateAssignment';break;
      case "industry":resolveType= 'Industry';break;
      case "roles":resolveType= 'Roles';break;
      case "award":resolveType= 'Award';break;
      case "specification":resolveType= 'Specification';break;
      case "profession":resolveType= 'Profession';break;
      case "entity":resolveType= 'Entity';break;
      case "stageOfCompany":resolveType= 'StageOfCompany';break;
      case "businessType":resolveType= 'BusinessType';break;
      case "citizenship":resolveType= 'Citizenship';break;
      case "lookingFor":resolveType= 'LookingFor';break;
      case "Assets":resolveType= 'Assets';break;
      case "Technologies":resolveType= 'Technologies';break;
      case "FundingType":resolveType= 'FundingType';break;
      case "EmployeeType":resolveType= 'EmployeeType';break;
      case "hierarchy":resolveType= 'Hierarchy';break;
      case "addressType":resolveType= 'AddressType';break;
      case "numericalFormat":resolveType= 'NumericalFormat';break;
      case "companyType":resolveType= 'CompanyType';break;
      case "emailType":resolveType= 'EmailType';break;
      case "contactType":resolveType= 'ContactType';break;
      case "socialLinks":resolveType= 'SocialLinks';break;
      case "gender":resolveType= 'Gender';break;
      case "filters":resolveType= 'Filters';break;
      case "SubDomain":resolveType= 'SubDomain';break;
      case "dateAndTime":resolveType= 'DateAndTime';break;
      case "language":resolveType= 'Language';break;
      case "Users":resolveType= 'BackendUsers';break;
      case "regional":resolveType= 'Regional';break;
      case "title":resolveType= 'Title';break;
      case "community":resolveType= 'Community';break;

    }

    if(resolveType){
      return resolveType;
    }else{
      return 'GenericType';
    }
    /*if(data.registrationType){
     return 'RegistrationInfo';
     }
     if((data.communityType=="Funders") && data.portfolioDetailsId){
     return 'FunderPortfolio';
     }
     if(data.portfolioUserName){
     return 'Portfoliodetails';
     }

     if (data.countryCode && data.country) {
     return 'Countries';
     }
     if(data.name && data.countryId&&!data.stateId){
     return 'States';
     }
     if(data.name && data.stateId){
     return 'Cities';
     }
     if (data.countryId) {
     return 'Cluster';
     }
     if (data.chapterName) {
     return 'Chapter';
     }
     if (data.subChapterName) {
     return 'SubChapter';
     }
     if (data.departmentName) {
     return 'Department';
     }
     if (data.subDepartmentName) {
     return 'SubDepartment';
     }
     if(data.requestName){
     return 'Requests'
     }
     if(data.userTypeName){
     return 'UserTypes'
     }
     if(data.roleTypeName){
     return 'RoleTypes'
     }
     if(data.docTypeName){
     return 'DocumentTypes'
     }
     if(data.docFormatName){
     return 'DocumentFormats'
     }
     if(data.docCategoryName){
     return 'KycCategories'
     }
     if(data.documentDisplayName){
     return 'DocumentMapping'
     }
     if(data.transactionName){
     return 'Transaction'
     }
     if(data.templateName){
     return 'Template'
     }
     if(data.username){
     return 'BackendUsers'
     }
     if(data.roleName){
     return 'Roles'
     }
     if(data.professionName){
     return 'Profession'
     }
     if(data.industryName){
     return 'Industry'
     }
     if(data.awardName){
     return 'Award'
     }
     if(data.specificationName){
     return 'Specification'
     }
     if(data.entityName){
     return 'Entity'
     }
     if(data.stageOfCompanyName){
     return 'StageOfCompany'
     }
     if(data.businessTypeName){
     return 'BusinessType'
     }
     if(data.citizenshipTypeName){
     return 'Citizenship'
     }
     if(data.lookingForName){
     return 'LookingFor'
     }

     if(data.assetName){
     return 'Assets'
     }

     if(data.technologyName){
     return 'Technologies'
     }
     if(data.fundingTypeName){
     return 'FundingType'
     }

     if(data.processId){
     return 'ProcessType'
     }
     if(data.employmentName){
     return 'EmployeeType'
     }
     if(data.taxName){
     return 'Tax'
     }
     if(data.taxationName){
     return 'taxation'
     }
     if(data.titleName){
     return 'Title'
     }
     if(data.regionalCurrencyName){
     return 'Regional'
     }
     if(data.languageName){
     return 'Language'
     }
     if(data.measurementSystem){
     return 'NumericalFormat'
     }
     if(data.addressName){
     return 'AddressType'
     }
     if(data.socialName){
     return 'SocialLinks'
     }
     if(data.genderName){
     return 'Gender'
     }
     if(data.timeFormat){
     return 'DateAndTime'
     }
     if(data.companyName){
     return 'CompanyType'
     }
     if(data.emailName){
     return 'EmailType'
     }
     if(data.contactName){
     return 'ContactType'
     }
     if(data.code&&data.communityName){
     return 'Community'
     }
     if(data.firstName){
     return 'RegistrationInfo'
     }
     if(data.processName){
     return 'TemplateDetails'
     }
     if(data.templateProcessName){
     return 'TemplateAssignment'
     }
     if(data.module){
     return 'Hierarchy'
     }
     if(data.filterName){
     return 'Filters'
     }
     if(data.name){
     return 'SubDomain'
     }*/
    return 'GenericType';
  }
}
