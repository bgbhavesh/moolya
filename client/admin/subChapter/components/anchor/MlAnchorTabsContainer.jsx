/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import {render} from 'react-dom';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlAnchorList from './MlAnchorList';
import MlAnchorObjective from './MlAnchorObjective';
import MlAnchorContact from './MlAnchorContact';

export default class MlAnchorTabsContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    const steps =
      [
        {name: 'Anchors', component: <MlAnchorList />, icon: <span className="ml ml-basic-Information"></span>},
        {
          name: 'Objectives',
          component: <MlAnchorObjective />,
          icon: <span className="ml ml-additional-Information"></span>
        },
        {name: 'Contact', component: <MlAnchorContact />, icon: <span className="ml flaticon-ml-agenda"></span>}
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
      </div>
    )
  }
};
