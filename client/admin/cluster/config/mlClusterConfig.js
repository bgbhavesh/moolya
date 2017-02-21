/**
 * Created by venkatasrinag on 20/2/17.
 */
import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlAssignBackendUserList from '../components/MlAssignBackendUserList'

import React from 'react';
import gql from 'graphql-tag'
export const mlClusterConfig=new MlViewer.View({
  name:"cluster",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["username","eMail","city","regType"],
  searchFields:["username","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  moduleName:"BackendUsers",
  sort:true,
  viewComponent:<MlAssignBackendUserList />,
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
