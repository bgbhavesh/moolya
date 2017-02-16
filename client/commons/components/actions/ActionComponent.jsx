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
      },
      {
        imagefield:'/images/act_add_icon.png',
        actionName:'add',
      },
      {
        imagefield:'/images/act_logout_icon.png',
        actionName:'logout',
      },
      {
        imagefield:'/images/act_progress_icon.png',
        actionName:'progress',
      },
      {
        imagefield:'/images/act_select_icon.png',
        actionName:'select',
      }
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
              <img src={action['imagefield']} />
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


