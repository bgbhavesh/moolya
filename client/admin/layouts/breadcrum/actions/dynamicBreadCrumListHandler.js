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
    fetchPolicy: 'cache-first'
  });

  breadCrumHierarchyPromise.then(data =>{
    let result=data.data.data;
    let list=[];
     result=_.sortBy(result, ['hierarchyLevel']).reverse();
    _.forEach(result, function(detail) {
      //let linkUrl=getLinkUrl(module,detail.moduleFieldRef);
      list.push({"linkId":detail.hierarchyRefId,"linkUrl":'',"linkName":detail.hierarchyRefName,'seq':detail.hierarchyLevel});
    });
    if(callback){
      callback(list);

    }
  })


}
