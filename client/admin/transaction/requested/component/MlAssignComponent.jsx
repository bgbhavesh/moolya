import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

export default class MlAssignComponent extends Component {

  constructor(props){
    super(props);
    this.state={
                  selectedValue:false,
                  selectedCluster:null,
                  selectedChapter:null,
                  selectedSubChapter:null,
                  selectedCommunity:null,
                  selectedDepartment:null,
                  selectedSubDepartment:null,
                  selectedRole:null
                };
    return this;
  }

  componentDidMount() {
  }

  optionsBySelectCluster(value){

    this.setState({selectedCluster:value})
  }
  optionsBySelectChapter(value){

    this.setState({selectedChapter:value})
  }
  optionsBySelectSubChapter(value){

    this.setState({selectedSubChapter:value})
  }
  optionsBySelectDepartment(value){

    this.setState({selectedDepartment:value})
  }
  optionsBySelectSubDepartment(value){

    this.setState({selectedSubDepartment:value})
  }
  optionsByRole(value){

    this.setState({selectedRole:value})
  }


  render() {
    let that=this;
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
    let subChapterquery=gql`query($id:String){  
      data:fetchSubChaptersForRegistration(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
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
    let chapterOption={options: { variables: {id:this.state.selectedCluster}}};
    let subChapterOption={options: { variables: {id:this.state.selectedChapter}}}
    let departmentOption={options: { variables: {cluster:this.state.selectedCluster,chapter:this.state.selectedChapter,subChapter:this.state.selectedSubChapter}}}
    let subDepartmentOption={options: { variables: {id:this.state.selectedDepartment}}};
    let roleOption={
                    options: {
                      variables: {
                        cluster:this.state.selectedCluster,
                        chapter:this.state.selectedChapter,
                        subChapter:this.state.selectedSubChapter,
                        department:this.state.selectedDepartment,
                        subDepartment:this.state.selectedSubDepartment
                    }}};
    return (

      <div className="panel panel-default-bottom col-md-12">
        <div className="mrgn-btm">
          <input type="text" placeholder="Search User" className="search-form-control" id="" />
        </div>
        <div className="col-md-6 nopadding-left">
          <div className="form-group">
          {/*  <Select name="form-field-name"value="select" className="float-label"/>*/}
            <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCluster} queryType={"graphql"} query={clusterQuery} onSelect={that.optionsBySelectCluster.bind(this)} isDynamic={true}/>
          </div>
          <div className="form-group">
           {/*<Select name="form-field-name"value="select" className="float-label"disabled= {true} />*/}
            <Moolyaselect multiSelect={false} placeholder="Select Subchapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterquery} reExecuteQuery={true} queryOptions={subChapterOption} isDynamic={true} onSelect={this.optionsBySelectSubChapter.bind(this)} />

          </div>
          <div className="form-group">
            {/*<Select name="form-field-name"value="select" className="float-label"disabled={true} />*/}
            <Moolyaselect multiSelect={false} placeholder="Select Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={"graphql"} query={departmentQuery} reExecuteQuery={true} queryOptions={departmentOption} isDynamic={true} onSelect={this.optionsBySelectDepartment.bind(this)} />
          </div>

          <div className="form-group">
            {/*<Select name="form-field-name"value="select" className="float-label"disabled={true} />*/}
            <Moolyaselect multiSelect={false} placeholder="Select Role" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={"graphql"} query={roleQuery} reExecuteQuery={true} queryOptions={roleOption} isDynamic={true} onSelect={this.optionsByRole.bind(this)} />
          </div>


        </div>

        <div className="col-md-6 nopadding-right">
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption} isDynamic={true} onSelect={this.optionsBySelectChapter.bind(this)} />
          </div>
          <div className="form-group">
            {/*<Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label"  queryType={"graphql"}  reExecuteQuery={true} isDynamic={true}  />*/}
          </div>
          <div className="form-group">
            {/*<Select name="form-field-name"value="select" className="float-label"disabled={true} />*/}
            <Moolyaselect multiSelect={false} placeholder="Select Sub Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={"graphql"} query={subDepartmentQuery} reExecuteQuery={true} queryOptions={subDepartmentOption} isDynamic={true} onSelect={this.optionsBySelectSubDepartment.bind(this)} />
          </div>


          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled={true} />
          </div>
        </div>

        <div className="assign-popup">
          <a data-toggle="tooltip" title="Save" data-placement="top" href="" className="hex_btn hex_btn_in">
            <span className="ml ml-save"></span>
          </a>
          <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in">
            <span className="ml ml-delete"></span>
          </a>
        </div>


      </div>



    )
  }
}
