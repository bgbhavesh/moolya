import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class MlAssignClustersToFilters extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      assignFilterToClusters:[{cluster: '',chapter:'',subChapter:'',department:'',subDepartment:''}]
    }
    this.addDepartmentComponent.bind(this);
    this.onStatusChange=this.onStatusChange.bind(this)
    return this;
  }

  AssignassignRoleToClusters(id){
    this.setState({
      assignFilterToClusters: this.state.assignFilterToClusters.concat([{cluster: '',chapter:'',subChapter:'',department:'',subDepartment:''}])
    });
  }

  RemoveAssignassignRoleToClusters(id,event){
    let assignFilterToClusters;
    assignFilterToClusters= this.state.assignFilterToClusters.filter(function(object,index){
      return id !== index;
    });
    this.setState({
      assignFilterToClusters: assignFilterToClusters
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
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }
  componentWillMount() {
    let assignedClusterDetails=this.props.assignedClusterDetails
    if(assignedClusterDetails){
      let assignedClusterDetailsForm=[]
      for(let i=0;i<assignedClusterDetails.length;i++){
        let json={
          cluster:assignedClusterDetails[i].cluster,
          chapter:assignedClusterDetails[i].chapter,
          subChapter:assignedClusterDetails[i].subChapter,
          department:assignedClusterDetails[i].department,
          subDepartment:assignedClusterDetails[i].subDepartment,
          isActive:assignedClusterDetails[i].isActive
        }
        assignedClusterDetailsForm.push(json)
      }
      this.setState({assignFilterToClusters:assignedClusterDetailsForm})
    }
  }
  optionsBySelectCluster(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    availabilityDetails[index]['cluster']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }

  optionsBySelectChapter(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    availabilityDetails[index]['chapter']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }

  optionsBySelectSubChapter(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    availabilityDetails[index]['subChapter']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }

  optionsBySelectDepartment(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    console.log("Selected--"+availabilityDetails);
    availabilityDetails[index]['department']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }

  optionsBySelectSubDepartment(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    availabilityDetails[index]['subDepartment']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }

  optionsBySelectRole(index, selectedIndex){
    let availabilityDetails=this.state.assignFilterToClusters
    availabilityDetails[index]['role']=selectedIndex
    this.setState({assignFilterToClusters:availabilityDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
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
      assignFilterToClusters: this.state.assignFilterToClusters.concat([{cluster: '',chapter:'',subChapter:'',department:'',subDepartment:''}])
    });

  }
  onStatusChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
    if(filedName=='isActive'){
      fieldValue=event.target.checked;
    }
    let departmentDetails=this.state.assignFilterToClusters

    departmentDetails[id][filedName]=fieldValue
    this.setState({assignFilterToClusters:departmentDetails})
    this.props.getassignFilterToClusters(this.state.assignFilterToClusters)
  }


  render() {
    let that=this;
    let departmentqueryOptions=''
    let queryOptions={options: { variables: {searchQuery:null}}};

    let clusterQuery=gql` query{
      data:fetchActiveClusters{label:countryName,value:_id}
    }
    `;
    let chapterQuery=gql`query($id:String){  
    data:fetchChapters(id:$id) {
      value:_id
      label:chapterName
      }  
    }`;
    let subChapterQuery=gql`query($id:String){  
      data:fetchSubChaptersForRegistration(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
    let fetchcommunities = gql` query{
      data:fetchCommunityDefinition{label:name,value:code}
    }
    `;
    let departmentQuery=gql`query($cluster:String,$chapter:String,$subChapter:String){  
      data:fetchDepartmentsForRegistration(cluster:$cluster,chapter:$chapter,subChapter:$subChapter) {
        value:_id
        label:departmentName
      }  
    }`;
    let subDepartmentQuery=gql`query($id:String){  
      data:fetchSubDepartmentsForRegistration(id:$id) {
        value:_id
        label:subDepartmentName
      }  
    }`;
    let roleQuery=gql`query($cluster:String,$chapter:String,$subChapter:String,$department:String,$subDepartment:String){  
      data:fetchRolesForRegistration(cluster:$cluster,chapter:$chapter,subChapter:$subChapter,department:$department,subDepartment:$subDepartment) {
        value:_id
        label:roleName
      }  
    }`;






    return (

      <div>

        <div className="form-group"></div>
        {that.state.assignFilterToClusters.map(function(assignCluster,id){


          let chapterOption={options: { variables: {id:assignCluster.cluster}}};
          let subChapterOption={options: { variables: {id:assignCluster.chapter}}}
          let departmentOption={options: { variables: {cluster:assignCluster.cluster,chapter:assignCluster.chapter,subChapter:assignCluster.subChapter}}}
          let subDepartmentOption={options: { variables: {id:assignCluster.department}}};
          let roleOption={
            options: {
              variables: {
                cluster:assignCluster.cluster,
                chapter:assignCluster.chapter,
                subChapter:assignCluster.subChapter,
                department:assignCluster.department,
                subDepartment:assignCluster.subDepartment,

              }}};
          return(
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Role{id==0?(<div className="pull-right block_action" onClick={that.AssignassignRoleToClusters.bind(that,id)}><img src="/images/add.png"/></div>):(<div className="pull-right block_action" onClick={that.RemoveAssignassignRoleToClusters.bind(that,id)}><img src="/images/remove.png"/></div>)}</div>

              <div className="panel-body">

                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true} id={'country'+id} onSelect={that.optionsBySelectCluster.bind(that,id)} />
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.chapter} queryType={"graphql"} query={chapterQuery}  isDynamic={true} id={'chapter'+id} reExecuteQuery={true} queryOptions={chapterOption} onSelect={that.optionsBySelectChapter.bind(that,id)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select SubChapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.subChapter} queryType={"graphql"} query={subChapterQuery}  isDynamic={true} id={'subChapter'+id} reExecuteQuery={true} queryOptions={subChapterOption} onSelect={that.optionsBySelectSubChapter.bind(that,id)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentOption}  isDynamic={true} id={'department'+id} onSelect={that.optionsBySelectDepartment.bind(that,id)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select SubDepartment" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.subDepartment} queryType={"graphql"} query={subDepartmentQuery}  isDynamic={true} id={'subDepartment'+id} reExecuteQuery={true} queryOptions={subDepartmentOption}  onSelect={that.optionsBySelectSubDepartment.bind(that,id)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Role" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.role} queryType={"graphql"} query={roleQuery}  isDynamic={true} id={'role'+id} reExecuteQuery={true} queryOptions={roleOption}  onSelect={that.optionsBySelectRole.bind(that,id)} />
                  </div>
                </div>
                {/*<div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" name={'isActive'} checked={assignCluster.isActive} onChange={that.onStatusChange.bind(that,id)} />
                    <div className="slider"></div>
                  </label>
                </div>*/}
              </div>
            </div>
          )})}
      </div>

    )
  }
};

