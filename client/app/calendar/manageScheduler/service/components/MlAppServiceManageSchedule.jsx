/**
 * Created by Mukhil on 20/6/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppServiceStep1 from "./MlAppServiceStep1";
import MlAppServiceStep2 from './MlAppServiceStep2'
import MlAppServiceTermsAndConditions from './MlAppServiceTermsAndConditions'
import MlAppServicePayment from './MlAppServicePayment'
// import MlAppChooseTeam from "./MlAppChooseTeam";
// import MlAppActivityPayment from "./MlAppActivityPayment";
// import MlAppActivityHistory from "./MlAppActivityHistory";

export default class MlAppServiceManageSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityId: " "
    }

    this.getCreatedId.bind(this)
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  getCreatedId(value) {
    this.setState({activityId: value})
    console.log(this.state.activityId)
  }


  render() {
    const steps =
      [
        {
          name: 'Create',
          component: <MlAppServiceStep1 />,
          icon: <span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Select Tasks',
          component: <MlAppServiceStep2 />,
          icon: <span className="ml fa fa-users"></span>
        },
        {name: 'Terms & Conditions',
          component: <MlAppServiceTermsAndConditions />,
          icon: <span className="ml ml-payments"></span>},
        {name: 'Payment',
          component: <MlAppServicePayment />,
          icon: <span className="ml ml-payments"></span>
        },
        {name: 'History',
          // component: <MlAppServicePayment />,
          icon: <span className="ml ml-moolya-symbol"></span>
        }
      ]
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="service" />
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
