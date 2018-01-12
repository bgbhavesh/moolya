import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor";

export default class MlInstitutionInformation extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:this.props.informationDetails || {},
      privateKey:{},
      editorValue: createValueFromString(this.props.informationDetails ? this.props.informationDetails.informationDescription : null)
    }
    this.handleBlur.bind(this);
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
  componentWillMount(){
    let empty = _.isEmpty(this.context.institutionPortfolio && this.context.institutionPortfolio.information)
    const editorValue = createValueFromString(this.context.institutionPortfolio && this.context.institutionPortfolio.information ? this.context.institutionPortfolio.information.informationDescription : null);
    if(!empty){
      this.setState({loading: false, data: this.context.institutionPortfolio.information, editorValue});
    }
  }

  handleBlur(value, keyName){
    let details =this.state.data;
    // let name  = e.target.name;
    details=_.omit(details,[keyName]);
    details=_.extend(details,{[keyName]: value.toString('html')});
    // this.setState({data:details}, function () {
    //   this.sendDataToParent()
    // })
    this.setState({ data: details, editorValue: value }, () => {
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
    this.props.getInstitutionInfo(data,this.state.privateKey)
  }

  onLockChange(fieldName,field, e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false;
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
    /* this.setState({data:details}, function () {
     this.sendDataToParent()
     })*/
  }

  updatePrivateKeys(){
    let response = this.props.informationDetails
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  render(){
    const { editorValue } = this.state;
    return (
      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Information</h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  {/* <textarea placeholder="Describe..." name="informationDescription" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.informationDescription}  onBlur={this.handleBlur.bind(this)}></textarea> */}
                  <MlTextEditor
                    value={editorValue}
                    handleOnChange={(value) => this.handleBlur(value, "informationDescription")}
                  />
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate"  onClick={this.onLockChange.bind(this,"informationDescription","isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate}/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MlInstitutionInformation.contextTypes = {
  institutionPortfolio: PropTypes.object,
};
