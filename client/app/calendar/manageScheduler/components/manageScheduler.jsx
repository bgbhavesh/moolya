import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScheduleHead from './scheduleHead';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

export default class MlmanageScheduler extends React.Component{
  constructor(props){
    super(props)
    this.state={
      activityId:" "
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

    getCreatedId(value){
    this.setState({activityId:value})
      console.log(this.state.activityId)
    }


  render(){
    const steps =
      [
        {name: 'Create', component: <Step1 setId={this.getCreatedId.bind(this)} />,icon:<span className="ml fa fa-plus-square-o"></span>},
        {name: 'Choose team', component: <Step2 activityId={this.state.activityId}/>,icon:<span className="ml fa fa-users"></span>},
        {name: 'Payment', component: <Step3 />,icon:<span className="ml ml-payments"></span>},
        {name: 'History', component: <Step4 />,icon:<span className="ml ml-moolya-symbol"></span>}
      ]
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <ScheduleHead/>
          <div className="clearfix" />
          <div className="col-md-12">
            <div className='step-progress' >
              <div id="root" >
                <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
};






// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import ScheduleHead from './scheduleHead';
// import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
// import Step1 from './step1';
// import Step2 from './step2';
// import Step3 from './step3';
// import Step4 from './step4';
// import Step5 from './step5';
//
//
// export default class MlmanageScheduler extends React.Component{
//   componentWillMount(){
//     console.log(this.props)
//   }
//
//   componentDidMount()
//   {
//     $('.switch input').change(function() {
//       if ($(this).is(':checked')) {
//         $(this).parent('.switch').addClass('on');
//       }else{
//         $(this).parent('.switch').removeClass('on');
//       }
//     });
//
//
//
//   }
//   render(){
//
//     const steps =
//       [
//         {name: 'Create', component: <Step1 />},
//         {name: 'Add Activity', component: <Step2 />},
//         {name: 'T&C', component: <Step3 />},
//         {name: 'Payment', component: <Step4 />},
//         {name: 'History', component: <Step5 />}
//        ]
//
//     return (
//       <div className="app_main_wrap">
//         <div className="app_padding_wrap">
//           <ScheduleHead/>
//           <div className="clearfix" />
//           <div className="col-md-12">
//             <div className='step-progress' >
//               <div id="root" >
//                 <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
//               </div>
//             </div>
//           </div>
//
//         </div>
//       </div>
//     )
//   }
// };
