/**
 * Created by pankaj on 17/6/17.
 */

import React, {Component} from "react";
import MlAppActionComponent from "../../commons/components/MlAppActionComponent";
import MlAccordion from '../../commons/components/MlAccordion';
import {createStageActionHandler} from '../actions/createStage';
import {updateStageActionHandler} from '../actions/updateStage';

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

  render(){
    const props = this.props;
    const that = this;
    const currentStage = props.currentStage;
    const currentStageIndex = props.stages.findIndex(function (data) {
      return data.stageName == currentStage.stageName
    });
    let mlAppActionConfig = props.stages.map(function (stage, i) {
        return {
          showAction:true,
          actionName: stage.stageName,
          handler: async(event) => {
            if(!that.state.selected.resourceId){
              toastr.error('Please select a portfolio');
              return false;
            }
            if(currentStage.stageName == stage.stageName){
              toastr.error('Already in '+stage.stageName+' Stage');
              return false;
            }
            let dataToInsert = {
              "resourceId": that.state.selected.resourceId,
              "resourceType": "portfolio",
              "resourceStage": stage.stageName
            };
            let response;
            if(that.state.selected.stage.length){
              response = await updateStageActionHandler(that.state.selected.stage[0]._id, dataToInsert);
            } else {
              response = await createStageActionHandler(dataToInsert);
            }
            if(response.success){
              toastr.success('Updated Successfully');
              that.props.fetchPortfolio();
            }
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
                if( (currentStageIndex == 0 && stageIndex < 0 ) || stageIndex == currentStageIndex ) {
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