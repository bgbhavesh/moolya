import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findTitleActionHandler} from '../actions/findTitleAction'
import {updateTitleActionHandler} from '../actions/updateTitleAction'
class MlEditTitle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateTitle.bind(this)
    this.findTitle.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findTitle();
    return resp;

  }

  async addEventHandler() {
    // const resp=await this.findRequestType
    //  return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/titleList");
  };
  async findTitle(){
    let TitleId=this.props.config
    const response = await findTitleActionHandler(TitleId);
    this.setState({loading:false,data:response});
  }
  async  updateTitle() {
    let TitleDetails = {
      id: this.props.config,
      titleName: this.refs.titleName.value,
      titleDisplayName: this.refs.titleDisplayName.value,
      aboutTitle: this.refs.aboutTitle.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateTitleActionHandler(TitleDetails)
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
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateTitle.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'save',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/titleList")
        }
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Edit Title</h2>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="titleName" placeholder="Name" defaultValue={this.state.data&&this.state.data.titleName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <textarea  ref="aboutTitle" placeholder="About" defaultValue={this.state.data&&this.state.data.aboutTitle}className="form-control float-label" id=""></textarea>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="titleDisplayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.titleDisplayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Status</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
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

export default MlEditTransactionType = formHandler()(MlEditTitle);
