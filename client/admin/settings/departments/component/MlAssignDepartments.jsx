import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class MlAssignDepartments extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      departmentAvailability:[{cluster: '',chapter:'',subChapter:'',email:'',isActive:false }]
    }
    this.addDepartmentComponent.bind(this);
    return this;
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

    let availabilityDetails=this.state.departmentAvailability
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['cluster']=selectedIndex
    this.setState({departmentAvailability:availabilityDetails})
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }

  optionsBySelectChapter(index, selectedIndex){

    let availabilityDetails=this.state.departmentAvailability
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['chapter']=selectedIndex
    this.setState({departmentAvailability:availabilityDetails})
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
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
      departmentAvailability: this.state.departmentAvailability.concat([{cluster: '',chapter:'',subChapter:'',email:'',isActive:false }])
    });

  }
  onChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
      if(filedName=='isActive'){
        fieldValue=event.target.checked;
      }
    let departmentDetails=this.state.departmentAvailability

    departmentDetails[id][filedName]=fieldValue
    this.setState({departmentAvailability:departmentDetails})
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }


  render() {
   let that=this;
   //let queryOptions={options: { variables: {searchQuery:null}}};
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    return (

    <div className="swiper-container blocks_in_form">
      <div className="swiper-wrapper">

        {that.state.departmentAvailability.map(function(options,id){
          return(
            <div className="form_inner_block swiper-slide"  key={id}>

              <div className="form_inner_block swiper-slide">

                <div className="form-group">
                  <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.cluster} queryType={"graphql"} query={query}  isDynamic={true} id={'country'+id} onSelect={that.optionsBySelectCluster.bind(that,id)} />
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.chapter} queryType={"graphql"} query={query}  isDynamic={true} id={'chapter'+id} onSelect={that.optionsBySelectChapter.bind(that,id)} />
                  </div>
                </div>
                <div className="form-group">
                  <select placeholder="Select subChapter" ref="selectSubChapter" className="form-control float-label">
                    <option>Select SubChapter</option>
                  </select>
                </div>
                <div className="form-group">
                  <input placeholder="Department Email Id" className="form-control float-label"/>
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" name={'isActive'} value={options.isActive} onChange={that.onChange.bind(that,id)} />
                    <div className="slider"></div>
                  </label>
                </div>

              </div>
              <br className="brclear"/>
            </div>
          )})}
      </div>
      <br className="brclear"/>
      <div className="swiper-pagination"></div>
    </div>

    )
  }
};

