import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTable from "../../../commons/components/tabular/MlTable";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import _ from "underscore";
export default class MlTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: 10,    //this.props.sizePerPage ||
      pageNumber: 1,
      sort: null,
      selectedRow: null,
      searchValue:"",
      filterValue:[],
    }

    this.onPageChange.bind(this);
    this.onSizePerPageList.bind(this);
    this.constructSearchCriteria.bind(this);
    this.onSortChange.bind(this);
  }

  compareQueryOptions(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  componentWillUpdate(nextProps, nextState) {
    let hasQueryOptions = this.props.queryOptions ? true : false;
    let context=null;
    if (hasQueryOptions) {
      let dynamicQueryOptions = this.props.buildQueryOptions ? this.props.buildQueryOptions(this.props) : {};
      context=dynamicQueryOptions&&dynamicQueryOptions.context?dynamicQueryOptions.context:null;
    }
    if ((this.state.sizePerPage !== nextState.sizePerPage) || (this.state.pageNumber !== nextState.pageNumber)) {
      let searchCriteria=this.constructSearchCriteria(nextState.searchValue);
      this.props.fetchMore(nextState.sizePerPage, nextState.pageNumber,searchCriteria,nextState.sort,context);
    }else if(this.state.searchValue!==nextState.searchValue){
       let searchCriteria=this.constructSearchCriteria(nextState.searchValue);
       this.props.fetchMore(this.state.sizePerPage,1,searchCriteria,nextState.sort,context);
    }else if(this.state.sort!==nextState.sort){
      let searchCriteria=this.constructSearchCriteria(nextState.searchValue);
      this.props.fetchMore(this.state.sizePerPage,1,searchCriteria,nextState.sort,context);
    }else if(!this.compareQueryOptions(this.state.filterValue,nextState.filterValue)){
      //let filterCriteria=this.constructSearchCriteria(nextState.searchValue);
      this.props.fetchMore(this.state.sizePerPage,1,nextState.filterValue,nextState.sort,context);
    }
  }

  constructSearchCriteria(search){
    let fieldsAry = null;
    if (search && search.trim() !== "") {
      fieldsAry=[];
      _.find(this.props.options.searchFields, function (num) {
        fieldsAry.push({fieldName: num, value: search.trim()})
      });
    }
    if(this.props.filter){
      fieldsAry=this.state.filterValue||[];
    }
    return fieldsAry;
  }

  onSearchChange(search) {
    this.setState({searchValue:search});
  }

  onPageChange(page, sizePerPage) {
    this.setState({
      pageNumber: page
    });
    // this.props.fetchMore();
  }

  onSizePerPageList(sizePerPage) {
    this.setState({
      sizePerPage: sizePerPage
    });
    //  this.props.fetchMore();
  }

  onSortChange(sortName, sortOrder) {
    let sortObj = [];

    if(this.props.fieldsMap){
        sortName=this.props.fieldsMap[sortName]||sortName;
    }
    if (sortOrder === "asc") {
      sortObj.push({fieldName : sortName, sort : "asc"});
    } else {
      sortObj.push({fieldName : sortName, sort : "desc"});
    }
    this.setState({sort: sortObj});
  };

  handleRowSelect(row, isSelected, e) {
    //if its multiselect
    if(this.props.multiSelect){
      var selectedRows = this.state.selectedRow || [];
      if (isSelected) {
        selectedRows.push(row);
        this.setState({"selectedRow": selectedRows});
      }else{
        selectedRows=_.without(selectedRows,row);
        this.setState({"selectedRow":selectedRows});
      }

    }else {
        if (isSelected) {
          this.setState({"selectedRow": row});
        } else {
          this.setState({"selectedRow": null});
        }
    }
  }

   handleRowSelectAll(isSelected, rows) {
    if (isSelected) {
      this.setState({"selectedRow": rows});
    } else {
      /*_.each(rows,function(row){
        selectedRows=_.without(selectedRows,row);
      })*/
      this.setState({"selectedRow":null});
    }
  }

  actionHandlerProxy(actionConfig) {
    const selectedRow = this.state.selectedRow;
    const actions = this.props.actionConfiguration;
    const action = _.find(actions, {"actionName": actionConfig.actionName});
    action.handler(selectedRow);
  }

  onFilterChange(filterQuery){
       this.setState({filterValue:filterQuery});
  }

  render() {
    let data = this.props.data && this.props.data.data ? this.props.data.data : [];
    let totalDataSize = this.props.data && this.props.data.totalRecords ? this.props.data.totalRecords : 0;
    let loading = this.props.loading;
    let config = this.props;
    config["handleRowSelect"] = this.handleRowSelect.bind(this);
    config["handleRowSelectAll"]=this.handleRowSelectAll.bind(this);

    let that = this;
    let actionsConf = _.clone(config.actionConfiguration);
    let actionsProxyList = [];
    actionsConf.forEach(function (action) {
      let act = {actionName: action.actionName, showAction: action.showAction, iconID: action.iconID};
      act.handler = that.actionHandlerProxy.bind(that);
      actionsProxyList.push(act);
    });


    var FilterComponent ='';
    if(this.props.filter){
      // let pConfig=_.extend(this.props,{onFilterChange:this.onFilterChange.bind(this)});
       FilterComponent=React.cloneElement(this.props.filterComponent,{onFilterChange:this.onFilterChange.bind(this)});
    }
    return (<div>{loading ? (<div className="loader_wrap"></div>) : (
      <div>
        {FilterComponent}
        <MlTable {...config } totalDataSize={totalDataSize} data={data} pageNumber={this.state.pageNumber}
                 sizePerPage={this.state.sizePerPage} onPageChange={this.onPageChange.bind(this)}
                 onSizePerPageList={this.onSizePerPageList.bind(this)} onSearchChange={this.onSearchChange.bind(this)}
                 handleRowSelect={that.handleRowSelect.bind(this)}
                 handleRowSelectAll={that.handleRowSelectAll.bind(this)}
                 onSortChange={this.onSortChange.bind(this)}></MlTable>
        {config.showActionComponent === true && <MlActionComponent ActionOptions={actionsProxyList}/>}
      </div>
    )}</div>)
  }

}
MlTableView.propTypes = {}

