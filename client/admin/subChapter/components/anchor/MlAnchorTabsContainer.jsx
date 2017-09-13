/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import {render} from 'react-dom';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlAnchorList from './MlAnchorList';
import MlAnchorObjective from './MlAnchorObjective';
import MlAnchorContact from './MlAnchorContact';
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";

export default class MlAnchorTabsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.getObjectiveDetails = this.getObjectiveDetails.bind(this)
    this.getContactDetails = this.getContactDetails.bind(this)
    return this
  }

  async handleSuccess(response) {
    console.log(response)
  }

  async updateAnchorDetails() {
    // const response = await contructData(jsonData)
    //save details action handler
    console.log('data clicked')
  }

  getObjectiveDetails(details, tabName) {
    //get tab details
    console.log('objective', details)
  }

  getContactDetails(details, tabName) {
    //get tab deatails
  }

  render() {
    const MlActionConfig = [{
      showAction: true,
      actionName: 'cancel',
      handler: async(event) => {
      }
    },
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateAnchorDetails.bind(this), this.handleSuccess.bind(this))
      }]
    const steps =
      [
        {name: 'Anchors', component: <MlAnchorList />, icon: <span className="ml ml-basic-Information"></span>},
        {
          name: 'Objectives',
          component: <MlAnchorObjective getObjectiveDetails={this.getObjectiveDetails}/>,
          icon: <span className="ml ml-additional-Information"></span>
        },
        {
          name: 'Contact',
          component: <MlAnchorContact getContactDetails={this.getContactDetails}/>,
          icon: <span className="ml flaticon-ml-agenda"></span>
        }
      ]
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className='step-progress'>
            <div id="root">
              <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true}/>
            </div>
          </div>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
};
