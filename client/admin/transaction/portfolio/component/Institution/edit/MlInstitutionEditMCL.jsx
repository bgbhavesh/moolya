import React, {Component, PropTypes}  from "react";
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
import {fetchInstitutionDetailsHandler} from '../../../actions/findPortfolioInstitutionDetails'

const MEMBERKEY = 'memberships'
const LICENSEKEY = 'licenses'
const COMPLIANCEKEY = 'compliances'

export default class MlInstitutionEditMCL extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      memberships: {},
      licenses: {},
      compliances: {},
      privateKey: {},
      privateFields: []
    }
    this.onLockChange.bind(this);
    this.handleBlur.bind(this);
    this.updateprivateFields.bind(this)
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    //this.updateprivateFields();
  }

  updateprivateFields() {
    var that = this
    setTimeout(function () {
      _.each(that.state.privateFields, function (pf) {
        $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  async fetchPortfolioDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId = that.props.portfolioDetailsId;
    if (that.context.institutionPortfolio && (that.context.institutionPortfolio.memberships || that.context.institutionPortfolio.compliances || that.context.institutionPortfolio.licenses)) {
      this.setState({
        memberships: that.context.institutionPortfolio.memberships,
        compliances: that.context.institutionPortfolio.compliances,
        licenses: that.context.institutionPortfolio.licenses
      });
      data = {
        memberships: that.context.institutionPortfolio.memberships,
        licenses: that.context.institutionPortfolio.compliances,
        compliances: that.context.institutionPortfolio.licenses
      }
    } else {
      var responseM = await fetchInstitutionDetailsHandler(portfoliodetailsId, MEMBERKEY);
      if (responseM && responseM.memberships) {
        var object = responseM.memberships;
        object = _.omit(object, '__typename')
        this.setState({memberships: object});
        this.setState({privateFields: object.privateFields});
      }
      var responseC = await fetchInstitutionDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
      if (responseC && responseC.compliances) {
        var object = responseC.compliances;
        object = _.omit(object, '__typename')
        this.setState({compliances: object});

        var pf = this.state.privateFields;
        if (object.privateFields) {
          pf = pf.concat(object.privateFields)
          this.setState({privateFields: pf});
        }
      }
      var responseL = await fetchInstitutionDetailsHandler(portfoliodetailsId, LICENSEKEY);
      if (responseL && responseL.licenses) {
        var object = responseL.licenses;
        object = _.omit(object, '__typename')
        this.setState({licenses: object});
        var pf = this.state.privateFields;
        if (object.privateFields) {
          pf = pf.concat(object.privateFields)
          this.setState({privateFields: pf});
        }
      }

      data = {
        memberships: this.state.memberships,
        licenses: this.state.licenses,
        compliances: this.state.compliances
      }
    }

    this.setState({loading: false, data: data})
    this.updateprivateFields();
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

  onLockChange(fieldName, type, tabName, e) {
    var isPrivate = false;
    let details = this.state.data || {};
    let key = e.target.id;
    let className = e.target.className;
    let mcl = details[type];
    if (details && mcl) {
      if (className.indexOf("fa-lock") != -1) {
        mcl[key] = true
        details[type] = mcl;
      } else {
        mcl[key] = false
        details[type] = mcl;
      }
    } else {
      if (className.indexOf("fa-lock") != -1) {
        details = _.extend(details, {[type]: {[key]: true}});
        isPrivate = true;
      } else {
        details = _.extend(details, {[type]: {[key]: false}});
      }
    }

    var privateKey = {
      keyName: fieldName,
      booleanKey: type,
      isPrivate: isPrivate,
      tabName: tabName
    }
    this.setState({privateKey: privateKey})

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

    if (data['memberships'])
      data['memberships'] = _.omit(data['memberships'], ["privateFields"])

    if (data['licenses'])
      data['licenses'] = _.omit(data['licenses'], ["privateFields"])

    if (data['compliances'])
      data['compliances'] = _.omit(data['compliances'], ["privateFields"])


    this.props.getInstitutionMCL(data, this.state.privateKey)
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="portfolio-main-wrap">
            <h2>MCL</h2>

            <div className="col-md-6 col-sm-6 nopadding-left">
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">Membership</div>
                <div className="panel-body ">
                  <div className="form-group nomargin-bottom">
                    <textarea placeholder="Describe..." name="membershipDescription" className="form-control"
                              id="cl_about"
                              defaultValue={this.state.data && this.state.data.memberships && this.state.data.memberships.membershipDescription ? this.state.data.memberships.membershipDescription : ""}
                              onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                    <FontAwesome name='unlock' className="input_icon un_lock" id="isMDPrivate"
                                 onClick={this.onLockChange.bind(this, "membershipDescription", "isMDPrivate", MEMBERKEY)}/>
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
                    <textarea placeholder="Describe..." name="complianceDescription" className="form-control"
                              id="cl_about"
                              defaultValue={this.state.data && this.state.data.compliances && this.state.data.compliances.complianceDescription ? this.state.data.compliances.complianceDescription : ""}
                              onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                    <FontAwesome name='unlock' className="input_icon fa-unlock un_lock" id="isCDPrivate"
                                 onClick={this.onLockChange.bind(this, "complianceDescription", "isCDPrivate", COMPLIANCEKEY)}/>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="panel panel-default panel-form-view">
                <div className="panel-heading">Licenses</div>
                <div className="panel-body ">
                  <div className="form-group nomargin-bottom">
                    <textarea placeholder="Describe..." name="licenseDescription" className="form-control" id="cl_about"
                              defaultValue={this.state.data && this.state.data.licenses && this.state.data.licenses.licenseDescription ? this.state.data.licenses.licenseDescription : ""}
                              onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                    <FontAwesome name='unlock' className="input_icon fa-unlock un_lock" id="isLDPrivate"
                                 onClick={this.onLockChange.bind(this, "licenseDescription", "isLDPrivate", LICENSEKEY)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>
    )
  }
};
MlInstitutionEditMCL.contextTypes = {
  institutionPortfolio: PropTypes.object,
};