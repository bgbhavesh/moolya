import { MlAppViewer } from '../../../commons/core/MlAppViewer';
import MlAppChapterList from '../components/MlAppChapterList'
import MlAppClusterMapView from '../components/MlAppClusterMapView'
import MapDetails from '../../../../client/commons/components/map/mapDetails'
import maphandler from '../actions/fetchDashboardDetails'
import React from 'react';
import gql from 'graphql-tag'
import { getAdminUserContext } from '../../../commons/getAdminUserContext';
import MlAppClusterMapMarker from '../components/MlAppClusterMapMarker'
import MlAppMapViewContainer from '../../core/containers/MlAppMapViewContainer'

const mlAppChapterDashboardListConfig = new MlAppViewer({
  name: 'chapterDashBoardList',
  moduleName: 'chapter',
  module: 'chapter',
  extraFields: [],
  fields: ['displayName'],
  searchFields: ['displayName'],
  throttleRefresh: true,
  perPageLimit: 20,
  sort: true,
  queryOptions: true,
  buildQueryOptions: (config) => {
    const queryObj = {
      clusterId: config.params && config.params.clusterId ? config.params.clusterId : null,
      bounds: config.params && config.params.bounds ? config.params.bounds : null,
      viewMode: config.params && config.params.viewMode ? config.params.viewMode : null,
      isListView: true
    };
    const queryString = JSON.stringify(queryObj);
    return {
      queryProperty: { query: queryString }
    }
  },
  viewComponent: <MlAppChapterList />,
  graphQlQuery: gql`
              query ($module: String!, $queryProperty: appGenericSearchQueryProperty) {
                data:AppGenericSearch(module: $module, queryProperty: $queryProperty) {
                  count
                  data{
                   ...on Chapter{
                              _id
                              clusterId
                              chapterCode
                              chapterName
                              displayName
                              chapterImage
                              stateName
                              stateId
                              cityId
                              cityName
                              latitude
                              longitude
                              showOnMap
                              isActive
                          }
                   }                                                                                                     
                }
              }
              
              `
});

const mlAppChapterDashboardMapConfig = new MlAppViewer({
  name: 'chapterDashBoardMap',
  module: 'chapter',
  moduleName: 'chapter',
  sort: false,
  extraFields: [],
  throttleRefresh: true,
  fetchCenter: true,
  queryOptions: true,
  buildQueryOptions: config => ({
    queryProperty: { query: config.params && config.params.clusterId ? config.params.clusterId : null }
  }),
  async fetchCenterHandler(reqParams) {
    const mapDetailsQuery = { moduleName: reqParams.module, id: reqParams && reqParams.params && reqParams.params.clusterId ? reqParams.params.clusterId : null };
    const center = await maphandler.fetchDefaultCenterOfUser(mapDetailsQuery);
    return center;
  },
  fetchZoom: true,
  async fetchZoomHandler(reqParams) {
    const zoom = 4;
    return zoom;
  },
  viewComponent: <MlAppMapViewContainer/>,
  mapMarkerComponent: <MlAppClusterMapMarker/>,
  // mapFooterComponent:<MlMapFooter />,
  actionConfiguration: [
    {
      actionName: 'onMouseEnter',
      hoverComponent: <MapDetails />,
      handler(reqParams, mapHoverHandlerCallback) {
        const mapDetailsQuery = { moduleName: reqParams.module, id: reqParams.markerId };
        const mapDataPromise = maphandler.findMapDetailsTypeActionHandler(mapDetailsQuery);
        mapDataPromise.then((data) => {
          // console.log(data);
          if (mapHoverHandlerCallback) {
            mapHoverHandlerCallback(data);
          }
        });
        return null;
      }
    },
    {
      actionName: 'onMouseLeave',
      // hoverComponent:<MapDetails />,
      handler: (data) => {
        if (data && data.id) {
          // console.log('on leave called')
        }
      }
    },
    {
      actionName: 'onMarkerClick',
      // hoverComponent:<MapDetails />,
      handler: (data) => {
        if (data.module == 'cluster') { FlowRouter.go(`/app/dashboard/${data.markerId}/chapters?viewMode=true`); }
        if (data.module == 'chapter') {
          if (data && data.params) {
            if (data.params.clusterId) { FlowRouter.go(`/app/dashboard/${data.params.clusterId}/${data.markerId}/subChapters?viewMode=true`); }
          } else {
            const loggedInUser = getAdminUserContext();
            FlowRouter.go(`/app/dashboard/${loggedInUser.clusterId}/${data.markerId}/subChapters?viewMode=true`);
          }
        }

        if (data.module == 'subChapter') { FlowRouter.go(`/app/dashboard/${data.params.clusterId}/${data.params.chapterId}/${data.markerId}/communities?viewMode=true`); }
      }
    }
  ],
  // async function (data) {
  //   console.log(data);
  // let mapMarkerData=await findMapDetailsTypeActionHandler(data);
  // return mapMarkerData;
  // },
  graphQlQuery: gql`
               query ($module: String!, $queryProperty: appGenericSearchQueryProperty) {
                data:AppGenericSearch(module: $module, queryProperty: $queryProperty) {
                  count
                  data{
                   ...on Chapter{
                             _id
                             desc:displayName
                             text:chapterName
                             lat:latitude
                             lng:longitude
                             isActive:isActive
                             showOnMap:showOnMap
                             status:status {
                               code
                               description
                             }
                          }
                   }                                                                                                     
                }
              }
              `
});

export { mlAppChapterDashboardListConfig, mlAppChapterDashboardMapConfig };
