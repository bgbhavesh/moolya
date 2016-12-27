import React, { Component, PropTypes } from 'react';

export default class MoolyaMultiSelectDropDown extends Component {

  constructor(props) {
    super(props);


    this.state = {
      id: props.id,
      options: props.options,
      value: props.value,
      labelField: props.labelField,
      valueField: props.valueField,
      customChange: props.customChange,
      selected: 'select',
      buttonValue:[],
      showResults: false,
      value:[],


  };



    return this;

  }


  getDefaultstate(){
    return {
      value: null,
      valueField: 'value',
      labelField: 'label',
      customChange: null
    };
  }



  componentDidMount() {
    $("#multidropdown").select2();
   // $select = $("#multidropdown").off("change");
    //alert("Selected value is: "+$("#multidropdown").val());
  }


  render() {


    var self = this;
    var options = self.state.options.map(function(option) {
      return (
        <option key={option[self.state.valueField]} value={option[self.state.valueField]}>
          {option[self.state.labelField]}
        </option>
      )
    });
    $('#multidropdown').trigger('change.select2-selection',function(e){
      alert("safsa")
    });


    return (

      <div style={{padding: "70px"}}>
        <div class="col-md-4" >

           <select id="multidropdown"    style={{width: "200px"}}   multiple>
            {options}

          </select>


        </div>


      </div>

    )
  }



};
MoolyaMultiSelectDropDown.propTypes={
  id: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.oneOfType(
    [
      React.PropTypes.number,
      React.PropTypes.string
    ]
  ),
  valueField: React.PropTypes.string,
  labelField: React.PropTypes.string,
  customChange:React.PropTypes.func
}

