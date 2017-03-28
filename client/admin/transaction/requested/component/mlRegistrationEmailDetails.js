import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect';
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction';
import {findUserRegistartionActionHandler} from '../actions/findUserRegistrationDocument'
import {findRegistrationActionHandler} from '../actions/findRegistration';
import {updateRegistrationInfoDetails} from '../actions/updateRegistration'
import update from 'immutability-helper';

export default class EmailDetails extends React.Component{
  constructor(props){
    super(props);

    this.state={
      loading:true,
      selectedEmailTab : null,
      selectedEmailTypeLabel : " ",
      selectedEmailTypeValue : null,
      /* selectedValuesList : [],*/
      emailDetailsObject : {"emailIdType": " ", "emailIdTypeName": " ", 'emailId': ''},
      emailDetails: this.props.registrationInfo.emailInfo || []

    }
    //this.optionsBySelectNumberType.bind(this)
    this.findRegistration.bind(this)
    return this;
  }

  async findRegistration(){
    let registrationId=this.props.registerId;

    const response = await findRegistrationActionHandler(registrationId);

    this.setState({loading:false,emailDetails:response.emailInfo});
    //this.setState({'isMoolyaChecked':this.state.data&&this.state.data.isMoolya})
    //return response;
  }
  emailTabSelected(){
    this.setState({selectedEmailTab:true});
    this.findRegistration();
  }


  async onSavingEmailDetails(index,value){
    let detailsType = "EMAILTYPE";
    let registerid = this.props.registerId;


      let emailList = this.state.emailDetailsObject;
      emailList.emailIdType = this.state.selectedEmailTypeValue,
      emailList.emailIdTypeName = this.state.selectedEmailTypeLabel,
      emailList.emailId = this.refs["emailId"].value;
      const response = await addRegistrationStep3Details(emailList,detailsType,registerid);
      if(response){
        if(!response.success){
          toastr.error(response.result);
        }
        this.findRegistration();
      }


    //this.findRegistration.bind(this);
  }
  async onUpdatingEmailDetails(index,value){
    let detailsType = "EMAILTYPE";
    let registerid = this.props.registerId;


      if (index !== -1) {
        // do your stuff here
        let updatedComment = update(this.state.emailDetails[index], {emailIdTypeName : {$set: this.state.selectedEmailTypeLabel},emailIdType : {$set: this.state.selectedEmailTypeValue},emailId : {$set: this.refs["emailId"+index].value}});

        let newData = update(this.state.emailDetails, {
          $splice: [[index, 1, updatedComment]]
        });


        const response = await updateRegistrationInfoDetails(newData,detailsType,registerid);
        if(response){
          this.findRegistration();

        }
      }



  }
  optionsBySelectEmailType(selectedIndex,handler,selectedObj){

    this.setState({selectedEmailTypeValue : selectedIndex,selectedEmailTypeLabel:selectedObj.label});
  }
  updateEmailOptions(index, did, selectedValue, selObject,callback){
    /* let selectedSocialLinkArray =  this.state.socialLinkArray || []
     let selectedArrayObject = selectedSocialLinkArray[index] || {};
     selectedArrayObject =  JSON.parse(JSON.stringify(selectedArrayObject));*/
    if (index !== -1) {
      // do your stuff here
      let updatedComment = update(this.state.emailDetails[index], {emailIdTypeName : {$set: selObject.label},emailIdType : {$set: did},emailId : {$set: this.refs["emailId"+index].value}});

      let newData = update(this.state.emailDetails, {
        $splice: [[index, 1, updatedComment]]
      });
      this.setState({emailDetails : newData,selectedEmailTypeValue : did,selectedEmailTypeLabel : selObject.label});

    }

  }

  async onDeleteEmail(index,value){

    let listArray = update(this.state.emailDetails, {
      $splice: [[index, 1]]
    });
    let detailsType = "EMAILTYPE";
    let registerid = this.props.registerId;
    const response = await updateRegistrationInfoDetails(listArray,detailsType,registerid);
    this.setState({loading:false,emailDetails:response.emailInfo});
  }

  render(){

    let that=this;
    let emailTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let emailTypeOption={options: { variables: {type : "EMAILTYPE",hierarchyRefId:this.props.clusterId}}};

    return (<div className="panel-body">


        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#emailA" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='minus-square'/></b></a>
            </li>
            {that.state.emailDetails.map(function(options,key){

              return(
                <li key={key} onClick={that.emailTabSelected.bind(that,key)}>
                  <a data-toggle="pill" href={'#emailIdType'+key} className="add-contact">
                    <FontAwesome name='plus-square' />{options.emailIdTypeName}</a>
                </li>)


            })}
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="emailA">
              <div className="form-group">
                <Moolyaselect multiSelect={false} ref={'emailType'}
                              placeholder="Select Email Type"
                              className="form-control float-label" selectedValue={this.state.selectedEmailTypeValue}
                              valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={emailTypeQuery}
                              queryOptions={emailTypeOption} onSelect={this.optionsBySelectEmailType.bind(this)}
                              isDynamic={true}/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Email Id" ref={'emailId'} className="form-control float-label" id=""/>
              </div>
              <div className="ml_btn">
                <a href="#" className="save_btn" onClick={this.onSavingEmailDetails.bind(this)}>Save</a>
              </div>
            </div>
            {that.state.emailDetails.map(function(options,key) {
              return(<div className="tab-pane" id={'emailIdType'+key} >
                <div className="form-group">
                  <Moolyaselect multiSelect={false} ref={'emailIdType'+key}
                                placeholder="Select Email Type"
                                className="form-control float-label" selectedValue={options.emailIdType}
                                valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={emailTypeQuery}
                                queryOptions={emailTypeOption} onSelect={that.updateEmailOptions.bind(that,key)}
                                isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text" ref={'emailId'+key} placeholder="Enter URL" valueKey={options.emailId} className="form-control float-label" defaultValue={options.emailId}/>
                </div>
                <div className="ml_btn">
                  <a href="#" className="edit_btn"  onClick = {that.onUpdatingEmailDetails.bind(that,key)}>Save</a>
                  <a href="#" className="cancel_btn" onClick = {that.onDeleteEmail.bind(that,key)}>Cancel</a>
                </div>
              </div>)
            })}


          </div>

        </div>
      </div>

    )}
}
