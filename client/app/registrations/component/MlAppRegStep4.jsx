import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from "../../commons/components/MlAppSelectWrapper";
import {addRegistrationStep3Details} from "../actions/addRegistrationStep3DetailsAction";
import {updateRegistrationInfoDetails} from "../actions/updateRegistration";
import {mlFieldValidations} from "../../../commons/validations/mlfieldValidation";
import update from "immutability-helper";
import {multipartASyncFormHandler} from "../../../commons/MlMultipartFormAction";
import MlAccordion from "../../../app/commons/components/MlAccordion";
import MlAppActionComponent from "../../../app/commons/components/MlAppActionComponent";
import {initalizeFloatLabel} from "../../../commons/utils/formElemUtil";
import MlLoader from "../../../commons/components/loader/loader";
import _underscore from "underscore";
// import MlActionComponent from "../../../commons/components/actions/ActionComponent";
var FontAwesome = require('react-fontawesome');
var diff = require('deep-diff').diff;


export default class MlAppRegStep4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedTab: false,
      selectedAddressLabel: null,
      selectedValue: null,
      socialLinkObject: {"socialLinkType": " ", "socialLinkTypeName": " ", 'socialLinkUrl': ''},
      socialLinkArray: [],
      uploadedProfilePic: "/images/ideator_01.png",
      activeTab: "active",
    }
  }

  componentDidMount() {
    this.setState({loading: false, socialLinkArray: this.props.registrationData.socialLinksInfo || []});
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (150 + $('.app_header').outerHeight(true)));
    // let registrationRecord = this.props.registrationData
    // let addressDetails = registrationRecord&&registrationRecord.addressInfo?registrationRecord.addressInfo:[]
    // /**
    //  * Check whether registration contains address array
    //  */
    // if(addressDetails&&addressDetails.length<1){
    //   toastr.error("Default Address is manditory")
    // }else if(addressDetails&&addressDetails.length>0){
    //   /**
    //    * If registration contains address array
    //    * Check isDefault Address Exist or Not
    //    */
    //   var found = addressDetails.some(function (el) {
    //     return el.isDefaultAddress == true;
    //   });
    //   if (!found) {
    //     /**
    //      * If registration contains address array
    //      * If default address not found throw an error
    //      */
    //
    //     toastr.error("Default Address is manditory")
    //
    //   }else if(found){
    //     /**
    //      * If registration contains address array
    //      * If default address exist
    //      * Check whether default address is active for single or multiple address
    //      */
    //     let addressData =  _.filter(addressDetails, {'isDefaultAddress': true});
    //     if(addressData&&addressData.length>1){
    //       toastr.error("Only one default address should exist")
    //     }
    //   }
    // }
  }

  optionsBySelectSocialLinkType(selectedIndex, handler, selectedObj) {

    this.setState({selectedValue: selectedIndex, selectedSocialLinkLabel: selectedObj.label});
  }

  updateOptions(index, did, selectedValue, selObject, callback) {
    /* let selectedSocialLinkArray =  this.state.socialLinkArray || []
     let selectedArrayObject = selectedSocialLinkArray[index] || {};
     selectedArrayObject =  JSON.parse(JSON.stringify(selectedArrayObject));*/
    if (index !== -1) {
      // do your stuff here
      let updatedComment = update(this.state.socialLinkArray[index], {
        socialLinkTypeName: {$set: selObject.label},
        socialLinkType: {$set: did},
        socialLinkUrl: {$set: this.refs["socialLinkTypeUrl" + index].value}
      });
      console.log(updatedComment);
      let newData = update(this.state.socialLinkArray, {
        $splice: [[index, 1, updatedComment]]
      });

      this.setState({socialLinkArray: newData, selectedValue: did, selectedSocialLinkLabel: selObject.label});

    }

  }

  componentDidUpdate() {
    initalizeFloatLabel();
  }

  async onDeleteSocialLink(index, value) {
    let listArray = update(this.state.socialLinkArray, {
      $splice: [[index, 1]]
    });
    let detailsType = "SOCIALLINKS";
    let registerid = this.props.registrationId;
    const response = await updateRegistrationInfoDetails(listArray, detailsType, registerid)
    if (response) {
      this.setState({loading: false, socialLinkArray: response.socialLinksInfo});
      this.props.getRegistrationSocialLinks();
      this.setState({activeTab: "active"});
      toastr.success("SocialLink removed successfully");
    }

  }

  /*
   compareQueryOptions(a, b) {
   return JSON.stringify(a) === JSON.stringify(b);
   };*/

  componentWillReceiveProps(nextProps) {
    var socialLinkProps = nextProps.registrationData.socialLinksInfo;
    /*if(!this.compareQueryOptions(this.props.registrationData.socialLinksInfo,nextProps.registrationInfo.socialLinksInfo)){*/
    this.setState({loading: false, socialLinkArray: nextProps.registrationData.socialLinksInfo || []});
    //}
  }

  isUpdated(){
    if(this.refs["socialLinkTypeUrl"].value){
      return false
    }else if(this.state.selectedSocialLinkLabel){
      return false
    }else{
      let newArray = this.state.socialLinkArray || []
      for (var i = 0, len = newArray.length; i < len; i++) {
        let newObject = {
          socialLinkUrl : this.refs["socialLinkTypeUrl" + i].value,
        }
        let oldObject = {
          socialLinkUrl : newArray[i]&&newArray[i].socialLinkUrl,
        }
        var differences = diff(oldObject, newObject);
        var filteredObject = _underscore.where(differences, {kind: "E"});
        if(filteredObject && filteredObject.length>0){
          return false
        }
      }
    }
    return true
  }

  async onSavingSocialLink(index, value) {
    let detailsType = "SOCIALLINKS";
    let registerid = this.props.registrationId;
    let refs = []
    refs.push(this.refs["socialLinkType"])
    refs.push(this.refs["socialLinkTypeUrl"])
    let ret = mlFieldValidations(refs)

    if (ret) {
      toastr.error(ret);
    } else {
      let socialLinkList = this.state.socialLinkObject;
      socialLinkList.socialLinkType = this.state.selectedValue,
        socialLinkList.socialLinkTypeName = this.state.selectedSocialLinkLabel,
        socialLinkList.socialLinkUrl = this.refs["socialLinkTypeUrl"].value;
      const response = await addRegistrationStep3Details(socialLinkList, detailsType, registerid);
      if (response) {
        if (!response.success) {
          toastr.error(response.result);
          this.props.getRegistrationSocialLinks();
        } else {
          this.props.getRegistrationSocialLinks();
          this.refs["socialLinkTypeUrl"].value = "";
          this.setState({selectedValue: "", selectedSocialLinkLabel: ""});
          toastr.success("SocialLink created successfully");
        }


      }
      //}
    }
    //this.findRegistration.bind(this);
  }

  onUpdating(index, value) {

    this.setState({"selectedTab": true});
    this.setState({activeTab: ""});

  }

  async onUpdatingSocialLinkDetails(index, value) {
    let detailsType = "SOCIALLINKS";
    let registerid = this.props.registrationId;

    if (index !== -1) {
      // do your stuff here

      let registrationDetails = this.props.registrationInfo.socialLinksInfo
      let dbData = _underscore.pluck(registrationDetails, 'socialLinkType') || [];
      let contactExist = null;
      if (this.state.selectedValue) {
        contactExist = _underscore.contains(dbData, this.state.selectedValue);
      }
      if (contactExist) {
        toastr.error("Social Link Type Already Exists!!!!!");
        this.props.getRegistrationSocialLinks();
      } else {
        let refs = []
        refs.push(this.refs["socialLinkType" + index])
        refs.push(this.refs["socialLinkTypeUrl" + index])
        let ret = mlFieldValidations(refs)

        if (ret) {
          toastr.error(ret);
        } else {
          let labelValue = this.state.selectedSocialLinkLabel ? this.state.selectedSocialLinkLabel : this.state.socialLinkArray[index].socialLinkTypeName;
          let valueSelected = this.state.selectedValue ? this.state.selectedValue : this.state.socialLinkArray[index].socialLinkType;
          let updatedComment = update(this.state.socialLinkArray[index], {
            socialLinkTypeName: {$set: labelValue},
            socialLinkType: {$set: valueSelected},
            socialLinkUrl: {$set: this.refs["socialLinkTypeUrl" + index].value}
          });

          let newData = update(this.state.socialLinkArray, {
            $splice: [[index, 1, updatedComment]]
          });


          const response = await updateRegistrationInfoDetails(newData, detailsType, registerid);
          if (response) {
            if (!response.success) {
              toastr.error(response.result);
            } else {
              toastr.success("SocialLink updated successfully");
            }
            this.props.getRegistrationSocialLinks();

          }
        }
      }
    }
  }

  onFileUpload(value) {
    let file = document.getElementById("profilePic").files[0];
    let data = {
      moduleName: "REGISTRATION",
      actionName: "UPLOAD",
      documentId: null,
      registrationId: this.props.registrationId
    };
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
    //this.props.onFileUpload(file,documentId);
  }

  onFileUploadCallBack(resp) {
    if (resp) {
      // this.setState({registrationDocuments:resp})
      //refresh the registration data in the pare
      //this.props.getRegistrationKYCDetails();
      this.setState({"uploadedProfilePic": resp.result})
      this.props.getRegistrationSocialLinks();


    }
  }

  async onClear(index, value) {
    this.refs["socialLinkTypeUrl" + index].value = "";
    /*
     let updatedComment = update(this.state.socialLinkArray[index], {
     socialLinkType :   {$set: ""}
     });

     let newData = update(this.state.socialLinkArray, {
     $splice: [[index, 1, updatedComment]]
     });
     this.setState({socialLinkArray : newData});
     let registrationDetails = _.cloneDeep(this.state.defaultData);
     let omitData = _.omit(registrationDetails["socialLinksInfo"][index], 'socialLinkType') || [];
     registrationDetails["socialLinksInfo"][index] = omitData
     this.setState({defaultData : registrationDetails});*/

  }


  render() {
    let MlActionConfig
    let userType = this.props.userType;
    let appActionConfig = [

      {
        showAction: true,
        actionName: 'exit',
        handler: null
      },
    ]

    export const genericPortfolioAccordionConfig = {
      id: 'registrationAccordion',
      panelItems: [
        {
          'title': 'Actions',
          isText: false,
          style: {'background': '#ef4647'},
          contentComponent: <MlAppActionComponent
            resourceDetails={{
              resourceId: 'registrationId',
              resourceType: 'registration'
            }}
            actionOptions={appActionConfig}/>
        }]
    }
    {/**need to pass generic regId*/
    }
    let that = this;
    const showLoader = this.state.loading;
    let socialLinkTypeQuery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let socialLinkTypeOption = {options: {variables: {type: "SOCIALLINKS", hierarchyRefId: this.props.clusterId}}};
    return (
      <div className="step_form_wrap step4">
        {showLoader === true ? ( <MlLoader/>) : (<div>
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
            <div className="col-md-6 nopadding-left">
              <form>
<div className="panel panel-default">
              <div className="panel-heading">
                Social Link Type
              </div>
              <div className="panel-body">


                <div className="ml_tabs">
                  <ul className="nav nav-pills">
                    <li className={this.state.activeTab}>
                      <a href="#1a" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='plus-square'/></b></a>
                    </li>
                    {that.state.socialLinkArray && (that.state.socialLinkArray.map(function (options, key) {
                      return (
                        <li key={key} onClick={() => that.onUpdating(key)}>
                          <a href={'#socialLink' + key} data-toggle="tab">{options.socialLinkTypeName}&nbsp;<b>
                            <FontAwesome name='minus-square' onClick={that.onDeleteSocialLink.bind(that, key)}/></b></a>
                        </li>
                      )
                    }))}
                  </ul>

                  <div className="tab-content clearfix">
                    <div className={"tab-pane" + this.state.activeTab} id="1a">
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} ref={'socialLinkType'} mandatory={true}
                                      placeholder="Select Social Link"
                                      className="form-control float-label" selectedValue={this.state.selectedValue}
                                      valueKey={'value'} labelKey={'label'} queryType={"graphql"}
                                      query={socialLinkTypeQuery}
                                      queryOptions={socialLinkTypeOption}
                                      onSelect={this.optionsBySelectSocialLinkType.bind(this)}
                                      isDynamic={true} data-required={true} data-errMsg="SocialLink Type is required"/>
                      </div>
                      <div className="form-group mandatory">
                        <input type="text" placeholder="Enter URL" ref={'socialLinkTypeUrl'}
                               className="form-control float-label" id="" data-required={true}
                               data-errMsg="URL is required"/>
                      </div>
                      <div className="ml_icon_btn">
                        <a href="#" className="save_btn" onClick={this.onSavingSocialLink.bind(this)}><span
                          className="ml ml-save"></span></a>
                      </div>
                    </div>
                    {that.state.socialLinkArray && (that.state.socialLinkArray.map(function (options, key) {
                      return (<div className="tab-pane" id={'socialLink' + key} key={key}>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} ref={'socialLinkType' + key}
                                        placeholder="Select Social Link" mandatory={true}
                                        className="form-control float-label" selectedValue={options.socialLinkType}
                                        valueKey={'value'} labelKey={'label'} queryType={"graphql"}
                                        query={socialLinkTypeQuery}
                                        queryOptions={socialLinkTypeOption}
                                        onSelect={that.updateOptions.bind(that, key)}
                                        isDynamic={true} data-required={true}
                                        data-errMsg="SocialLink Type is required"/>
                        </div>
                        <div className="form-group">
                          <input type="text" ref={'socialLinkTypeUrl' + key} placeholder="Enter URL"
                                 valueKey={options.socialLinkUrl} className="form-control float-label"
                                 defaultValue={options.socialLinkUrl} data-required={true}
                                 data-errMsg="URL is required"/>
                        </div>
                        <div className="ml_icon_btn">
                          <a href="#" className="save_btn"
                             onClick={that.onUpdatingSocialLinkDetails.bind(that, key)}><span
                            className="ml ml-save"></span></a>
                          <a href="#" className="cancel_btn" onClick={that.onClear.bind(that, key)}><span
                            className="ml ml-delete"></span></a>
                        </div>
                      </div>)
                    }))}


                  </div>

                </div>
              </div>
</div>
              </form>

            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group steps_pic_upload">
                    <div className="previewImg ProfileImg">
                      <img src={this.props.uploadedProfileImg}/>
                    </div>
                    <div className="fileUpload mlUpload_btn">
                      <span>Profile Pic</span>
                      <input type="file" className="upload" id="profilePic" onChange={this.onFileUpload.bind(this)}/>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </ScrollArea>
          <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
        </div>)  }
      </div>
    )
  }
};
