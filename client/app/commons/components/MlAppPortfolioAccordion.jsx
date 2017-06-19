import React, { Component, PropTypes }  from "react";
import { render } from 'react-dom';
import _ from 'lodash';
import MlAppActionComponent from './MlAppActionComponent';
import MlAccordion from './MlAccordion';
import MlIdeatorRelatedIdeas from '../../../app/ideators/components/MlAppIdeatorRelatedIdeas';
import {GenericPortfolioActionsConfig} from '../config/mlPortfolioConfig';
export default class MlAppPortfolioAccordionContainer extends React.Component{
  constructor(props){
    super(props);
    return this;
  }

  componentDidMount(){
  }

  render(){

    var that=this;
    var viewMode=this.props.viewMode===false?"edit":"view";
    //resolve the actions for the portfolio
    var actionOptions= _.filter(GenericPortfolioActionsConfig,{actionType:viewMode})||[];
       actionOptions.forEach(function (action) {
                action.showAction=true;
                that.props.assignActionHandler(action);
       });

    //resolve the accordions for the portfolio
    var accordionOptions=
       {id:'portfolioAccordion',
        panelItems:[{'title':'Actions',isText:false,style:{'background': '#ef4647'},contentComponent:<MlAppActionComponent resourceDetails={{resourceId:this.props.resourceId,resourceType:'portfolio'}} actionOptions={actionOptions}/>}]};
    //todo: dynamic check for accordion configuration
       if(this.props.communityType==="Ideators"||this.props.communityType==="ideator"){
         accordionOptions["panelItems"].push({title:'Related Ideas',isText:false,contentComponent:<MlIdeatorRelatedIdeas />,style:{'background': '#273545'}});
       }

    return(
        <MlAccordion accordionOptions={accordionOptions} {...this.props} />
      )

  }
}
