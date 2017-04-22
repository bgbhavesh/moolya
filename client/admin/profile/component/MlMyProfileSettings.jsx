import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'
let Select = require('react-select');
//import ContactDetails from '../../transaction/requested/component/contactDetails';

export default class MyProfileSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currencySymbol: " ",
      measurementSystem: " "
    }
    this.optionsBySelectCurrencySymbol.bind(this);
    this.optionsBySelectMeasurementSystem.bind(this);
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


  render(){
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
                  <Moolyaselect multiSelect={false}  placeholder={"Type Of Currency"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.currencySymbol} queryType={"graphql"} query={currencyquery}  isDynamic={true} id={'currencyquery'}  onSelect={this.optionsBySelectCurrencySymbol.bind(this)} />
                  {/*<FontAwesome name='inr' className="password_icon"/>*/}
                </div>
                <Select
                  name="form-field-name"  options={measurementType} placeholder={"Measurement System"}
                  value={this.state.measurementSystem} onChange={this.optionsBySelectMeasurementSystem.bind(this)}
                  className="float-label"/>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Language" className="form-control float-label" id=""/>
                  <FontAwesome name='language' className="password_icon"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Time Zone" className="form-control float-label" id=""/>
                  <FontAwesome name='clock-o' className="password_icon"/>
                </div>
              </div>
            </form>

            </ScrollArea>
          </div>



        </div>
        <span className="actions_switch"></span>
        <div className="bottom_actions_block">
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
          <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
        </div>
      </div>
    )
  }
};
