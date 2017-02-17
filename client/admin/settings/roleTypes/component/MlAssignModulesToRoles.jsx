import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class MlAssignModulesToRoles extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      assignModulesToRoles:[{moduleName: '',diplayName:'',actions:[],fields:[],isActive:false }]
    }
    this.addDepartmentComponent.bind(this);
    return this;
  }

  assignModuleToRoles(id){
    this.setState({
      assignModulesToRoles: this.state.assignModulesToRoles.concat([{moduleName: '',diplayName:'',actions:[],fields:[],isActive:false }])
    });
  }

  RemoveModuleToRoles(id,event){
    let assignModulesToRoles;
    assignModulesToRoles= this.state.assignModulesToRoles.filter(function(object,index){
      return id !== index;
    });
    this.setState({
      assignModulesToRoles: assignModulesToRoles
    })
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  optionsBySelectCluster(index, selectedIndex){

    let availabilityDetails=this.state.assignModulesToRoles
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['cluster']=selectedIndex
    this.setState({assignModulesToRoles:availabilityDetails})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }

  optionsBySelectChapter(index, selectedIndex){

    let availabilityDetails=this.state.assignModulesToRoles
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['chapter']=selectedIndex
    this.setState({assignModulesToRoles:availabilityDetails})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }
  addDepartmentComponent(event) {

    var mySwiper = new Swiper('.blocks_in_form', {
      // speed: 400,
      pagination: '.swiper-pagination',
      spaceBetween: 0,
      slidesPerView:'auto',
      freeMode:true,
      paginationClickable: false
    });
    mySwiper.updateContainerSize()
    this.setState({
      assignModulesToRoles: this.state.assignModulesToRoles.concat([{cluster: '',chapter:'',subChapter:'',email:'',isActive:false }])
    });

  }
  onChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
    if(filedName=='isActive'){
      fieldValue=event.target.checked;
    }
    let departmentDetails=this.state.assignModulesToRoles

    departmentDetails[id][filedName]=fieldValue
    this.setState({assignModulesToRoles:departmentDetails})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }


  render() {
    let that=this;
    let getModulesquery=gql` query{data:fetchCountriesSearch{label:country,value:countryCode}}`;
    let getfieldsquery=gql` query{data:fetchCountriesSearch{label:country,value:countryCode}}`;

    return (

      <div>

        <div className="form-group"> <a onClick={that.assignModuleToRoles.bind(this)} className="mlUpload_btn">Add</a></div>
        {that.state.assignModulesToRoles.map(function(options,id){

          return(
            <div className="panel panel-default" key={id}>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <div className="left_wrap">

                    <ScrollArea
                      speed={0.8}
                      className="left_wrap"
                      smoothScrolling={true}
                      default={true}
                    >
                      <form style={{marginTop:'0px'}}>

                        <div className="panel panel-default">
                          <div className="panel-heading">Add Module</div>
                          <div className="panel-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input type="text" placeholder="Module Name" className="form-control float-label" id="" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input type="text" placeholder="Display Name" className="form-control float-label" id="" />
                                </div>
                              </div>
                              <div className="col-md-12 role_dif">
                                <div className="form-group">
                                  Actions
                                </div>
                                <div className="form-group">
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Create</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Read</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Update</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Delete</label></div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <input type="text" placeholder="Active From" className="form-control float-label" id="" />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <input type="text" placeholder="Active till" className="form-control float-label" id="" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group switch_wrap inline_switch" style={{marginTop:'7px'}}>
                                  <label className="">Overall Status</label>
                                  <label className="switch">
                                    <input type="checkbox" />
                                    <div className="slider"></div>
                                  </label>
                                </div>
                              </div>
                              <hr/>
                              <div className="col-md-12 role_dif">
                                <div className="form-group">
                                  Field Name 1
                                </div>
                                <div className="form-group">
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Create</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Read</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Update</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Delete</label></div>
                                </div>
                              </div>
                              <div className="col-md-12 role_dif">
                                <div className="form-group">
                                  Field Name 2
                                </div>
                                <div className="form-group">
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Create</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Read</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Update</label></div>
                                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Delete</label></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          )})}
      </div>

    )
  }
};

