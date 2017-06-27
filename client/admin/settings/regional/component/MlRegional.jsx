import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {upsertRegionalActionHandler} from '../actions/upsertRegionalAction'
import {findRegionalActionHandler} from '../actions/findRegionalAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {initalizeFloatLabel} from '../../../utils/formElemUtil';
import MlLoader from '../../../../commons/components/loader/loader'
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import ScrollArea from 'react-scrollbar';
let Select = require('react-select');
class MlRegional extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      numberOfDigitsAfterDecimal: '',
      measurementSystem:'',
      currencyFormat:'',
      currencySymbol:'',
      valueSeparator:'',
      data:[],
      loading:true
    }
    this.addEventHandler.bind(this);
    this.createRegional.bind(this);
    return this;
  }

  componentDidUpdate() {
    initalizeFloatLabel();
    var WinHeight = $(window).height();
    $('.admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));
  }
  componentWillMount() {
    const resp=this.findRegional();
    return resp;

  }
  async findRegional(){
    const response = await findRegionalActionHandler();
    if(response.length>0) {
      this.setState({loading: false, data: response[0].regionalInfo});
       if (this.state.data.numberOfDigitsAfterDecimal) {
          this.setState({numberOfDigitsAfterDecimal: this.state.data.numberOfDigitsAfterDecimal});
       }
       if (this.state.data.measurementSystem) {
          this.setState({measurementSystem: this.state.data.measurementSystem});
        }
       if (this.state.data.currencyFormat) {
          this.setState({measurementSystem: this.state.data.measurementSystem});
       }
       if (this.state.data.currencySymbol) {
        this.setState({currencySymbol: this.state.data.currencySymbol});
        }
        if (this.state.data.valueSeparator) {
         this.setState({valueSeparator: this.state.data.valueSeparator});
       }
    }else{
      this.setState({loading: false});
    }
  }

  async addEventHandler() {
    const resp=await this.createRegional();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if(response){
      toastr.success('Successfully Saved');
      FlowRouter.go("/admin/settings/regionalsList");
    }

  };

  async  createRegional() {
    let regionalInfo = {
      clusterName :this.refs.cluster.value ,
      capitalName : this.refs.cluster.capitalName,
      regionalFlag : '',
      regionalPhoneNumber: this.refs.phoneNumberFormat.value,
      regionalCurrencyName: this.refs.currencyName.value,
      regionalCurrencyMarking: this.refs.currencyMarking.value,
      regionalZipFormat: this.refs.zipcodeFormat.value,
      regionalCurrencySymbol: this.refs.currencySymbol.value,
      regionalCurrencyValue: this.refs.currencyValue.value,
      aboutRegion: this.refs.about.value,
      numberOfDigitsAfterDecimal:this.state.numberOfDigitsAfterDecimal,
      measurementSystem: this.state.measurementSystem,
      currencyFormat: this.state.currencyFormat,
      currencySymbol: this.state.currencySymbol,
      valueSeparator: this.state.valueSeparator,
    }
    const response = await upsertRegionalActionHandler(regionalInfo);
    return response;

  }
   optionsBySelectNumberOfDigitsAfterDecimal(data){
    this.setState({numberOfDigitsAfterDecimal:data.value})
   }
    optionsBySelectMeasurementSystem(data){
      this.setState({measurementSystem:data.value})
    }
     optionsBySelectValueSeparator(data){
        this.setState({valueSeparator:data.value})
     }
    optionsBySelectCurrencySymbol(val){
       this.setState({currencySymbol:val})
     }
   handleBlur(){
     //var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
       if(this.refs.phoneNumberFormat.value.match('^[0-9]+$')){
         return true;
       }else{
           toastr.error("Please Enter Valid Phone Number")
       }
   }
  render(){
    let MlActionConfig = [

      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createRegional.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async (event) => {
          FlowRouter.go("/admin/settings/regionalsList")
        }
      }
    ];
     let clusterquery=gql` query{  
          data:fetchCurrency{
               label:currencyName
               value:_id
              label:currencyName
    }  
     }`;
     let decimalsLimit = [
       {value: '0', label: '0'},
       {value: '1', label: '1'},
       {value: '2', label: '2'},
       {value: '3', label: '3'},
    ]
     let measurementType = [
        {value: 'US System', label: 'US System'},
        {value: 'Metric System', label: 'Metric System'},
     ]
      let valueSeperators = [
       {value: ',', label: ','},
       {value: '.', label: '.'},
       {value: '/', label: '/'},
       {value: '_', label: '_'},
       {value: ';', label: ';'},
       {value: ':', label: ':'},
       {value: '-', label: '-'},

      ]
    let numberOfDigitsAfterDecimalActive='',measurementSystemActive='',valueSeparatorActive=''
      if(this.state.numberOfDigitsAfterDecimal){
         numberOfDigitsAfterDecimalActive='active'
      }
      if(this.state.measurementSystem){
         measurementSystemActive='active'
      }
         if(this.state.valueSeparator){
         valueSeparatorActive='active'
         }
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?(<MlLoader/>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Regional</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" ref="cluster" defaultValue={this.state.data && this.state.data.clusterName} placeholder="Cluster" className="form-control float-label" readOnly="readOnly"  id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="capitalName" defaultValue={this.state.data && this.state.data.capitalName} placeholder="Capital" className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="phoneNumberFormat" defaultValue={this.state.data && this.state.data.regionalPhoneNumber} placeholder="Phone Number Format" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="currencyName" defaultValue={this.state.data && this.state.data.regionalCurrencyName} placeholder="Currency Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="currencyMarking" defaultValue={this.state.data && this.state.data.regionalCurrencyMarking} placeholder="Currency Format" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                         <span className={`placeHolder ${numberOfDigitsAfterDecimalActive}`}>Number Of Digits After Decimal </span>
                      <Select  name="form-field-name"  options={decimalsLimit} placeholder={"Number Of Digits After Decimal"}  value={this.state.numberOfDigitsAfterDecimal} onChange={this.optionsBySelectNumberOfDigitsAfterDecimal.bind(this)} className="float-label" />

                    </div>
                    <div className="form-group">
                          <Moolyaselect multiSelect={false}  placeholder={"Currency Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.currencySymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectCurrencySymbol.bind(this)} />
                    </div>
                    <div className="form-group">
                     <span className={`placeHolder ${measurementSystemActive}`}>Measurement System </span>
                     <Select  name="form-field-name"  options={measurementType} placeholder={"Measurement System"}  value={this.state.measurementSystem} onChange={this.optionsBySelectMeasurementSystem.bind(this)}  className="float-label" />
                    </div>
                    <div className="form-group">
                       <span className={`placeHolder ${valueSeparatorActive}`}>Value Separator</span>
                       <Select  name="form-field-name"  options={valueSeperators} placeholder={"Value Separator"}   value={this.state.valueSeparator} onChange={this.optionsBySelectValueSeparator.bind(this)}   className="float-label"/>
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
                      <div className="previewImg">
                        {/*<img ref="url" src={this.state.data.regionalFlag}/>*/}
                      </div>
                      <div className="form-group">
                        <textarea ref="about" defaultValue={this.state.data && this.state.data.aboutRegion} placeholder="About" className="form-control float-label" id=""></textarea>

                      </div>
                      <div className="form-group">
                        <input type="text" ref="zipcodeFormat" defaultValue={this.state.data && this.state.data.regionalZipFormat} placeholder="ZipCode" className="form-control float-label" id=""/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref="currencySymbol" defaultValue={this.state.data && this.state.data.regionalCurrencySymbol} placeholder="Currency Symbol" className="form-control float-label" id=""/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref="currencyValue" defaultValue={this.state.data && this.state.data.regionalCurrencyValue} placeholder="Currency Value" className="form-control float-label" id=""/>
                      </div>
                      <br className="brclear"/>
                    </form>
                  </ScrollArea>
                </div>
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
          </div>
        )}
      </div>
    )
  }
};

export default MlRegional = formHandler()(MlRegional);
