/**
 * Created by mohammed.mohasin on 05/03/17.
 */
import _ from 'lodash';
import MlAdminUserContext from '../../../../../mlAuthorization/mlAdminUserContext'
export default class MlMasterSettingRepo{
   constructor(userId){
      this.userId=userId;
   };

  getDroDownMasterSettings(requestParams) {
    check(requestParams.type, String);
    let userProfile = new MlAdminUserContext().userProfileDetails(this.userId);
    let settingsObj = null;
    let result = null;
    //todo:dynamic handling of resource
    let cluster = MlClusters.findOne(userProfile.defaultProfileHierarchyRefId);
    let query = {
      "hierarchyLevel": 3,
      "hierarchyCode": "CLUSTER",
      "hierarchyRefId": userProfile.defaultProfileHierarchyRefId,
      "hierarchyRefName": cluster.clusterName
    };
    let  options=[]
   switch (requestParams.type) {
      case "TAXTYPE":
        settingsObj = {
          "type": "TAXTYPE",
          isActive:true
        };
        settingsObj=_.extend(query,settingsObj);
        result= MlMasterSettings.find({...settingsObj}).fetch();
        let resultResponse=_.each(result,function (option,id) {
          options.push({"label":option.taxTypeInfo.taxName,"value":option._id})
        })

        break;
    }


    return options;
  }

  updateMasterSetting(requestParams){
    check(requestParams.type,String);
    check(requestParams.actionName,String);
    //fetch the User context
    let userProfile=new MlAdminUserContext().userProfileDetails(this.userId);
    let settingsObj=null;
    let actionName=requestParams.actionName;
    let result=null;

    //todo:dynamic handling of resource
     let cluster=MlClusters.findOne(userProfile.defaultProfileHierarchyRefId);
     let query={"hierarchyLevel":3,"hierarchyCode":"CLUSTER","hierarchyRefId":userProfile.defaultProfileHierarchyRefId,"hierarchyRefName":cluster.clusterName};

    switch(requestParams.type){
      case "TAXTYPE":
        settingsObj={"type":"TAXTYPE","taxTypeInfo":requestParams.masterData.taxTypeInfo,isActive:requestParams.masterData.isActive};
        break;
     case "TITLE":
        settingsObj={"type":"TITLE","titleInfo":requestParams.masterData.titleInfo,isActive:requestParams.masterData.isActive};
        break;

      case "LANGUAGE":
        settingsObj={"type":"LANGUAGE","languageInfo":requestParams.masterData.languageInfo,isActive:requestParams.masterData.isActive};
        break;

      case "EMPLOYMENTTYPE":
        settingsObj={"type":"EMPLOYMENTTYPE","employmentTypeInfo":requestParams.masterData.employmentTypeInfo,isActive:requestParams.masterData.isActive};
        break;



      case "COMPANYTYPE":
        settingsObj={"type":"COMPANYTYPE","companyTypeInfo":requestParams.masterData.companyTypeInfo,isActive:requestParams.masterData.isActive};
        break;

      case "EMAILTYPE":
        settingsObj={"type":"EMAILTYPE","emailTypeInfo":requestParams.masterData.emailTypeInfo,isActive:requestParams.masterData.isActive};
        break;

      case "GENDER":
        settingsObj={"type":"GENDER","genderInfo":requestParams.masterData.genderInfo,isActive:requestParams.masterData.isActive};
        break;

      case "ADDRESSTYPE":
        settingsObj={"type":"ADDRESSTYPE","addressTypeInfo":requestParams.masterData.addressTypeInfo,isActive:requestParams.masterData.isActive};
        break;

      case "CONTACTTYPE":
        settingsObj={"type":"CONTACTTYPE","contactTypeInfo":requestParams.masterData.contactTypeInfo,isActive:requestParams.masterData.isActive};
        break;

      case "SOCIALLINKS":
        settingsObj={"type":"SOCIALLINKS","socialLinksInfo":requestParams.masterData.socialLinksInfo,isActive:requestParams.masterData.isActive};
        break;
      }

      if(actionName==="CREATE"){
        settingsObj=_.extend(query,settingsObj);
        result= MlMasterSettings.insert({...settingsObj});
      }else if(actionName==="UPDATE"){
        query={_id:requestParams.masterData._id};
        MlMasterSettings.update(query,{$set:settingsObj});
        result= MlMasterSettings.findOne(query)._id;
      }
      return result;
  }
  dropDownMasterSettingsPlatformAdmin(requestParams){
    check(requestParams.type,String);
    check(requestParams.hierarchyRefId,String);
    let result = null;
    let  options=[]
    switch (requestParams.type) {
      case "CONTACTTYPE":
        result= MlMasterSettings.find({"type": "CONTACTTYPE",isActive:true,hierarchyRefId:requestParams.hierarchyRefId}).fetch();
        let resultResponse=_.each(result,function (option,id) {
          options.push({"label":option.contactTypeInfo.contactName,"value":option._id})
        })

        break;
    }
    return options;
  }


}
