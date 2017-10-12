/**
 * Created by Birendra on 21/8/17.
 */
import React, {Component}  from "react";
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Rating = require('react-rating');
import MlInstitutionViewAboutusTabs from './MlInstitutionViewAboutusTabs'
import {fetchDetailsInstitutionActionHandler} from '../../../../../portfolio/actions/findPortfolioInstitutionDetails'
import NoData from '../../../../../../../commons/components/noData/noData';

export default class MlInstitutionViewAboutLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {aboutInstitution: false, institutionAboutUs: [], institutionAboutUsList: []}
    this.fetchPortfolioDetails.bind(this);
    this.selectedTab=this.selectedTab.bind(this);
  }



  // getPortfolioInstitutionAboutUsDetails(details, tabName, privateKey) {
    // this.props.getAboutus(details, tabName, privateKey);
  // }
  componentDidMount()
  {
    var className = this.props.isAdmin ? "admin_header" : "app_header";
    var WinHeight = $(window).height();
    $('.md_scroll').height(WinHeight-($('.'+className).outerHeight(true)+255));
    $('.sm_scroll').height(WinHeight-($('.'+className).outerHeight(true)+535));
  }

  componentWillMount() {
    if(FlowRouter.getQueryParam('subtab') && FlowRouter.getQueryParam('tab')==='About'){
      this.setState({aboutInstitution: true});
    }
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await fetchDetailsInstitutionActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, institutionAboutUs: response, institutionAboutUsList: response});
    }
  }

  selectedTab(activeTab) {
    this.setState({aboutInstitution: true,activeTab:activeTab})
    this.props.backClickHandler(this.getInstitutionState.bind(this))
  }

  getInstitutionState() {
    this.setState({aboutInstitution: false})
    this.props.backClickHandler();
  }

  render() {
    let aboutUsImages = null;
    let institutionAboutUs = this.state.institutionAboutUs;
    if (institutionAboutUs) {
      let clients = institutionAboutUs.clients;
      if (clients) {
        let logos = []
        _.map(clients, function (client) {
          if (client.logo) {
            logos.push(client.logo)
          }
        })
        if (logos.length > 0) {
          aboutUsImages = logos.map(function (items, id) {
            return ( <img src={items.fileUrl} key={id}/>)

          })
        }
      }
    }
    return (
      <div>
        {this.state.aboutInstitution === false ? (<div className=" portfolio-main-wrap">
          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          ><h2>Portfolio</h2>
            <div className="col-md-6 col-sm-6 nopadding">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">About Us<a href="" className="pull-right ellipsis-menu"><FontAwesome
                  name='ellipsis-h' onClick={e=>this.selectedTab('About Us')}/></a></div>
                <div className="panel-body">
                  <div className="md_scroll">
                    <ScrollArea
                      speed={0.8}
                      className="md_scroll"
                      smoothScrolling={true}
                      default={true}
                    >
                  <p>{this.state.institutionAboutUs.aboutUs && this.state.institutionAboutUs.aboutUs.institutionDescription?this.state.institutionAboutUs.aboutUs.institutionDescription:(<NoData tabName="aboutUs"/>)}</p>
                    </ScrollArea>
                  </div>
                  </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 nopadding-right">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading ">Rating <a href="" className="pull-right ellipsis-menu"><FontAwesome
                  name='ellipsis-h' onClick={e=>this.selectedTab('Rating')}/></a></div>
                <div className="panel-body rating_small">
                  <div className="star_ratings">
                    <Rating
                      empty="fa fa-star-o empty"
                      full="fa fa-star fill"
                      fractions={2}
                      initialRate={this.state.institutionAboutUs.rating && this.state.institutionAboutUs.rating.rating ? Number(this.state.institutionAboutUs.rating.rating) : 4}
                      readonly={true}
                    />
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="col-md-12 nopadding">
                  <div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Clients <a href="" className="pull-right ellipsis-menu"><FontAwesome
                      name='ellipsis-h' onClick={e=>this.selectedTab('Clients')}/></a></div>
                    <div className="panel-body">
                      <div className="sm_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="sm_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                      {aboutUsImages&&aboutUsImages.length?<div>{aboutUsImages}</div>:(<NoData tabName="clients"/>)}
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 nopadding">
                  <div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Service & Products <a href=""
                                                                         className="pull-right ellipsis-menu"><FontAwesome
                      name='ellipsis-h' onClick={e=>this.selectedTab('Services And Products')}/></a></div>
                    <div className="panel-body">
                      <div className="sm_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="sm_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                      <p>{this.state.institutionAboutUs.serviceProducts && this.state.institutionAboutUs.serviceProducts.spDescription?this.state.institutionAboutUs.serviceProducts.spDescription:(<NoData tabName="serviceProducts"/>)}</p>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 nopadding">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Information <a href=""
                                                                className="pull-right ellipsis-menu"><FontAwesome
                    name='ellipsis-h' onClick={e=>this.selectedTab('Information')}/></a></div>
                  <div className="panel-body">
                    <div className="sm_scroll">
                      <ScrollArea
                        speed={0.8}
                        className="sm_scroll"
                        smoothScrolling={true}
                        default={true}
                      >
                    <ul className="list-info">
                      <li>{this.state.institutionAboutUs.information && this.state.institutionAboutUs.information.informationDescription?this.state.institutionAboutUs.information.informationDescription:(<NoData tabName="information"/>)}</li>
                    </ul>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollArea>
        </div>) : (<div>{<MlInstitutionViewAboutusTabs getInstitutionState={this.getInstitutionState.bind(this)}
                                                   portfolioDetailsId={this.props.portfolioDetailsId}
                                                   institutionAboutUsDetails={this.state.institutionAboutUs}
                                                   getSelectedAnnotations={this.props.getSelectedAnnotations}
                                                   isApp={this.props.isApp}
                                                    activeTab={this.state.activeTab}></MlInstitutionViewAboutusTabs> }</div>)}
      </div>
    )
  }
};
// getPortfolioInstitutionAboutUsDetails={this.getPortfolioInstitutionAboutUsDetails.bind(this)}
