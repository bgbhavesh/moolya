import React from "react";
import {mount} from "react-mounter";
import AppLayout from "../../app/layouts/appLayout";
import {appSection} from "../app/appRoute";
import MlAppConversations from '../../app/conversations/component/MlAppConversations'
import MlAppChatView from '../../app/conversations/component/MlAppChatView'
import ReactObserver from 'react-event-observer';

appSection.route('/conversations', {
  name: 'conversations',
  action(params){
    mount(AppLayout, {appContent:<MlAppConversations observer={ReactObserver()}/>})
  }
})

appSection.route('/chatview', {
  name: 'conversations',
  action(params){
    mount(AppLayout, {appContent:<MlAppChatView observer={ReactObserver()}/>})
  }
})
