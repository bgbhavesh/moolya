import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import  MlAssignTaxInformation from './MlAssignTaxInformation'
import {findTaxTypeDetailsActionHandler} from '../actions/MlFindTaxTypeDetails'
export default class MlTaxTable extends Component {
  constructor(props){
    super(props);
    this.state={
      taxTypeInfo:[{taxName:'',percentage:'',states:'',id:''}]
    }
    return this;
  }

  componentWillMount() {
    const resp=this.findTaxTypDetails();
    return resp;
  }
  async findTaxTypDetails() {
        let taxDetails = await findTaxTypeDetailsActionHandler();
        // console.log(taxDetails.taxName)
        let taxInfo = []
        for (let i = 0; i < taxDetails.length; i++) {
          let json = {
            taxName: taxDetails[i].taxName,
            percentage: '',
            states: '',
            id:taxDetails[i]._id
          }
          taxInfo.push(json)
        }
    this.setState({'taxTypeInfo':taxInfo})
  }

  render() {
    return (
      <table className="table taxation_table table-bordereds" >
        <thead>
        <tr>
          <th>
            <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span></label>
          </th>
          <th>Tax Name</th>
          <th>Percentage</th>
          <th>Applicable States</th>
        </tr>
        </thead>

              {this.state.taxTypeInfo.map(function(options,id){
                console.log(options)
               return(
                 <tbody>
                 <tr data-toggle="collapse" data-target={`#${options.id}`} key={id} >

                       <td><input id="radio1" type="radio" name="radio" value="1" className="accordion-toggle"/><label htmlFor="radio1"><span><span></span></span></label></td>
                       <td>{options.taxName}</td>
                       <td></td>
                       <td>All</td>

                 </tr>
                 <tr >
                 <td colSpan="4" className="hiddenRow">
                  <MlAssignTaxInformation id={options.id} />
                  </td>
                  </tr>
                 </tbody>

                   )
             })
             }



      </table>
    )
  }
};
