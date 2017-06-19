import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { createActivityActionHandler , getActivityActionHandler}  from './../actions/activityActionHandler';

import MlActionComponent from '../../../../commons/components/actions/ActionComponent'

export default class Step1 extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      radioAction: "",
      radioAction2: "",
      selectedIndustryType:[],
      activityName:"",
      displayName:"",
      notes:"",
      deliverables:"",
      isInternal:false,
      isExternal:false,
      serviceCard:""
    }
    this.radioAction = this.radioAction.bind(this)
    this.radioAction2 =  this.radioAction2.bind(this)
    this.saveDetails.bind(this);
    // this.getDetails.bind(this)
  }

  // componentWillMount(){
  //   this.getDetails()
  // }

  // async getDetails(){
  //   const resp = await getActivityActionHandler()
  //
  // }


  radioAction(e){
    let value = e.target.value;
    this.setState({radioAction: value})
  }

  radioAction2(e) {
    let value = e.target.value;
    if(value === "Internal"){
      this.setState({isInternal:true, isExternal:false})
    }
    else if(value === "External"){
      this.setState({isExternal:true, isInternal: false})
    }
  }


  SelectIndustry(value){
    this.setState({selectedIndustryType:value})

  }
  updateHours(e){
    if(e.currentTarget.value >= 0) {
      this.setState({"hour":e.currentTarget.value});
    } else {
      this.setState({"hour":0});
    }
  }
updateMinutes(e){
  if(e.currentTarget.value >= 0) {
    this.setState({"minute":e.currentTarget.value});
  } else {
    this.setState({"minute":0});
  }
}

  textFieldSaves(type,e){
    switch(type){
      case "ActivityName":
        let activityNameValue = e.target.value;
        this.setState({activityName:activityNameValue})
        break;
      case "DisplayName":
        let displayNameValue = e.target.value;
        this.setState({displayName:displayNameValue})
        break;
      case "Notes":
        let notesValue = e.target.value;
        this.setState({notes:notesValue})
        break;
      case "Deliverables":
        let deliverablesValue= e.target.value;
        this.setState({deliverables:deliverablesValue})
        break;
    }
  }

  checkBoxHandler(e){
    let value = e.target.checked;
    this.setState({serviceCard:value})
  }

  async saveDetails(){
    console.log(createActivityActionHandler);
    let step1Details = {
      userId:" ",
      name: this.state.activityName,
      displayName:this.state.displayName,
      isInternal:this.state.isInternal,
      isExternal:this.state.isExternal,
      mode:this.state.radioAction,
      note:this.state.notes,
      deliverable:this.state.deliverables,
      industryTypes:this.state.selectedIndustryType,
      duration:{
        hours:this.state.hour,
        minutes:this.state.minute
      },
      isServiceCardElligible:this.state.serviceCard,
      createdAt: " "
    }
    const resp = await createActivityActionHandler(step1Details);
    let id = resp.result;
    this.props.setId(id)
    FlowRouter.setQueryParams({id:id})
  }

  componentWillMount(){}

  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }
  render(){

    let industryTypeQuery = gql`
    query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>

                <div className="form-group">
                  <input className="form-control float-label" placeholder="Activity Name" onBlur={this.textFieldSaves.bind(this,"ActivityName")}/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="radio1" type="radio" name="radio" onChange={this.radioAction2} value="Internal"/><label htmlFor="radio1"><span><span></span></span>Internal</label>
                  </div>
                  <div className="input_types">
                    <input id="radio2" type="radio" name="radio" onChange={this.radioAction2} value="External"/><label htmlFor="radio2"><span><span></span></span>External</label>
                  </div>
                  <br className="brclear"/>
                </div>
                {this.state.radioAction === "online"? <div className="form-group">
                  <span className="placeHolder active">Conversation type</span>
                  <select className="form-control"><option>Conversation type</option></select>
                </div> : <div></div>}
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Notes" onBlur={this.textFieldSaves.bind(this,"Notes")}></textarea>
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp;
                    <div className="form-group ">
                      <input type="number" onChange={(e)=>this.updateHours(e)} value={this.state.hour}  className="form-control "/>
                    </div>Hours
                    <div className="form-group ">
                      <input type="number" onChange={(e)=>this.updateMinutes(e)} value={this.state.minute}  className="form-control "/>
                    </div>
                    Mins
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Display Name" onBlur={this.textFieldSaves.bind(this,"DisplayName")}/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="Online" type="radio" name="radio" value="online" onChange={this.radioAction}/><label htmlFor="Online" ><span><span></span></span>Online</label>
                  </div>
                  <div className="input_types">
                    <input id="Offline" type="radio" name="radio" value="offline" onChange={this.radioAction} /><label htmlFor="Offline"  ><span><span></span></span>Offline</label>
                  </div>
                  <br className="brclear"/>
                </div>
                <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} queryType={"graphql"} query={industryTypeQuery}
                              isDynamic={true} placeholder="Select Industry Type"
                              onSelect={this.SelectIndustry.bind(this)}
                              selectedValue={this.state.selectedIndustryType}/>
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Profile Pic</span>
                    <input type="file" className="upload" />
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="check1" type="checkbox" name="check1" value="1" onChange={this.checkBoxHandler.bind(this)}/><label ><span><span></span></span>Eligible for service card</label>
                  </div>
                  <br className="brclear"/>
                </div>
              </form>
            </div>
          </div>
          <br className="brclear"/>
          <div className="panel panel-default">
            <div className="panel-heading">Deliverables</div>
            <div className="panel-body">
              <textarea className="form-control" onBlur={this.textFieldSaves.bind(this,"Deliverables")}></textarea>
            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div> </div>
    )
  }
};


