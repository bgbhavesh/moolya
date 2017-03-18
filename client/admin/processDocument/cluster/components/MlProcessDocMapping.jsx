import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {findDocumentMappingActionHandler} from '../actions/findDocumentMappingAction'
import ActiveProcessFormatter from "../actions/ActiveProcessDocFormatter"
export default class MlProcessDocMapping extends Component {
    constructor(props){
      super(props);
      this.state={
        documentInfo:[]
      }
      return this;
    }
  componentDidMount() {

  }
  componentWillMount(){
  //  console.log(this.props.config);
    const resp=this.findDocument();
    return resp;
  }
  async findDocument() {
    let kycId = this.props.config
    const response = await findDocumentMappingActionHandler(kycId);
    console.log(response);
    if(response){
      let documentDetails=[]
      for(let i=0;i<response.length;i++){
        let json={

          Name:response[i].documentName,
          Formate:response[i].allowableFormat,
        MaxSize:response[i].allowableMaxSize,
          Action:response[i]._id,
        }
        documentDetails.push(json);
      }
      this.setState({"documentInfo":documentDetails})
    }
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
    function SwitchBtn(cell, row){
      return '<div class="form-group switch_wrap"><label class="switch"><input type="checkbox"  />cell<div class="slider"></div></label></div> ';
    }

    return (

      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <BootstrapTable  data={ this.state.documentInfo }
                           options={ options }
                           selectRow={ selectRow }
                           pagination
          >
            {/*<TableHeaderColumn dataField="docId" isKey={true} dataSort={true} width='62px' dataAlign='center'>Id</TableHeaderColumn>*/}
            <TableHeaderColumn  isKey={true} dataField="Name">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="Formate">Formate</TableHeaderColumn>
            <TableHeaderColumn dataField="MaxSize">MaxSize</TableHeaderColumn>
            <TableHeaderColumn dataField="Action" dataFormat={SwitchBtn}>Action</TableHeaderColumn>
          </BootstrapTable>



        </div>


      </div>
    )
  }
}
