/**
 * Created by vishwadeep on 14/6/17.
 */

import React, {Component} from "react";
// import MlAppTransaction from '../../../profile/office/components/officeTransaction/MlAppTransaction'
import MlAppRegistrationWizard from '../../../registrations/component/MlAppRegistrationWizard'
import MlConnectionRequest from './MlConnectionRequest';
import MlInvestmentRequest from './MlInvestmentRequest'
import MlShareCalendar from './MlShareCalendar'

export default function MlGenericTransactionAccordion(props) {
  let data = props.data || {}
  switch (data.transactionType) {
    case 'officeRequest': {
      return <MlOffice config={data}/>
      break;
    }
    case 'office': {
      return getOfficeActivity(data)
      break;
    }
    case 'registration': {
      // return <MlAppTransaction config={data}/>
      return <MlAppRegistrationWizard config={data._id} isAccodion={true}/>
      break;
    }
    case 'sharing':
      return <MlShareCalendar data={data}/>
      break;
    case 'connectionRequest':
    case 'interaction': {
      return <MlConnectionRequest data={data}/>
      break;
    }
    case 'investments': {
      return <MlInvestmentRequest data={data}/>
      break;
    }
    default :
      return <MlEmptyView/>
  }
}

function getOfficeActivity  (data) {
  switch(data.activity){
    case 'officeDeactivate':{
      console.log('officeDeactivate')
      return <MlEmptyView/>
      break;
    }
    case 'officeBearerInvitation':{
      console.log('officeBearerInvitation')
      return <MlEmptyView/>
      break;
    }
    case 'officeBearerRetire':{
      console.log('officeBearerRetire')
      break;
    }
    case 'principal':{
      console.log('principal')
      break;
    }
    case 'officeBearerGoIndependent':{
      console.log('officeBearerGoIndependent')
      break;
    }
    default :
      return <MlEmptyView/>
  }
}

export class MlOffice extends Component {
  render() {
    return (
      <div>
        this is a test id : {this.props.config.transactionType}
      </div>
    )
  }
}

export class MlEmptyView extends Component {
  render() {
    return (<div>
      UI Not available
    </div>)
  }
}
