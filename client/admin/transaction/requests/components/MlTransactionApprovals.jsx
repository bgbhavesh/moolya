import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import MlDetailsNotesComponent from './MlDetailsNotesComponent'
import {findTransactionApprovalActionHandler} from '../actions/findTransactionApproval'
import moment from 'moment'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import CreateRequestComponent from '../../requested/component/CreateRequestComponent'
export default class MlTransactionApprovals extends Component {
  constructor(props){
    super(props);
    this.state={
      requetsInfo:[],
      createRequest:false,
    }
    return this;
  }
  componentWillMount() {
    // this.setState({requetsInfo:[{transactionCreatedDate:'',transactionTypeId:'',transactionTypeName:'',status:''}]})
    const resp=this.findRequestDetails();
    return resp;
  }
  async findRequestDetails(){
    let requestDetails = await findTransactionApprovalActionHandler('All');
    let requestInfo = []
    for (let i = 0; i < requestDetails.length; i++) {
      let json = {
        transactionCreatedDate: moment(requestDetails[i].transactionCreatedDate).format('MM/DD/YYYY HH:mm:ss'),
        requestDescription:requestDetails[i].requestDescription,
        requestTypeName:requestDetails[i].requestTypeName,
        requestId: requestDetails[i].requestId,
        userId: requestDetails[i].userId,
        transactionTypeName: requestDetails[i].transactionTypeName,
        status:requestDetails[i].status,
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
      <MlDetailsNotesComponent id={ row.transactionId } transaction={row} type={"approval"}/>
    )
  }
  creatRequestType(){
    this.setState({createRequest:true});
  }

  render() {
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'add',
        iconID:'createRegistrationRequest',
        handler: this.creatRequestType.bind(this)
      }
    ];
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
          <h2>Approvals</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <BootstrapTable  data={ this.state.requetsInfo }
                               options={ options }
                               hover={true}
                               expandableRow={ this.isExpandableRow }
                               expandComponent={ this.expandComponent.bind(this) }
                               selectRow={ selectRow }
                               pagination
              >
                <TableHeaderColumn dataField="transactionId" isKey={true} dataSort={true} width='62px' dataAlign='center' hidden={true}>Id</TableHeaderColumn>
                <TableHeaderColumn dataField="transactionCreatedDate" >Date&Time</TableHeaderColumn>
                <TableHeaderColumn dataField="requestId">ApprovalId</TableHeaderColumn>
                <TableHeaderColumn dataField="requestTypeName">Type</TableHeaderColumn>
                <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
              </BootstrapTable>
            </ScrollArea>
          </div>
          {this.state.createRequest?(<CreateRequestComponent openPopUp={true}/>):""}
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>

    )
  }
};

