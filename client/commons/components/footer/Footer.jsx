import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
export default class MoolyaFooter extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount()
  {

  }

  render(){
    return(

      <div className="admin_main_wrap">
        <div className="admin_padding_wrap no_padding ">
        <span className="actions_switch"></span>
        <div className="bottom_actions_block">
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
          <div className="hex_btn"><a href="/admin/createcluster" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
          </div>
        </div>
      </div>


    )
  }

}

