import React, { Component, PropTypes } from 'react';
export default class MoolyaDatepicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateformate: props.dateformate,
      customSelect:props.customSelect,
      selectedDate:'',
      styles:props.styles,
    };



    return this;

  }
 /* datepickerChange(e){
   // alert(this.state.customSelect)

  // alert($("#mdatepicker").val())

  }*/
  selectedDate(e){
    $("#mdatepicker").datepicker({ format: this.state.dateformate });
    this.props.customSelect(e.target.value);
    this.setState({selectedDate : e.target.value });
  }
  calenderClick(){
    $("#mdatepicker").focus();
  }



  render() {

    return (

        <div  style={this.state.styles}  >
          <div className="input-group">
            <input type="text"  id="mdatepicker" value={this.state.selectedDate} onSelect={this.selectedDate.bind(this)} className="form-control" placeholder="Select Date" />
            <span className="input-group-addon" id="btn" onClick={this.calenderClick} style={{cursor:"pointer"}}>
                    <span><i className="fa fa-calendar"></i></span>
            </span>

          </div>
        </div>


    )
  }


};
MoolyaDatepicker.propTypes={
  dateformate : React.PropTypes.string,
  customSelect: React.PropTypes.func,


}
