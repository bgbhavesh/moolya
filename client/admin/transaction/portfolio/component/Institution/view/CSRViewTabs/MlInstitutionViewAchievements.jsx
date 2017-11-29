/**
 * Created by Birendra on 21/8/17.
 */
import React from 'react';
// import {fetchInstitutionDetailsHandler} from '../../actions/findPortfolioInstitutionDetails'
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { createAnnotationActionHandler } from '../../../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'
import { fetchInstitutionDetailsHandler } from '../../../../actions/findPortfolioInstitutionDetails';
import NoData from '../../../../../../../commons/components/noData/noData';
import MlGenericAchievementsView from '../../../commons/MlGenericAchievementsView';

const KEY = 'achievements'

export default class MlInstitutionViewAchievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = { institutionAchievementsList: [], loading: true };
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.fetchPortfolioDetails.bind(this);
  }

  componentDidMount() {
    this.initalizeAnnotaor()
    this.fetchAnnotations();
    const WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;

    const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
    if (response && response.achievements) {
      this.setState({ loading: false, institutionAchievementsList: response.achievements });
    } else {
      this.setState({ loading: false })
    }
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
    const details = {
      portfolioId: this.props.portfolioDetailsId,
      docId: 'institutionAchievements',
      quote: JSON.stringify(annotation)
    }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'institutionAchievements');
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

  // async fetchPortfolioInstitutionDetails() {
  //   let that = this;
  //   let portfoliodetailsId = that.props.portfolioDetailsId;
  //   const response = await fetchInstitutionDetailsHandler(portfoliodetailsId, KEY);
  //   if (response) {
  //     this.setState({loading: false, institutionBranchesList: response});
  //   }
  // }

  render() {
    const that = this;
    // let branchesArray = that.state.institutionBranchesList || [];
    const achievementsArray = that.state.institutionAchievementsList || [];
    if (!this.state.loading && achievementsArray && achievementsArray.length === 0) {
      return (<NoData tabName="Achievements" />);
    }
    return (
      <div id="annotatorContent">
        <h2>Achievements</h2>
        <div className="col-lg-12">
          <MlGenericAchievementsView achievementsList={achievementsArray} isAdmin={this.props.isAdmin}/>
        </div>
      </div>
    )
  }
}
// && branchesArray.clients && branchesArray.clients
