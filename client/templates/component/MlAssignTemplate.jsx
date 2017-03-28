import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findStepTemplatesAssignmentActionHandler} from '../actions/findTemplatesAssignmentAction'
import formHandler from '../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

var options = [
  {value: 'select', label: 'Select Process'},
  {value: 'Registration', label: 'Registration'},
  {value: 'two', label: 'Two'}
];
var options1 = [
  {value: 'select', label: 'Select Sub Process'},
  {value: 'All', label: 'All'},
  {value: 'two', label: 'Two'}
];
var options2 = [
  {value: 'select', label: 'Select Sub Chapter'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options3 = [
  {value: 'select', label: 'Select Community'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options4 = [
  {value: 'select', label: 'Select Cluster'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options5 = [
  {value: 'select', label: 'Select Chapter'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options6 = [
  {value: 'select', label: 'Select User Type'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options7 = [
  {value: 'select', label: 'Select Identity Type'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options8 = [
  {value: 'select', label: 'Select Soft Template'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options9 = [
  {value: 'select', label: 'Select Hard Template'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];
var options10 = [
  {value: 'select', label: 'Select Portfolio Template'},
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];

class MlAssignTemplate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateAddressType.bind(this);
    this.findTemplate.bind(this);
    return this;
  }
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  componentWillMount() {
    const resp=this.findTemplate();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateAddressType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/addressTypeList");
  };

  async findTemplate(){
    let Id=this.props.config;
    const response = await findStepTemplatesAssignmentActionHandler(Id);
    this.setState({loading:false,data:response});
  }

  async  updateAddressType() {
    let Details = {
      id : this.props.config,
      addressName: this.refs.name.value,
      addressDisplayName: this.refs.displayName.value,
      aboutAddress: this.refs.about.value,
      addressUploadIcon : this.refs.upload.value,
      isActive: this.refs.status.checked,
    }
    const response = await updateAddressTypeActionHandler(Details);
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
        handler: async(event) => this.props.handler(this.updateAddressType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_main_wrap">
              <div className="admin_padding_wrap">
                <h2>Create Template</h2>
                <div className="col-md-6 nopadding-left">
                  <div className="form_bg left_wrap">
                    <ScrollArea
                      speed={0.8}
                      className="left_wrap"
                      smoothScrolling={true}
                      default={true}
                    >
                      <form>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options1} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options4} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options5} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options2} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options3} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options6} className="float-label"/>
                        </div>
                        <div className="form-group">
                          <Select name="form-field-name"value="select" options={options7} className="float-label"/>
                        </div>
                      </form>
                    </ScrollArea>
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
                      <div className="panel panel-default">
                        <div className="panel-heading">Test</div>
                        <div className="panel-body">
                          <div className="form-group">
                            <Select name="form-field-name"value="select" options={options8} className="float-label"/>
                          </div>
                          <div className="form-group">
                            <Select name="form-field-name"value="select" options={options9} className="float-label"/>
                          </div>
                          <div className="form-group">
                            <Select name="form-field-name"value="select" options={options10} className="float-label"/>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">Internal Subchapter Access</div>
                        <div className="panel-body">
                          <div className="ml_tabs">
                            <ul  className="nav nav-pills">
                              <li className="active">
                                <a  href="#1a" data-toggle="tab">Soft</a>
                              </li>
                              <li><a href="#2a" data-toggle="tab">Hard</a>
                              </li>
                              <li><a href="#3a" data-toggle="tab">Portfolio</a>
                              </li>
                            </ul>
                            <div className="tab-content clearfix">
                              <div className="tab-pane active" id="1a">
                                <div className="list-group nomargin-bottom">
                                  <a className="list-group-item">Registtration-Ideator-T1
                                    <FontAwesome className="btn btn-xs btn-mlBlue pull-right" name='eye'/>
                                  </a>
                                  <a className="list-group-item">Soft-Ideator-Premium
                                    <FontAwesome className="btn btn-xs btn-mlBlue pull-right" name='eye-slash'/>
                                  </a>
                                  <a className="list-group-item">Registtration-Company-T1
                                    <FontAwesome className="btn btn-xs btn-mlBlue pull-right" name='eye'/>
                                  </a>
                                </div>
                              </div>
                              <div className="tab-pane" id="2a">
                              </div>
                              <div className="tab-pane" id="3a">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <span className="actions_switch show_act"></span>
                <div className="bottom_actions_block show_block">
                  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
                  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
                  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
                  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
                  <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
};

export default MlAssignTemplate = formHandler()(MlAssignTemplate);
