import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../../../commons/components/select/MoolyaSelect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'


export default class MlStartupTechnology extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupTechnologies:this.props.technologyDetails || [],
      popoverOpen:false,
      index:"",
      startupTechnologiesList:this.props.technologyDetails || [],
      indexArray:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.technologies)
    if(!empty){
      this.setState({loading: false, startupTechnologies: this.context.startupPortfolio.technologies, startupTechnologiesList:this.context.startupPortfolio.technologies});
    }
  }
  onSaveAction(e){
    this.setState({startupTechnologiesList:this.state.startupTechnologies})
    this.setState({popoverOpen : false})
  }
  addTechnology(){
    this.setState({selectedObject : "default"})
    this.setState({popoverOpen : !(this.state.popoverOpen)})
    this.setState({data : {}})
    if(this.state.startupTechnologies){
      this.setState({index:this.state.startupTechnologies.length})
    }else{
      this.setState({index:0})
    }
  }

  onSelect(index, e){
    let cloneArray = _.cloneDeep(this.state.startupTechnologies);
    let details = cloneArray[index];
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({index:index});
    this.setState({data:details})
    this.setState({selectedObject : index})
    this.setState({popoverOpen : !(this.state.popoverOpen)});
    this.setState({"selectedVal" : details.technology});
    let indexes = this.state.indexArray;
    let indexArray = _.cloneDeep(indexes)
    indexArray.push(index);
    indexArray = _.uniq(indexArray);
    this.setState({indexArray: indexArray})
  }

  onLockChange(field, e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  onStatusChangeNotify(e)
  {
    let updatedData = this.state.data||{};
    let key = e.target.id;
    updatedData=_.omit(updatedData,[key]);
    if (e.currentTarget.checked) {
      updatedData=_.extend(updatedData,{[key]:true});
    } else {
      updatedData=_.extend(updatedData,{[key]:false});
    }
    this.setState({data:updatedData}, function () {
      this.sendDataToParent()
    })
  }

  onOptionSelected(selectedIndex,handler,selectedObj){

    let details =this.state.data;
    details=_.omit(details,["technology"],["technologyId"]);
    details=_.extend(details,{["technology"]:selectedObj.label},{["technologyId"]:selectedIndex});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedIndex})
      this.sendDataToParent()
    })

  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    let startupTechnologies1 = this.state.startupTechnologies;
    let startupTechnologies = _.cloneDeep(startupTechnologies1);
    startupTechnologies[this.state.index] = data;
    let arr = [];
    _.each(startupTechnologies, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename")
      if(item && item.logo){
        delete item.logo['__typename'];
      }
      arr.push(newItem)
    })
    startupTechnologies = arr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupTechnologies:startupTechnologies})
    let indexArray = this.state.indexArray;
    this.props.getStartupTechnology(startupTechnologies,indexArray);
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{technologies:[{logo:{fileUrl:'', fileName : fileName}}]},indexArray:this.state.indexArray};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){

      }
    }
  }
  render(){
    let query=gql`query{
      data:fetchTechnologies {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    let technologiesArray = that.state.startupTechnologiesList || [];
    return (
      <div>
        <h2>Technology</h2>
        <div className="requested_input main_wrap_scroll">

          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3">
                  <a href="#" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                    <div className="list_block notrans" onClick={this.addTechnology.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addTechnology.bind(this)}>Add New Technology</h3>
                    </div>
                  </a>
                </div>

                {technologiesArray.map(function (details, idx) {
                  return(<div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="#" id={"create_client"+idx}>
                      <div className="list_block">
                        <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                        <div className="hex_outer" onClick={that.onSelect.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>

                        <h3>{details.description && details.description}</h3>
                      </div>
                    </a>
                  </div>)
                })}

              </div>
            </div>

          </ScrollArea>

          <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
            {/* <PopoverTitle>Add Asset</PopoverTitle>*/}
            <PopoverContent>
              <div className="ml_create_client">
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">


                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={query}
                                    isDynamic={true}
                                    onSelect={this.onOptionSelected.bind(this)}
                                    selectedValue={this.state.selectedVal}/>
                    </div>

                    <div className="form-group">
                      <input type="text" name="description" placeholder="Description" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/>
                      <input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate}/>
                    </div>

                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload Logo</span>
                        <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                      </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                    </div>
                  </div>
                </div></div>
              </div>
            </PopoverContent>
          </Popover>




        </div>


      </div>
    )
  }
}
MlStartupTechnology.contextTypes = {
  startupPortfolio: PropTypes.object,
};
