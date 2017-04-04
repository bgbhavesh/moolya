import MlCollections from '../../lib/common/commonSchemas'
import _ from 'lodash';

class MlDBController{
  constructor(){
  }

  insert(collectionName, payload, context){
    let collection;
    let resp;

    if(collectionName == "users"){
      resp = Accounts.createUser(payload);
    }else{
      collection = MlCollections[collectionName]
      resp = collection.insert({...payload});
    }

    if(resp){
      let response= mlAuditLog.insertAudit({collectionName: collectionName, docId: resp, queryPayload: payload}, context)
      return resp;
    }
  }

  update(collectionName, docId, payload, updateOptions, context){
      let collection;
      if(collectionName == "users") {
        collection = Meteor.users
      }
      else{
        collection = MlCollections[collectionName]
      }
      if(updateOptions && updateOptions.$set && !updateOptions.multi)
      {
          if(_.isObject(docId)){
            let oldValue  = collection.find(docId).fetch();
            let result    = collection.update(docId, {$set: payload});
            let newValue  = collection.find(docId).fetch();
            let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
            return result;
          }else {
            let oldValue  = collection.find({_id:docId}).fetch();
            let result    = collection.update({_id:docId}, {$set: payload});
            let newValue  = collection.find({_id:docId}).fetch()
            let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
            return result;
          }
      }
      else if(updateOptions && updateOptions.$set && updateOptions.upsert && !updateOptions.multi)
      {
        if (_.isObject(docId)){
          let oldValue  = collection.find(docId).fetch();
          let result = collection.update(docId, {$set: payload}, {upsert:true});
          let newValue  = collection.find(docId).fetch()
          let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
          return result;
        }else {
          let oldValue  = collection.find({_id:docId}).fetch();
          let result= collection.update({_id:docId}, {$set: payload}, {upsert:true});
          let newValue  = collection.find({_id:docId}).fetch()
          let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
          return result;
        }
      }
      else if(updateOptions && updateOptions.$set && updateOptions.multi)
      {
          if (_.isObject(docId)){
            let oldValue  = collection.find(docId).fetch();
            let result = collection.update(docId, {$set: payload}, {multi:true});
            let newValue  = collection.find(docId).fetch()
            let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
            return result;
          }else {
            let oldValue  = collection.find({_id:docId}).fetch();
            let result= collection.update({_id:docId}, {$set: payload}, {multi:true});
            let newValue  = collection.find({_id:docId}).fetch()
            let response= mlAuditLog.updateAudit({collectionName: collectionName, docId: docId, oldValue: oldValue, newValue : newValue}, context)
            return result;
          }
      }
  }

  find(collectionName, query, context, fieldsProj){
    let collection;
    if(collectionName == "users")
      collection = Meteor.users
    else
      collection = MlCollections[collectionName]

    let response;
    if(fieldsProj){
      response = collection.find(query, fieldsProj);
    }else {
      response = collection.find(query);
    }

    return response;
  }

  findOne(collectionName, query, context){
    let collection;
    if(collectionName == "users") {
      collection = Meteor.users
    }
    else{
      collection = MlCollections[collectionName]
    }
    let response = collection.findOne(query);
    return response;
  }
}


module.exports = MlDBController
