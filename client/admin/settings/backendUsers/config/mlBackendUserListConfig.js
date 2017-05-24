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
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addBackendUser")
      }
    }
  ],
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"BackendUsers"){
                    totalRecords
                    data{
                     ...on BackendUsers{
                            roleNames,
                            username,
                            _id,
                            profile {
                                      isInternaluser
                                      isExternaluser
                                      isMoolya
                                      email,
                                      isActive,
                                      profileImage
                                      InternalUprofile{
                                          moolyaProfile{
                                            firstName,
                                            lastName,
                                            displayName,
                                            userProfiles {
                                              isDefault
                                              userRoles{
                                                roleId
                                                hierarchyLevel
                                              }
                                          
                                        }
                                          
                                          
                                          }
                                       }
                                 }
                             }
                      }
              }
              }
              `
});
