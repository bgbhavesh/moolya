import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class InteractionsCounter extends React.Component{
  componentDidMount()
  {
    $('.paperfold').paperfold({
      'toggle': $('.paperfold-toggle'),
      'folds': 1
    });
    $('.paperfold-toggle').click();
  }

  render(){
    let config = [
      {
        name: 'like',
        displayName:'Like',
        iconClass: 'ml fa fa-thumbs-o-up'
      },
      {
        name: 'connect',
        displayName:'Connections',
        iconClass: 'ml flaticon-ml-handshake'
      },
      {
        name: 'collaborate',
        displayName:'Collaborations',
        iconClass: 'ml flaticon-ml-networking'
      },
      {
        name: 'favourite',
        displayName:'Favourites',
        iconClass: 'ml flaticon-ml-shapes'
      },
      {
        name: 'view',
        displayName:'Views',
        iconClass: 'ml flaticon-ml-visibility'
      },
      {
        name: 'partner',
        displayName:'Partners',
        iconClass: 'ml flaticon-ml-support'
      },
      {
        name: 'enquire',
        displayName:'Enquiries',
        iconClass: 'ml flaticon-ml-handshake-1'
      }
    ];
      //todo: configure the  this.props.actions
    let actionView = config.map(function(option) {
     /*let action = _.find(config, {'name': option.name});
      for (let i = 0; i < config.length; i++) {
        if (config[i].name == option.name && option.status !== true) {
           return;
        }
      }*/
        return (
           <li key={option.name}>
             <a href="#"><span className={option.iconClass}></span>
             <b>{option.count}</b>
             </a>
             <span className="tooltipnew">
             <span>{option.displayName}</span>
             </span>
           </li>
        )

    });

    return(
      <div>
        <div className="paperfold panel">
          <ul className="header-action-buttons">
            {actionView}
          </ul>
        </div>
         <button className="btn btn-default paperfold-toggle" style={{'visibility':'hidden','position':'absolute'}}>Toggle</button>
      </div>

    )
  }
};
