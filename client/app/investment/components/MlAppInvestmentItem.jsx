/**
 * Created by pankaj on 17/6/17.
 */

import React, {Component} from "react";
import MlAppActionComponent from "../../commons/components/MlAppActionComponent";
import MlAccordion from '../../commons/components/MlAccordion';
import MlAppInvestAction from './MlAppInvestActions';

export default class MlAppInvestmentItem extends Component {

  constructor(props){
    super(props);
    this.state= {
      selected : {}
    }
  }

  selectPortfolio(data){
    let selected = this.state.selected;
    if(data._id == selected._id){
      data = {};
    }
    this.setState({
      selected : data
    });
  }

  actionHandlerProxy(actionConfig,handlerCallback){
    console.log(actionConfig);
  if(handlerCallback) {
    handlerCallback(this);
  }else if(actionConfig&&actionConfig.customHandler){
    console.log('Called', actionConfig);
  actionConfig.customHandler(this);
  }
};

  render(){
    const props = this.props;
    console.log(props.stages);
    const that = this;
    const currentStage = props.currentStage;
    const currentStageIndex = props.stages.findIndex(function (data) {
      return data.stageName == currentStage.stageName
    });
    let mlAppActionConfig = currentStage.stageActions.filter(function (action) {
      return action.actionName && action.isActive;
    }).map(function (action) {
        let actionObj = MlAppInvestAction[action.actionName];
        if(actionObj){
          let config = actionObj.config;
          console.log(actionObj);
          config.handler = actionObj.handler;
          config.handler =that.actionHandlerProxy.bind(that);
          return config;
        } else {
          return {
            showAction: true,
            actionName: action.actionName,
          }
        }
    });

    export const genericPortfolioAccordionConfig= {id:'myInvestmentAccordion',
      panelItems:[{'title':'Actions',isText:false,style:{'background': '#ef4647'},contentComponent:<MlAppActionComponent  actionOptions={mlAppActionConfig}  />}]
    };
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12 ideators_list">
            <div className="row">
              {props.portfolio.map(function (data, idx) {
                let stageIndex;
                if(data.stage.length) {
                  stageIndex = props.stages.findIndex(function (stage) {
                    return stage.stageName == data.stage[0].resourceStage
                  });
                }
                // > incase need to display at lower index tabs
                // remove stageIndex < 0 incase all visible in index 0
                if( (currentStageIndex == 0 && !stageIndex ) || stageIndex == currentStageIndex ) {
                  switch(data.portfolio.communityCode){
                    case "IDE":
                      return (<div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx} onClick={()=>that.selectPortfolio(data)}>
                        <div className={"ideators_list_block " + ( that.state.selected._id == data._id ? "selected"  : '') }>
                          <div className="premium">
                          <span>
                            type
                            {/*{ideator.accountType}*/}
                          </span>
                          </div>
                          <h3>
                            {data.user.name}
                          </h3>
                          <div className="list_icon"><span className="ml ml-ideator"></span></div>
                          <p>
                            {data.idea[0].title && data.idea[0].title.substr(0,20)}{data.idea[0].title && data.idea[0].title.length ? '...' : ''}
                          </p>
                          <div className="block_footer">
                          <span>
                            {data.portfolio.chapterName}
                          </span>
                          </div>
                        </div>
                      </div>)
                      break;
                    case "STU":
                      return (<div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx} onClick={()=>that.selectPortfolio(data)}>
                        <div className={"ideators_list_block " + ( that.state.selected._id == data._id ? "selected"  : '') }>
                          <div className="premium">
                          <span>
                            type
                            {/*{ideator.accountType}*/}
                            </span>
                          </div>
                          <h3>
                            {data.user.name}
                          </h3>
                          <div className="list_icon"><span className="ml ml-ideator"></span></div>
                          <p>
                            {data.startup[0].aboutUs.description.substr(0,30)}{data.startup[0].aboutUs.description.length>30 ? '...':''}
                          </p>
                          <div className="block_footer">
                          <span>
                            {data.portfolio.chapterName}
                          </span>
                          </div>
                        </div>
                      </div>)
                      break;
                    default:
                      return ''
                      break
                  }
                }
              })}
            </div>
          </div>
        </div>

        <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
      </div>
    )
  }
}
