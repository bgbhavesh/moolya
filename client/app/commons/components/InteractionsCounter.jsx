import React from 'react';
import { render } from 'react-dom'
import _ from 'lodash';
import {fetchInteractionsCountActionHandler} from '../actions/fetchInteractionCountActionHandler';

export default class InteractionsCounter extends React.Component{
  constructor(props){
    super(props)
    this.state =  {data: []};
  }

  async componentWillMount() {
    //todo: this may be configured dynamically
    var actionNames=['like','connect','collaborate','favourite','view','partner','enquire'];
    const response = await fetchInteractionsCountActionHandler({resourceType:this.props.resourceType,resourceId:this.props.resourceId,actionNames:actionNames});
    this.setState({data: response});
  }

  compareQueryOptions(a, b) {return JSON.stringify(a) === JSON.stringify(b);};

  async componentWillUpdate(nextProps, nextState) {
    var actionNames=['like','connect','collaborate','favourite','view','partner','enquire'];
    if(!this.compareQueryOptions(this.props.interactionAutoId,nextProps.interactionAutoId)){
      const response = await fetchInteractionsCountActionHandler({resourceType:this.props.resourceType,resourceId:this.props.resourceId,actionNames:actionNames});
      this.setState({data: response});
    }
  }

  componentDidMount()
  {
    $('.paperfold').paperfold({'toggle': $('.paperfold-toggle'), 'folds': 1});
    $('.paperfold-toggle').click();
  }

  onBackHandler(e){
    console.log("on BackClick")
    this.props.backHandler();
  }

  render(){
    let config = [
      {name: 'like',displayName:'Like',iconClass: 'ml my-ml-my_likes_2'},
      {name: 'connect', displayName:'Connections',iconClass: 'ml flaticon-ml-handshake'},
      {name: 'collaborate',displayName:'Collaborations',iconClass: 'ml flaticon-ml-networking'},
      {name: 'favourite',displayName:'Favourites',iconClass: 'ml my-ml-favourites'},
      {name: 'view',displayName:'Views',iconClass: 'ml my-ml-browser_3'},
      {name: 'partner', displayName:'Partners',iconClass: 'ml flaticon-ml-support'},
      {name: 'enquire',displayName:'Enquiries',iconClass: 'ml flaticon-ml-handshake-1'}
    ];

    let data=this.state.data;
      //todo: configure the  this.props.actions
    let actionView = config.map(function(option) {
     /*let action = _.find(config, {'name': option.name});
      for (let i = 0; i < config.length; i++) {
        if (config[i].name == option.name && option.status !== true) {
           return;
        }
      }*/
      let actionCount=(_.find(data,{actionName:option.name})||{}).count;
        return (
           <li key={option.name}>
             <a href="#"><span className={option.iconClass}></span>
             <b>{actionCount}</b>
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
          <a className="startup-logo" href="" onClick={this.onBackHandler.bind(this)}><img src="/images/startup_default.png"/></a>
          <ul className="header-action-buttons">
            {actionView}
          </ul>
        </div>
         <button className="btn btn-default paperfold-toggle" style={{'visibility':'hidden','position':'absolute'}}>Toggle</button>
      </div>

    )
  }
};
