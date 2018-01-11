import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { connect } from 'react-redux';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor";


class MlStartupSP extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:this.props.serviceProductsDetails || {},
      privateKey:{},
      editorValue: createValueFromString(this.props.serviceProductsDetails ? this.props.serviceProductsDetails.spDescription : null)
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
  componentWillMount(){
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.serviceProducts)
    const editorValue = createValueFromString(this.context.startupPortfolio && this.context.startupPortfolio.serviceProducts ? this.context.startupPortfolio.serviceProducts.spDescription : null);
    if(!empty){
      this.setState({loading: false, data: this.context.startupPortfolio.serviceProducts,editorValue});
    }
  }

  handleBlur(value, keyName){
    let details =this.state.data;
    // let name  = e.target.name;
    details=_.omit(details,[name]);
    // details=_.extend(details,{[name]:e.target.value});
    details=_.extend(details,{[keyName]: value.toString('html')});
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
    this.props.getStartupSP(data,this.state.privateKey)
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
    let response = this.props.serviceProductsDetails
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
            <h2>Service & Products</h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                <MlTextEditor
                    value={editorValue}
                    handleOnChange={(value) => this.handleBlur(value, "spDescription")}
                  />
                  {/* <textarea placeholder="Describe..." name="spDescription" className="form-control" id="cl_about"  defaultValue={this.state.data&&this.state.data.spDescription} onBlur={this.handleBlur.bind(this)}></textarea> */}
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate"  onClick={this.onLockChange.bind(this, "spDescription", "isDescriptionPrivate")}/>
                </div>

              </div>
            </div>


          </div> </div>
      </div>








    )
  }
}
MlStartupSP.contextTypes = {
  startupPortfolio: PropTypes.object,
};


// const mapStateToProps = (state, ownProps) => {
//   return {
//     keys: state.mlStartupEditTemplateReducer.privateKeys
//   };
// }
//
// export default connect(mapStateToProps)(MlStartupSP);
export default MlStartupSP;
