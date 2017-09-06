import React from 'react';
import MlAppChatViewHeader from './MlAppChatViewHeader'
import {getUserDetails, listenMessage, emitMessage, getMessageHistory} from '../actions/chatviewActions'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class MlAppChatView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      roomId:"",
      roomName:"",
      msgLength:0,
      user:{}
    }
    this.sendMessage.bind(this)
    this.getuserDetails.bind(this)
    this.listenmessage.bind(this)
    this.msgAckCallback.bind(this)
    this.getmessageHistory.bind(this)
  }

  componentDidMount(){
    var swiper = new Swiper('.chat_categories, .chat_list', {
      slidesPerView: "auto",
      spaceBetween: 5,
      mousewheelForceToAxis:true
    });
    this.props.observer.subscribe("message",(data)=>{
      console.log('hello event data: ' + data);
    });

    this.getuserDetails();
    this.listenmessage();
  }

  componentWillReceiveProps(newProps, nextProps){
      console.log(newProps)
  }

  listenmessage(){
    var self = this
    listenMessage(function (response) {
      var messages = self.state.messages;
      messages.push(response)
      self.setState({messages:messages})
    })
  }

  getmessageHistory(roomId){
    var self = this
    var rid = roomId;
    if(!rid)
      rid = this.state.roomId
    getMessageHistory(rid, this.state.msgLength, function (response) {
        if(response.success){
          var messages = self.state.messages
          messages = messages.concat(response.result)
          var msgLength = self.state.msgLength;
          msgLength = msgLength + response.result.length;
          self.setState({messages:messages, msgLength:msgLength})
        }
    })
  }

  getuserDetails(){
    var self = this
    getUserDetails(function (response) {
      self.setState({user:response})
    })
  }

  getSelectedRoom(roomId, roomName){
    this.setState({roomName:roomName, roomId:roomId, messages:[]})
    this.getmessageHistory(roomId)
  }

  msgAckCallback(response){

  }

  sendMessage(){
    var msg = {
      msg:this.refs.message.value,
      user:this.state.user
    }
    var messages = this.state.messages;
    messages.push(msg)
    this.setState({messages:messages})

    var message = {
      rid:this.state.roomId,
      msg:this.refs.message.value
    }
    emitMessage(message, this.msgAckCallback.bind(this))
    this.refs.message.value = '';
  }

  render(){
    var messages = this.state.messages
    var that = this
    return(
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
            <MlAppChatViewHeader getSelectedRoom={this.getSelectedRoom.bind(this)}/>
          <br className="brclear"/>
          {this.state.roomName?<div className="col-md-12">
            <div className="chat_body nopadding">
              <h3><span className="ml my-ml-chat"></span> &nbsp; {this.state.roomName}</h3>
              <div className="bg-white ">
                <div className="chat-message">
                    <ul className="chat">
                      <InfiniteScroll
                        next={that.getmessageHistory.bind(that)}
                        hasMore={true}
                        height={350}
                        loader={<h4>Loading...</h4>}>
                      {messages.map(function (item, id) {
                        return(
                          <li className={that.state.user.username == item.user.username?"left clearfix":"right clearfix"}  key={id}>
                            <span className={that.state.user.username == item.user.username?"chat-img pull-left":"chat-img pull-right"}>
                              <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar"/>
                            </span>
                            <div className="chat-body clearfix">
                              <div className="header">
                                <strong className="primary-font">{item.user.username}</strong>
                                <small className="pull-right text-muted"><i className="fa fa-clock-o"></i> 12 mins ago</small>
                              </div>
                              <p>
                                {item.msg}
                              </p>
                            </div>
                          </li>
                        )
                      })}
                      </InfiniteScroll>
                    </ul>
                </div>
                <div className="chat-box bg-white">
                  <div className="input-group">
                    <input className="form-control border no-shadow no-rounded" placeholder="Type your message here" ref="message"/>
                    <span className="input-group-btn">
                  <button className="btn btn-success no-rounded" type="button" onClick={this.sendMessage.bind(this)}><span className="ml my-ml-arrow"></span></button>
                </span>
                  </div>
                </div>
              </div>
            </div>
          </div>:<div></div>}
        </div>
      </div>
    )
  }
}
