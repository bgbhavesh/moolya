import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
var options = [
  { value: 'role', label: 'Role' },
  { value: 'role', label: 'Role' }
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlTransactionDetailsComponent extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#CustomerDetails${this.props.data._id}`} data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a  href={`#ActivityDetails${this.props.data._id}`} data-toggle="tab">Activity Details</a>
          </li>
          <li >
            <a  href={`#DeviceDetails${this.props.data._id}`} data-toggle="tab">Device Details</a>
          </li>
          <li >
            <a  href="#4a" data-toggle="tab">History</a>
          </li>
          <li >
            <a  href={`#notes${this.props.data._id}`} data-toggle="tab">Notes</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`CustomerDetails${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id"  defaultValue = {this.props.data.userId} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction Id" defaultValue = {this.props.data.transactionTypeId}  disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time"  defaultValue = {this.props.data.createdAt} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Name"  defaultValue = {this.props.data.userName} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID"  defaultValue = {this.props.data.emailId}  disabled={true} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone no"  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster"  defaultValue = {this.props.data.clusterName} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter"  defaultValue = {this.props.data.chapterName} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter"  defaultValue = {this.props.data.subChapterName} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community"  defaultValue = {this.props.data.communityName} disabled={true} className="form-control float-label" id=""/>
                </div>
              </div>

            </div>
          </div>


          <div className="tab-pane active" id={`ActivityDetails${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Activity Name"  defaultValue = {this.props.data.activity} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Activity Time"  defaultValue = {this.props.data.userId} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Current Status" disabled={true} className="form-control float-label" id=""/>
                </div>

              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Duration" disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Triggered Location" disabled={true} className="form-control float-label" id=""/>
                </div>
              </div>

            </div>
          </div>





          <div className="tab-pane active" id={`DeviceDetails${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device Name" disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device ID" disabled={true} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Ip Address " defaultValue = {this.props.data.userAgent.ipAddress} disabled={true} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Ip Location"  disabled={true} className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane" id={`notes${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <textarea placeholder="Notes" defaultValue={this.props.data.transactionDetails} disabled={true}  className="form-control float-label" id=""></textarea>
                </div>
              </div>
            </div>
          </div>




          {/*<div className="tab-pane active" id="4a">*/}


          {/*</div>*/}






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

//  class EditTaxation extends React.Component {
//   componentDidMount() {
//     $('.switch input').change(function() {
//       if ($(this).is(':checked')) {
//         $(this).parent('.switch').addClass('on');
//       } else {
//         $(this).parent('.switch').removeClass('on');
//       }
//     });
//   }
//   constructor(props) {
//     super(props);
//   }
//
//   isExpandableRow(row) {
//     if (row.id <= 1) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   expandComponent(row) {
//     return (
//       <InnerTable data={ row.expand } />
//     );
//   }
//   render() {
//     const options = {
//       expandRowBgColor: 'rgb(242, 255, 163)'
//     };
//     return (
//       <div className="admin_main_wrap">
//         <div className="admin_padding_wrap">
//           <h2>Edit Taxation</h2>
//           <div className="main_wrap_scroll">
//             <ScrollArea
//               speed={0.8}
//               className="main_wrap_scroll"
//               smoothScrolling={true}
//               default={true}
//             >
//
//
//               <br className="brclear"/>
//               <BootstrapTable  data={ taxes }
//                                options={ options }
//                                expandableRow={ this.isExpandableRow }
//                                expandComponent={ this.expandComponent }
//                                selectRow={ selectRow }
//                                pagination
//                                search
//               >
//                 <TableHeaderColumn dataField="id" isKey={true} dataSort={true} width='62px' dataAlign='center'>S.No</TableHeaderColumn>
//                 <TableHeaderColumn dataField="dateTime">Date & Time</TableHeaderColumn>
//                 <TableHeaderColumn dataField="userId">User ID</TableHeaderColumn>
//                 <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
//                 <TableHeaderColumn dataField="tarId">Tra ID</TableHeaderColumn>
//                 <TableHeaderColumn dataField="cluster">Cluster</TableHeaderColumn>
//                 <TableHeaderColumn dataField="chapter">Chapter</TableHeaderColumn>
//                 <TableHeaderColumn dataField="subChater">Sub Chapter</TableHeaderColumn>
//                 <TableHeaderColumn dataField="community">Community</TableHeaderColumn>
//                 <TableHeaderColumn dataField="payment">Payment</TableHeaderColumn>
//                 <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
//                 <TableHeaderColumn dataField="action">Action</TableHeaderColumn>
//               </BootstrapTable>
//
//             </ScrollArea>
//           </div>
//         </div>
//
//
//       </div>
//     )
//   }
// }
// ;
