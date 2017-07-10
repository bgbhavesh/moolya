import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import MlLoader from "../../../../../../commons/components/loader/loader";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
import {
  fetchServiceProviderMemberships,
  fetchServiceProviderLicenses,
  fetchServiceProviderCompliances
} from "../../../actions/findPortfolioServiceProviderDetails";
var FontAwesome = require('react-fontawesome');

export default class MlStartupMCL extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      memberships: {},
      licenses: {},
      compliances: {},
      privateKey:{},
    }
    this.onLockChange.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId = that.props.portfolioDetailsId;
    // let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.memberships)
    // let compliancesEmpty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.compliances)
    // let licensesEmpty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.licenses)
    if (that.context.startupPortfolio && (that.context.startupPortfolio.memberships || that.context.startupPortfolio.compliances || that.context.startupPortfolio.licenses)) {
      this.setState({
        memberships: that.context.startupPortfolio.memberships,
        compliances: that.context.startupPortfolio.compliances,
        licenses: that.context.startupPortfolio.licenses
      });
      data = {
        memberships: that.context.startupPortfolio.memberships,
        licenses: that.context.startupPortfolio.compliances,
        compliances: that.context.startupPortfolio.licenses
      }
    } else {
      const responseM = await fetchServiceProviderMemberships(portfoliodetailsId);
      if (responseM) {
        this.setState({memberships: responseM});
      }
      _.each(responseM.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

      const responseC = await fetchServiceProviderCompliances(portfoliodetailsId);
      if (responseC) {
        this.setState({compliances: responseC});
      }
      _.each(responseC.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

      const responseL = await fetchServiceProviderLicenses(portfoliodetailsId);
      if (responseL) {
        this.setState({licenses: responseL});
      }
      _.each(responseL.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

      data = {
        memberships: this.state.memberships,
        licenses: this.state.licenses,
        compliances: this.state.compliances
      }
    }

    this.setState({loading: false, data: data})
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  handleBlur(type, e) {
    let details = this.state.data;
    let name = e.target.name;
    let mcl = details[type];
    if (details && mcl) {
      mcl[name] = e.target.value
      details[type] = mcl;
    } else {
      details = _.extend(details, {[type]: {[name]: e.target.value}});
    }
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  onLockChange(fieldName, field, type, e) {
    let details = this.state.data || {};
    let key = e.target.id;
    var isPrivate = false;
    let className = e.target.className;

    let mcl = details[type];
    if (details && mcl) {
      if (className.indexOf("fa-lock") != -1) {
        // details=_.extend(details,{[key]:true});
        mcl[key] = true
        details[type] = mcl;
        isPrivate = true
      } else {
        // details=_.extend(details,{[key]:false});
        mcl[key] = false
        details[type] = mcl;
      }
    } else {
      if (className.indexOf("fa-lock") != -1) {
        details = _.extend(details, {[type]: {[key]: true}});
      } else {
        details = _.extend(details, {[type]: {[key]: false}});
      }
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate}
    this.setState({privateKey:privateKey})
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent() {
    let data = this.state.data;
    for (var propName in data.compliances) {
      if (data['compliances'][propName] === null || data['compliances'][propName] === undefined) {
        delete data['compliances'][propName];
      }
    }
    for (var propName in data.licenses) {
      if (data['licenses'][propName] === null || data['licenses'][propName] === undefined) {
        delete data['licenses'][propName];
      }
    }
    for (var propName in data.memberships) {
      if (data['memberships'][propName] === null || data['memberships'][propName] === undefined) {
        delete data['memberships'][propName];
      }
    }
    data['memberships']=_.omit(data['memberships'],["privateFields"]);
    data['compliances']=_.omit(data['compliances'],["privateFields"]);
    data['licenses']=_.omit(data['licenses'],["privateFields"]);
    this.props.getServiceProviderMCL(data, this.state.privateKey)
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap portfolio-main-wrap">
              <h2>MCL</h2>
              <div className="main_wrap_scroll">
                <ScrollArea
                  speed={0.8}
                  className="main_wrap_scroll"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="col-md-6 col-sm-6 nopadding-left">
                    <div className="panel panel-default panel-form-view">
                      <div className="panel-heading">Membership</div>
                      <div className="panel-body ">
                        <div className="form-group nomargin-bottom">
                          <textarea placeholder="Describe..." name="membershipDescription" className="form-control" id="cl_about"
                                    defaultValue={this.state.data && this.state.data.memberships && this.state.data.memberships.membershipDescription ? this.state.data.memberships.membershipDescription : ""}
                                    onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock"
                                       id="isMembershipPrivate"
                                       onClick={this.onLockChange.bind(this, "membershipDescription", "isMembershipPrivate", "memberships")}/>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="col-md-6 col-sm-6 nopadding-right">
                    <div className="panel panel-default panel-form-view">
                      <div className="panel-heading">Compliances</div>
                      <div className="panel-body ">
                        <div className="form-group nomargin-bottom">
                          <textarea placeholder="Describe..." name="compliancesDescription" className="form-control" id="cl_about"
                                    defaultValue={this.state.data && this.state.data.compliances && this.state.data.compliances.compliancesDescription ? this.state.data.compliances.compliancesDescription : ""}
                                    onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock"
                                       id="isCompliancesPrivate"
                                       onClick={this.onLockChange.bind(this, "compliancesDescription", "isCompliancesPrivate", "compliances")}/>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="panel panel-default panel-form-view">
                      <div className="panel-heading">Licenses</div>
                      <div className="panel-body ">
                        <div className="form-group nomargin-bottom">
                          <textarea placeholder="Describe..." name="licensesDescription" className="form-control" id="cl_about"
                                    defaultValue={this.state.data && this.state.data.licenses && this.state.data.licenses.licensesDescription ? this.state.data.licenses.licensesDescription : ""}
                                    onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock"
                                       id="isLicensesPrivate"
                                       onClick={this.onLockChange.bind(this, "licensesDescription", "isLicensesPrivate", "licenses")}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>


          </div>)}
      </div>
    )
  }
};
MlStartupMCL.contextTypes = {
  startupPortfolio: PropTypes.object,
};
