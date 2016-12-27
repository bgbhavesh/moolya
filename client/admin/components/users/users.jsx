import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import FixedDataTable from 'fixed-data-table';

const {Table, Column, Cell} = FixedDataTable;


const TextCell =({rowIndex, data, col, ...props})=> {

  return (<Cell {...props}>
    {data[rowIndex][col]}
  </Cell>)
}




AdminUsersContent = React.createClass({
  getInitialState(){

    this.state = {users:[]};
    return this;
  },
  componentWillMount(){
    let self = this;
    Meteor.call('reterieveAllUsers', function (err, resp) {
      let usersobj = resp;
      self.setState({users:usersobj})
    })
  },
  render() {
    var {users} = this.state;
    return (
      <div style={{paddingTop:'70px' }}>
      <Table
        rowHeight={50}
        headerHeight={50}
        /*rowsCount={dataList.getSize()}*/
        rowsCount={users?users.length:0}
        width={1000}
        height={500}
        {...this.props}>

        <Column
          header={<Cell>User Name</Cell>}
          cell={<TextCell data={users} col="userName" />}
          fixed={true}
          width={200}
        />

        <Column
          header={<Cell>Mobile Number</Cell>}
          cell={<TextCell data={users} col="mobileNumber" />}
          fixed={true}
          width={200}
        />

        <Column
          header={<Cell>Email</Cell>}
          cell={<TextCell data={users} col="eMail" />}
          fixed={true}
          width={200}
        />

        <Column
          header={<Cell>City</Cell>}
          cell={<TextCell data={users} col="city" />}
          fixed={true}
          width={200}
        />

        <Column
          header={<Cell>Reg Type</Cell>}
          cell={<TextCell data={users} col="regType" />}
          fixed={true}
          width={200}
        />

      </Table>
      </div>
    );
  }

})

