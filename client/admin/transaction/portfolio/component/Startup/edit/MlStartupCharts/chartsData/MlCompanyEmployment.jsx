import React from "react";
import {render} from "react-dom";
import Datetime from "react-datetime";
import _ from 'lodash';

export default class MlCompanyEmployment extends React.Component{
  constructor(props, context){
    super(props)
    this.state={
      data:{},
      startupCompanyEmployment:this.props.employmentDetails || [],
      selectedIndex:0,
      selectedVal:null,
      selectedObject:"default",
      employmentList : this.props.employmentDetails || []
    }
  }


  handleFromYearChange(index,e){
    let details =this.state.data;
    let name  = 'fromYear';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs["fromYear"+index].state.inputValue});
    this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }


  handleFromMonthChange(index,e){
    let details =this.state.data;
    let name  = 'fromMonth';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs["fromMonth"+index].state.inputValue});
    this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }

  handleToYearChange(index,e){
    let details =this.state.data;
    let name  = 'toYear';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs["toYear"+index].state.inputValue});
    this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }

  handleToMonthChange(index,e){
    let details =this.state.data;
    let name  = 'toMonth';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs["toMonth"+index].state.inputValue});
      this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }

  employeementHandleBlur(index,e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }
  aboutHandleBlur(index,e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent(index)
    })
  }

  sendDataToParent(index){
    let data = this.state.data;
    let clients = this.state.startupCompanyEmployment;
    let startupCompanyEmployment = _.cloneDeep(clients);
    data.index = index;
    startupCompanyEmployment[index] = data;
    let arr = [];
    _.each(startupCompanyEmployment, function (item)
    {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      arr.push(newItem)
    })
    startupCompanyEmployment = arr;
    this.setState({startupCompanyEmployment:startupCompanyEmployment})
    this.props.getStartupCompanyEmployment(startupCompanyEmployment);
  }

  onSaveAction(e){
    this.setState({employmentList:this.state.startupCompanyEmployment})
    if(this.state.startupCompanyEmployment){
      this.setState({selectedIndex:this.state.startupCompanyEmployment.length})
    }else{
      this.setState({selectedIndex:0})
    }

  }
  onUpdateAction(){
    if(this.state.startupCompanyEmployment){
      this.setState({selectedIndex:this.state.startupCompanyEmployment.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }
  onRemoveAction(){

  }

  render(){
    let that = this;
    let employemntArray = this.state.employmentList&&this.state.employmentList.length>0?this.state.employmentList:[]
    let defaultIndex = employemntArray&&employemntArray.length>0?employemntArray.length:0
    return(<div>
      <div className="office-members-detail">

      <div className="form_inner_block">
        <div className="add_form_block" onClick={this.onSaveAction.bind(this)}><img src="/images/add.png"/></div>

        <div className="col-lg-12 col-md-12 col-sm-10">
          <div className="row">
            <div className="form-group col-lg-6">
              <div className="form-group col-md-6 col-sm-6">
                <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                          inputProps={{placeholder: "Select Year", className:"float-label form-control"}} defaultValue={this.state.data.year}
                          closeOnSelect={true} ref={"fromYear"+defaultIndex} onBlur={this.handleFromYearChange.bind(this,defaultIndex)}/>
              </div>
              <div className="form-group col-md-6 col-sm-6">
                <Datetime dateFormat="MMMM" timeFormat={false} viewMode="months"
                          inputProps={{placeholder: "Select Year", className:"float-label form-control"}} defaultValue={this.state.data.year}
                          closeOnSelect={true} ref={"fromMonth"+defaultIndex} onBlur={this.handleFromMonthChange.bind(this,defaultIndex)}/>
              </div>

            </div>


            <div className="form-group col-lg-6">
              <div className="form-group col-md-6 col-sm-6">
                <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                          inputProps={{placeholder: "Select Year", className:"float-label form-control"}} defaultValue={this.state.data.year}
                          closeOnSelect={true} ref={"toYear"+defaultIndex} onBlur={this.handleToYearChange.bind(this,defaultIndex)}/>
              </div>
              <div className="form-group col-md-6 col-sm-6">
                <Datetime dateFormat="MMMM" timeFormat={false} viewMode="months"
                          inputProps={{placeholder: "Select Year", className:"float-label form-control"}} defaultValue={this.state.data.year}
                          closeOnSelect={true} ref={"toMonth"+defaultIndex} onBlur={this.handleToMonthChange.bind(this,defaultIndex)}/>
              </div>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-6">
              <input type="text" placeholder="Number of Employment" ref={"empNum"+defaultIndex} className="form-control float-label"
                     id="" name="numberOfEmployment" onBlur={this.employeementHandleBlur.bind(this,defaultIndex)}/>
            </div>

            <div className="form-group col-lg-6 col-md-6 col-sm-6">
              <textarea rows="1" placeholder="About" ref={"about"+defaultIndex} className="form-control float-label"
                        id="" name="about" onBlur={this.aboutHandleBlur.bind(this,defaultIndex)}></textarea>
            </div>
          </div>
        </div>
      </div>
        {that.state.employmentList.map(function (details, idx) {


          return(<div className="form_inner_block">
            <div className="add_form_block" onClick={that.onUpdateAction.bind(that)}><img src="/images/add.png"/></div>
            <div className="add_form_block" onClick={that.onRemoveAction.bind(that)}><img src="/images/remove.png"/></div>
          <div className="col-lg-12 col-md-12 col-sm-10">
            <div className="row">
              <div className="form-group col-lg-6">
                <div className="form-group col-md-6 col-sm-6">
                  <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                            inputProps={{placeholder: "Select Year", className: "float-label form-control"}}
                            defaultValue={details.fromYear}
                            closeOnSelect={true} ref={"fromYear"+idx} onBlur={that.handleFromYearChange.bind(that, idx)}/>
                </div>
                <div className="form-group col-md-6 col-sm-6">
                  <Datetime dateFormat="MMMM" timeFormat={false} viewMode="months"
                            inputProps={{placeholder: "Select Year", className: "float-label form-control"}}
                            defaultValue={details.fromMonth}
                            closeOnSelect={true} ref={"fromMonth"+idx} onBlur={that.handleFromMonthChange.bind(that, idx)}/>
                </div>

              </div>


              <div className="form-group col-lg-6">
                <div className="form-group col-md-6 col-sm-6">
                  <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                            inputProps={{placeholder: "Select Year", className: "float-label form-control"}}
                            defaultValue={details.toYear}
                            closeOnSelect={true} ref={"toYear"+idx} onBlur={that.handleToYearChange.bind(that, idx)}/>
                </div>
                <div className="form-group col-md-6 col-sm-6">
                  <Datetime dateFormat="MMMM" timeFormat={false} viewMode="months"
                            inputProps={{placeholder: "Select Year", className: "float-label form-control"}}
                            defaultValue={details.toMonth}
                            closeOnSelect={true} ref={"toMonth"+idx} onBlur={that.handleToMonthChange.bind(that, idx)}/>
                </div>
              </div>
              <div className="form-group col-lg-6 col-md-6 col-sm-6">
                <input type="text" placeholder="Number of Employment" ref={"empNum"+idx}
                       className="form-control float-label" id="" defaultValue={details.numberOfEmployment} name="numberOfEmployment" onBlur={that.employeementHandleBlur.bind(that,idx)}/>
              </div>

              <div className="form-group col-lg-6 col-md-6 col-sm-6">
                <textarea rows="1" placeholder="About" ref={"about"+idx} className="form-control float-label"
                          id="" name="about"   defaultValue={details.about} onBlur={that.aboutHandleBlur.bind(that,idx)}></textarea>
              </div>
            </div>
          </div>

          </div>)

        })}
      </div>

    </div>)
  }
}
