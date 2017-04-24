import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import MlDetailsNotesComponent from './MlDetailsNotesComponent'
import {findTransactionRequestActionHandler} from '../actions/findTransactionRequests'
import moment from 'moment'

export default class MlTransactionRequested extends Component {
  constructor(props){
    super(props);
    this.state={
      requetsInfo:[],
    }
    return this;
  }
  componentWillMount() {
   // this.setState({requetsInfo:[{transactionCreatedDate:'',transactionTypeId:'',transactionTypeName:'',status:''}]})
    const resp=this.findRequestDetails();
    return resp;
  }
    async findRequestDetails(){
      let requestDetails = await findTransactionRequestActionHandler('registration');
      let requestInfo = []
      for (let i = 0; i < requestDetails.length; i++) {
        let json = {
          transactionCreatedDate: requestDetails[i].transactionCreatedDate,
          requestTypeId: requestDetails[i].requestTypeId,
          transactionTypeName: requestDetails[i].transactionTypeName,
          status:'pending',
          transactionId:requestDetails[i]._id
        }
        requestInfo.push(json)
      }
      this.setState({'requetsInfo':requestInfo})
    }

  isExpandableRow(row) {
    if (row.transactionCreatedDate!=undefined) return true;
    else return false;
  }


  expandComponent(row) {
   return (
     <MlDetailsNotesComponent/>
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
    function dateFormatter (data){
      let createdDateTime=data&&data.data&&data.data.date;
      return <div>{moment(createdDateTime).format('MM/DD/YYYY HH:mm:ss')}</div>;
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
              <TableHeaderColumn dataField="transactionId" isKey={true} dataSort={true} width='62px' dataAlign='center' hidden={true}>Id</TableHeaderColumn>
              <TableHeaderColumn dataField="transactionCreatedDate" customComponent={dateFormatter(this)}>Date&Time</TableHeaderColumn>
              <TableHeaderColumn dataField="requestTypeId">RequestId</TableHeaderColumn>
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

