import React from 'react';
import FixedDataTable from 'fixed-data-table';

const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data[rowIndex][col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

export default class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };


  }
  componentDidMount(){
    let self = this;
    Meteor.call('reterieveAllUsers', function (err, resp) {
      let usersobj = resp;
      self.setState({users:usersobj})
    })

    // Meteor.call('sendEmail', function (err, resp) {
    //
    // })

  }

  render() {
    var {users} = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        /*rowsCount={dataList.getSize()}*/
        rowsCount={users.length}
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
    );
  }
}
