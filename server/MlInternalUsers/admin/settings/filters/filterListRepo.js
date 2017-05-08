/*
* Created by Sireesha on 4/5/2017
*
* */

import _ from 'lodash';
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

export default class MlFilterListRepo{
  constructor(userId){
    this.userId=userId;
  };

  getFilterDropDownSettings(requestParams) {
    check(requestParams.moduleName, String);

   /* let userProfile = new MlAdminUserContext().userProfileDetails(this.userId);
    let settingsObj = null;*/
    let result = null;
    let listData = []
    if(requestParams.list && requestParams.list.length>0){
      listData = requestParams.list
    }
    let  options=[]
    switch (requestParams.moduleName) {
      case "Clusters":
        if(listData.length < 1){
          result= MlClusters.find({isActive : true}).fetch();
        }else{
          result= MlClusters.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let resultResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;
    }


    return options;
  }


}
