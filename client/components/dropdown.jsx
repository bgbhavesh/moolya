import React, { Component, PropTypes } from 'react';

export default class MoolyaDropDown extends Component {
  constructor(props) {
    super(props);

    selected = this.getSelectedFromProps(this.props);
    this.state = {
      id: props.id,
      options: props.options,
      value: props.value,
      labelField: props.labelField,
      valueField: props.valueField,
      customChange: props.customChange,
     selected: selected,
    };



    return this;

  }
  getSelectedFromProps(state) {
    let selected;
    if (state.value === null && state.options.length !== 0) {
      selected = state.options[0][state.valueField];
    } else {
      selected = state.value;
    }
    return selected;
  }

  getDefaultstate(){
      return {
        value: null,
        valueField: 'value',
        labelField: 'label',
        customChange: null
      };
    }
  componentWillReceivestate(nextstate) {
      let selected = this.getSelectedFromstate(nextstate);
      this.setState({
        selected: selected
      });
    }


  onChange(e) {
    if (this.state.customChange) {
      var change = {
        oldValue: this.state.selected,
        newValue: e.target.value
      }
      this.props.customChange(change);
    }
    this.setState({selected: e.target.value});

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

        <div style={{padding: "70px"}}>
          <div class="col-md-4" >
        <select id={this.state.id}
                className='form-control'
                value={this.state.selected}
                onChange={this.onChange.bind(this)} style={{width:"200px"}}>
          {options}
        </select>
        </div>

        </div>

      )
    }



  };
MoolyaDropDown.propTypes={
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

