import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import MlDetailsNotesComponent from './MlDetailsNotesComponent'
import {findTransactionRequestActionHandler} from '../actions/findTransactionRequests'
import moment from 'moment'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import CreateRequestComponent from '../../requested/component/CreateRequestComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {addReqgistrationRequestInfo} from '../../requested/actions/addRegistrationRequestAction'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
export default class MlTransactionRequested extends Component {
  constructor(props){
    super(props);
    this.state={
      requetsInfo:[],
      requestType:null,
      createRequest:false,
      popoverOpen: false
    }
    this.toggle = this.toggle.bind(this);
    return this;
  }
  componentWillMount() {
   // this.setState({requetsInfo:[{transactionCreatedDate:'',transactionTypeId:'',transactionTypeName:'',status:''}]})
    const resp=this.findRequestDetails();
    return resp;
  }
  optionsBySelectRequestType(value){
    this.setState({requestType:value})
  }
  async createRequest(){
    let transaction={
      requestTypeId:this.state.requestType,
      requestDescription:this.refs.about.value,
      transactionStatus:{
        code: 1,
        description:"requested"
      },
      status:"Pending"
    }
    const response = await addReqgistrationRequestInfo(transaction);
    if(response.success){
      this.setState({requestType:null})
      this.toggle();
      this.findRequestDetails();
      toastr.success("Request is created successfully");
    }else{
      toastr.error(response.result);
      this.toggle();
      this.setState({requestType:null})
      FlowRouter.go("/admin/transactions/requestedList");
    }
  }

  cancel(){
    this.setState({requestType:null})
    this.toggle();
    /*FlowRouter.go("/admin/transactions/requestedList");*/
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

    async findRequestDetails(){
      let requestDetails = await findTransactionRequestActionHandler('All');
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
     <MlDetailsNotesComponent id={ row.transactionId } transaction={row}/>
    )
  }
  creatRequestType(){
      this.setState({createRequest:true});
    if(!this.state.popoverOpen){
      this.toggle();
    }
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
    let requestTypeQuery=gql`query{
  data:FetchRequestType {
    label:requestName
    value:_id
  }
}`;
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
                             hover={true}
                             expandableRow={ this.isExpandableRow }
                             expandComponent={ this.expandComponent.bind(this) }
                             selectRow={ selectRow }
                             pagination
            >
              <TableHeaderColumn dataField="transactionId" isKey={true} dataSort={true} width='62px' dataAlign='center' hidden={true}>Id</TableHeaderColumn>
              <TableHeaderColumn dataField="transactionCreatedDate" >Date&Time</TableHeaderColumn>
              <TableHeaderColumn dataField="requestId">RequestId</TableHeaderColumn>
              <TableHeaderColumn dataField="requestTypeName">Type</TableHeaderColumn>
              <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
            </BootstrapTable>
            </ScrollArea>
          </div>
          {/*{this.state.createRequest?(<CreateRequestComponent openPopUp={true}/>):""}*/}
          <div className="overlay"></div>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="createRegistrationRequest" toggle={this.toggle}>
            <PopoverTitle>Create Request </PopoverTitle>
            <PopoverContent>
              <div  className="ml_create_client">
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Request type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.requestType} queryType={"graphql"} query={requestTypeQuery} onSelect={this.optionsBySelectRequestType.bind(this)} isDynamic={true}/>
                    </div>
                    <div className="form-group">
                      <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
                    </div>
                    <div className="assign-popup">
                      <a data-toggle="tooltip" title="Submit" data-placement="top" onClick={this.createRequest.bind(this)} className="hex_btn hex_btn_in">
                        <span className="ml ml-save"></span>
                      </a>
                      <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in" onClick={this.cancel.bind(this)}>
                        <span className="ml ml-delete"></span>
                      </a>
                    </div>
                  </div>
                </div></div>
              </div>
            </PopoverContent>
          </Popover>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>

    )
  }
};

