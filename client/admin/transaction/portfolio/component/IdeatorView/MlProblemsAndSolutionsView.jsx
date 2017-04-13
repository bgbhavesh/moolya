import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler, findAnnotations} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'

export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {},
      annotations:[],
      content:{}
    }

    this.createAnnotations.bind(this);
    this.fetchPortfolioInfo.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  initalizeAnnotaor(){
      initializeMlAnnotator(this.annotatorEvents.bind(this))
      this.state.content = jQuery("#psContent").annotator();
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
          case 'annotationViewer':{
            $('#annotationss').click();

          }
          break;


      }
  }

  async createAnnotations(annotation){
      let details = {portfolioId:this.props.portfolioDetailsId, docId:"problems", quote:JSON.stringify(annotation)}
      const response = await createAnnotationActionHandler(details);
      return response;
  }

  async fetchAnnotations(){
    const response = await findAnnotations(this.props.portfolioDetailsId, "problems");
    this.setState({annotations:JSON.parse(response.result)})
    if(this.state.annotations.length > 0){
        var annotator = jQuery("#psContent").data('annotator');
        this.state.content.annotator('loadAnnotations', this.state.annotations);
    }
    return response;
  }

  componentDidMount()
  {
      $("#annotationss").popover({
        'title' : 'Annotations',
        'html' : true,
        'placement' : 'top',
        'container' : '.admin_main_wrap',
        'content' : $(".ml_annotations").html()
      });
    $("#timeLine").popover({
      'title' : 'Timeline',
      'html' : true,
      'placement' : 'top',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_timeline").html()
    });
      this.initalizeAnnotaor()
      this.fetchPortfolioInfo();
      this.fetchAnnotations();
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



        <div id="psContent" className="ml_tabs">
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
        {/*<a href="#" id="annotationss">one</a>*/}

        <div id="mlannotations" style={{'display':'none'}} className="ml_annotations">
          <div className="comments-container cus_scroll large_popover">
            <ul id="comments-list" className="comments-list">
              <li>
                <div className="comment-main-level">
                  <div className="comment-avatar"><img src="/images/p_1.jpg" alt=""/></div>
                  <div className="comment-box">
                    <div style={{marginTop:'8px'}} className="annotate">1</div>
                    <div style={{paddingLeft:'50px'}} className="comment-head">
                      <h6 className="comment-name">Raghunandan</h6>
                      <div className="author">Chapter Manager</div>
                      <span>02 Nov 2016, 03:50:33 </span>
                    </div>
                    <div className="comment-content">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>

                  </div>
                </div>
                <div className="ml_btn">
                  <a href="#" className="save_btn">Resolve</a>
                  <a href="#" className="cancel_btn">Re open</a>
                  <a href="#" className="cancel_btn add_comment">Comment</a>
                </div>
                <textarea className="form-control comment-input-box" placeholder="Enter your comment here"></textarea>
                <ul className="comments-list reply-list">
                  <li>
                    <div className="comment-avatar"><img src="/images/p_2.jpg" alt=""/></div>
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name">Pavani</h6>
                        <span>02 Nov 2016, 03:50:33 </span>
                      </div>
                      <div className="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="comment-avatar"><img src="/images/p_3.jpg" alt=""/></div>
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name">Agustin Ortiz</h6>
                        <span>02 Nov 2016, 03:50:33 </span>

                      </div>
                      <div className="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="comment-avatar"><img src="/images/p_4.jpg" alt=""/></div>
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name">Agustin Ortiz</h6>
                        <span>02 Nov 2016, 03:50:33 </span>

                      </div>
                      <div className="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                      </div>
                    </div>
                  </li>

                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="overlay"></div>


      </div>



    )
  }
}
