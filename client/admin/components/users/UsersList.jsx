import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import UserDetails from './UserDetails';
import ActiveFormatter from './ActiveFormatter';

export default class AdminUsersContent extends React.Component {
  constructor(props) {
    super(props);
  }

  expandComponent(row) {
    return (
      <UserDetails data={row} />
    );
  }

  isExpandableRow(row) {
    return true;
  }

  activeFormatter(cell, row) {
  return (
    <ActiveFormatter data={ row } />
  );
}

  render() {
    return (
      <div style={{paddingTop:'70px' }}>
        <div className='col-md-offset-1 col-md-8'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Users</div>
            <div className='panel-body'>
      <BootstrapTable data={ this.props.data }
                      remote={ true }
                      pagination={ true }
                      expandableRow={ this.isExpandableRow.bind(this) }
                      expandComponent={ this.expandComponent }
                      fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
                      options={ { sizePerPage: this.props.sizePerPage,
                                  sizePerPageList: [ 5, 10],
                                  page: this.props.currentPage,
                                  onPageChange: this.props.onPageChange,
                                  onSizePerPageList: this.props.onSizePerPageList } }>
        <TableHeaderColumn dataField='userName' isKey={ true } >userName</TableHeaderColumn>
        <TableHeaderColumn dataField='mobileNumber'>Mobile Number</TableHeaderColumn>
        <TableHeaderColumn dataField='eMail'>Email</TableHeaderColumn>
        <TableHeaderColumn dataField='city'>City</TableHeaderColumn>
        <TableHeaderColumn dataField='regType'>Regz Type</TableHeaderColumn>
        <TableHeaderColumn dataField='isActive' dataFormat={ this.activeFormatter.bind(this) }>Active</TableHeaderColumn>
      </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
