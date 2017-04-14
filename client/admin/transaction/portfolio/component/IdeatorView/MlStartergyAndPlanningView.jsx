import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {findIdeatorStrategyPlansActionHandler, findAnnotations} from '../../actions/findPortfolioIdeatorDetails'
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'


export default class MlPortfolioIdeatorStrategyPlansView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {}
    }
    this.fetchPortfolioInfo.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);

  }

  initalizeAnnotaor(){
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#strategyPlansContent").annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit:  function () {
      }
    });


  }

  annotatorEvents(event, annotation, editor){
    if(!annotation)
      return;
    switch (event){
      case 'create':{
        this.createAnnotations(annotation);
      }
        break;
      case 'update':{

      }
        break;
    }
  }

  async createAnnotations(annotation){
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"strategyplans", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    return response;
  }

  async fetchAnnotations(){
    const response = await findAnnotations(this.props.portfolioDetailsId, "strategyplans");
    this.setState({annotations:JSON.parse(response.result)})
    if(this.state.annotations.length > 0){
      var annotator = jQuery("#strategyPlansContent").data('annotator');
      this.state.content.annotator('loadAnnotations', this.state.annotations);
    }
    return response;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    this.fetchPortfolioInfo();
    initalizeFloatLabel();
    this.initalizeAnnotaor();
    this.fetchAnnotations();
  }


  async fetchPortfolioInfo(){
    const response = await findIdeatorStrategyPlansActionHandler(this.props.portfolioDetailsId);
    if(response){
      this.setState({portfolioIdeatorInfo : response});
    }

  }

  render(){


    return (

      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Startergy and Planning</h2>
          <div id="strategyPlansContent" className="panel panel-default panel-form-view">

            <div className="panel-body">
              {this.state.portfolioIdeatorInfo.description}
            </div>
          </div>

        </div>    </div>

    )



  }
}
