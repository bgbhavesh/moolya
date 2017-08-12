import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
var _ = require('lodash')

MlResolver.MlMutationResolver['createLibrary'] = (obj, args, context, info) => {

  if (context.url.indexOf("transactions") > 0) {
    var portfolioDetailsTransactions = mlDBController.findOne('MlPortfolioDetails', {_id: args.detailsInput.userId}, context)
    if (portfolioDetailsTransactions) {
      args.detailsInput.userId = portfolioDetailsTransactions.userId;
      let tempObject = {
        portfolioId:portfolioDetailsTransactions._id,
        isPrivate: false
      }
      let tempArray= []
      tempArray.push(tempObject)
      args.detailsInput.portfolioReference = tempArray;
      let newPortfolio = mlDBController.insert('MlLibrary', args.detailsInput, context)
      return newPortfolio
    }
  }else if(context.url.indexOf("library") > 0) {
    args.detailsInput.userId = context.userId;
    var newPortfolioCollection = mlDBController.insert('MlLibrary', args.detailsInput, context)
    return newPortfolioCollection
  }else{
    let currentProfile = context.url.split("/")
    let portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile[6]}, context)
    let tempObject = {
      portfolioId:portfolioDetails._id,
      isPrivate: false,
    }
    let tempArray= []
    tempArray.push(tempObject)
    args.detailsInput.portfolioReference = tempArray;
    args.detailsInput.userId = context.userId;
    let newPortfolio = mlDBController.insert('MlLibrary', args.detailsInput, context)
    return newPortfolio
  }
}


MlResolver.MlMutationResolver['updateLibrary'] = (obj, args, context, info) => {
  let currentProfile = context.url.split("/");
  let dataExists = false;
  let portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: context.url.split("/")[6]}, context)
  var existingCollection = mlDBController.findOne('MlLibrary', {_id:args.id}, context)
  if(existingCollection) {
    if(Array.isArray(existingCollection.portfolioReference)) {
      existingCollection.portfolioReference.map(function (data) {
        if (Array.isArray(args.files.portfolioReference)) {
          args.files.portfolioReference.map(function (incoming) {
            if (data.portfolioId === incoming.portfolioId) {
              dataExists = true;
            }
          })
        }
      })
    }
    if(dataExists){
      let code = 20
      let response = new MlRespPayload().errorPayload('File already exists', code);
      return response
    }
  }
  if(args.files.portfolioReference){
    if(args.files.portfolioReference.portfolioId ===portfolioDetails._id){
      let code = 20
      let response = new MlRespPayload().errorPayload(ret, code);
      return response;
    }else{
      let tempObject = {
        portfolioId:portfolioDetails._id,
        isPrivate: false
      }
      args.files.portfolioReference.push(tempObject)
    }
  }else {
    let tempObject = {
      portfolioId: portfolioDetails._id,
      isPrivate: false
    }
    let tempArray = []
    tempArray.push(tempObject)
    args.files.portfolioReference = tempArray;
  }
  if(!dataExists){
    var newCollection = mlDBController.update('MlLibrary', {_id:args.id},args.files,{$set:1}, context)
    return newCollection
  }
}


MlResolver.MlQueryResolver['fetchLibrary'] = (obj, args, context, info) => {
  if(context.url.indexOf("transactions") > 0) {
    let currentProfile = context.url.split("/")
    let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile [7]}, context)
    var libraryData = mlDBController.find('MlLibrary', { isActive: true, 'portfolioReference.portfolioId': portfolio._id}, context).fetch();
    return libraryData;
  }
  else if(context.url.indexOf("portfolio") > 0){
    let currentProfile = context.url;
    let splitArray = [];
    if (currentProfile) {
      splitArray = currentProfile.split("/");
    }
    let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: splitArray[6]}, context)
    var libraryData = mlDBController.find('MlLibrary', {userId: context.userId, isActive: true, 'portfolioReference.portfolioId': splitArray[6]}, context).fetch();
    return libraryData;
  }
  else if (!args.userId) {
    var libraryData = mlDBController.find('MlLibrary', {userId: context.userId, isActive: true}, context).fetch();
    return libraryData;
  }else {
    var portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: args.userId}, context)
    if (portfolioDetails) {
      let portfolioId ;
      let currentProfile = context.url.split("/")
      if(context.url.split("/")[4] === 'explore'){
        portfolioId = context.url.split("/")[6];
      }else{
        portfolioId = context.url.split("/")[5];
      }
      args.userId = portfolioDetails.userId;
      var query = {
        userId: args.userId,
        isActive: true,
        'portfolioReference.portfolioId': portfolioId,
        'portfolioReference.isPrivate': false
      }
      var libraryDataOthers = mlDBController.find('MlLibrary', query, context).fetch();
      return libraryDataOthers;
    }
  }
}


