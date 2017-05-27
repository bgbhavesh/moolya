import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import hierarchyRoutes from '../actions/hierarchyRoutes';
export default class MlClusterSubChaptersListHierarchy extends Component
{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
    return this;
  }

  render(){
    const subChapterData=this.props.data||[]
    let list = null, temp=0;
    if(subChapterData.length>0){
      let data=[]
      for(let i=0;i<subChapterData.length;i++){

        if(subChapterData[i].isDefaultSubChapter=="true") {
        // if(subChapterData[i].isDefaultSubChapter) {
          temp = temp + 1;
          if (temp == 1) {
            data.push(subChapterData[i])
          }
        }else{
          data.push(subChapterData[i])
        }
      }

      list=  data.map( function(prop,idx) {
        let icon, status;
        if (prop.isActive && prop.showOnMap) {
          status = "active";
          // icon = "active-User"
        } else if (prop.isActive && !prop.showOnMap) {
          status = "add";
          // icon ="add";
        } else if (!prop.isActive && prop.showOnMap) {
          status = "inactive";
          // icon = "inactive-user"
        } else {
          status = "assign";
          // icon = "assign";
        }
        return(
          <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
            <div className="list_block">
              <div className={`cluster_status ${status}_cl`}><span className={`ml ml-${icon}`}></span></div>
              <a href={hierarchyRoutes.hierarchyDetails(prop.clusterId)}>
                <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div>
              </a>
              {/*<h3>Moolya</h3>*/}
              <h3>{prop.subChapterName}</h3>
            </div>
          </div>
        )
      });
    } else {
      list=  <div><h3>No Sub Chapters Available</h3></div>
    }


    return (<div className="row">{list}</div>);

  }
}
