import React, { Component, PropTypes }  from "react";
// import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor";

class MlStartupLegal extends Component{
  constructor(props, context){
    super(props);
    this.state = {
      loading: true,
      data: this.props.legalIssueDetails || {},
      privateKey: {},
      editorValue: createValueFromString(this.props.legalIssueDetails ? this.props.legalIssueDetails.legalDescription : null)
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
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.legalIssue)
    if(!empty){
      const editorValue = createValueFromString(this.context.startupPortfolio && this.context.startupPortfolio.legalIssue ? this.context.startupPortfolio.legalIssue.legalDescription : null);
      this.setState({ loading: false, data: this.context.startupPortfolio.legalIssue, editorValue });
    }
  }

  handleBlur(value, keyName) {
    let details = this.state.data;
    // let name  = e.target.name;
    details = _.omit(details, [keyName]);
    details = _.extend(details, { [keyName]: value.toString('html') });
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
    this.props.getStartupLegalIssue(data,this.state.privateKey)
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
  }

  updatePrivateKeys(){
    let response = this.props.legalIssueDetails
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
            <h2>Legal Issue</h2>
            <div className="panel panel-default panel-form">
              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  {/* <textarea placeholder="Describe..." name="legalDescription" className="form-control" id="cl_about" defaultValue={this.state.data && this.state.data.legalDescription} onBlur={this.handleBlur.bind(this)}></textarea> */}
                  <MlTextEditor
                    value={editorValue}
                    handleOnChange={(value) => this.handleBlur(value, "legalDescription")}
                  />
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "legalDescription", "isDescriptionPrivate")} />
                  <input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MlStartupLegal.contextTypes = {
  startupPortfolio: PropTypes.object,
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     keys: state.mlStartupEditTemplateReducer.privateKeys
//   };
// }
//
// export default connect(mapStateToProps)(MlStartupLegal);
export default MlStartupLegal;
