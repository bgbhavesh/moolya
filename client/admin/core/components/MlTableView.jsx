import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTable from "../../../commons/components/tabular/MlTable";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
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
    console.log(this.state);
    console.log(nextState);
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

  actionHandlerProxy(actionHandler){
     const selectedRow=this.state.selectedRow;
     if(actionHandler){
        actionHandler(selectedRow);
     }
  }

  render(){
    let data=this.props.data&&this.props.data.data?this.props.data.data:[];
    let totalDataSize=this.props.data&&this.props.data.totalRecords?this.props.data.totalRecords:0;
    let loading=this.props.loading;
    let config=this.props;
    config["handleRowSelect"]=this.handleRowSelect.bind(this);

    let that=this;
    let actionConfigration=config.actionConfiguration
    actionConfigration.forEach(function (action) {

      action.handler=that.actionHandlerProxy.bind(that,action.handler)
    })
    config["actionConfiguration"]=actionConfigration;
    return(<div>{loading?(<div className="loader_wrap"></div>):(
      <div>
        <MlTable {...config } totalDataSize={totalDataSize} data={data} pageNumber={this.state.pageNumber} sizePerPage={this.state.sizePerPage} onPageChange={this.onPageChange.bind(this)} onSizePerPageList={this.onSizePerPageList.bind(this)} handleRowSelect={that.handleRowSelect.bind(this)}></MlTable>
        {config.showActionComponent===true && <MlActionComponent ActionOptions={config.actionConfiguration} />}
      </div>
    )}</div>)
  }

}
MlTableView.propTypes={
}

