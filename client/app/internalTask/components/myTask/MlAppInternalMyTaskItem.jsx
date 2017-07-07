/** ************************************************************
 * Date: 07 Jul, 2017
 * Programmer: Pankaj <pakajkumar.jatav@raksan.in>
 * Description : This will create my task
 * JavaScript XML file MlAppNewTask.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import Datetime from "react-datetime";
import moment from "moment";
import {fetchMasterTasks} from '../../actions/fetchMasterInternalTask';
import {createSelfInternalTask} from '../../actions/createSelfInternalTask';
let FontAwesome = require('react-fontawesome');

/**
 * Initialize conversation types
 */


export default class MlAppInternalMyTaskItem extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
    this.state ={
      basicData : {
        dueDate: '',
        resourceId: ''
      },
      taskList:[]
    };
  }

  /**
   * Method :: textFieldSaves
   * Desc   :: update input and input area text in state
   * @param type :: String :: type of field in state data
   * @param evt  :: Object :: javascript event object
   * @returns Void
   */
  textFieldSaves(type,evt){
    let data = this.state.basicData;
    data[type] = evt.target.value;
    this.setState({
      basicData: data
    });
  }

  /**
   * Component Did Mount
   * Desc :: intilize float labels
   */
  componentDidMount() {

    $('.float-label').jvFloat();
    let WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(120+$('.app_header').outerHeight(true)));
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    this.fetchMasterTasks();
  }

  async fetchMasterTasks(){
    let response = await fetchMasterTasks();
    if(response) {
      this.setState({
        taskList: response
      });
    }
  };

  // setTask(task) {
  //   let basicData = this.state.basicData;
  //   basicData.resourceId = task.value;
  //   this.setState({
  //     basicData: basicData
  //   });
  // }

  async saveDetails(){
    let dataToInsert = this.state.basicData;
    let response = await createSelfInternalTask(dataToInsert);
    if(response) {
      toastr.success(response.result);
      this.props.updateType('list');
    }
  }

  dueDate(date){
    let basicData = this.state.basicData;
    basicData.dueDate = date;
    this.setState({
      basicData: basicData
    })
  }

  changePriority(evt){
    let basicData = this.state.basicData;
    basicData.priority = evt.target.value;
    this.setState({
      basicData: basicData
    });
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */
  render() {
    const that = this;

    /**
     * Return the html to render
     */
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                {/*<div className="form-group">*/}
                  {/*<Select*/}
                    {/*name="form-field-name"*/}
                    {/*placeholder="Choose task"*/}
                    {/*value={that.state.basicData.resourceId}*/}
                    {/*options={that.state.taskList}*/}
                    {/*onChange={(value)=>that.setTask(value)}*/}
                  {/*/>*/}
                {/*</div>*/}
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Task Name" value={that.state.basicData.name} onChange={that.textFieldSaves.bind(that,"name")}/>
                </div>

                <div className="form-group">
                  <Datetime dateFormat="DD-MM-YYYY"
                            timeFormat={false}
                            inputProps={{placeholder: "Due Date"}}
                            closeOnSelect={true}
                            value={moment( this.state.basicData.dueDate ? this.state.basicData.dueDate : '' )}
                            onChange={(date)=> this.dueDate(date)}/>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected Input" value={that.state.basicData.expectedInput} onChange={that.textFieldSaves.bind(that, "expectedInput")}></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <div className="input_types">
                    <label>Set Priority : </label>
                  </div>
                  <div className="input_types">
                    <input id="radio1" type="radio" checked={ that.state.basicData.priority == "low" } name="radio" value="low" onClick={(evt)=>that.changePriority(evt)} /><label htmlFor="radio1"><span><span></span></span>Low</label>
                  </div>
                  <div className="input_types">
                    <input id="radio2" type="radio" checked={ that.state.basicData.priority == "medium" } name="radio" value="medium" onClick={(evt)=>that.changePriority(evt)} /><label htmlFor="radio2"><span><span></span></span>Medium</label>
                  </div>
                  <div className="input_types">
                    <input id="radio3" type="radio" checked={ that.state.basicData.priority == "high" } name="radio" value="high"  onClick={(evt)=>that.changePriority(evt)} /><label htmlFor="radio3"><span><span></span></span>High</label>
                  </div>
                </div>
                <br className="brclear" />
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Notes" value={that.state.basicData.note} onChange={that.textFieldSaves.bind(that, "note")}></textarea>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected Output" value={that.state.basicData.expectedOutput} onChange={that.textFieldSaves.bind(that, "expectedOutput")}></textarea>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <a href="" className="save_btn" onClick={this.saveDetails.bind(this)}>Save</a>
          <a href="" className="cancel_btn" onClick={()=>that.props.updateType('list')} >Cancel</a>
        </div>
      </div>
    )
  }
};
