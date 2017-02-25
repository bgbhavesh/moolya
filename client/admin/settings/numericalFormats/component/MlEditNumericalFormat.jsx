import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {updateNumericalFormatActionHandler} from '../actions/updateNumericalFormatAction'
import {findNumericalFormatActionHandler} from '../actions/findNumericalFormatAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

class MlEditNumericalFormat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      data:{},
      // numberOfDigitsAfterDecimal: '',
      // measurementSystem: '',
      // // currencyFormat: '',
      // currencySymbol: '',
      // valueSeparator: '',
      // firstDayOfWeek: '',
    };
    this.addEventHandler.bind(this);
    this.updateLang.bind(this);
    this.findLang.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  componentWillMount() {
    const resp=this.findLang();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateLang();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/numericalFormatList");
  };
  async findLang(){
    let Id=this.props.config;
    const response = await findNumericalFormatActionHandler(Id);

    if(response) {
      this.setState({loading:false,data:response});
      if (this.state.data.numberOfDigitsAfterDecimal) {
        this.setState({numberOfDigitsAfterDecimal: this.state.data.numberOfDigitsAfterDecimal});
      }
      if (this.state.data.measurementSystem) {
        this.setState({measurementSystem: this.state.data.measurementSystem});
      }
      if (this.state.data.currencyFormat) {
        this.setState({currencyFormat: this.state.data.currencyFormat});
      }
      if (this.state.data.currencySymbol) {
        this.setState({currencySymbol: this.state.data.currencySymbol});
      }
      if (this.state.data.valueSeparator) {
        this.setState({valueSeparator: this.state.data.valueSeparator});
      }
    }
    this.setState({loading:false,data:response});
  }

  async  updateLang() {
    let Details = {
      _id: this.refs.id.value,
      numberOfDigitsAfterDecimal: this.state.numberOfDigitsAfterDecimal,
      measurementSystem: this.state.measurementSystem,
      currencyFormat: this.state.currencyFormat,
      currencySymbol: this.state.currencySymbol,
      valueSeparator: this.state.valueSeparator,
    }
    console.log(Details)

    const response = await updateNumericalFormatActionHandler(Details);
    return response;

  }
  optionsBySelectNumberOfDigitsAfterDecimal(val){
    this.setState({numberOfDigitsAfterDecimal:val})
  }
  optionsBySelectMeasurementSystem(val){
    this.setState({measurementSystem:val})
  }
  optionsBySelectValueSeparator(val){
    this.setState({valueSeparator:val})
  }
  optionsBySelectCurrencySymbol(val){
    this.setState({currencySymbol:val})
  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"currencyFormat":true}});
    }else{
      this.setState({"data":{"currencyFormat":false}});
    }
  }


  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.updateLang.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let clusterquery=gql` query{  
  data:fetchDocumentsType{
    value:_id
    label:docTypeName
  }  
}`;

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Edit Numerical Format</h2>
              <div className="col-md-6 nopadding-left">
                <input type="text" ref="id" defaultValue={this.state.data._id} hidden="true"/>
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false}  placeholder={"Number Of Digits After Decimal"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.numberOfDigitsAfterDecimal} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectNumberOfDigitsAfterDecimal.bind(this)} />
                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false}  placeholder={"Currency Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.currencySymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectCurrencySymbol.bind(this)} />
                    </div>

                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg left_wrap">
                  <ScrollArea
                    speed={0.8}
                    className="left_wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <form>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false}  placeholder={"Measurement System"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.measurementSystem} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectMeasurementSystem.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false}  placeholder={"Value Separator"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.valueSeparator} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectValueSeparator.bind(this)} />
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label>Currency Format</label>
                        <label className="switch">
                          <input type="checkbox" ref="status"  checked={this.state.data&&this.state.data.currencyFormat} onChange={this.onStatusChange.bind(this)}/>
                          <div className="slider"></div>
                        </label>
                      </div>
                      <br className="brclear"/>
                    </form>
                  </ScrollArea>
                </div>
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
          </div>)}
      </div>
    )
  }
};

export default MlEditNumericalFormat = formHandler()(MlEditNumericalFormat);
