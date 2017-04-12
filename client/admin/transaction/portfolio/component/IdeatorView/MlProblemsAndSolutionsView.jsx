import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';


export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
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

    const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
  this.setState({portfolioIdeatorInfo : response});
  }

  render(){
    return (

      <div>

        <h2>Problems and Solutions </h2>

        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#1a" data-toggle="tab">Problems</a>
            </li>
            <li><a href="#2a" data-toggle="tab">Solutions</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      {this.state.portfolioIdeatorInfo.problemStatement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="2a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      {this.state.portfolioIdeatorInfo.solutionStatement}
                    </div>
                  </div></div>
              </div>
            </div>


          </div>

        </div>

      </div>



    )
  }
}
