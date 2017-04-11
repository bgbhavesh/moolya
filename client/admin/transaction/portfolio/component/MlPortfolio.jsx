import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findPortfolioActionHandler} from '../actions/findPortfolioDetails'
import {fetchTemplateHandler} from "../../../../commons/containers/templates/mltemplateActionHandler";
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'

export default class MlPortfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {portfolioComponent:''}
        console.log(this.props.viewMode);
        this.fetchEditPortfolioTemplate.bind(this);
        this.fetchViewPortfolioTemplate.bind(this);
        this.getPortfolioDetails.bind(this);
        return this;
    }

    async componentWillMount() {
      if(this.props.viewMode){
        this.fetchViewPortfolioTemplate(this.props.config);
      }else{
        this.fetchEditPortfolioTemplate(this.props.config);
      }

    }

    async fetchEditPortfolioTemplate(pId) {
        let userType = this.context.userType;
        const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:userType});
        this.setState({portfolioComponent:reg&&reg.component?reg.component:null});
    }

    async fetchViewPortfolioTemplate(id) {
      let userType = this.context.userType;
        const reg= await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:id, mode:"view", userType:userType});
        this.setState({portfolioComponent:reg&&reg.component?reg.component:null});
    }

    getPortfolioDetails(details){
        console.log("parent details")
        console.log(details);
    }

    render(){
        let MlActionConfig = [
          {
            actionName: 'save',
            showAction: true,
            handler: null
          },
          {
            showAction: true,
            actionName: 'cancel',
            handler: null
          }
        ]
        let PortfolioComponent=this.state.portfolioComponent;
        let hasComponent = false
        if(PortfolioComponent != "")
          hasComponent = true
        const showLoader=this.state.loading;
        return(
          <div className="admin_main_wrap">
            {showLoader===true?( <div className="loader_wrap"></div>):(
              <div className="admin_padding_wrap">
                <div className='step-progress' >
                  {hasComponent && <PortfolioComponent getPortfol ioDetails={this.getPortfolioDetails}/>}
                </div>
              </div>)}
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
        )
    }
}

MlPortfolio.contextTypes = {
  userType: React.PropTypes.string
};
