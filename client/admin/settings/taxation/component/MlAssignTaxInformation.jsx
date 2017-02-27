import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {findClusterBasedStatesDeatilsActionHandler} from '../actions/findClusterBasedStatesAction'
export default class MlAssignTaxInformation extends Component {
  constructor(props){
    super(props);
    this.state={
      states:[{stateName:'',isChecked:null,taxPercentage:'',taxId:''}]
    }
    return this;
  }
  componentDidMount() {
    const resp=this.findClusterBasedStates();
    return resp;

  }
  componentWillMount(){
    let selectaxName=this.props.id
    this.setState({taxId:selectaxName})
  }
  async findClusterBasedStates() {
    let stateDetails = await findClusterBasedStatesDeatilsActionHandler();
    //this.setState({states:stateDetails})
    let stateInfo = []
    for (let i = 0; i < stateDetails.length; i++) {
      let json = {
        stateName: stateDetails[i].name,
        isChecked:null,
        taxPercentage:'',
        taxId:this.props.id
      }
      stateInfo.push(json)
    }
    this.setState({'states':stateInfo})
  }
  onSelectTaxType(value){
    this.setState({taxId:value})
  }
  onSelectState(id,event){
   if(event.currentTarget.checked){
     let  stateDetails=this.state.states
     stateDetails[id]['isChecked']=true;
     this.setState({taxName:selectaxName})
     this.props.onGetTaxDetails(this.state.states)
   }else{
     let  stateDetails=this.state.states
     stateDetails[id]['isChecked']=false;
     this.setState({'states':stateDetails})
     this.props.onGetTaxDetails(this.state.states)
   }

   }
  ontaxPercentage(index,event){
    let  stateDetails=this.state.states
    stateDetails[index]['taxPercentage']=event.target.value;
    this.setState({'taxPercentage':stateDetails})
    this.props.onGetTaxDetails(this.state.states)
  }
  render() {
    let taxQuery=gql`query{
  data:FetchActiveTax { label:taxName,value:_id    }
}
`;
    console.log(taxQuery)
    let that=this;
    if (that.props.id) {
      return (
        <div id={that.props.id}>

          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Tax
              Information</a></li>
            <li role="presentation"><a href={`#profile${that.props.id}`} aria-controls="profile" role="tab" data-toggle="tab">Applicable
              States</a></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="home">
              <table className="table table-striped">
                <thead>

                <tr>
                  <td><br /><br />
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.taxId} queryType={"graphql"} query={taxQuery} isDynamic={true}  onSelect={this.onSelectTaxType.bind(this)}/>
                  </td>
                  <td><textarea placeholder="About" className="form-control float-label" id="cl_about" defaultValue={that.props.about}>

                        </textarea></td>

                </tr>

                </thead>

              </table>
            </div>
            <div role="tabpanel" className="tab-pane" id={`profile${this.props.id}`}>
              <ul>
              {that.state.states.map(function (options,id) {
               return( <li key={options.stateName}>
                   <div className="form-group">
                     <div className="input_types"><input type="checkbox" checked={options.isChecked} onChange={that.onSelectState.bind(that,id)}  />
                       <label htmlFor="checkbox1"><span></span>{options.stateName}</label></div>
                     <input type="text" placeholder="%" defaultValue={options.taxPercentage} onBlur={that.ontaxPercentage.bind(that,id)} className="form-control float-label" id="cluster_name"/>
                   </div>
                 </li>
               )
              })

              }
              </ul>
            </div>
          </div>

        </div>
      );
    } else {
      return (
        <p>?</p>
      );
    }
  }
}
