import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findIdeatorPortfolioActionHandler} from '../../actions/findIdeatorPortfolioDetails'
//import {findPortfolioActionHandler} from '../actions/findPortfolioDetails'
//import {fetchTemplateHandler} from "../../../../commons/containers/templates/mltemplateActionHandler";
//import MlActionComponent from '../../../../commons/components/actions/ActionComponent'

export default class MlViewIdeatorPortfolioTemplate extends React.Component{
  constructor(props){
    super(props)
    console.log( this.props.getPortfolioDetails);
    this.fetchPortfolioDetails.bind(this);
  }

  async fetchPortfolioDetails(){
    let response = await findIdeatorPortfolioActionHandler(this.props.config);
  }

  render(){
    console.log("-----------------------------------------------");
    return (
      <div>Helooooooooooooooooooo</div>
    )
  }
}
