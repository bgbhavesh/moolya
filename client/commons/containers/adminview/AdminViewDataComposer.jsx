import React from 'react';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
 function composer(props,onData){

 }
export default (component) =>composeWithTracker(composer)(component);
