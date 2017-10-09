import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorIntellectualPlanningTrademarkActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import {validateUserForAnnotation} from '../../actions/findPortfolioIdeatorDetails'
import NoData from '../../../../../commons/components/noData/noData';
import MlLoader from "../../../../../commons/components/loader/loader";

export default class MlPortfolioIdeatorPlanningTrademarkView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {},
      loading: true
    }
    this.fetchPortfolioInfo.bind(this);
    this.createAnnotations.bind(this);
    //this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  initalizeAnnotaor(){
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#trademarkContent").annotator();
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
        let response = this.createAnnotations(annotation);
      }
        break;
      case 'update':{
      }
        break;
      case 'annotationViewer':{
        if(annotation[0].id){
          this.props.getSelectedAnnotations(annotation[0]);
        }else{
          this.props.getSelectedAnnotations(annotation[1]);
        }
      }
        break;
    }
  }

  async createAnnotations(annotation){
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"intellectualTrademark", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "intellectualTrademark");
    let resp = JSON.parse(response.result);
    let annotations = this.state.annotations;
    this.setState({annotations:JSON.parse(response.result)})

    let quotes = [];

    _.each(this.state.annotations, function (value) {
      quotes.push({
        "id":value.annotatorId,
        "text" : value.quote.text,
        "quote" : value.quote.quote,
        "ranges" : value.quote.ranges,
        "userName" : value.userName,
        "roleName" : value.roleName,
        "profileImage" : value.profileImage,
        "createdAt" : value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
  }
  componentWillMount() {
    let resp = this.validateUserForAnnotation();
    return resp
  }

  componentDidMount()
  {
    $('.actions_switch').click();

    $("#timeLine").popover({
      'title' : 'Timeline',
      'html' : true,
      'placement' : 'top',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_timeline").html()
    });
    $(document).on('click', '.add_comment', function(e){
      $('.comment-input-box').slideToggle();
    });

    this.fetchPortfolioInfo();
  /*  if(this.state.isUserValidForAnnotation){
      this.initalizeAnnotaor()
    }
    this.fetchAnnotations();*/
    initalizeFloatLabel();
  }
  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({isUserValidForAnnotation:response})
      this.initalizeAnnotaor()
      this.fetchAnnotations();
    }
  }

  async fetchPortfolioInfo(){
    const response = await findIdeatorIntellectualPlanningTrademarkActionHandler(this.props.portfolioDetailsId);
    if(response){
      this.setState({portfolioIdeatorInfo : response, loading : false});
    }
  }

  render(){
    let loading = this.state.loading ? this.state.loading : false;
    return (
      <div>
        {loading === true ? ( <MlLoader/>) : (
          <div>
            {this.state.portfolioIdeatorInfo && this.state.portfolioIdeatorInfo.IPdescription ? (
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <h2>Intellectual Property And Trademark</h2>
                  <div id="trademarkContent" className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      {this.state.portfolioIdeatorInfo.IPdescription}
                    </div>
                  </div>

                </div>
              </div>
            ) : (<NoData tabName={this.props.tabName}/>)
            }
          </div>
        )
        }
        </div>
    )
  }
}
