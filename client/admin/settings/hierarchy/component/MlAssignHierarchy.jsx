import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
var options = [
  {
    value: 'select',
    label: 'Select Tax Name'
  },
  {
    value: 'one',
    label: 'One'
  },
  {
    value: 'two',
    label: 'Two'
  }
];
const taxes = [{
  id: 1,
  taxName: 'Sys Admin',
  percentage: 'Active'
}, {
  id: 2,
  taxName: 'Sales Tax',
  percentage: '3%'
},
  {
    id: 3,
    taxName: 'Octroi',
    percentage: '3.5%-5%'
  }, {
    id: 4,
    taxName: 'VAT',
    percentage: '5%'
  }];

class MlAssignHierarchy extends React.Component {
  render() {
    return (
      <div>
        <div className="row table_row_class">
          <div className="col-md-4">test</div>
          <div className="col-md-4">test2</div>
          <div className="col-md-4">test3</div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Final Approval</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                  Chapter
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                  Community
                </a>
              </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
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

export default class EditTaxation extends React.Component {
  componentDidMount() {
    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let clusterId = this.props.clusterId;
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
              <BootstrapTable  data={ taxes }
                               options={ options }
                               expandableRow={ this.isExpandableRow }
                               expandComponent={ this.expandComponent }
                               selectRow={ selectRow }
                               pagination
                               search
              >
                <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>Department</TableHeaderColumn>
                <TableHeaderColumn dataField="taxName">Sub-Department</TableHeaderColumn>
                <TableHeaderColumn dataField="percentage">Status</TableHeaderColumn>
              </BootstrapTable>

            </ScrollArea>
          </div>
        </div>


      </div>
    )
  }
}
;
