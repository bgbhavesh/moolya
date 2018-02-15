import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchInstitutionDetailsHandler} from "../../../../actions/findPortfolioInstitutionDetails";
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor"
const KEY = "policy"

export default class MlInstitutionPolicy extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      // data:this.props.serviceProductsDetails || {},
      data:{},
      privateKey:{},
      policy:{}
    }
    this.handleBlur = this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    this.updatePrivateKeys();
  }
  // componentWillMount(){
  //   let empty = _.isEmpty(this.context.companyPortfolio && this.context.companyPortfolio.serviceProducts)
  //   if(!empty){
  //     this.setState({loading: false, data: this.context.companyPortfolio.serviceProducts});
  //   }
  // }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.policy)
    if(empty){
      const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.policy) {
        const editorValue = createValueFromString(response && response.policy && response.policy.institutionPolicyDescription ? response.policy.institutionPolicyDescription : null);
        var object = response.policy;
        object = _.omit(object, '__typename')
        // this.setState({data: object});
        this.setState({loading: false,data: object,privateFields:object.privateFields,editorValue:editorValue});
      }else{
        this.setState({loading:false})
      }
    }else{
      const editorValue = createValueFromString(that.context.institutionPortfolio.policy && that.context.institutionPortfolio.policy.institutionPolicyDescription ? that.context.institutionPortfolio.policy.institutionPolicyDescription : null);
      this.setState({loading: false, data: that.context.institutionPortfolio.policy,editorValue});
    }
    this.updatePrivateKeys();
  }

  handleBlur(value,keyName){
    let details =this.state.data;
    // let name  = e.target.name;
    details=_.omit(details,[keyName]);
    details = _.extend(details, { [keyName]: value.toString('html') });
    // details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details,editorValue: value}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    data=_.omit(data,["privateFields"]);
    this.props.getInstitutionPolicy(data, this.state.privateKey)
  }
  onLockChange(fieldName,field, e){
    let isPrivate = false;
    const className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      isPrivate = true
    }
    const privateKey = { keyName: fieldName, booleanKey: field, isPrivate: isPrivate, tabName: KEY }
    this.setState({ privateKey: privateKey }, function () {
      this.sendDataToParent()
    })
  }

  updatePrivateKeys(){
    let response = this.state.data
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }


  render(){
    let that = this;
    const showLoader = that.state.loading;
    const { editorValue } = this.state;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="requested_input">
            <div className="col-lg-12">
              <div className="row">
                <h2>Our Policy</h2>
                <div className="panel panel-default panel-form">

                  <div className="panel-body">

                    <div className="form-group nomargin-bottom">
                      {/* <textarea placeholder="Describe..." name="institutionPolicyDescription" className="form-control" id="cl_about"  defaultValue={this.state.data&&this.state.data.institutionPolicyDescription} onBlur={this.handleBlur.bind(this)}></textarea> */}
                      <MlTextEditor
                    value={editorValue}
                    handleOnChange={(value) => this.handleBlur(value, "institutionPolicyDescription")}
                  />
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="institutionPolicyDescriptionPrivate" defaultValue={this.state.data&&this.state.data.institutionPolicyDescriptionPrivate} onClick={this.onLockChange.bind(this,"institutionPolicyDescription", "institutionPolicyDescriptionPrivate")}/>
                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>)}
      </div>
    )
  }
}
MlInstitutionPolicy.contextTypes = {
  institutionPortfolio: PropTypes.object,
};
