import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {updateRegionalActionHandler} from '../actions/updateRegionalAction'
import {findRegionalActionHandler} from '../actions/findRegionalAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlEditRegional extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateRegional.bind(this);
    this.findRegional.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  componentWillMount() {
    const resp=this.findRegional();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateRegional();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/regionalsList");
  };
  async findRegional(){
    let documentTypeId=this.props.config
    const response = await findRegionalActionHandler(documentTypeId);
    this.setState({loading:false,data:response});
  }

  async  updateRegional() {
    let Details = {
      _id : this.state.data._id,
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

    const response = await updateRegionalActionHandler(Details);
    return response;

  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
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
        handler: async(event) => this.props.handler(this.updateRegional.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Edit Regional</h2>
              <div className="col-md-6 nopadding-left">
                <input type="text" ref="id" defaultValue={this.state.data._id} hidden="true"/>
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" ref="cluster" defaultValue={this.state.data && this.state.data.clusterName} placeholder="Cluster" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="capital" defaultValue={this.state.data && this.state.data.capitalName} placeholder="Capital" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="phoneNumberFormat" defaultValue={this.state.data && this.state.data.regionalPhoneNumber} placeholder="Phone Number Format" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="currencyName" defaultValue={this.state.data && this.state.data.regionalCurrencyName} placeholder="Currency Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="currencyMarking" defaultValue={this.state.data && this.state.data.regionalCurrencyMarking} placeholder="Currency Marking" className="form-control float-label" id=""/>
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
                        <img ref="url" src={this.state.data.regionalFlag}/>
                      </div>
                      <div className="form-group">
                        <textarea ref="about" defaultValue={this.state.data && this.state.data.aboutRegion} placeholder="About" className="form-control float-label" id=""></textarea>

                      </div>
                      <div className="form-group">
                        <input type="text" ref="zipcodeFormat" defaultValue={this.state.data && this.state.data.regionalZipFormat} placeholder="Zipcode Format" className="form-control float-label" id=""/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref="currencySymbol" defaultValue={this.state.data && this.state.data.regionalCurrencySymbol} placeholder="Currency Symbol" className="form-control float-label" id=""/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref="currencyValue" defaultValue={this.state.data && this.state.data.regionalCurrencyValue} placeholder="Currency Value" className="form-control float-label" id=""/>
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
        )}
      </div>
    )
  }
};

export default MlEditRegional = formHandler()(MlEditRegional);
