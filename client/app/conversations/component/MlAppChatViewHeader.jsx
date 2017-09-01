import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {getJoinedRooms} from '../actions/chatviewActions'
var FontAwesome = require('react-fontawesome');


export default class MlAppChatViewHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      selectedIndex:0
    }
    this.getMyRooms.bind(this)
    this.getSelectedIndex.bind(this)
    this.getSelctedItemData.bind(this)
    this.getSelectedRoom.bind(this)
  }

  componentDidMount() {
    var swiper = new Swiper('.chat_categories, .chat_list', {
      slidesPerView: "auto",
      spaceBetween: 5,
      mousewheelForceToAxis: true
    });
  }

  getMyRooms() {
    var self = this
    getJoinedRooms(function (response){
      self.setState({rooms:response.result})
    })
  }

  getSelectedIndex(id, name){
    this.setState({selectedIndex:id})
    this.setState({rooms:[]})
    this.getSelctedItemData(name)
  }

  getSelctedItemData(itemName){
    switch (itemName){
      case 'Contacts':{
        this.getMyRooms();
      }
      break;
    }
  }

  getSelectedRoom(roomId, roomName){
    this.props.getSelectedRoom(roomId, roomName)
  }


  render() {
    var that = this
    var selectedIndex = this.state.selectedIndex
    var rooms = this.state.rooms
    const menuItems = [
      {className:"ml my-ml-chat", itemName:"Recent Chats"},
      {className:"ml flaticon-ml-agenda", itemName:"Contacts"},
      {className:"ml ml-moolya-symbol", itemName:"Groups"}
    ]
    return (
      <div className="col-lg-12">
        <div className="users_list well well-sm swiper-container col-md-4 nopadding chat_categories">
          <ul className="swiper-wrapper">
            {menuItems.map(function (item, id) {
              var className = "icon_lg"+item.className
              return(
                <li className={selectedIndex == id? 'active_user swiper-slide': 'swiper-slide'} key={id} onClick={that.getSelectedIndex.bind(that, id, item.itemName)}>
                  <a href="">
                    <span className="icon_bg"> <span className={className}></span></span><br />
                    <div className="tooltiprefer">
                      <span>{item.itemName}</span>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="users_list well well-sm swiper-container col-md-8 nopadding chat_list">
          <ul className="swiper-wrapper">
            {rooms.map(function (room, id) {
              return(
                <li className="swiper-slide" id={room.roomId} key={id} onClick={that.getSelectedRoom.bind(that, room.roomId, room.roomName)}>
                  <a href="">
                    <img src="/images/ideator_01.png"/><br />
                    <div className="tooltiprefer">
                      <span>{room.roomName}</span>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
