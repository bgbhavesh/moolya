import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import MlBackendUserListView from '../component/MlBackendUserListView'

import React from 'react';
import gql from 'graphql-tag'
export const mlBackendUserListConfig=new MlViewer.View({
  name:"backendUserList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["username","eMail","city","regType"],
  searchFields:["username","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  moduleName:"BackendUsers",
  sort:true,
  viewComponent:<MlBackendUserListView />,
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editUserType/"+data.id);
        } else{
          alert("Please select a User Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: null
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"BackendUsers"){
                    totalRecords
                    data{
                     ...on BackendUsers{
                            username,
                            _id,
                            profile {
                                      isInternaluser
                                      isExternaluser
                                      email
                                      InternalUprofile{
                                          moolyaProfile{
                                            isActive
                                          }
                                       }
                                 }
                             }
                      }
              }
              }
              `
});
