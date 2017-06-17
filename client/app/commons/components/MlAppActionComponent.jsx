/**
 * Created by mohammed.mohasin on 11/6/17.
 */
import React from "react";
import {render} from "react-dom";
import _ from "lodash";
import PopOverAction from '../../../commons/components/popover/PopOverAction';

export default class MlAppActionComponent extends React.Component {

  constructor(props) {
    super(props);
    return this;
  }

  render() {
    let config = [
      {
        actionName: 'follow',
        displayName:'Follow',
        iconClass: 'ml flaticon-ml-shapes'
      },
      {
        actionName: 'like',
        displayName:'Like',
        iconClass: 'ml fa fa-thumbs-o-up'
      },
      {
        actionName: 'review',
        displayName:'Review',
        iconClass: 'ml flaticon-ml-note'
      },
      {
        actionName: 'enquire',
        displayName:'Enquire',
        iconClass: 'ml flaticon-ml-support'
      },
      {
        actionName: 'connect',
        displayName:'Connect',
        iconClass: 'ml flaticon-ml-handshake'
      },
      {
        actionName: 'collaborate',
        displayName:'Collaborate',
        iconClass: 'ml flaticon-ml-networking'
      },
      {
        actionName: 'conversation',
        displayName:'Conversation',
        iconClass: 'ml flaticon-ml-chat'
      },
      {
        actionName: 'feedback',
        displayName:'Feedback',
        iconClass: 'ml flaticon-ml-note-1'
      },
      {
        actionName: 'compare',
        displayName:'Compare',
        iconClass: 'ml flaticon-ml-share-files'
      },
      {
        actionName: 'share',
        displayName:'Share',
        iconClass: 'ml flaticon-ml-share-arrow'
      },
      {
        actionName: 'download',
        displayName:'Download',
        iconClass: 'ml flaticon-ml-cloud-computing-1'
      },
      {
        actionName: 'upload',
        displayName:'Upload',
        iconClass: 'ml flaticon-ml-cloud-computing'
      },
      {
        actionName: 'wishlist',
        displayName:'Wishlist',
        iconClass: 'ml flaticon-ml-interface'
      },
      {
        actionName: 'favourite',
        displayName:'Favourite',
        iconClass: 'ml flaticon-ml-shapes'
      },
      {
        actionName: 'edit',
        displayName:'Edit',
        iconClass: 'ml ml-edit'
      },
      {
        actionName: 'save',
        displayName:'Save',
        iconClass: 'ml ml-save'
      },
      {
        actionName: 'golive',
        displayName:'GoLive',
        iconClass: 'ml ml-save'
      },
      {
        actionName: 'likes',
        displayName:'Like',
        iconClass: 'ml fa fa-thumbs-o-up'
      },
      {
        actionName: 'comment',
        displayName:'Comment',
        iconClass: 'ml ml-save'
      }
    ]
    let actionOptions= this.props.actionOptions|| [];

    //todo: resourceType(module) and resourceId + subscription handler
    //disabled:true/false depends on resourceType and resourceId.. control it

    let actionView = actionOptions.map(function (option, id) {
      let activeClass = '';
      let action = _.find(config, {'actionName': option.actionName});
      for (let i = 0; i < config.length; i++) {
        if (config[i].actionName == option.actionName && option.showAction == true) {
          activeClass = ""
        } else if (config[i].actionName == option.actionName && option.showAction != true) {
          activeClass = "hide"
        }
      }

      if (option.hasPopOver) {
        return <PopOverAction handler={(option.handler && option.handler)} {...option} key={option.actionName} activeClass={activeClass} iconClass={action['iconClass']}/>
      }else{
      return (
        <li key={id} className={activeClass}>
          <a href="#" onClick={option.handler && option.handler.bind(this, option,null)}> <span
            className={action['iconClass']}></span>
            <br />{option.actionName}</a>
        </li>
      )
      }
    })
    return (
        <div className="action_buttons">
                <ul>
                  {actionView}
                </ul>
        </div>
    )
  }
};
