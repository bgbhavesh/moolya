import React, {Component} from "react";
import {render} from "react-dom";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppCreateTeam from "./MlAppCreateTeam";
import MlAppChooseTeam from "./MlAppChooseTeam";
import MlAppActivityPayment from "./MlAppActivityPayment";
import MlAppActivityHistory from "./MlAppActivityHistory";

export default class MlAppActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityId: " "
    };

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
    this.setState({activityId: value});
    console.log(this.state.activityId)
  }


  render() {
    const steps = [
        {
          name: 'Create',
          component: <MlAppCreateTeam setId={this.getCreatedId.bind(this)}/>,
          icon: <span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Choose team',
          component: <MlAppChooseTeam activityId={this.state.activityId}/>,
          icon: <span className="ml fa fa-users"></span>
        },
        {
          name: 'Payment', component:
          <MlAppActivityPayment />,
          icon: <span className="ml ml-payments"></span>
        },
        {
          name: 'History',
          component: <MlAppActivityHistory />,
          icon: <span className="ml ml-moolya-symbol"></span>
        }
      ];
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead/>
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
