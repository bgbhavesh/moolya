import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findStateActionHandler} from '../actions/findStateAction'
import {updateStateActionHandler} from '../actions/updateStateAction'

class MlEditState extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.editState.bind(this);
    this.findState.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }

  componentWillMount() {
    const resp=this.findState();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.editState();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/statesList");
  };

  async  findState() {
    let id = this.props.config
    const response = await findStateActionHandler(id);
    this.setState({loading:false,data:response});

  }

  async  editState() {
    let StateDetails = {
      // id: this.refs.id.value,
      name: this.refs.country.value,
      // countryCode: this.refs.countryCode.value,
      // url: this.refs.url.value,
      status: this.refs.status.checked
    }
    console.log(StateDetails)

    const response = await updateStateActionHandler(CountryDetails)
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
        handler: async(event) => this.props.handler(this.editState.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
            <h2>Edit State</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Country Name" className="form-control float-label" id=""/>

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

export default MlEditState = formHandler()(MlEditState);
