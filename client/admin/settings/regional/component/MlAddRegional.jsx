import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addRegionalActionHandler} from '../actions/addRegionalAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlAddRegional extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createRegional.bind(this);
    this.state = {loading:true,data:{cluster:"India", capital:"Delhi",url: 'https://s3.ap-south-1.amazonaws.com/moolya-app-images/countries-flag/small/India.png'}};
    return this;
  }

  componentDidMount() {

  }

  async addEventHandler() {
    const resp=await this.createRegional();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/regionalsList");
  };

  async  createRegional() {
    let Details = {
      clusterName : this.state.data.cluster,
      capitalName : this.state.data.capital,
      regionalFlag : this.state.data.url,
      regionalPhoneNumber: this.refs.phoneNumberFormat.value,
      regionalCurrencyName: this.refs.currencyName.value,
      regionalCurrencyMarking: this.refs.currencyMarking.value,
      regionalZipFormat: this.refs.zipcodeFormat.value,
      regionalCurrencySymbol: this.refs.currencySymbol.value,
      regionalCurrencyValue: this.refs.currencyValue.value,
      aboutRegion: this.refs.about.value,
    }
    console.log(Details)

    const response = await addRegionalActionHandler(Details);
    return response;

  }

  // getSubDepartmentAvailability(details){
  //   console.log("details->"+details);
  //   this.setState({'subdepartmentAvailability':details})
  // }

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
        handler: async(event) => this.props.handler(this.createRegional.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Regional</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="cluster" defaultValue={this.state.data && this.state.data.cluster} placeholder="Cluster" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="capital" defaultValue={this.state.data && this.state.data.capital} placeholder="Capital" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="phoneNumberFormat" placeholder="Phone Number Format" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="currencyName" placeholder="Currency Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="currencyMarking" placeholder="Currency Marking" className="form-control float-label" id=""/>
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
                    <img ref="url" src={this.state.data.url}/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>

                  </div>
                  <div className="form-group">
                    <input type="text" ref="zipcodeFormat" placeholder="Zipcode Format" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="currencySymbol" placeholder="Currency Symbol" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="currencyValue" placeholder="Currency Value" className="form-control float-label" id=""/>
                  </div>
                  {/*<div className="form-group switch_wrap inline_switch">*/}
                    {/*<label>Status</label>*/}
                    {/*<label className="switch">*/}
                      {/*<input type="checkbox" ref="documentTypeStatus" />*/}
                      {/*<div className="slider"></div>*/}
                    {/*</label>*/}
                  {/*</div>*/}
                  <br className="brclear"/>
                </form>
              </ScrollArea>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>
    )
  }
};

export default MlAddRegional = formHandler()(MlAddRegional);
