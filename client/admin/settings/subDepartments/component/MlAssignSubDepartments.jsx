import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class MlAssignSubDepartments extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      subdepartmentAvailability:[{cluster: '',chapter:'',subChapter:'',email:'', notify:false, isActive:false }]
    }
    this.addSubDepartmentComponent.bind(this);
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
  optionsBySelect(index, selectedIndex){

    let availabilityDetails=this.state.subdepartmentAvailability
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['cluster']=selectedIndex
    this.setState({departmentAvailability:availabilityDetails})
    this.props.getSubDepartmentAvailability(this.state.subdepartmentAvailability)
  }
  addSubDepartmentComponent(event) {

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
        subdepartmentAvailability: this.state.subdepartmentAvailability.concat([{cluster: '',chapter:'',subChapter:'',email:'', notify:false, isActive:false }])
    });

  }
  onChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
      if(filedName=='isActive'){
        fieldValue=event.target.checked;
      }
    let departmentDetails=this.state.subdepartmentAvailability

    departmentDetails[id][filedName]=fieldValue
    this.setState({subdepartmentAvailability:departmentDetails})
    this.props.getSubDepartmentAvailability(this.state.subdepartmentAvailability)
  }


  render() {
   let that=this;
   //let queryOptions={options: { variables: {searchQuery:null}}};
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    return (
    <div>
        {that.state.subdepartmentAvailability.map(function(options,id){
          return(
            <div key={id}>
                <div className="form-group">
                    <Moolyaselect className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.cluster} queryType={"graphql"} query={query}  isDynamic={true} id={'country'+id} onSelect={that.optionsBySelect.bind(that,id)} />
                </div>
                <div className="form-group">
                    <select placeholder="Select Chapter" ref="selectChapter" className="form-control float-label" disabled= {true}>
                        <option>Select Chapter</option>
                    </select>
                </div>
                <div className="form-group">
                    <select placeholder="Select Cluster" ref="slectSubChapter" className="form-control float-label" disabled= {true}>
                        <option>Select SubChapter</option>
                    </select>
                </div>

                <div className="form-group">
                    <input placeholder="Sub Department Email Id" className="form-control float-label"/>
                </div>

                <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                        <input type="checkbox" name={'isActive'} value={options.status} onChange={that.onChange.bind(that,id)} ref=""/>
                        <div className="slider"></div>
                    </label>
                </div>

            </div>
          )})}
      <br className="brclear"/>
      <div className="swiper-pagination"></div>
    </div>




    )
  }
};

