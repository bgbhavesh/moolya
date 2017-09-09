import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from 'lodash';
export default function getBreadCrumListBasedOnhierarchy(module,params,callback){
  let list=[];
  params=params||{};
  let  requ=_.pick(params,['clusterId','chapterId','subChapterId','communityId']);
  let breadCrumHierarchyPromise = client.query({
    query: gql`
    query  ($hierarchyContext:BreadCrumHierarchy){
        data:FetchBreadCrumHierarchyDetails(hierarchyContext:$hierarchyContext){
            hierarchyLevel
            hierarchyRefName
            hierarchyRefId
            moduleFieldRef
        }
      }
    `,
    variables: {
      hierarchyContext:requ
    },
    forceFetch:true
  });

  breadCrumHierarchyPromise.then(data =>{
    let result=data.data.data;
    let list=[];
     result=_.sortBy(result, ['hierarchyLevel']);

    let path = Object.assign(FlowRouter._current.path);
    if(path.includes('dashboard')){
      _.forEach(result, function(detail,index) {
        list.push({
          "linkId":detail.hierarchyRefId,
          "linkUrl":generateLinkForDashboardUrl(path, detail.hierarchyRefId, detail.moduleFieldRef),
          "linkName":detail.hierarchyRefName,
          'seq':detail.hierarchyLevel
        });
      });
    }else {
      _.forEach(result, function(detail,index) {
        list.push({
          "linkId":detail.hierarchyRefId,
          "linkUrl":generateLink(path, detail.hierarchyRefId, detail.moduleFieldRef),
          "linkName":detail.hierarchyRefName,
          'seq':detail.hierarchyLevel
        });
      });
    }
    list = list.reverse();

    if(callback){
      callback(list);

    }
  })
}

function generateLink(path, RefID, moduleType){
  let postfix='/';

  if(moduleType === 'subChapterId')  postfix += 'subChapterDetails';
  else if(moduleType === 'chapterId')  postfix += 'subChapters';
  else if(moduleType === 'clusterId')  postfix += 'clusterDetails';

  if(path.includes(RefID) && !(path.includes('/chapters/') &&  postfix === '/clusterDetails')){
    let url = path.split(RefID)[0];
    return ( url + RefID + postfix);
  }else
    return '';
}

function generateLinkForDashboardUrl(path, RefID, moduleType, index){
  let postfix='/';

  if(moduleType === 'clusterId')  postfix += 'chapters?viewMode=true';
  else if(moduleType === 'chapterId')  postfix += 'subChapters?viewMode=true';

  if(path.includes(RefID)){
    let url = path.split(RefID)[0];
    return ( url + RefID + postfix);
  }else if(path.includes('all')){
    let url = path.split('all')[0];
    return ( url + RefID + postfix);
  }else
    return '';
}

