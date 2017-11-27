/**
 * Created by vishwadeep on 21/8/17.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');
const Rating = require('react-rating');
import MlStartupViewAboutusTabs from './MlStartupViewAboutusTabs'
import { fetchDetailsStartupActionHandler } from '../../../../../portfolio/actions/findPortfolioStartupDetails'
import NoData from '../../../../../../../commons/components/noData/noData';
import generateAbsolutePath from '../../../../../../../../lib/mlGenerateAbsolutePath';
export default class MlStartupViewAboutLanding extends Component {
  constructor(props) {
    super(props)
    this.state = { aboutStartup: false, startupAboutUs: [], startupAboutUsList: [] }
    this.fetchPortfolioDetails.bind(this);
    this.selectedTab = this.selectedTab.bind(this);
  }


  // getPortfolioStartupAboutUsDetails(details, tabName, privateKey) {
  // this.props.getAboutus(details, tabName, privateKey);
  // }

  componentDidMount() {
    const className = this.props.isAdmin ? 'admin_header' : 'app_header';
    const WinHeight = $(window).height();
    const height = this.props.isAdmin ? 465 : 535;
    $('.md_scroll').height(WinHeight - ($(`.${className}`).outerHeight(true) + 255));
    $('.sm_scroll').height(WinHeight - ($(`.${className}`).outerHeight(true) + height));
  }

  componentWillMount() {
    if (FlowRouter.getQueryParam('subtab') && FlowRouter.getQueryParam('tab') === 'About') {
      this.setState({ aboutStartup: true });
    }
    const resp = this.fetchPortfolioDetails();
    return resp;
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({ loading: false, startupAboutUs: response, startupAboutUsList: response });
    }
  }

  selectedTab(activeTab) {
    this.setState({ aboutStartup: true, activeTab })
    this.props.backClickHandler(this.getStartUpState.bind(this))
  }

  getStartUpState() {
    this.setState({ aboutStartup: false })
    this.props.backClickHandler();
  }

  render() {
    let aboutUsImages = null;
    const startupAboutUs = this.state.startupAboutUs;
    if (startupAboutUs) {
      const clients = startupAboutUs.clients;
      if (clients) {
        const logos = []
        _.map(clients, (client) => {
          if (client.logo) {
            logos.push(client.logo)
          }
        })
        if (logos.length > 0) {
          aboutUsImages = logos.map((items, id) => (<img src={generateAbsolutePath(items.fileUrl)} key={id}/>))
        }
      }
    }
    return (
      <div>
        {this.state.aboutStartup === false ? (<div className=" portfolio-main-wrap">
          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          ><h2>Portfolio</h2>
            <div className="col-md-6 col-sm-6 nopadding">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">About Us<a href="" className="pull-right ellipsis-menu"><FontAwesome
                  name='ellipsis-h' onClick={e => this.selectedTab('About Us')}/></a></div>
                <div className="panel-body">
                  <div className="md_scroll">
                    <ScrollArea
                      speed={0.8}
                      className="md_scroll"
                      smoothScrolling={true}
                      default={true}
                    >
                      {this.state.startupAboutUs.aboutUs && this.state.startupAboutUs.aboutUs.startupDescription ? <p>{this.state.startupAboutUs.aboutUs.startupDescription}</p> : (<NoData tabName="aboutUs"/>)}
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 nopadding-right">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading ">Rating <a href="" className="pull-right ellipsis-menu"><FontAwesome
                  name='ellipsis-h' onClick={e => this.selectedTab('Rating')}/></a></div>
                <div className="panel-body rating_small">
                  <div className="star_ratings">
                    <Rating
                      empty="fa fa-star-o empty"
                      full="fa fa-star fill"
                      fractions={2}
                      initialRate={this.state.startupAboutUs.rating && this.state.startupAboutUs.rating.rating ? Number(this.state.startupAboutUs.rating.rating) : 4}
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
                      name='ellipsis-h' onClick={e => this.selectedTab('Clients')}/></a></div>
                    <div className="panel-body text-center">
                      <div className="sm_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="sm_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                          {aboutUsImages && aboutUsImages.length ? <div>{aboutUsImages}</div> : (<NoData tabName="Clients"/>)}
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 nopadding">
                  <div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Service & Products <a
                      href=""
                      className="pull-right ellipsis-menu"><FontAwesome
                        name='ellipsis-h' onClick={e => this.selectedTab('Services And Products')}/></a></div>
                    <div className="panel-body">
                      <div className="sm_scroll">
                        <ScrollArea
                          speed={0.8}
                          className="sm_scroll"
                          smoothScrolling={true}
                          default={true}
                        >
                          {this.state.startupAboutUs.serviceProducts && this.state.startupAboutUs.serviceProducts.spDescription ? <p>{this.state.startupAboutUs.serviceProducts.spDescription}</p> : (<NoData tabName="serviceProducts"/>)}
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 nopadding">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Information <a
                    href=""
                    className="pull-right ellipsis-menu"><FontAwesome
                      name='ellipsis-h' onClick={e => this.selectedTab('Information')}/></a></div>
                  <div className="panel-body">
                    <div className="sm_scroll">
                      <ScrollArea
                        speed={0.8}
                        className="sm_scroll"
                        smoothScrolling={true}
                        default={true}
                      >
                        {this.state.startupAboutUs.information && this.state.startupAboutUs.information.informationDescription ?
                          <ul className="list-info">
                            <li>{this.state.startupAboutUs.information.informationDescription}</li>
                          </ul>
                          : (<NoData tabName="information"/>)}
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollArea>
        </div>) : (<div>{<MlStartupViewAboutusTabs
          getStartUpState={this.getStartUpState.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          startupAboutUsDetails={this.state.startupAboutUs}
          getSelectedAnnotations={this.props.getSelectedAnnotations}
          isApp={this.props.isApp}
          activeTab={this.state.activeTab}></MlStartupViewAboutusTabs> }</div>)}
      </div>
    )
  }
}
// getPortfolioStartupAboutUsDetails={this.getPortfolioStartupAboutUsDetails.bind(this)}
