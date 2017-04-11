import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findPortfolioActionHandler} from '../actions/findPortfolioDetails'
import {fetchTemplateHandler} from "../../../../commons/containers/templates/mltemplateActionHandler";
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'

export default class MlPortfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {editComponent:''}
        this.fetchEditPortfolioTemplate.bind(this);
        this.fetchViewPortfolioTemplate.bind(this);
        this.getPortfolioDetails.bind(this);
        return this;
    }

    async componentWillMount() {
        this.fetchEditPortfolioTemplate(this.props.config);
    }

    async fetchEditPortfolioTemplate(pId) {
        let userType = this.context.userType;
        const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:userType});
        this.setState({editComponent:reg&&reg.component?reg.component:null});
    }

    async fetchViewPortfolioTemplate(regDetails) {
        const reg= await fetchTemplateHandler({process:"Portfolio",subProcess:"Portfolio", stepCode:"Portfolio", recordId:""});
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
        let EditComponent=this.state.editComponent;
        let hasComponent = false
        if(EditComponent != "")
          hasComponent = true
        const showLoader=this.state.loading;
        return(
          <div className="admin_main_wrap">
            {showLoader===true?( <div className="loader_wrap"></div>):(
              <div className="admin_padding_wrap">
                <div className='step-progress' >
                  {hasComponent && <EditComponent getPortfolioDetails={this.getPortfolioDetails} portfolioDetailsId={this.props.config}/>}
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
