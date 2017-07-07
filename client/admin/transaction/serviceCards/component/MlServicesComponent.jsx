/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from "react";
import {render} from "react-dom";
import MlAppScheduleHead from "../../../../app/calendar/manageScheduler/commons/components/MlAppScheduleHead";
import StepZilla from "../../../../commons/components/stepzilla/StepZilla";
// import MlAppServiceStep1 from "../../../../app/calendar/manageScheduler/service/components/MlAppServiceStep1";
import MlServiceCardStep1 from './MlServiceCardStep1'
import MlServiceCardStep2 from './MlserviceCardStep2'
import MlServiceCardStep3 from './MlServiceCardStep3'
import MlServiceCardStep4 from './MlServiceCardStep4'

export default class MlServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props)
    this.state = {
      activityId: " "
    }

    this.getCreatedId.bind(this)
  }

  /**
   * ComponentDidMount
   * Desc :: Configures the switch
   */

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  /**
   * Method :: getCreatedId
   * Desc   :: State of activityId is set
   * @returns :: void
   */

  getCreatedId(value) {
    this.setState({activityId: value})
    console.log(this.state.activityId)
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render() {
    const steps =
      [
        {
          name: 'Create',
          component: <MlServiceCardStep1 data={this.props.data}/>,
          icon: <span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Select Tasks',
          component: <MlServiceCardStep2 data={this.props.data} />,
          icon: <span className="ml fa fa-users"></span>
        },
        {name: 'Terms & Conditions',
          component: <MlServiceCardStep3 data={this.props.data} />,
          icon: <span className="ml ml-payments"></span>},
        {name: 'Payment',
          component: <MlServiceCardStep4 data={this.props.data} />,
          icon: <span className="ml ml-payments"></span>
        }
      ]
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="clearfix"/>
           <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
