import React, {Component, PropTypes} from "react";
import _ from "lodash";
import omitDeep from 'omit-deep-lodash';
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlInstitutionEditMCL from './MlInstitutionEditMCL';
import MlInstitutionEditManagement from './MlInstitutionEditManagement';
import MlInstitutionEditInvestor from './MlInstitutionEditInvestor';
import MlInstitutionEditAwards from './MlInstitutionEditAwards';
import MlInstitutionEditLookingFor from './MlInstitutionEditLookingFor';
import MlInstitutionEditChart from './MlInstitutionEditChart';
import MlInstitutionEditData from './MlInstitutionEditData';
import MlInstitutionAboutUs from "./aboutUs/MlInstitutionAboutUsLandingPage";
import MlInstitutionCSREditTabs from "./CSR/MlInstitutionCSREditTabs";
import MlInstitutionEditIntrapreneur from './MlInstitutionEditIntrapreneur';
import MlInstitutionEditRD from './MlInstitutionEditR&D';
import MlInstitutionEditPartners from './MlInstitutionEditPartners';
import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'

import {client} from '../../../../../core/apolloConnection'
import MlInstitutionIncubatorsEditTabs from "./incubators/MlInstitutionIncubatorsEditTabs"


export default class MlInstitutionEditTab extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], institutionPortfolio: {}, portfolioKeys: {privateKeys: [], removePrivateKeys: []}};
    this.getChildContext.bind(this)
    this.getManagementDetails.bind(this);
    this.getAwardsDetails.bind(this);
    this.getLookingForDetails.bind(this);
    this.getInstitutionMCL.bind(this)
  }

  componentWillMount() {
    let tabs = this.getTabComponents();

    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }

    this.setState({tabs: getTabs() || []});
  }

  getChildContext() {
    return {
      institutionPortfolio: this.state.institutionPortfolio,
      portfolioKeys: this.state.portfolioKeys
    }
  }

  componentDidMount() {
    setTimeout(function () {
      $('div[role="tab"]').each(function (index) {
        var test = $(this).text();
        $(this).empty();
        $(this).html('<div class="moolya_btn moolya_btn_in">' + test + '</div>');
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      $('.horizon-swiper').horizonSwiper();
    }, 10);
  }

  backClickHandler() {
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About",
        component: <MlInstitutionAboutUs key="1" getAboutus={this.getAboutus.bind(this)}
                                         portfolioDetailsId={this.props.portfolioDetailsId}
                                         backClickHandler={this.backClickHandler.bind(this)}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Management",
        component: <MlInstitutionEditManagement client={client} isAdmin={true} key="2" tabName={"management"}
                                                getManagementDetails={this.getManagementDetails.bind(this)}
                                                portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Investor",
        component: <MlInstitutionEditInvestor  client={client} key="3" getInvestorDetails={this.getInvestorDetails.bind(this)}
                                              portfolioDetailsId={this.props.portfolioDetailsId} tabName="investor"/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Data",
        component: <MlInstitutionEditData key="4" getDataDetails={this.getDataDetails.bind(this)} isAdmin={true}
                                          portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Charts",
        component: <MlInstitutionEditChart key="5" getInvestorDetails={this.getInvestorDetails.bind(this)}
                                           getChartDetails={this.getChartDetails.bind(this)} isAdmin={true}
                                           portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Awards",
        component: <MlInstitutionEditAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)}
                                            portfolioDetailsId={this.props.portfolioDetailsId} tabName="awardsRecognition"/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Library",
        component: <PortfolioLibrary key="7" client={client} isAdmin={false}
                                     portfolioDetailsId={this.props.portfolioDetailsId}/>
      }, //
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "M C & L",
        component: <MlInstitutionEditMCL key="8" getInstitutionMCL={this.getInstitutionMCL.bind(this)}
                                         portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Looking For",
        component: <MlInstitutionEditLookingFor key="9" getLookingForDetails={this.getLookingForDetails.bind(this)}
                                                portfolioDetailsId={this.props.portfolioDetailsId} tabName="lookingFor"/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Partner",
        component: <MlInstitutionEditPartners key="10" getPartnersDetails={this.getPartnersDetails.bind(this)} client={client}
                                              portfolioDetailsId={this.props.portfolioDetailsId} tabName="partners"/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "CSR",
        component: <MlInstitutionCSREditTabs key="11" getCSRDetails={this.getCSRDetails.bind(this)}
                                             portfolioDetailsId={this.props.portfolioDetailsId}
                                             backClickHandler={this.backClickHandler.bind(this)}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "R&D",
        component: <MlInstitutionEditRD key="12" getRDDetails={this.getRDDetails.bind(this)} client={client}
                                        portfolioDetailsId={this.props.portfolioDetailsId} tabName="researchAndDevelopment"/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Incubators",
        component: <MlInstitutionIncubatorsEditTabs key="13" getIncubators={this.getIncubators.bind(this)}
                                                    portfolioDetailsId={this.props.portfolioDetailsId}
                                                    backClickHandler={this.backClickHandler.bind(this)}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Intrapreneur",
        component: <MlInstitutionEditIntrapreneur key="14" client={client}
                                                  getIntrapreneurDetails={this.getIntrapreneurDetails.bind(this)}
                                                  portfolioDetailsId={this.props.portfolioDetailsId} tabName="intrapreneurRecognition"/>
      },
    ];
    return tabs;
  }

  getAboutus(details, tabName, privateKey, requiredFields) {
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    var object = omitDeep(data, 'logo');
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey, requiredFields);
  }

  getManagementDetails(details, privateKey, requiredFields) {
    let data = this.state.institutionPortfolio;
    if (data && !data.management) {
      data['management'] = [];
    }
    data['management'] = details;
    this.setState({institutionPortfolio: data})
    var object = omitDeep(data, 'logo');
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey, requiredFields);
  }

  getInvestorDetails(details, privateKey) {
    let data = this.state.institutionPortfolio;
    data['investor'] = details;
    this.setState({institutionPortfolio: data})
    var object = omitDeep(data, 'logo');
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey);
  }

  getDataDetails(details, tabName) {
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio: data});
  }


  getPartnersDetails(details, privateKey) {
    let data = this.state.institutionPortfolio;
    if (data && !data.partners) {
      data['partners'] = [];
    }
    data['partners'] = details;
    var object = omitDeep(data, 'logo');
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey);
  }

  getAwardsDetails(details, privateKey, requiredFields) {
    let data = this.state.institutionPortfolio;
    if (data && !data.awardsRecognition) {
      data['awardsRecognition'] = [];
    }
    data['awardsRecognition'] = details;
    var object = omitDeep(data, 'logo');
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey, requiredFields);
  }

  getRDDetails(details, privateKey, requiredFields) {
    let data = this.state.institutionPortfolio;
    if (data && !data.researchAndDevelopment) {
      data['researchAndDevelopment'] = [];
    }
    data['researchAndDevelopment'] = details;
    this.setState({institutionPortfolio: data})
    var object = omitDeep(data, 'logo')
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey, requiredFields);
  }

  getIntrapreneurDetails(details, privateKey) {
    let data = this.state.institutionPortfolio;
    if (data && !data.intrapreneurRecognition) {
      data['intrapreneurRecognition'] = [];
    }
    data['intrapreneurRecognition'] = details;
    this.setState({institutionPortfolio: data});
    var object = omitDeep(data, 'logo')
    this.props.getPortfolioDetails({institutionPortfolio: object}, privateKey);
  }

  getLookingForDetails(details, privateKey, requiredFields) {
    let data = this.state.institutionPortfolio;
    if (data && !data.lookingFor) {
      data['lookingFor'] = [];
    }
    data['lookingFor'] = details;
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, privateKey, requiredFields);
  }


  getChartDetails(details, tabName) {
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio: data});
  }


  getInstitutionMCL(details, privateKey) {
    let data = this.state.institutionPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, privateKey);
  }

  getCSRDetails(details, tabName, privateKey, requiredFields) {
    if (tabName == "reports") {
      let data = this.state.institutionPortfolio;
      data[tabName] = details;
      this.props.getPortfolioDetails({institutionPortfolio: data});
    } else {
      let data = this.state.institutionPortfolio;
      data[tabName] = details;
      this.props.getPortfolioDetails({institutionPortfolio: data}, privateKey, requiredFields);
    }
  }

  getIncubators(details, tabName, privateKey) {
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio: data}, privateKey);
  }

  getAllPrivateKeys(privateKeys, removePrivateKeys) {
    let obj = {
      privateKeys: privateKeys,
      removePrivateKeys: removePrivateKeys
    }
    this.setState({portfolioKeys: obj});
    return obj
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    if (newProps) {
      const resp = this.getAllPrivateKeys(newProps.privateKeys, newProps.removePrivateKeys);
      return resp
    }
  }

  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
MlInstitutionEditTab.childContextTypes = {
  institutionPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
