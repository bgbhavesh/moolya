import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {findClusterBasedStatesDeatilsActionHandler} from '../actions/MlFindClusterBasedStates'
export default class MlAssignTaxInformation extends Component {
  constructor(props){
    super(props);
    this.state={
      taxName:'',
      states:[{name:'',_id:'',isActive:null,taxPercentage:''}]
    }
    return this;
  }
  componentDidMount() {
    const resp=this.findClusterBasedStates();
    return resp;

  }
  componentWillMount(){
    let selectaxName=this.props.id
    this.setState({taxName:selectaxName})
  }
  async findClusterBasedStates() {
    let stateDetails = await findClusterBasedStatesDeatilsActionHandler();
    //this.setState({states:stateDetails})
    let stateInfo = []
    for (let i = 0; i < stateDetails.length; i++) {
      let json = {
        name: stateDetails[i].name,
        isActive:null,
        _id:stateDetails[i]._id,
        taxPercentage:''
      }
      stateInfo.push(json)
    }
    this.setState({'states':stateInfo})
  }
  onSelectTaxType(value){
    this.setState({taxName:value})
  }
  onSelectState(id,event){
   if(event.currentTarget.checked){
     let  stateDetails=this.state.states
     stateDetails[id]['isActive']=true;
     this.setState({'states':stateDetails})
     this.props.onGetTaxDetails(this.state.states)
   }else{
     let  stateDetails=this.state.states
     stateDetails[id]['isActive']=false;
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
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.taxName} queryType={"graphql"} query={taxQuery} isDynamic={true}  onSelect={this.onSelectTaxType.bind(this)}/>
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
               return( <li key={options._id}>
                   <div className="form-group">
                     <div className="input_types"><input type="checkbox" checked={options.isActive} onChange={that.onSelectState.bind(that,id)}  />
                       <label htmlFor="checkbox1"><span></span>{options.name}</label></div>
                     <input type="text" placeholder="%" defaultValue={options.taxPercentage} onBlur={that.ontaxPercentage.bind(that,id)} className="form-control float-label" id="cluster_name"/>
                   </div>
                 </li>
               )
              })

              }
              </ul>
            {/* <table className="table table-striped">
                <thead>
                <tr>

                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>All Status</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Andhra Pradesh</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Telangana</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Goa</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>All Status</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Andhra Pradesh</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Telangana</label></div>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                        htmlFor="checkbox1"><span></span>Goa</label></div>
                    </div>
                  </td>
                </tr>

                </thead>

              </table>*/}
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
