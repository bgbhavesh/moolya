import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import AlphaSearch from '../../../commons/components/alphaSearch/AlphaSearch';
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
    this.onAlphaSearchChange.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((this.state.sizePerPage !== nextState.sizePerPage) || (this.state.pageNumber !== nextState.pageNumber)) {

      let hasQueryOptions = this.props.queryOptions ? true : false;
      const variables={
                          offset: nextState.sizePerPage * (nextState.pageNumber - 1) || 0,
                          limit: nextState.sizePerPage || 20
                      }
      if (hasQueryOptions) {
        let dynamicQueryOptions = this.props.buildQueryOptions ? this.props.buildQueryOptions(this.props) : {};
        let extendedVariables = _.extend(dynamicQueryOptions);
        this.props.fetchMore(extendedVariables);
      }
      this.props.fetchMore(variables);
    }
  }

  onPageChange(page,sizePerPage) {
    this.setState({
      pageNumber: page
    });
  }

  onAlphaSearchChange(alpha){
    alert("selected alphabet is "+alpha);
  }

  onSizePerPageList(sizePerPage) {
    this.setState({
      sizePerPage: sizePerPage
    });
    this.props.fetchMore();
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

    return(<div>{loading?(<div className="loader_wrap"></div>):(
      <div className="admin_padding_wrap">
      <div className="list_view_block">
        <AlphaSearch onAlphaSearchChange={this.onAlphaSearchChange.bind(this)} />
      <div className="col-md-12">
        <div className="row">
          {ListComponent}
        </div>
      </div>
        </div>
    </div>)}</div>)
  }

}
MlListView.propTypes={
}

