//
// import React, {Component} from 'react';
// import MlShareCalendarPresentation from './MlConnectionRequestPresentation';
// import {fetchConnectionRequestHandler,acceptConnectionActionHandler,rejectConnectionActionHandler} from '../../../appActions/actions/connectActionHandler';
//
// export default class MlShareCalendar extends Component{
//   constructor(props){
//     super(props);
//     this.fetchConnectionDetails.bind(this);
//     this.state={'connectionId':null,'data':{}};
//     this.acceptConnectionHandler = this.acceptConnectionHandler.bind(this);
//     this.rejectConnectionHandler = this.rejectConnectionHandler.bind(this);
//     return this;
//   }
//
//   async fetchConnectionDetails(){
//
//     let transactionId=this.props.data&&this.props.data._id?this.props.data._id:null;
//     if( transactionId && this.props.data.transactionType == "share" ){
//       let connection  = await fetchConnectionRequestHandler(transactionId);
//       this.setState({data:connection||{},connectionId:(connection||{})._id});
//     }
//   };
//
//   async componentWillMount(){
//     await this.fetchConnectionDetails();
//   }
//
//   async acceptConnectionHandler(){
//     var response=await acceptConnectionActionHandler({'connectionId':this.state.connectionId});
//     if(response){
//       toastr.success("connection accepted");
//       await this.fetchConnectionDetails();
//     }else{
//       toastr.error("Failed to accept the connect request");
//     }
//   }
//
//   async rejectConnectionHandler(){
//     var response=await rejectConnectionActionHandler({'connectionId':this.state.connectionId});
//     if(response){
//       toastr.success("connection rejected");
//       await this.fetchConnectionDetails();
//     }else{
//       toastr.error("Failed to reject the connection");
//     }
//   }
//
//   render(){
//
//     const {data} = this.props;
//     // var data=this.state.data;
//     console.log('State:', data);
//     console.log('Props:', data);
//
//     let userDetails = {
//       userId: data && data.fromProfileId ? data.fromProfileId : '',
//       transactionId: data && data.transactionId ? data.transactionId : '',
//       dateTime: data && data.createdAt ? data.createdAt : '',
//       name: data && data.createdby ? data.createdby : '',
//       email: data && data.email ? data.email : '',
//       phoneNo: data && data.mobileNumber ? data.mobileNumber : '',
//       cluster: data && data.chapter ? data.chapter : '',
//       chapter: data && data.cluster ? data.cluster : '',
//       subChapter: data && data.subChapter ? data.subChapter : '',
//       community: data && data.community ? data.community : ''
//     };
//
//     let activityLog = {
//       dateTime: data && data.createdAt ? data.createdAt : '',
//       type: data && data.transactionType ? (data.transactionType == "interaction" ? data.activity : data.transactionType ): '',
//       status: data && data.status ? data.status : ''
//     };
//
//     return(
//       <div>
//         <MlConnectionRequestPresentation
//           userDetails={userDetails}
//           activityLog={activityLog}
//           canAccept={this.state.data.canAccept}
//           canReject={this.state.data.canReject}
//           acceptConnectionHandler={this.acceptConnectionHandler}
//           rejectConnectionHandler={this.rejectConnectionHandler}
//         />
//       </div>
//     )
//   }
// }
