import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {updateDateAndTimeActionHandler} from '../actions/updateDateAndTimeAction'
import {findDateAndTimeActionHandler} from '../actions/findDateAndTimeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

class MlEditDateAndTime extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      data:{},
      timeFormat: '',
      amSymbol: '',
      pmSymbol: '',
      dateFormat: '',
      numberOfDaysInWeek: '',
      firstDayOfWeek: '',
    };
    this.addEventHandler.bind(this);
    this.updateLang.bind(this);
    this.findLang.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  componentWillMount() {
    const resp=this.findLang();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateLang();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/dateAndTimeList");
  };
  async findLang(){
    let Id=this.props.config;
    const response = await findDateAndTimeActionHandler(Id);

    if(response) {
      this.setState({loading:false,data:response});
      // this.setState({documentId: this.state.data.documentId});
      // this.setState({id: this.state.data._id});
      if (this.state.data.timeFormat) {
        this.setState({timeFormat: this.state.data.timeFormat});
      }
      if (this.state.data.amSymbol) {
        this.setState({amSymbol: this.state.data.amSymbol});
      }
      if (this.state.data.pmSymbol) {
        this.setState({pmSymbol: this.state.data.pmSymbol});
      }
      if (this.state.data.dateFormat) {
        this.setState({dateFormat: this.state.data.dateFormat});
      }
      if (this.state.data.numberOfDaysInWeek) {
        this.setState({numberOfDaysInWeek: this.state.data.numberOfDaysInWeek});
      }
      if (this.state.data.firstDayOfWeek) {
        this.setState({firstDayOfWeek: this.state.data.firstDayOfWeek});
      }
      // if (this.state.data.chapters) {
      //   let chaptersId = this.state.data.chapters[0].id;
      //   this.setState({chapters: [{id: chaptersId}]});
      // }
      // if (this.state.data.subChapters) {
      //   let subChaptersId = this.state.data.subChapters[0].id;
      //   this.setState({subChapters: [{id: subChaptersId}]});
      // }
    }
    this.setState({loading:false,data:response});
  }

  async  updateLang() {
    let Details = {
      _id: this.refs.id.value,
      timeFormat: this.state.timeFormat,
      amSymbol: this.state.amSymbol,
      pmSymbol: this.state.pmSymbol,
      dateFormat: this.state.dateFormat,
      numberOfDaysInWeek: this.state.numberOfDaysInWeek,
      firstDayOfWeek: this.state.firstDayOfWeek,
    }
    console.log(Details)

    const response = await updateDateAndTimeActionHandler(Details);
    return response;

  }
  optionsBySelectTimeFormat(val){
    this.setState({timeFormat:val})
  }
  optionsBySelectAmSymbol(val){
    this.setState({amSymbol:val})
  }
  optionsBySelectPmSymbol(val){
    this.setState({pmSymbol:val})
  }
  optionsBySelectDateFormat(val){
    this.setState({dateFormat:val})
  }
  optionsBySelectNumberOfDaysInWeek(val){
    this.setState({numberOfDaysInWeek:val})
  }
  optionsBySelectFirstDayOfWeek(val){
    this.setState({firstDayOfWeek:val})
  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }


  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.updateLang.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let clusterquery=gql` query{  
  data:fetchDocumentsType{
    value:_id
    label:docTypeName
  }  
}`;

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Create Date and Time</h2>
              <div className="col-md-6 nopadding-left">
                <input type="text" ref="id" defaultValue={this.state.data._id} hidden="true"/>
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false}  placeholder={"Date Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.timeFormat} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectTimeFormat.bind(this)} />
                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false}  placeholder={"AM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.amSymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectAmSymbol.bind(this)} />
                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false}  placeholder={"PM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.pmSymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectPmSymbol.bind(this)} />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*<textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>*/}
                    {/*</div>*/}
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg left_wrap">
                  <ScrollArea
                    speed={0.8}
                    className="left_wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <form>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false}  placeholder={"Date Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.dateFormat} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectDateFormat.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false}  placeholder={"Number of Days in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.numberOfDaysInWeek} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectNumberOfDaysInWeek.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false}  placeholder={"First Day in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.firstDayOfWeek} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectFirstDayOfWeek.bind(this)} />
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label>24</label>
                        <label className="switch">
                          <input type="checkbox" ref="status" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                          <div className="slider"></div>
                        </label>
                        <label>12</label>
                      </div>
                      <br className="brclear"/>
                    </form>
                  </ScrollArea>
                </div>
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
          </div>)}
      </div>
    )
  }
};

export default MlEditDateAndTime = formHandler()(MlEditDateAndTime);
