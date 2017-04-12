import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorIntellectualPlanningTrademarkActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';


export default class MlPortfolioIdeatorPlanningTrademarkView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {}
    }
    this.fetchPortfolioInfo.bind(this);

  }
  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    this.fetchPortfolioInfo();
    initalizeFloatLabel();
  }

  async fetchPortfolioInfo(){
    const response = await findIdeatorIntellectualPlanningTrademarkActionHandler(this.props.portfolioDetailsId);
    if(response){
      this.setState({portfolioIdeatorInfo : response});
    }

  }

  render(){


    return (

      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Intellectual Planing and Trademark</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              {this.state.portfolioIdeatorInfo.description}
            </div>
          </div>

        </div>
      </div>

    )



  }
}
