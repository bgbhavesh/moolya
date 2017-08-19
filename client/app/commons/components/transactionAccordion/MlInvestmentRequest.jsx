/**
 * Created by Mohammed.Mohasin on 21/6/17.
 */
import React, {Component} from 'react';
import MlInvestmentRequestPresentation from './MlInvestmentRequestPresentation';
import {updateStageForOnBoardActionHandler} from '../../../../app/investment/actions/updateStage';


export default class MlInvestmentRequest extends Component{
  constructor(props){
    super(props);
    this.fetchConnectionDetails.bind(this);
    this.state={'connectionId':null,'data':{}, showAcceptAndReject: true};
    // this.acceptConnectionHandler = this.acceptConnectionHandler.bind(this);
    // this.rejectConnectionHandler = this.rejectConnectionHandler.bind(this);
    return this;
  }

  async fetchConnectionDetails(){

    let transactionId=this.props.data&&this.props.data._id?this.props.data._id:null;
    if( transactionId && this.props.data.transactionType == "connectionRequest" ){
      let connection  = await fetchConnectionRequestHandler(transactionId);
      this.setState({data:connection||{},connectionId:(connection||{})._id});
    }
  };

  async componentWillMount(){
    await this.fetchConnectionDetails();
  }

  async OnBoardHandler(transactionLogId, transactionType, status, that){
    var response=await updateStageForOnBoardActionHandler(transactionLogId, transactionType, status);
    if(response){
      toastr.success(`onBoard request ${status}ed successfully`);
      this.setState({showAcceptAndReject : false})
      await this.fetchConnectionDetails();
    }else{
      toastr.error("Failed to accept the onBoard request");
    }
  }

  render(){

    const {data} = this.props;
    // var data=this.state.data;
    console.log('State:', data);
    console.log('Props:', data);

    let userDetails = {
      userId: data && data.fromProfileId ? data.fromProfileId : '',
      transactionId: data && data.transactionId ? data.transactionId : '',
      dateTime: data && data.createdAt ? data.createdAt : '',
      name: data && data.createdby ? data.createdby : '',
      email: data && data.email ? data.email : '',
      phoneNo: data && data.mobileNumber ? data.mobileNumber : '',
      cluster: data && data.chapter ? data.chapter : '',
      chapter: data && data.cluster ? data.cluster : '',
      subChapter: data && data.subChapter ? data.subChapter : '',
      community: data && data.community ? data.community : ''
    };

    let activityLog = {
      dateTime: data && data.createdAt ? data.createdAt : '',
      type: data && data.transactionType ? (data.transactionType == "interaction" ? data.activity : data.transactionType ): '',
      status: data && data.status ? data.status : ''
    };

    return(
      <div>
        <MlInvestmentRequestPresentation
          userDetails={userDetails}
          activityLog={activityLog}
          data={data}
          OnBoardHandler={this.OnBoardHandler}
          showAcceptAndReject={this.state.showAcceptAndReject}
          rejectConnectionHandler={this.rejectConnectionHandler}/>
      </div>
    )
  }
}
