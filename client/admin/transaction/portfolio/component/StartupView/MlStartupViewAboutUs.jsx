import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {fetchDetailsStartupActionHandler} from '../../actions/findPortfolioStartupDetails';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import _ from 'lodash'
var Rating = require('react-rating');


export default class MlStartupViewAboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupAboutUsList: []};
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);

  }

  componentDidMount(){
    this.initalizeAnnotaor()
    this.fetchAnnotations();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));

  }
  componentWillMount(){
    this.fetchPortfolioStartupDetails();


  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false,startupAboutUsList: response});
    }

  }
  initalizeAnnotaor(){
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#annotatorContent").annotator();
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
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"startupAboutUs", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }



  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "startupAboutUs");
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
        "createdAt" : value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
  }

  render(){
    let clientsArray = this.state.startupAboutUsList.clients || [];
    return (
      <div>
          <h2>About</h2>
          <div className="main_wrap_scroll" id="annotatorContent" >
            <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true} >
              <div className="col-lg-12 col-sm-12" >
                <div className="row">

                  <div className="panel panel-default panel-form-view">

                    <div   className="panel-body">
                      <h4>About us</h4>
                      <p>{this.state.startupAboutUsList&&this.state.startupAboutUsList.aboutUs&&this.state.startupAboutUsList.aboutUs.description}.</p>
                      <h4>Rating</h4>
                      <p><Rating
                        empty="fa fa-star-o empty"
                        full="fa fa-star fill"
                        fractions={2}
                        initialRate={this.state.startupAboutUsList&&this.state.startupAboutUsList.rating&&this.state.startupAboutUsList.rating}
                      /></p>
                      {/*<h4>Clients</h4>

                      {clientsArray.map(function (details, idx) {
                        return(<div className="col-lg-2 col-md-3 col-sm-3">
                          <p>{details.clients && details.clients.description}</p>
                        </div>)
                      })}*/}
                      <h4>Service & Products</h4>
                      <p>{this.state.startupAboutUsList&&this.state.startupAboutUsList.serviceProducts&&this.state.startupAboutUsList.serviceProducts.description}.</p>
                      <h4>Information</h4>
                      <p>{this.state.startupAboutUsList&&this.state.startupAboutUsList.serviceProducts&&this.state.startupAboutUsList.information.description}.</p>


                    </div>
                  </div>

                </div>    </div>
            </ScrollArea>
          </div>


        </div>



    )
  }
}
