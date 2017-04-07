import async from 'async';
import each from 'async/each';
import _ from 'lodash';
var diff = require('deep-diff').diff;

class MlAuditLog {
  constructor(){
  }

  insertAudit(auditParams, context){
    let userAgent = {
      OS: '-',
      ipAddress: context.ip,
      browser: context.browser,
      deviceModel: "-",
      deviceType: "-",
      deviceVendor: "-"
    }

    let toInsert =
    {
      userId: context.userId,
      userName: Meteor.users.findOne({_id: context.userId}).username,
      collectionName: auditParams.collectionName,
      url: context.url,
      docId: auditParams.docId,
      action: '',
      field: '',
      previousValue: '',
      currentValue: '',
      userAgent: userAgent,
      timeStamp: new Date()
    }
      auditParams.queryPayload = _.omit(auditParams.queryPayload, ['moduleName','actionName']);

      let oldValue = {};
      let newValue = auditParams.queryPayload;
      var differences = diff(oldValue, newValue);
      toInsert.moduleName = MlModuleCollectionMap[auditParams.collectionName];
      async.each(differences, function (say, callback) {
        toInsert.action=say.kind;
        if(_.head(say.path) == 0){
          say.path.splice(0,1);
        }

        let fieldPath = say.path;
        toInsert.field=_.join(say.path, '.');
        _.find(fieldPath, function (value, key) {
          if(_.isNumber(value)){
            fieldPath.splice(key, 1);
          }
        })
        toInsert.fieldName = _.join(fieldPath, '.')

        toInsert.previousValue=JSON.stringify(say.lhs)
        toInsert.currentValue=JSON.stringify(say.rhs)
        MlAudit.insert(toInsert);
        callback();
      }, function(err){
        if( err ) {
          toInsert.errorReason=JSON.stringify(err)
          MlAudit.insert(toInsert)
        } else {
          // console.log('All data have been processed successfully');
        }
      });
      return true;
  }

  updateAudit(auditParams, context){
    let userAgent = {
      OS: '-',
      ipAddress: context.ip,
      browser: context.browser,
      deviceModel: "-",
      deviceType: "-",
      deviceVendor: "-"
    }

    if(_.isObject(auditParams.docId)){
      auditParams.docId = JSON.stringify(auditParams.docId)
    }
    let toInsert =
    {
      userId: context.userId,
      userName: Meteor.users.findOne({_id: context.userId}).username,
      collectionName: auditParams.collectionName,
      url: context.url,
      docId: auditParams.docId,
      action: '',
      field: '',
      previousValue: '',
      currentValue: '',
      userAgent: userAgent,
      timeStamp: new Date()
    }

    args = _.omit(auditParams.queryPayload, ['moduleName','actionName']);
    let oldValue = auditParams.oldValue;
    let newValue = auditParams.newValue;
    var differences = diff(oldValue, newValue);
    toInsert.moduleName = MlModuleCollectionMap[auditParams.collectionName];
    async.each(differences, function (say, callback) {
      toInsert.action=say.kind;
      if(_.head(say.path) == 0){
        say.path.splice(0,1);
      }

      let fieldPath = say.path;
      toInsert.field=_.join(say.path, '.');
      _.find(fieldPath, function (value, key) {
          if(_.isNumber(value)){
            fieldPath.splice(key, 1);
          }
      })
      toInsert.fieldName = _.join(fieldPath, '.')

      if(say.lhs || say.rhs){
        toInsert.previousValue = JSON.stringify(say.lhs)
        toInsert.currentValue = JSON.stringify(say.rhs)
      }else{
        if(say.item){
          if(say.item.kind){
            toInsert.previousValue = JSON.stringify(say.item.lhs)
            toInsert.currentValue = JSON.stringify(say.item.rhs)
          }
        }
      }
      MlAudit.insert(toInsert);
      callback();
    }, function(err){
      if( err ) {
        toInsert.errorReason=JSON.stringify(err)
        MlAudit.insert(toInsert)
      } else {
        // console.log('All data have been processed successfully');
      }
    });
    return true;
  }

}

module.exports = MlAuditLog
