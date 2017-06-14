/**
 * Created by vishwadeep on 14/6/17.
 */

import React, {Component} from "react";
import MlAppTransaction from '../../../../client/app/profile/office/components/officeTransaction/MlAppTransaction'

export default function MlGenericTransactionAccordion(props) {
  let data = props.data || {}
  switch (data.transactionType) {
    case 'office setup': {
      return <MlOffice config={data}/>
    }
      break;
    case 'registration': {
      return <MlAppTransaction config={data}/>
    }
      break;
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
