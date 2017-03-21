import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect';
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction';
import {findUserRegistartionActionHandler} from '../actions/findUserRegistrationDocument'

export default class Step4 extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      loading:true,
      selectedTab: null,
      selectedAddressLabel: " ",
      selectedValue: null,
      /* selectedValuesList : [],*/
      //addressInformation: addressInfoArray,
      /* addressDetails: [{
       "socialLinkType": " ", "socialLinkTypeName": "Add New", 'socialLinkUrl': '',
       }]*/
      socialLinkObject : {"socialLinkType": " ", "socialLinkTypeName": " ", 'socialLinkUrl': ''},
      socialLinkArray :[]


    }

  }
  /* componentWillMount() {
   const resp=this.findRegistration();
   return resp;
   }*/
  componentDidMount()
  {
    this.setState({loading:false,socialLinkArray:this.props.registrationInfo.socialLinksInfo||[]});
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  optionsBySelectSocialLinkType(selectedIndex,handler,selectedObj){

    this.setState({selectedValue : selectedIndex,selectedSocialLinkLabel:selectedObj.label});
  }

  compareQueryOptions(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  componentWillUpdate(nextProps){
    var socialLinkProps = nextProps.registrationInfo.socialLinksInfo;
    if(!this.compareQueryOptions(this.props.registrationInfo.socialLinksInfo,nextProps.registrationInfo.socialLinksInfo)){
      this.setState({loading:false,socialLinkArray:nextProps.registrationInfo.socialLinksInfo||[]});
    }
  }
  async onSavingSocialLink(){

    let socialLinkList = this.state.socialLinkObject;
    socialLinkList.socialLinkType = this.refs["socialLinkType"].props.selectedValue,
      socialLinkList.socialLinkTypeName = this.state.selectedSocialLinkLabel,
      socialLinkList.socialLinkUrl = this.refs["socialLinkTypeUrl"].value;

    const detailsType = "SOCIALLINKS";
    const registerid = this.props.registrationId;
    const response = await addRegistrationStep3Details(socialLinkList,detailsType,registerid);
    if(response){
      this.props.getRegistrationSocialLinks();

    }
    //this.findRegistration.bind(this);
  }

  async onUpdating(index,value) {
    let socialSitesArray = this.state.socialLinkArray || [];
    socialSitesArray[index].socialLinkType = this.refs["socialLinkType"+index].props.selectedValue,
      socialSitesArray[index].socialLinkTypeName = this.state.selectedSocialLinkLabel,
      socialSitesArray[index].socialLinkUrl = this.refs["socialLinkTypeUrl"+index].value;
    const detailsType = "SOCIALLINKS";
    //this.setState({"socialLinkArray" : socialSitesArray});
    const response = await addRegistrationStep3Details(socialSitesArray,detailsType);

  }

  render(){

    let that=this;
    const showLoader=this.state.loading;
    let socialLinkTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let socialLinkTypeOption={options: { variables: {type : "SOCIALLINKS",hierarchyRefId:"SxnyXxBLrhhW29uGr"}}};
    return (
      <div className="step_form_wrap step2">
        {showLoader===true?( <div className="loader_wrap"></div>):(
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">

            <div className="panel-heading">
              SocialLink Type
            </div>
            <div className="panel-body">


              <div className="ml_tabs">
                <ul  className="nav nav-pills">
                  <li className="active">
                    <a  href="#1a" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                  </li>
                  {that.state.socialLinkArray.map(function(options,key) {
                    return(
                      <li key={key} >
                        <a href={'#socialLink'+key} data-toggle="tab">{options.socialLinkTypeName}&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                      </li>
                    )
                  })}
                </ul>

                <div className="tab-content clearfix">
                  <div className="tab-pane active" id="1a">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} ref={'socialLinkType'}
                                    placeholder="Select Social Link"
                                    className="form-control float-label" selectedValue={this.state.selectedValue}
                                    valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={socialLinkTypeQuery}
                                    queryOptions={socialLinkTypeOption} onSelect={this.optionsBySelectSocialLinkType.bind(this)}
                                    isDynamic={true}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Enter URL" ref={'socialLinkTypeUrl'} className="form-control float-label" id=""/>
                    </div>
                    <div className="ml_btn">
                      <a href="#" className="save_btn" onClick={this.onSavingSocialLink.bind(this)}>Save</a>
                      <a href="#" className="cancel_btn">Cancel</a>
                    </div>
                  </div>
                  {that.state.socialLinkArray.map(function(options,key) {
                    console.log(options);
                    console.log(options.socialLinkType);
                    return(<div className="tab-pane" id={'socialLink'+key}  key={key} >
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} ref={'socialLinkType'+key}
                                      placeholder="Select Social Link"
                                      className="form-control float-label" selectedValue={options.socialLinkType}
                                      valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={socialLinkTypeQuery}
                                      queryOptions={socialLinkTypeOption} onSelect={that.optionsBySelectSocialLinkType.bind(that,key)}
                                      isDynamic={true}/>
                      </div>
                      <div className="form-group">
                        <input type="text" ref={'socialLinkTypeUrl'+key} placeholder="Enter URL" className="form-control float-label" defaultValue={options.socialLinkUrl}/>
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn"  onClick={that.onUpdating.bind(that,key)}>Save</a>
                        <a href="#" className="cancel_btn">Cancel</a>
                      </div>
                    </div>)
                  })}


                </div>

              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group steps_pic_upload">
                  <div className="previewImg ProfileImg">
                    <img src="/images/ideator_01.png"/>
                  </div>
                  <div className="fileUpload mlUpload_btn">
                    <span>Profile Pic</span>
                    <input type="file" className="upload" />
                  </div>

                </div>
              </form>
            </div>
          </div>
        </ScrollArea>)}
      </div>
    )
  }
};
