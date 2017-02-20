import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {updateDocumentTypeActionHandler} from '../actions/updateDocumentTypeAction'
import {findDocumentTypeActionHandler} from '../actions/findDocumentTypeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlEditDocumentType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateDocumentType.bind(this);
    this.findDocumentType.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  componentWillMount() {
    const resp=this.findDocumentType();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateDocumentType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/documentTypeList");
  };
  async findDocumentType(){
    let documentTypeId=this.props.config
    const response = await findDocumentTypeActionHandler(documentTypeId);
    this.setState({loading:false,data:response});
  }

  async  updateDocumentType() {
    let DocTypeDetails = {
      docTypeName: this.refs.docTypeName.value,
      docTypeDisplayName: this.refs.displayName.value,
      about: this.refs.about.value,
      isActive: this.refs.documentTypeStatus.checked,
    }
    console.log(DocTypeDetails)

    const response = await updateDocumentTypeActionHandler(DocTypeDetails);
    return response;

  }

  // onStatusChange(e){
  //   const data=this.state.data;
  //   if(e.currentTarget.checked){
  //     this.setState({"data":{"isActive":true}});
  //   }else{
  //     this.setState({"data":{"isActive":false}});
  //   }
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
        handler: async(event) => this.props.handler(this.updateDocumentType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Edit Document Type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="id" defaultValue={this.state.data&&this.state.data._id} hidden="true"/>
                  <input type="text" ref="docTypeName" placeholder="Name" defaultValue={this.state.data&&this.state.data.docTypeName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about} className="form-control float-label" id=""></textarea>
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
                    <input type="text" ref="displayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.docTypeDisplayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="documentTypeStatus" checked={this.state.data&&this.state.data.isActive} />
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
      </div>
    )
  }
};

export default MlEditDocumentType = formHandler()(MlEditDocumentType);
