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
          temp = temp + 1;
          if (temp == 1) {
            data.push(subChapterData[i])
          }
        }else{
          data.push(subChapterData[i])
        }
      }

      list=  data.map((prop) =>
        <div className="col-md-2" key={prop.subChapterCode}>
          <div className="list_block">
            <div className={`cluster_status ${prop.isActive|| ""}_cl `}></div>
            <a href={hierarchyRoutes.hierarchyDetails(prop.clusterId)}> <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div></a>
            <h3>{prop.subChapterName}</h3>
          </div>
        </div>
      );
    } else {
      list=  <div><h3>No Sub Chapters Available</h3></div>
    }


    return (<div className="row">{list}</div>);

  }
}
