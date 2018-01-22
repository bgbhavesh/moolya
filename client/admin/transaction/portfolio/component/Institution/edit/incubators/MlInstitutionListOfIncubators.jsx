import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchInstitutionDetailsHandler} from "../../../../actions/findPortfolioInstitutionDetails";
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor"
const KEY = "listOfIncubators"

export default class MlInstitutionListOfIncubators extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      // data:this.props.serviceProductsDetails || {},
      data:{},
      privateKey:{},
      listOfIncubators:{}
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
    let empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.listOfIncubators)
    if(empty){
      const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.listOfIncubators) {
        const editorValue = createValueFromString(response.listOfIncubators.listOfIncubatorsDescription);
        var object = response.listOfIncubators;
        object = _.omit(object, '__typename')
        // this.setState({data: object});
        this.setState({loading: false,data: object,privateFields:object.privateFields,editorValue:editorValue});
      }else{
        this.setState({loading:false})
      }
    }else{
      const editorValue = createValueFromString(that.context.institutionPortfolio.listOfIncubators.listOfIncubatorsDescription);
      this.setState({loading: false, data: that.context.institutionPortfolio.listOfIncubators,editorValue});
    }
    this.updatePrivateKeys()
  }

  handleBlur(value,keyName){
    let details =this.state.data;
    // let name  = e.target.name;
    details=_.omit(details,[name]);
    // details=_.extend(details,{[name]:e.target.value});
    details = _.extend(details, { [keyName]: value.toString('html') });
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
    this.props.getListOfIncubators(data, this.state.privateKey)
  }
  onLockChange(fieldName,field, e){
    var isPrivate = false;
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
    }else{
      details=_.extend(details,{[key]:false});
    }
    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate}
    this.setState({privateKey:privateKey})
    this.setState({data:details}, function () {
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
                <h2>List Of Incubators</h2>
                <div className="panel panel-default panel-form">

                  <div className="panel-body">

                    <div className="form-group nomargin-bottom">
                      {/* <textarea placeholder="Describe..." name="listOfIncubatorsDescription" className="form-control" id="cl_about"  defaultValue={this.state.data&&this.state.data.listOfIncubatorsDescription} onBlur={this.handleBlur.bind(this)}></textarea> */}
                      <MlTextEditor
                      value={editorValue}
                      handleOnChange={(value) => this.handleBlur(value, "listOfIncubatorsDescription")}
                    />
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isListOfIncubatorsPrivate" defaultValue={this.state.data&&this.state.data.isListOfIncubatorsPrivate} onClick={this.onLockChange.bind(this,"listOfIncubatorsDescription", "isListOfIncubatorsPrivate")}/>
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
MlInstitutionListOfIncubators.contextTypes = {
  institutionPortfolio: PropTypes.object,
};
