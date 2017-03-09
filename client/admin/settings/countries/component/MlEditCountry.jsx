import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findCountryActionHandler} from '../actions/findCountryAction'
import {updateCountryActionHandler} from '../actions/updateCountryAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';

class MlEditCountry extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{},url: ''};
    this.editCountry.bind(this);
    this.findCountry.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }

  componentWillMount() {
    const resp=this.findCountry();
    return resp;
  }

  componentDidUpdate(){
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async addEventHandler() {
    const resp=await this.editCountry();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/countriesList");
      else
        toastr.error(response.result);
    }
  };

  async  findCountry() {
    let id = this.props.config
    const response = await findCountryActionHandler(id);
    this.setState({loading:false,data:response});
    this.setState({url:this.state.data.url})
  }

  async  editCountry() {
    let CountryDetails = {
      id: this.refs.id.value,
      // country: this.refs.country.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      capital: this.refs.capital.value,
      url: this.refs.url.src,
      isActive: this.refs.status.checked
    };
    const response = await updateCountryActionHandler(CountryDetails);
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
        handler: async(event) => this.props.handler(this.editCountry.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
            <div className="admin_padding_wrap">
              <h2>Edit Country</h2>
              <div className="col-md-6 nopadding-left">
                <input type="text" ref="id" defaultValue={this.state.data._id} hidden="true"/>
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" ref="country" defaultValue={this.state.data && this.state.data.country} placeholder="Country Name" className="form-control float-label" disabled="disabled"/>

                    </div>
                    <div className="form-group">
                      <textarea ref="about" defaultValue={this.state.data && this.state.data.about} placeholder="About" className="form-control float-label" id=""></textarea>

                    </div>
                    <div className="form-group">
                      <input type="text" ref="capital" defaultValue={this.state.data && this.state.data.capital} placeholder="Capital" className="form-control float-label" disabled="disabled"/>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                    <div className="form-group ">
                      {/*<div className="fileUpload mlUpload_btn">
                        <span>Upload Image</span>
                        <input type="file" className="upload" />
                      </div>*/}
                      <div className="previewImg">
                        <img ref="url" src={this.state.url}/>
                      </div>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group">
                      <input type="text" ref="displayName" defaultValue={this.state.data && this.state.data.displayName} placeholder="Display Name" className="form-control float-label"/>
                    </div>

                    <div className="form-group switch_wrap inline_switch">
                      <label>Available on System</label>
                      <label className="switch">
                        <input type="checkbox" ref="status" id="status" checked={this.state.data && this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </form>
                </div>
              </div>

            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />
        </div>)}
      </div>
    )
  }
};

export default MlEditCountry = formHandler()(MlEditCountry);
