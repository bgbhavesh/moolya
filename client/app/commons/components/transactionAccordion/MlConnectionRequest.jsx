/**
 * Created by Mohammed.Mohasin on 21/6/17.
 */
import React, {Component} from 'react';
import {fetchConnectionRequestHandler,acceptConnectionActionHandler,rejectConnectionActionHandler} from '../../../appActions/actions/connectActionHandler';

export default class MlConnectionRequest extends Component{
  constructor(props){
    super(props);
    this.fetchConnectionDetails.bind(this);
    this.state={'connectionId':null,'data':{}};

    return this;
  }

  async fetchConnectionDetails(){
    var transactionId=this.props.data&&this.props.data.transactionId?this.props.data.transactionId:null;
    var connection  = await fetchConnectionRequestHandler(transactionId);
    this.setState({data:connection||{},connectionId:(connection||{})._id});
  };

  async componentWillMount(){
    await this.fetchConnectionDetails();
  }

  async acceptConnectionHandler(){
    var response=await acceptConnectionActionHandler({'connectionId':this.state.connectionId});
    if(response){
      toastr.success("connection accepted");
      await this.fetchConnectionDetails();
    }else{
      toastr.error("Failed to accept the connect request");
    }
  }

  async rejectConnectionHandler(){
    var response=await rejectConnectionActionHandler({'connectionId':this.state.connectionId});
    if(response){
      toastr.success("connection rejected");
      await this.fetchConnectionDetails();
    }else{
      toastr.error("Failed to reject the connection");
    }
  }

  render(){
     var data=this.state.data;
    return(
      <div>

        <div className="ml_btn">
          {data.canAccept&&<a href="#" className="save_btn" onClick={this.acceptConnectionHandler.bind(this)}>Accept</a>}
          {data.canReject&&<a href="#" className="cancel_btn" onClick={this.rejectConnectionHandler.bind(this)}>Reject</a>}
        </div>

      </div>
    )
  }
}
