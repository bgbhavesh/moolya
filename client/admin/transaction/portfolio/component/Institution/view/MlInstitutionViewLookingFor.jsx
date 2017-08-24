import React from 'react';
var FontAwesome = require('react-fontawesome');
import {fetchInstitutionDetailsHandler} from '../../../actions/findPortfolioInstitutionDetails'
import {initializeMlAnnotator} from '../../../../../../commons/annotator/mlAnnotator'
import {findAnnotations} from '../../../../../../commons/annotator/findAnnotations'
import NoData from '../../../../../../commons/components/noData/noData';

const KEY = "lookingFor";
export default class MlInstitutionViewLookingFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {institutionLookingforList: []};
    this.fetchPortfolioInstitutionDetails.bind(this);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  componentDidMount(){
    this.initalizeAnnotaor()
    this.fetchAnnotations();
  }

  componentWillMount(){
    this.fetchPortfolioInstitutionDetails();
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
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"institutionLookingFor", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }



  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "institutionLookingFor");
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

  async fetchPortfolioInstitutionDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchInstitutionDetailsHandler(portfoliodetailsId, KEY);
    if (response && response.lookingFor) {
      this.setState({institutionLookingforList: response});
    }

    this.setState({lodaing:false})

  }
  render(){
    let that = this;
    let lookingforArray = (that.state.institutionLookingforList && that.state.institutionLookingforList.lookingFor) || [];
    if (lookingforArray && lookingforArray.length === 0) {
      return (<NoData tabName="Looking For" />);
    } else  {
      return (
        <div id="annotatorContent">
          <h2>Looking For</h2>
          <div className="col-lg-12">
            <div className="row">
              {lookingforArray && lookingforArray.map(function (details, idx) {
                return(<div className="col-lg-2 col-md-3 col-sm-4" key={idx}>
                  <div className="team-block">
                    <img src={details.logo&&details.logo.fileUrl} className="team_img" />
                    <h3>
                      {details.lookingForName&&details.lookingForName}
                    </h3>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      )
    }
  }
}