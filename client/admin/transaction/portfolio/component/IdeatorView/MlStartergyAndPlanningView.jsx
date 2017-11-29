import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
const FontAwesome = require('react-fontawesome');
const Select = require('react-select');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../utils/formElemUtil';
import { findIdeatorStrategyPlansActionHandler } from '../../actions/findPortfolioIdeatorDetails'
import { initializeMlAnnotator } from '../../../../../commons/annotator/mlAnnotator'
import { createAnnotationActionHandler } from '../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../commons/annotator/findAnnotations'
import { validateUserForAnnotation } from '../../actions/findPortfolioIdeatorDetails';
import NoData from '../../../../../commons/components/noData/noData';
import MlLoader from '../../../../../commons/components/loader/loader';

export default class MlPortfolioIdeatorStrategyPlansView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {},
      loading: true
    }
    this.fetchPortfolioInfo.bind(this);
    // this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery('#strategyPlansContent').annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit() {
      }
    });
  }

  annotatorEvents(event, annotation, editor) {
    if (!annotation) { return; }
    switch (event) {
      case 'create': {
        const response = this.createAnnotations(annotation);
      }
        break;
      case 'update': {
      }
        break;
      case 'annotationViewer': {
        if (annotation[0].id) {
          this.props.getSelectedAnnotations(annotation[0]);
        } else {
          this.props.getSelectedAnnotations(annotation[1]);
        }
      }
        break;
    }
  }

  async createAnnotations(annotation) {
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'strategyplans', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }

  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'strategyplans');
    const resp = JSON.parse(response.result);
    const annotations = this.state.annotations;
    this.setState({ annotations: JSON.parse(response.result) })

    const quotes = [];

    _.each(this.state.annotations, (value) => {
      quotes.push({
        id: value.annotatorId,
        text: value.quote.text,
        quote: value.quote.quote,
        ranges: value.quote.ranges,
        userName: value.userName,
        roleName: value.roleName,
        profileImage: value.profileImage,
        createdAt: value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
  }

  componentWillMount() {
    this.fetchPortfolioInfo();
    const resp = this.validateUserForAnnotation();
    return resp
  }
  componentDidMount() {
    $('.actions_switch').click();

    $('#timeLine').popover({
      title: 'Timeline',
      html: true,
      placement: 'top',
      container: '.admin_main_wrap',
      content: $('.ml_timeline').html()
    });
    $(document).on('click', '.add_comment', (e) => {
      $('.comment-input-box').slideToggle();
    });


    initalizeFloatLabel();
  }
  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({ isUserValidForAnnotation: response })
      this.initalizeAnnotaor();
      this.fetchAnnotations();
    }
  }
  async fetchPortfolioInfo() {
    const response = await findIdeatorStrategyPlansActionHandler(this.props.portfolioDetailsId);
    if (response) {
      this.setState({ portfolioIdeatorInfo: response, loading: false });
      _.each(response.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }
  }

  render() {
    const loading = this.state.loading ? this.state.loading : false;
    return (
      <div>

        <div className="requested_input">

          <div className="col-lg-12 col-sm-12">
            <div className="row">
              <h2>Strategy and Planning</h2>
              <div id="strategyPlansContent" className="panel-form-view hide_unlock">
                <div className="panel panel-default">
                  <div className="panel-heading">
                        Strategy and Planning
                    <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isStrategyPlansPrivate" />
                  </div>
                  <div className="panel-body">
                    {loading === true ? (<MlLoader/>) : (<p>{this.state.portfolioIdeatorInfo && this.state.portfolioIdeatorInfo.spDescription ? this.state.portfolioIdeatorInfo.spDescription : (<NoData tabName={this.props.tabName}/>)}</p>)}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    )
  }
}
