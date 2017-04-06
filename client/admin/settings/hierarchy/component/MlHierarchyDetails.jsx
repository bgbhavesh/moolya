import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {findDeptAndsubDeptActionHandler} from '../actions/findDeptAndsubDeptAction';
import MlAssignHierarchy from './MlAssignHierarchy';


export default class MlHierarchyDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      loading:true,data:{}
    }
    return this;
  }

  componentDidMount() {
    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  componentWillMount(){
    const resp=this.findDeptAndsubDept();
    return resp;
  }
  async findDeptAndsubDept(){
    let clusterId = this.props.clusterId;
    const response = await findDeptAndsubDeptActionHandler(clusterId);
    this.setState({loading:false,data:response});
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
      <MlAssignHierarchy data={ row.expand } />
    );
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#feeebf',
      clickToSelect: true, // click to select, default is false
      clickToExpand: true // click to expand row, default is false
    };
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Select Department</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <BootstrapTable  data={ this.state.data }
                               options={ options }
                               expandableRow={ this.isExpandableRow }
                               expandComponent={ this.expandComponent }
                               selectRow={ selectRow }
                               pagination
                               search
              >
                <TableHeaderColumn dataField="departmentId" isKey={true} dataSort={true} hidden={true}></TableHeaderColumn>
                <TableHeaderColumn dataField="departmentName">Department</TableHeaderColumn>
                <TableHeaderColumn dataField="subDepartmentName">Sub-Department</TableHeaderColumn>
              </BootstrapTable>

            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
}
;
