import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
export default class MlTransactionRequested extends Component {
  constructor(props){
    super(props);
    this.state={
      requetsInfo:[],
    }
    return this;
  }
  componentWillMount() {
    this.setState({requetsInfo:[{transactionCreatedDate:'',transactionTypeId:'',transactionTypeName:'',status:''}]})

  }


  isExpandableRow(row) {
    if (row.transactionCreatedDate!=undefined) return true;
    else return false;
  }


  expandComponent(row) {
   return (
      <div>hello</div>
    )
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#feeebf',
      clickToSelect: true,  // click to select, default is false
      clickToExpand: true  // click to expand row, default is false// click to expand row, default is false
    }
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Requests</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
            <BootstrapTable  data={ this.state.requetsInfo }
                             options={ options }
                             expandableRow={ this.isExpandableRow }
                             expandComponent={ this.expandComponent.bind(this) }
                             selectRow={ selectRow }
                             pagination
            >
              <TableHeaderColumn dataField="transactionCreatedDate" isKey={true} dataSort={true} width='62px' dataAlign='center'>Date&Time</TableHeaderColumn>
              <TableHeaderColumn dataField="transactionTypeId">RequestId</TableHeaderColumn>
              <TableHeaderColumn dataField="transactionTypeName">Type</TableHeaderColumn>
              <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
            </BootstrapTable>
            </ScrollArea>
          </div>
        </div>
      </div>

    )
  }
};