MlResolver.MlQueryResolver['fetchDataFromCentralLibrary'] = (obj, args, context, info) => {
  var libraryData = mlDBController.find('MlLibrary', {userId: context.userId, isActive: true, inCentralLibrary: true}, context).fetch();
  return libraryData;
}

MlResolver.MlMutationResolver['updatePrivacyDetails'] = (obj, args, context, info) => {
  let currentProfile = context.url.split("/")
  let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile [6]}, context)
  var libraryData = mlDBController.find('MlLibrary', {userId: context.userId, isActive: true, 'portfolioReference.portfolioId': portfolio._id}, context).fetch();
  libraryData[args.detailsInput.index].portfolioReference.map(function(data){
    if(data.portfolioId === currentProfile[6]){
      data.isPrivate = args.detailsInput.element
    }
  })
  var updateTemplateCollection1 = mlDBController.update('MlLibrary', {_id: libraryData[args.detailsInput.index]._id},libraryData[args.detailsInput.index], {$set: 1}, context)
  return updateTemplateCollection1;
}

MlResolver.MlMutationResolver['updateLibraryData'] = (obj, args, context, info) => {
  if(context.url.indexOf("transactions") > 0) {
    let currentProfile = context.url.split("/")
    let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile [7]}, context)
    var libraryData = mlDBController.find('MlLibrary', { isActive: true,userId:portfolio.userId, 'portfolioReference.portfolioId': portfolio._id, libraryType:args.files.libraryType}, context).fetch();
    if(libraryData[args.files.index]){
      libraryData[args.files.index].portfolioReference.map(function(data, id){
        if(data.portfolioId === currentProfile[7]){
          libraryData[args.files.index].portfolioReference.splice(id,1)
        }
      })
      var updateTemplateCollection1 = mlDBController.update('MlLibrary', {_id: libraryData[args.files.index]._id},libraryData[args.files.index], {$set: 1}, context)
      return updateTemplateCollection1
    }
  }else if(context.url.indexOf("library") > 0) {
    let libraryData = mlDBController.find('MlLibrary', {userId: context.userId, inCentralLibrary:true, libraryType:args.files.libraryType}, context).fetch()
    if (libraryData[args.files.index]) {
      libraryData[args.files.index].inCentralLibrary = false
      var updateTemplateCollection1 = mlDBController.update('MlLibrary', {_id: libraryData[args.files.index]._id}, libraryData[args.files.index], {$set: 1}, context)
      return updateTemplateCollection1
    }
  }else{
    let currentProfile = context.url.split("/")
    let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile [6]}, context)
    let libraryData = mlDBController.find('MlLibrary', { isActive: true,userId:portfolio.userId, 'portfolioReference.portfolioId': portfolio._id, libraryType:args.files.libraryType}, context).fetch();
    if(libraryData[args.files.index]){
      libraryData[args.files.index].portfolioReference.map(function(data, id){
        if(data.portfolioId === currentProfile[6]){
          libraryData[args.files.index].portfolioReference.splice(id,1)
        }
      })
      let updateTemplateCollection1 = mlDBController.update('MlLibrary', {_id: libraryData[args.files.index]._id},libraryData[args.files.index], {$set: 1}, context)
      return updateTemplateCollection1
    }
  }
}

MlResolver.MlMutationResolver['putDataIntoTheLibrary'] = (obj, args, context, info) => {
  let response;
  if(context.url.indexOf("transactions") > 0) {
    var portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: args.portfoliodetailsId}, context)
    if (portfolioDetails) {
      let tempObject = {
        portfolioId: portfolioDetails._id,
        isPrivate: false
      }
      let tempArray = []
      tempArray.push(tempObject)
      args.files.portfolioReference = tempArray;
      args.files.inCentralLibrary = true
      args.files.userId = portfolioDetails.userId;
      var libraryDataAdmin = mlDBController.insert('MlLibrary', args.files,  context);
      return libraryDataAdmin;
    }
  } else {
    let currentProfile = context.url.split("/")
    var portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: currentProfile[6]}, context)
    if (portfolioDetails) {
      let tempObject = {
        portfolioId: portfolioDetails._id,
        isPrivate: false
      }
      let tempArray = []
      tempArray.push(tempObject)
      args.files.inCentralLibrary = true
      args.files.portfolioReference = tempArray;
      args.files.userId = context.userId;
      if (args.portfoliodetailsId) {
        response = mlDBController.insert('MlLibrary', args.files, context)
      }
      return response;
    }
  }
}