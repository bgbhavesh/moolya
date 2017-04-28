import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class TopIconsList extends React.Component{
componentDidMount()
  {
    $('.paperfold').paperfold({
    'toggle': $('.paperfold-toggle'),
    'folds': 1
    });
    $('.paperfold-toggle').click();
  }
  render(){
    return (
      <div>
        <div className="paperfold panel">
        {/*<img src="/images/idea_hub_logo.png" className="startup-logo"/>*/}
  <ul className="header-action-buttons">
    <li>
      <a href="#"> <img src="/images/ok-icon.png"/></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-handshake"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-networking"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-shapes"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-visibility"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-support"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
    <li>
      <a href="#"><span className="ml flaticon-ml-handshake-1"></span></a>
      <span className="tooltipnew">
        <span>001</span>
      </span>
    </li>
  </ul>
</div>
<button className="btn btn-default paperfold-toggle" style={{'visibility':'hidden','position':'absolute'}}>Toggle</button>
      </div>
    )
  }
};
