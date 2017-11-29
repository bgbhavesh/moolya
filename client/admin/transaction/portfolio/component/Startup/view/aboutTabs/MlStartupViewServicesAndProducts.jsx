/**
 * Created by vishwadeep on 21/8/17.
 */
import React from 'react';
import { render } from 'react-dom';
import NoData from '../../../../../../../commons/components/noData/noData';
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { createAnnotationActionHandler } from '../../../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'

export default class MlStartupViewServicesAndProducts extends React.Component {
  constructor(props) {
    super(props);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  componentDidMount() {
    this.initalizeAnnotaor()
    this.fetchAnnotations();
  }

  componentWillMount() {
    this.setState({ loading: false });
  }

  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery('#annotatorContent').annotator();
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
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'startupServices', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'startupServices');
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

  render() {
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="col-lg-12 col-sm-12" id="annotatorContent" >
            <div className="row">
              <h2>Service & Products</h2>
              <div className="panel panel-default panel-form-view">

                <div className="panel-body">
                  {this.props.serviceProductsDetails && this.props.serviceProductsDetails.spDescription ?
                    <p>this.props.serviceProductsDetails.spDescription</p> : <NoData tabName={this.props.tabName}/>}
                  {/* <p>{this.props.serviceProductsDetails && this.props.serviceProductsDetails.spDescription ? this.props.serviceProductsDetails.spDescription : ( */}
                  {/* <NoData tabName={this.props.tabName}/>)}</p> */}

                </div>
              </div>

            </div>
          </div>)}
      </div>
    )
  }
}
