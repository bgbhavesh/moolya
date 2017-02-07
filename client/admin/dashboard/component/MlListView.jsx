import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
export default class MlListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: 5,
      pageNumber: 1,
      sort: null,
      pubSelector: null
    }
    this.onPageChange.bind(this);
    this.onSizePerPageList.bind(this);
  }

  onPageChange(page,sizePerPage) {
    this.setState({
      pageNumber: page
    });
  }

  onSizePerPageList(sizePerPage) {
    this.setState({
      sizePerPage: sizePerPage
    });
  }

  onSortChange(sortName,sortOrder){
    let sortObj=[];
    if(sortOrder==="asc"){
      sortObj.push(sortName,"asc");
    }else{
      sortObj.push(sortName,"desc");
    }
    this.setState({sort: sortObj});
  };

  render(){
    let data=this.props.data&&this.props.data.data?this.props.data.data:[];
    let ListComponent =React.cloneElement(this.props.viewComponent,{data:data});
    let loading=this.props.loading;

    return(<div>{loading?(<div className="loader_wrap"></div>):(<div className="list_view_block">
      <div className="col-md-12">
        <div className="row">
          {ListComponent}
        </div>
      </div>
    </div>)}</div>)
  }

}
MlListView.propTypes={
}

