import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {findStepTemplatesActionHandler} from '../actions/findTemplatesAction'
import _ from 'underscore'
export default class MlStepDetails extends Component {
    constructor(props){
      super(props);

      this.state={
        templateInfo:[]
      }
     // this.findDocument=this.findDocument.bind(this);
      return this;
    }

  componentDidMount() {

  }
  componentWillMount(){
    const processResp=this.findDocument();
    return processResp;
  }

  async findDocument() {
    let subProcessId = this.props.subProcessId
    const response = await findStepTemplatesActionHandler(subProcessId);
    console.log(response)
    if(response){
      let assignedTemplates = response.assignedTemplates
      let documentDetails=[]
      for(let i=0;i<assignedTemplates.length;i++){
        let json = {
          Id:assignedTemplates[i]._id,
          date: assignedTemplates[i].createdDate,
          templateName: assignedTemplates[i].templateName,
          view: 'Yes'
        }
        documentDetails.push(json);
      }
      this.setState({"templateInfo":documentDetails})
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

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <BootstrapTable  data={ this.state.templateInfo }
                           options={ options }
                           selectRow={ selectRow }
                           pagination>
            <TableHeaderColumn  dataField="Id" hidden={true}>Id</TableHeaderColumn>
            <TableHeaderColumn   dataField="date">Date</TableHeaderColumn>
            <TableHeaderColumn   isKey={true}  dataField="templateName">Template Name</TableHeaderColumn>
            <TableHeaderColumn dataField="view">View</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )
  }
}
