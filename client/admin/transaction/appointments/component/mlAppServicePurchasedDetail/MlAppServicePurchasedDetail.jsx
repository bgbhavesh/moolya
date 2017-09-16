/**
 * Created by pankaj on 13/9/17.
 */

import React from 'react';
import AppointmentSes from './appointmentSession';
import {fetchAdminServiceAppointment} from "../../action/fetchAdminServiceAppointment";

export default class MlAppServicePurchasedDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orderId : props.orderId,
      data: {
        client: {},
        owner: {},
        sessionInfo:[]
      }
    };
  }

  componentWillMount(){
    this.fetchAdminServiceAppointment();
  }

  async fetchAdminServiceAppointment() {
    let orderId = this.state.orderId;
    const that = this;
    if(orderId){
      let response = await fetchAdminServiceAppointment(orderId);
      console.log(response);
      if(response && response.success ) {
        let data = JSON.parse(response.result);
        data = data[0] ? data[0] : {};
        data.client = data.client ? data.client : {};
        data.owner = data.owner ? data.owner : {};
        data.sessionInfo = data.sessionInfo ? data.sessionInfo : [];
        that.setState({
          data: data
        });
      }
    }
  }

  render() {

    const {data} = this.state;
    console.log(data);

    // console.log("This Props", this.props);
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href="#1a" data-toggle="tab">Details</a>
          </li>
          <li>
            <a href="#2a" data-toggle="tab">Activity Log</a>
          </li>
          <li>
            <a href="#3a" data-toggle="tab">Sessions</a>
          </li>
          <li>
            <a href="#4a" data-toggle="tab">Service Details</a>
          </li>
          <li>
            <a href="#5a" data-toggle="tab">Release Pay</a>
          </li>
          <li>
            <a href="#6a" data-toggle="tab">Payment Details</a>
          </li>
          <li>
            <a href="#7a" data-toggle="tab">Device Details</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id="1a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" defaultValue="moo1234" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Name" defaultValue="Varun K" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" defaultValue="varun.k@gmail.com" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Phone no" defaultValue="9848565852" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">

                <div className="form-group">
                  <input type="text" placeholder="Cluster" defaultValue="India" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" defaultValue="Hyderabad" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" defaultValue="Moolya" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" defaultValue="Funder" className="form-control float-label" id=""/>
                </div>
                <a href="#" className="fileUpload mlUpload_btn">Cancel</a> <a href="#" className="fileUpload mlUpload_btn">Sign Off</a>
              </div>

            </div>
          </div>
          {/*second tab*/}
          <div className="tab-pane" id="2a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Appointment Id" defaultValue="moo123456" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Appointment Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction ID" defaultValue="mootr234567" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Appointment With" defaultValue="Manohar Kumar" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="User Id" defaultValue="mootr234567" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" defaultValue="Service Provider" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">

                <div className="form-group">
                  <input type="text" placeholder="subChater" defaultValue="moolya" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" defaultValue="Hyderabad" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" defaultValue="India" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Contact Number" defaultValue="9848283828" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email Id" defaultValue="manohar@gmail.com" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Gender" defaultValue="Male" className="form-control float-label" id=""/>
                </div>
                {/*<a href="#" className="fileUpload mlUpload_btn">Cancel</a> <a href="#" className="fileUpload mlUpload_btn">Sign Off</a>*/}
              </div>

            </div>
          </div>
          {/*third tab*/}
          <div className="tab-pane" id="3a">
            <AppointmentSes/>
          </div>

          {/*fourth tab*/}
          <div className="tab-pane" id="4a">
            <p>Take from this page "appFunderMyAppointment"</p>
          </div>
          {/*fivth tab*/}
          <div className="tab-pane" id="5a">
            <h3>Total Amount: 25,000 INR</h3>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-3 nopadding-left"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span>  <select className="form-control"><option>Select Community</option></select></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Search Person Name"/></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Enter Units"/></div></div></div>
                <div className="col-md-3 nopadding-right"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Status"/></div></div></div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-3 nopadding-left"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span>  <select className="form-control"><option>Service Provider</option></select></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Mohan Kumar"/></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="5000 Units"/></div></div></div>
                <div className="col-md-3 nopadding-right"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Status"/></div></div></div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-3 nopadding-left"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span>  <select className="form-control"><option>Investor</option></select></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Ramesh Jain"/></div></div></div>
                <div className="col-md-3"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="5600 Units"/></div></div></div>
                <div className="col-md-3 nopadding-right"><div className="form-group"><div className="jvFloat"><span className="placeHolder">Date</span><input type="text" className="form-control float-label" placeholder="Status"/></div></div></div>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="6a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Transaction Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction ID" defaultValue="moo1234" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total amount paid" defaultValue="Rs 25,000" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Payment mode" defaultValue="Debit Card" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card number" defaultValue="1234 2545 2565 4585" className="form-control float-label" id=""/>
                </div>

              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Card Holder name" defaultValue="Kiran Kumar" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Promotion Code" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Code Amount" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Code" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="7a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device name" defaultValue="Ipad air 2" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device ID" defaultValue="L8125#585" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device IP" defaultValue="10.20.1.6" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="IP Location" defaultValue="Hyderabad" className="form-control float-label" id=""/>
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
  bgColor: '#fff',
  clickToSelect: true, // click to select, default is false
  clickToExpand: true // click to expand row, default is false
};

// export default class MlAppServicePurchasedDetail extends React.Component {
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
//           <h2>Appointments</h2>
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
//                 <TableHeaderColumn dataField="info">ID</TableHeaderColumn>
//                 <TableHeaderColumn dataField="dateTime">Created By</TableHeaderColumn>
//                 <TableHeaderColumn dataField="userId">Email ID</TableHeaderColumn>
//                 <TableHeaderColumn dataField="name">Source</TableHeaderColumn>
//                 <TableHeaderColumn dataField="tarId">Transaction Type</TableHeaderColumn>
//                 <TableHeaderColumn dataField="cluster">Cluster</TableHeaderColumn>
//                 <TableHeaderColumn dataField="chapter">Chapter</TableHeaderColumn>
//                 <TableHeaderColumn dataField="subChater">Sub Chapter</TableHeaderColumn>
//                 <TableHeaderColumn dataField="community">Community</TableHeaderColumn>
//                 <TableHeaderColumn dataField="payment">Date & Time</TableHeaderColumn>
//                 <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
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
