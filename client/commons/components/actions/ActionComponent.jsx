import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery';
import _ from 'lodash';
export default class MlActionComponent extends Component {
  constructor(props){
    super(props);
  return this;
    this.onActionSwitch.bind(this);
  }
  componentDidMount()
  {
   /* $('.actions_switch').click(function(){
      $('.bottom_actions_block').toggleClass('show_block');
      $(this).toggleClass('show_act');
    });*/
  }

  onActionSwitch(e){

      $('.bottom_actions_block').toggleClass('show_block');
      $(e.currentTarget).toggleClass('show_act');

  }


  render(){
    let config=[
      {
        imagefield:'/images/edit_icon.png',
        actionName:'edit',
        iconClass:'ml ml-edit'
      },
      {
        imagefield:'/images/act_add_icon.png',
        actionName:'add',
        iconClass:'ml ml-plus'
      },
      {
        imagefield:'/images/act_logout_icon.png',
        actionName:'logout',
        iconClass:'ml ml-active'
      },
      {
        imagefield:'/images/act_progress_icon.png',
        actionName:'progress',
        iconClass:'ml'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'select',
        iconClass:'ml ml-select-all'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'save',
        iconClass:'ml ml-save'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'cancel',
        iconClass:'ml ml-delete'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'assign',
        iconClass:'ml ml-assign'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'download',
        iconClass:'ml ml-download'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'approveUser',
        iconClass:'ml ml-approve-User'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'rejectUser',
        iconClass:'ml ml-inactive-user'
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'comment',
        iconClass:'ml ml-annotate'
      },
    ]


    let actionName=this.props.actionName;
    let imagePath=this.props.imagePath;

      let actionView = this.props.ActionOptions.map(function(option) {
        let activeClass='' ,activesubclass=''
        let action=_.find(config, { 'actionName': option.actionName });
        for(let i=0;i<config.length;i++) {

          if(config[i].actionName==option.actionName&&option.showAction==true){
                console.log("sucess")
              activeClass="hex_btn"
           activesubclass ="hex_btn hex_btn_in"
          }
          else if(config[i].actionName==option.actionName&&option.showAction!=true){
            activeClass="hex_btn hide"
            activesubclass ="hex_btn hex_btn_in"
          }
        }
        return (
          <div className={`${activeClass} `} key={option.actionName}  >
            <div onClick={option.handler&&option.handler.bind(this,option)} key={option.actionName}   className={`${activesubclass} `}>
              {/*<img src={action['imagefield']} />*/}
              <span className={action['iconClass']}></span>
            </div></div>
        )
       })
    return(

      <div>
        <span className="actions_switch" onClick={this.onActionSwitch.bind(this)}></span>
        <div className="bottom_actions_block ">
          {actionView}
        </div>
      </div>

    )
  }

}

MlActionComponent.PropTypes={
  routerPath:React.PropTypes.string,
  imagePath:React.PropTypes.string
}

{/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-plus"></span> </a></div>
<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-edit"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-delete"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-select-all"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-import"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-export"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-save"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-active"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-share"></span> </a></div>
  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <span className="ml ml-annotate"></span> </a></div>*/}


