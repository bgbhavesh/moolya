import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'
let Select = require('react-select');
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import {updateSettings} from '../actions/addSettingsAction';
import {findBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction'



//import ContactDetails from '../../transaction/requested/component/contactDetails';

export default class MyProfileSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currencySymbol: " ",
      measurementSystem: " ",
      currencyTypes: " ",
      numericalFormat:" "
    }
    this.optionsBySelectCurrencySymbol.bind(this);
    this.optionsBySelectMeasurementSystem.bind(this);
    this.dataSaving.bind(this);
    this.onSave.bind(this);
    this.getValue.bind(this);
  }

  componentWillMount(){
    const resp=this.getValue();
    return resp;
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


    $('.myprofile_left a').click(function(){
      $('.myprofile_left a').removeClass("active");
      $(this).addClass("active");
    });


    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide:1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      }
    });


  }


  optionsBySelectCurrencySymbol(val){
    this.setState({currencySymbol:val})
  }

  optionsBySelectMeasurementSystem(data){
    this.setState({measurementSystem:data.value})
  }

 async onSave(){

    this.dataSaving();
  }

  async getValue() {
    let userType = Meteor.userId();
    let response = await findBackendUserActionHandler(userType);
    console.log(response);
    this.setState({measurementSystem : response.profile.numericalFormat,
      currencySymbol:response.profile.currencyTypes,
    });
  }

  async dataSaving(){

    let Details = {
      currencySymbol : this.state.currencySymbol,
      measurementSystem :this.state.measurementSystem,
      userId : Meteor.userId()
    }
    const dataresponse = await updateSettings(Details);
    console.log(dataresponse);
    toastr.success("Update Successful")
    return dataresponse;
  }

  render(){

    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.onSave()
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => FlowRouter.go('/admin/myprofile/AddressBook')
      }
    ];
    //
    // let languagequery =gql`
    //
    // `;
    //
    // let timezonequery =gql`
    //
    // `;


    let currencyquery=gql` query{  
      data:fetchCurrency{
        value:_id
        label:currencyName
      }  
    }`;

    let measurementType = [
      {value: 'US System', label: 'US System'},
      {value: 'Metric System', label: 'Metric System'},
    ]

    let isExternaluser = Meteor.user().profile.isExternaluser;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>My Profile Settings</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            ><form>
              <div className="col-md-6 nopadding-left">
                <div className="form-group">
                  <Moolyaselect multiSelect={false}  placeholder={"Type Of Currency"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.currencySymbol} queryType={"graphql"} query={currencyquery}  isDynamic={true} id={'currencyquery'}  onSelect={this.optionsBySelectCurrencySymbol.bind(this)}  />
                  {/*<FontAwesome name='inr' className="password_icon"/>*/}
                </div>
                <Select
                  name="form-field-name"  options={measurementType} placeholder={"Numerical Format"}
                  value={this.state.measurementSystem} onChange={this.optionsBySelectMeasurementSystem.bind(this)}
                  className="float-label" />
                <br className="brclear"/>
                <br className="brclear"/>
                <br className="brclear"/>
                <br className="brclear"/>

              </div>
              <div className="col-md-6">
                <form>
                <div className="form-group">
                  <Select
                    name="form-field-name" placeholder={"Language"}
                    className="float-label"/>
                </div>
                <div className="form-group">
                  <Select
                    name="form-field-name"   placeholder={"Time Zone"}
                    className="float-label"/>
                </div>
                <br className="brclear"/>
                <br className="brclear"/>
                <br className="brclear"/>
                <br className="brclear"/>
                </form>

              </div>
            </form>

            </ScrollArea>
          </div>



        </div>
        {/*<span className="actions_switch"></span>*/}
        {/*<div className="bottom_actions_block">*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>*/}
        {/*</div>*/}
        {isExternaluser ? <div></div> :
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        }
      </div>
    )
  }
};
