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
      assignDocuments:[{type: '',category:'',isActive:''}]
    }
    this.onStatusChange = this.onStatusChange.bind(this);
    return this;
  }

  componentDidMount() {
    /* $(function () {
     $('.float-label').jvFloat();
     });

     $('.switch input').change(function () {
     if ($(this).is(':checked')) {
     $(this).parent('.switch').addClass('on');
     } else {
     $(this).parent('.switch').removeClass('on');
     }
     });*/
    this.props.getAssignedDocuments(this.state.assignDocuments)
  }

  componentWillMount(){
    let assignDocument=this.props.documents
    if(assignDocument){
      let assignDocumentDetails=[]
      for(let i=0;i<assignDocument.length;i++){
        let json={
          type:assignDocument[i].type,
          category:assignDocument[i].category,
          isActive:assignDocument[i].isActive
        }
        assignDocumentDetails.push(json)
      }
      this.setState({"assignDocuments":assignDocumentDetails})
    }
  }

  assignDocumentsState(id){
    this.setState({
      assignDocuments: this.state.assignDocuments.concat([{type: '',category:'',isActive:false}])
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


  optionsBySelectDocument(index, selectedIndex){
    let assignDocuments=this.state.assignDocuments
    assignDocuments[index]['type']=selectedIndex
    this.setState({assignDocuments:assignDocuments})
    this.props.getAssignedDocuments(this.state.assignDocuments)
  }
  optionsBySelectKyc(index, selectedIndex){
    let assignDocuments=this.state.assignDocuments
    assignDocuments[index]['category']=selectedIndex
    this.setState({assignDocuments:assignDocuments})
    this.props.getAssignedDocuments(this.state.assignDocuments)
  }
  onStatusChange(index,event){
    let assignDocumentsDetails=this.state.assignDocuments
    if(event.currentTarget.checked){
      assignDocumentsDetails[index]['isActive']=true
      this.setState({assignDocuments:assignDocumentsDetails})
      this.props.getAssignedDocuments(this.state.assignDocuments);
    }else {
      assignDocumentsDetails[index]['isActive'] =false
      this.setState({assignDocuments: assignDocumentsDetails})
      this.props.getAssignedDocuments(this.state.assignDocuments);
    }
  }


  render() {
    let that=this;

    let docTypequery=gql` query{
    data:fetchDocumentsType{label:docTypeName,value:_id}
    }
`;
    let docKycquery=gql` query{
    data:fetchKYCCategories{label:docCategoryName,value:_id}
    }
`;
    return (

      <div>

        {/*<div className="form-group"> <a onClick={that.assignDocumentsState.bind(this)} className="mlUpload_btn">Add</a></div>*/}
        {that.state.assignDocuments.map(function(options,id){

          return(

                    <div className="panel panel-default" key={id}>
                      <div className="panel-heading">Type of Document{id==0?(<div className="pull-right block_action" onClick={that.assignDocumentsState.bind(that,id)}><img src="/images/add.png"/></div>):(<div className="pull-right block_action" onClick={that.RemoveModuleToRoles.bind(that,id)}><img src="/images/remove.png"/></div>)}</div>
                      <div className="panel-body">

                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder={"Document Type"} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.type} queryType={"graphql"} query={docTypequery}  isDynamic={true} id={'document'+id} onSelect={that.optionsBySelectDocument.bind(that,id)} />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder={"KYC Category"} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={options.category} queryType={"graphql"} query={docKycquery}  isDynamic={true} id={'kyc'+id} onSelect={that.optionsBySelectKyc.bind(that,id)} />
                        </div>
                        <div className="form-group switch_wrap inline_switch" style={{marginTop:'7px'}}>
                          <label className="">Status</label>
                          <label className="switch">
                            <input type="checkbox" checked={options.isActive} onChange={that.onStatusChange.bind(that,id)} />
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

