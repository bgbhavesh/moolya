import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
export default class MlAssignDocument extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedValue:null,
      assignDocuments:[{document: '',kyc:'',isActive:false}]
    }
    this.addDepartmentComponent.bind(this);
    return this;
  }

  assignDocumentsState(id){
    this.setState({
      assignDocuments: this.state.assignDocuments.concat([{document: '',kyc:'',isActive:false}])
    });
  }

  RemoveModuleToRoles(id,event){
    let assignDocuments;
    assignDocuments= this.state.assignDocuments.filter(function(object,index){
      return id !== index;
    });
    this.setState({
      assignDocuments: assignDocuments
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
  optionsBySelectDocument(index, selectedIndex){
    let assignDocuments=this.state.assignDocuments
    assignDocuments[index]['document']=selectedIndex
    this.setState({assignDocuments:assignDocuments})
    this.props.getAssignedDocuments(this.state.assignDocuments)
  }
  optionsBySelectKyc(index, selectedIndex){
    let assignDocuments=this.state.assignDocuments
    assignDocuments[index]['kyc']=selectedIndex
    this.setState({assignDocuments:assignDocuments})
    this.props.getAssignedDocuments(this.state.assignDocuments)
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
      assignDocuments: this.state.assignDocuments.concat([{document: '',kyc:'',isActive:false}])
    });

  }
  onChange(id,event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
    if(filedName=='isActive'){
      fieldValue=event.target.checked;
    }
    let departmentDetails=this.state.assignDocuments
    departmentDetails[id][filedName]=fieldValue
    this.setState({assignDocuments:departmentDetails})
    this.props.getAssignedDocuments(this.state.assignDocuments)
  }


  render() {
    let that=this;
    let getModulesquery=gql` query{data:fetchModules{label:name,value:_id}}`;
    let getfieldsquery=gql` query{data:fetchCountriesSearch{label:country,value:countryCode}}`;

    return (

      <div>

        <div className="form-group"> <a onClick={that.assignDocumentsState.bind(this)} className="mlUpload_btn">Add</a></div>
        {that.state.assignDocuments.map(function(options,id){

          return(


            <div className="form_bg" key={id}>
              <div className="left_wrap">

                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <form style={{marginTop:'0px'}}>

                    <div className="panel panel-default">
                      <div className="panel-heading">Type of Document<div className="pull-right block_action" onClick={that.RemoveModuleToRoles.bind(that,id)}><img src="/images/add.png"/></div></div>
                      <div className="panel-body">

                        <div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.document} queryType={"graphql"} query={getModulesquery}  isDynamic={true} id={'document'+id} onSelect={that.optionsBySelectDocument.bind(that,id)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.kyc} queryType={"graphql"} query={getModulesquery}  isDynamic={true} id={'kyc'+id} onSelect={that.optionsBySelectKyc.bind(that,id)} />
                        </div>
                        <div className="form-group switch_wrap inline_switch" style={{marginTop:'7px'}}>
                          <label className="">Status</label>
                          <label className="switch">
                            <input type="checkbox" />
                            <div className="slider"></div>
                          </label>
                        </div>

                      </div>
                    </div>

                  </form>
                </ScrollArea>
              </div>
            </div>


          )})}
      </div>

    )
  }
};

