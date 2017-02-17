import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findCityActionHandler} from '../actions/findCityAction'
import {updateCityActionHandler} from '../actions/updateCityAction'

class MlEditCity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.editCity.bind(this);
    this.findCity.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }

  componentWillMount() {
    const resp=this.findCity();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.editCity();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/countriesList");
  };

  async  findCity() {
    let id = this.props.config
    const response = await findCityActionHandler(id);
    this.setState({loading:false,data:response});

  }

  async  editCity() {
    let CountryDetails = {
      // id: this.refs.id.value,
      country: this.refs.country.value,
      // countryCode: this.refs.countryCode.value,
      // url: this.refs.url.value,
      status: this.refs.status.checked
    }
    console.log(CountryDetails)

    const response = await updateCityActionHandler(CountryDetails)
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
        handler: async(event) => this.props.handler(this.editCity.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
        {showLoader===true?( <div className="loader_wrap"></div>):( <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Edit City</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Country Name" className="form-control float-label" id=""/>

                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="City Name" className="form-control float-label" id=""/>

                  </div>
                  <div className="form-group">
                    <textarea placeholder="About" className="form-control float-label" id=""></textarea>

                  </div>

                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="State Name" className="form-control float-label" id=""/>

                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label" id=""/>

                  </div>

                  <div className="form-group switch_wrap inline_switch">
                    <label>Available on System</label>
                    <label className="switch">
                      <input type="checkbox" />
                      <div className="slider"></div>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
          />
        </div>)}
      </div>
    )
  }
};

export default MlEditCity = formHandler()(MlEditCity);
