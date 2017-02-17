import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class MlAssignClustersToRoles extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      assignRoleToClusters:[{cluster: '',chapter:'',subChapter:'',department:'',subDepartment:'',isActive:false }]
    }
    this.addDepartmentComponent.bind(this);
    return this;
  }

  AssignassignRoleToClusters(id){
    this.setState({
      assignRoleToClusters: this.state.assignRoleToClusters.concat([{cluster: '',chapter:'',subChapter:'',department:'',subDepartment:'',isActive:false }])
    });
  }

  RemoveAssignassignRoleToClusters(id,event){
    let assignRoleToClusters;
    assignRoleToClusters= this.state.assignRoleToClusters.filter(function(object,index){
      return id !== index;
    });
    this.setState({
      assignRoleToClusters: assignRoleToClusters
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
    let availabilityDetails=this.state.assignRoleToClusters
    availabilityDetails[index]['cluster']=selectedIndex
    this.setState({assignRoleToClusters:availabilityDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
  }

  optionsBySelectChapter(index, selectedIndex){
    let availabilityDetails=this.state.assignRoleToClusters
    availabilityDetails[index]['chapter']=selectedIndex
    this.setState({assignRoleToClusters:availabilityDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
  }

  optionsBySelectSubChapter(index, selectedIndex){
    let availabilityDetails=this.state.assignRoleToClusters
    availabilityDetails[index]['subChapter']=selectedIndex
    this.setState({assignRoleToClusters:availabilityDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
  }

  optionsBySelectDepartment(index, selectedIndex){
    let availabilityDetails=this.state.assignRoleToClusters
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['department']=selectedIndex
    this.setState({assignRoleToClusters:availabilityDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
  }

  optionsBySelectSubDepartment(index, selectedIndex){
    let availabilityDetails=this.state.assignRoleToClusters
    availabilityDetails[index]['subDepartment']=selectedIndex
    this.setState({assignRoleToClusters:availabilityDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
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
      assignRoleToClusters: this.state.assignRoleToClusters.concat([{cluster: '',chapter:'',subChapter:'',email:'',isActive:false }])
    });

  }
  onChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
    if(filedName=='isActive'){
      fieldValue=event.target.checked;
    }
    let departmentDetails=this.state.assignRoleToClusters

    departmentDetails[id][filedName]=fieldValue
    this.setState({assignRoleToClusters:departmentDetails})
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
  }


  render() {
    let that=this;
    //let queryOptions={options: { variables: {searchQuery:null}}};
    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:countryId}}`;
    let chapterquery=gql` query{data:fetchClustersForMap{label:displayName,value:countryId}}`;
    let subChapterquery=gql` query{data:fetchClustersForMap{label:displayName,value:countryId}}`;
    let departmentquery=gql` query{data:fetchClustersForMap{label:displayName,value:countryId}}`;
    let subDepartmentquery=gql` query{data:fetchClustersForMap{label:displayName,value:countryId}}`;

    return (

      <div>

        <div className="form-group"> <a onClick={that.AssignassignRoleToClusters.bind(this)} className="mlUpload_btn">Add</a></div>
        {that.state.assignRoleToClusters.map(function(options,id){

          return(
            <div className="panel panel-default" key={id}>
              <div className="panel panel-default">
                <div className="panel-heading">Assign Department<div className="pull-right block_action" onClick={that.RemoveAssignassignRoleToClusters.bind(that,id)}><img src="/images/remove.png"/></div></div>
                <div className="panel-body">

                  <div className="form-group">
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.cluster} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'country'+id} onSelect={that.optionsBySelectCluster.bind(that,id)} />
                  </div>

                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.chapter} queryType={"graphql"} query={chapterquery}  isDynamic={true} id={'chapter'+id} onSelect={that.optionsBySelectChapter.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.subChapter} queryType={"graphql"} query={subChapterquery}  isDynamic={true} id={'subChapter'+id} onSelect={that.optionsBySelectSubChapter.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.department} queryType={"graphql"} query={departmentquery}  isDynamic={true} id={'department'+id} onSelect={that.optionsBySelectDepartment.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.subDepartment} queryType={"graphql"} query={subDepartmentquery}  isDynamic={true} id={'subDepartment'+id} onSelect={that.optionsBySelectSubDepartment.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" name={'isActive'} value={options.isActive} onChange={that.onChange.bind(that,id)} />
                      <div className="slider"></div>
                    </label>
                  </div>

                </div>


              </div>
            </div>
          )})}
      </div>

    )
  }
};

