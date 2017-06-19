import React, { Component, PropTypes }  from "react";
import { render } from 'react-dom';
import MlAppActionComponent from './MlAppActionComponent';
import MlAccordion from './MlAccordion';
import MlIdeatorRelatedIdeas from '../../../app/ideators/components/MlAppIdeatorRelatedIdeas';

export default class MlAppPortfolioAccordionContainer extends React.Component{
  constructor(props){
    super(props);
    return this;
  }

  componentDidMount(){
  }


  render(){
    export const genericPortfolioAccordionConfig= {
      id:'portfolioAccordion',
      panelItems:[
        {'title':'Related',isText:true,contentComponent:'upcoming',style:{'background': '#273545'}},
        {'title':'Actions',isText:false,style:{'background': '#ef4647'},contentComponent:<MlAppActionComponent resourceDetails={{resourceId:this.props.resourceId,resourceType:'portfolio'}} actionOptions={this.props.actionOptions}  />}
        ]
    };

    //todo: dynamic check for accordion configuration
       if(this.props.communityType==="Ideators"||this.props.communityType==="ideator"){
         genericPortfolioAccordionConfig["panelItems"].push({title:'Related Ideas',isText:false,contentComponent:<MlIdeatorRelatedIdeas />,style:{'background': '#273545'}});
       }

    return(
        <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
    )
  }
}

MlAppPortfolioAccordionContainer.contextTypes = {
  userType: PropTypes.string
};
