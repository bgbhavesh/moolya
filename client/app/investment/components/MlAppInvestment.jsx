/**
 * Created by vishwadeep on 10/6/17.
 */
import React, {Component} from "react";
import {findProcessSetupActionHandler} from "../actions/findProcessSetupAction";
import {fetchLikePortfolioActionHandler} from '../actions/fetchLikePortfolio';
import Tabs from 'react-responsive-tabs';
import MlAppInvestmentItem from './MlAppInvestmentItem';

export default class MlAppInvestment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      portfolio:[]
    };
    this.findProcessSetup.bind(this);
    this.fetchPortfolio = this.fetchPortfolio.bind(this);
    return this;
  }

  componentWillMount() {
    this.fetchPortfolio();
    const resp = this.findProcessSetup();
    return resp;
  }

  async fetchPortfolio(){
    const response = await fetchLikePortfolioActionHandler('portfolio');
    if(response){
      let result = JSON.parse(response);
      // console.log(result);
      this.setState({
        portfolio: result
      });
    }

  }

  async findProcessSetup() {
    const response = await findProcessSetupActionHandler();
    this.setState({loading: false, data: response});
  }

  render() {
    const that = this;

    let data = this.state.data && this.state.data.processSteps && this.state.data.processSteps.length > 0 ? this.state.data.processSteps : [];
    const MlTabs = data.map(function (stage, id) {
      return {
          name: stage.stageName,
          tabContent: <MlAppInvestmentItem fetchPortfolio={that.fetchPortfolio}  stages={data} portfolio={that.state.portfolio} currentStage={stage} />
        }
    });

    function getTabs() {
      return MlTabs.map(MlTab => ({
        tabClassName: 'horizon-item', // Optional
        panelClassName: 'panel1', // Optional
        title: MlTab.name,
        getContent: () => MlTab.tabContent,
      }));
    }

    const App = () => <Tabs items={getTabs()} />;
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">

            <App/>
          </div>
        </div>
      </div>
    )
  }

  // render() {
  //   const that = this;
  //   let MlAppActionConfig = [{
  //     showAction: true,
  //     actionName: 'save',
  //     handler: async(event) => {
  //       console.log('save clicked')
  //     }
  //   }];
  //   let data = this.state.data && this.state.data.processSteps && this.state.data.processSteps.length > 0 ? this.state.data.processSteps : ['']
  //   const dataList = data.map(function (stage, id) {
  //     return (
  //       <li className={(id == 0) ? 'active' : ''} key={id}><a href="#my_shortlist"
  //                                                             data-toggle="tab">{stage.stageName}</a></li>
  //     )
  //   });
  //   const showLoader = this.state.loading;
  //   // return (
  //   //   <div>
  //   //     {showLoader === true ? ( <MlLoader/>) : (
  //   //       <div className="app_main_wrap">
  //   //         <div className="app_padding_wrap">
  //   //           <div className="col-md-12 ideators_list">
  //   //             <div className="ml_app_tabs">
  //   //               <ul className="nav nav-pills">
  //   //                 {/*<li className="active"><a href="#my_likes" data-toggle="tab">Likes</a></li>*/}
  //   //                 {dataList}
  //   //               </ul>
  //   //               <div className="tab-content clearfix">
  //   //                 <div className="tab-pane" id="my_shortlist">
  //   //                   <div className="row">
  //   //                     {that.state.portfolio.map(function (data, idx) {
  //   //                       switch(data.portfolio.communityCode){
  //   //                         case "IDE":
  //   //                           return (<div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx}>
  //   //                             <div className="ideators_list_block">
  //   //                               <div className="premium">
  //   //                             <span>
  //   //                               type
  //   //                               {/*{ideator.accountType}*/}
  //   //                               </span>
  //   //                               </div>
  //   //                               <h3>
  //   //                                 {data.user.name}
  //   //                               </h3>
  //   //                               <div className="list_icon"><span className="ml ml-ideator"></span></div>
  //   //                               <p>
  //   //                                 {data.idea[0].title && data.idea[0].title.substr(0,20)}{data.idea[0].title && data.idea[0].title.length ? '...' : ''}
  //   //                               </p>
  //   //                               <div className="block_footer">
  //   //                             <span>
  //   //                               {data.portfolio.chapterName}
  //   //                               </span>
  //   //                               </div>
  //   //                             </div>
  //   //                           </div>)
  //   //                           break;
  //   //                         case "STU":
  //   //                           return (<div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx}>
  //   //                             <div className="ideators_list_block">
  //   //                               <div className="premium">
  //   //                             <span>
  //   //                               type
  //   //                               {/*{ideator.accountType}*/}
  //   //                               </span>
  //   //                               </div>
  //   //                               <h3>
  //   //                                 {data.user.name}
  //   //                               </h3>
  //   //                               <div className="list_icon"><span className="ml ml-ideator"></span></div>
  //   //                               <p>
  //   //                                 {data.startup[0].aboutUs.description.substr(0,30)}{data.startup[0].aboutUs.description.length>30 ? '...':''}
  //   //                               </p>
  //   //                               <div className="block_footer">
  //   //                             <span>
  //   //                               {data.portfolio.chapterName}
  //   //                               </span>
  //   //                               </div>
  //   //                             </div>
  //   //                           </div>)
  //   //                           break;
  //   //                         default:
  //   //                           return ''
  //   //                           break
  //   //                       }
  //   //
  //   //                     })}
  //   //                   </div>
  //   //                 </div>
  //   //
  //   //               </div>
  //   //             </div>
  //   //           </div>
  //   //         </div>
  //   //         <AppActionButtons ActionOptions={MlAppActionConfig} showAction='showAction' actionName="actionName"/>
  //   //       </div>
  //   //     )}
  //   //   </div>
  //   // )
  // }
}
