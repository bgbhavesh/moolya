import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import  MlAssignTaxInformation from './MlAssignTaxInformation'
import {findTaxTypeDetailsActionHandler} from '../actions/MlFindTaxTypeDetails'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
export default class MlTaxTable extends Component {
  constructor(props){
    super(props);
    this.state={
      taxTypeInfo:[{taxName:'',percentage:'',states:'',id:'',about:''}]
    }
    this.onGetTaxDetails=this.onGetTaxDetails.bind(this)
    return this;
  }
  componentWillMount() {
    const resp=this.findTaxTypDetails();
    return resp;
  }
  onGetTaxDetails(taxDetails){
    console.log(taxDetails)
    let states=[];
    for(let i=0;i<taxDetails.length;i++){
      if(taxDetails[i].isActive){
        states.push(taxDetails[i].name)
      }

    }
    let taxTypeInfoDetails=this.state.taxTypeInfo
    taxTypeInfoDetails[0].states=states
    this.setState({taxTypeInfo:taxTypeInfoDetails})
  }
  async findTaxTypDetails() {
        let taxDetails = await findTaxTypeDetailsActionHandler();
        let taxInfo = []
        for (let i = 0; i < taxDetails.length; i++) {
          let json = {
            taxName: taxDetails[i].taxName,
            percentage: '',
            states: '',
            id:taxDetails[i]._id,
            about:taxDetails[i].aboutTax
          }
          taxInfo.push(json)
        }
    this.setState({'taxTypeInfo':taxInfo})
  }

  isExpandableRow(row) {
    if (row.id!=undefined) return true;
    else return false;
  }


  expandComponent(row) {
    return (
     <MlAssignTaxInformation id={ row.id }  onGetTaxDetails={this.onGetTaxDetails} about={row.about}/>
    );
  }
  render() {
    const options = {
     expandRowBgColor: 'rgb(242, 255, 163)'
    };
    const selectRow = {
      mode: 'checkbox',
     bgColor: '#feeebf',
      clickToSelect: true,  // click to select, default is false
      clickToExpand: true  // click to expand row, default is false
    }
    return (
      <BootstrapTable  data={ this.state.taxTypeInfo }
                       options={ options }
                       expandableRow={ this.isExpandableRow }
                       expandComponent={ this.expandComponent.bind(this) }
                       selectRow={ selectRow }
      >
        <TableHeaderColumn dataField="id" isKey={true} dataSort={true} width='62px' dataAlign='center'>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="taxName">Tax Name</TableHeaderColumn>
        <TableHeaderColumn dataField="percentage">Percentage</TableHeaderColumn>
        <TableHeaderColumn dataField="states">Applicable States</TableHeaderColumn>
      </BootstrapTable>

    )
  }
};

