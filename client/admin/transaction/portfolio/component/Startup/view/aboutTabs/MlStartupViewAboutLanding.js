/**
 * Created by vishwadeep on 21/8/17.
 */
import React, {Component}  from "react";
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Rating = require('react-rating');
import MlStartupViewAboutusTabs from './MlStartupViewAboutusTabs'
import {fetchDetailsStartupActionHandler} from '../../../../../portfolio/actions/findPortfolioStartupDetails'
import NoData from '../../../../../../../commons/components/noData/noData';

export default class MlStartupViewAboutLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {aboutStartup: false, startupAboutUs: [], startupAboutUsList: []}
    this.fetchPortfolioDetails.bind(this);
  }



  // getPortfolioStartupAboutUsDetails(details, tabName, privateKey) {
    // this.props.getAboutus(details, tabName, privateKey);
  // }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, startupAboutUs: response, startupAboutUsList: response});
    }
  }

  selectedTab(field, e) {
    this.setState({aboutStartup: true})
    this.props.backClickHandler(this.getStartUpState.bind(this))
  }

  getStartUpState() {
    this.setState({aboutStartup: false})
    this.props.backClickHandler();
  }

  render() {
    let aboutUsImages = null;
    let startupAboutUs = this.state.startupAboutUs;
    if (startupAboutUs) {
      let clients = startupAboutUs.clients;
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
                  name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
                <div className="panel-body panel-body-scroll" style={{'height': '384px'}}>
                  <p>{this.state.startupAboutUs.aboutUs && this.state.startupAboutUs.aboutUs.startupDescription?this.state.startupAboutUs.aboutUs.startupDescription: (<NoData tabName="aboutUs"/>)}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 nopadding-right">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading ">Rating <a href="" className="pull-right ellipsis-menu"><FontAwesome
                  name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
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
                      name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
                    <div className="panel-body text-center panel-body-scroll">
                      {aboutUsImages && aboutUsImages.length?<div>{aboutUsImages}</div>:(<NoData tabName="Clients"/>)}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 nopadding">
                  <div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Service & Products <a href=""
                                                                         className="pull-right ellipsis-menu"><FontAwesome
                      name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
                    <div className="panel-body panel-body-scroll">
                      <p>{this.state.startupAboutUs.serviceProducts && this.state.startupAboutUs.serviceProducts.spDescription?this.state.startupAboutUs.serviceProducts.spDescription:(<NoData tabName="serviceProducts"/>)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 nopadding">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Information <a href=""
                                                                className="pull-right ellipsis-menu"><FontAwesome
                    name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
                  <div className="panel-body">
                    <ul className="list-info">
                      <li>{this.state.startupAboutUs.information && this.state.startupAboutUs.information.informationDescription?this.state.startupAboutUs.information.informationDescription:(<NoData tabName="information"/>)}</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </ScrollArea>
        </div>) : (<div>{<MlStartupViewAboutusTabs getStartUpState={this.getStartUpState.bind(this)}
                                                   portfolioDetailsId={this.props.portfolioDetailsId}
                                                   startupAboutUsDetails={this.state.startupAboutUs}
                                                   getSelectedAnnotations={this.props.getSelectedAnnotations}
                                                   isApp={this.props.isApp}></MlStartupViewAboutusTabs> }</div>)}
      </div>
    )
  }
};
// getPortfolioStartupAboutUsDetails={this.getPortfolioStartupAboutUsDetails.bind(this)}
