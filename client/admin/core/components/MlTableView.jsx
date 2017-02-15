import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTable from "../../../commons/components/tabular/MlTable";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import _ from "underscore";
export default class MlTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: this.props.sizePerPage||5,
      pageNumber: 1,
      sort: null,
      selectedRow:null
    }

    this.onPageChange.bind(this);
    this.onSizePerPageList.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    if((this.state.sizePerPage!==nextState.sizePerPage)||(this.state.pageNumber!==nextState.pageNumber)){
      this.props.fetchMore(nextState.sizePerPage,nextState.pageNumber);
    }
  }

  onPageChange(page,sizePerPage) {
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

  onSortChange(sortName,sortOrder){
    let sortObj=[];
    if(sortOrder==="asc"){
      sortObj.push(sortName,"asc");
    }else{
      sortObj.push(sortName,"desc");
    }
    this.setState({sort: sortObj});
  };

  handleRowSelect(row, isSelected, e){
     if(isSelected){
       this.setState({"selectedRow":row});
     }else{
       this.setState({"selectedRow":null});
     }
  }

  actionHandlerProxy(actionConfig){
     const selectedRow=this.state.selectedRow;
     const actions=this.props.actionConfiguration;
     const action=_.find(actions,{"actionName":actionConfig.actionName});
          action.handler(selectedRow);
  }

  render(){
    let data=this.props.data&&this.props.data.data?this.props.data.data:[];
    let totalDataSize=this.props.data&&this.props.data.totalRecords?this.props.data.totalRecords:0;
    let loading=this.props.loading;
    let config=this.props;
    config["handleRowSelect"]=this.handleRowSelect.bind(this);

    let that=this;
    let actionsConf=_.clone(config.actionConfiguration);
    let actionsProxyList=[];
    actionsConf.forEach(function (action) {
      let act={actionName:action.actionName,showAction:action.showAction};
      act.handler=that.actionHandlerProxy.bind(that);
      actionsProxyList.push(act);
    });
    return(<div>{loading?(<div className="loader_wrap"></div>):(
      <div>
        <MlTable {...config } totalDataSize={totalDataSize} data={data} pageNumber={this.state.pageNumber} sizePerPage={this.state.sizePerPage} onPageChange={this.onPageChange.bind(this)} onSizePerPageList={this.onSizePerPageList.bind(this)} handleRowSelect={that.handleRowSelect.bind(this)}></MlTable>
        {config.showActionComponent===true && <MlActionComponent ActionOptions={actionsProxyList} />}
      </div>
    )}</div>)
  }

}
MlTableView.propTypes={
}

