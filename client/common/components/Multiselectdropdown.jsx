import React, { Component, PropTypes } from 'react';

export default class MoolyaMultiSelectDropDown extends Component {

  constructor(props) {
    super(props);


    this.state = {
      options: props.options,
      value: props.value,
      labelField: props.labelField,
      valueField: props.valueField,
      customChange: props.customChange,
      styles: props.styles,
    };
    return this;

  }
  handleChange() {
    alert("Selction has been changed!");
  }
  componentDidMount() {
    $("#multidropdown").select2();
    $(this.refs['mySelect']).select2({
      change: this.handleChange
    });
  //  alert($("#multidropdown option:selected").text())
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


    return (

      <div style={this.state.styles}>
        <select ref='mySelect' id="multidropdown"  className="form-control" placeholder="select" multiple>
        {options}
          </select>
      </div>

    )
  }



};
MoolyaMultiSelectDropDown.propTypes={
  options: React.PropTypes.array.isRequired,
  valueField: React.PropTypes.string,
  labelField: React.PropTypes.string,
  customChange:React.PropTypes.func,

}

