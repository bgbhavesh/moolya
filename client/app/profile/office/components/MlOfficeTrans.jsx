/**
 * Created by pankaj on 7/6/17.
 */

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const taxes = [{
  id: 1,
  date: '08-05-2017 & 8:00',
  transtype: 'Registration',
  name:'raju',
  cluster:'India',
  chapter:'Pune',
  subchapter:'moolya',
  community:'provider',
  payment:'paid',
  status:'w/p',
  action:'completed'
},
  {
    id: 2,
    date: '09-05-2017 & 8:00',
    transtype: 'Office Setup',
    name:'raju',
    cluster:'India',
    chapter:'Pune',
    subchapter:'moolya',
    community:'provider',
    payment:'paid',
    status:'w/p',
    action:'completed'
  },

  { id: 3,
    date: '10-05-2017 & 8:00',
    transtype: 'Registration',
    name:'raju',
    cluster:'India',
    chapter:'Pune',
    subchapter:'moolya',
    community:'provider',
    payment:'paid',
    status:'w/p',
    action:'completed'
  },
  {
    id: 4,
    date: '18-05-2017 & 8:00',
    transtype: 'Office Setup',
    name:'raju',
    cluster:'India',
    chapter:'Pune',
    subchapter:'moolya',
    community:'provider',
    payment:'paid',
    status:'w/p',
    action:'completed'
  }];
class InnerTable extends React.Component {
  render() {
    return (
      <div>
        <div className='step-progress' >
          <div id="root" >
            <h1>WIP</h1>
          </div>
        </div>
      </div>

    );
  }
}
const selectRow = {
  mode: 'checkbox',
  bgColor: '#feeebf',
  clickToSelect: true, // click to select, default is false
  clickToExpand: true // click to expand row, default is false
};

export default class MlOfficeTrans extends React.Component{
  componentDidMount()
  {
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}
  }
  constructor(props) {
    super(props);
  }

  isExpandableRow(row) {
    if (row.id <= 1) {
      return true;
    } else {
      return false;
    }
  }

  expandComponent(row) {
    return (
      <InnerTable data={ row.expand } />
    );



  }
  render(){
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
      <div>
        <div className="tab_wrap_scroll">
          <BootstrapTable  data={ taxes }
                           options={ options }
                           expandableRow={ this.isExpandableRow }
                           expandComponent={ this.expandComponent }
                           selectRow={ selectRow }
                           pagination
          >
            <TableHeaderColumn dataField="id" isKey={true} dataSort={true} width='62px' dataAlign='center'>S.No</TableHeaderColumn>
            <TableHeaderColumn dataField="date">Date & Time</TableHeaderColumn>
            <TableHeaderColumn dataField="transtype">Transaction Type</TableHeaderColumn>
            <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="cluster">Cluster</TableHeaderColumn>
            <TableHeaderColumn dataField="chapter">Chapter</TableHeaderColumn>
            <TableHeaderColumn dataField="subchapter">Sub Chapter</TableHeaderColumn>
            <TableHeaderColumn dataField="community">Community</TableHeaderColumn>
            <TableHeaderColumn dataField="payment">Payment</TableHeaderColumn>
            <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
            <TableHeaderColumn dataField="action">Action</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )
  }
};
