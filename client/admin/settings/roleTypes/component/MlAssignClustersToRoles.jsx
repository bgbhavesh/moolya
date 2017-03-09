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
      this.onStatusChange=this.onStatusChange.bind(this)
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
    this.props.getassignRoleToClusters(this.state.assignRoleToClusters)
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
      this.setState({assignRoleToClusters:assignedClusterDetailsForm})
    }
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
  onStatusChange(id,event){
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
    let departmentqueryOptions=''
    let queryOptions={options: { variables: {searchQuery:null}}};
    let departmentQuery=gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery=gql`query($id:String){  
    data:fetchChapters(id:$id) {
        value:_id,
        label:chapterName
      }  
    }`;
    let subChapterquery=gql`query($id:String){  
      data:fetchSubChaptersSelect(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
  //  let departmentquery=gql`query{ data:fetchDepartments{value:_id,label:displayName}}`;

    let subDepartmentquery=gql`query($id:String){  
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }  
    }`;
    let selectedUserType=this.props.selectedBackendUserType
    let selectedSubChapter=this.props.selectedSubChapter
    if(selectedUserType=='moolya'){
      departmentqueryOptions={options: { variables: {isMoolya:false}}};
      departmentQuery=gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    }
    if(selectedUserType=='non-moolya'&&selectedSubChapter!=''){
      departmentqueryOptions={options: { variables: {isMoolya:true,subChapter:selectedSubChapter}}};
      departmentQuery=gql` query($isMoolya:Boolean,$subChapter:String){
      data:fetchNonMoolyaBasedDepartment(isMoolya:$isMoolya,subChapter:$subChapter){label:departmentName,value:_id}
    }
    `;
    }

    return (

      <div>

        <div className="form-group"></div>
        {that.state.assignRoleToClusters.map(function(assignCluster,id){
          let chapterOption={options: { variables: {id:assignCluster.cluster}}};
          let subchapterOption={options: { variables: {id:assignCluster.chapter}}};
          let subDeparatmentOption={options: { variables: {id:assignCluster.department}}};
          return(
            <div className="panel panel-default" key={id}>
                <div className="panel-heading">Assign Department{id==0?(<div className="pull-right block_action" onClick={that.AssignassignRoleToClusters.bind(that,id)}><img src="/images/add.png"/></div>):(<div className="pull-right block_action" onClick={that.RemoveAssignassignRoleToClusters.bind(that,id)}><img src="/images/remove.png"/></div>)}</div>

                <div className="panel-body">

                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.cluster} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'country'+id} onSelect={that.optionsBySelectCluster.bind(that,id)} />
                  </div>

                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.chapter} queryType={"graphql"} query={chapterquery}  isDynamic={true} id={'chapter'+id} reExecuteQuery={true} queryOptions={chapterOption} onSelect={that.optionsBySelectChapter.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Select SubChapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.subChapter} queryType={"graphql"} query={subChapterquery}  isDynamic={true} id={'subChapter'+id} reExecuteQuery={true} queryOptions={subchapterOption} onSelect={that.optionsBySelectSubChapter.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Select Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentqueryOptions}  isDynamic={true} id={'department'+id} onSelect={that.optionsBySelectDepartment.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Select SubDepartment" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={assignCluster.subDepartment} queryType={"graphql"} query={subDepartmentquery}  isDynamic={true} id={'subDepartment'+id} reExecuteQuery={true} queryOptions={subDeparatmentOption}  onSelect={that.optionsBySelectSubDepartment.bind(that,id)} />
                    </div>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" name={'isActive'} checked={assignCluster.isActive} onChange={that.onStatusChange.bind(that,id)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                </div>
              </div>
          )})}
      </div>

    )
  }
};

