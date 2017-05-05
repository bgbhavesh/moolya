import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import ScrollArea from 'react-scrollbar';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import MlAssignClustersToFilters from './mlAssignClustersToFilters'
import MlAssignModulesToFilters from './MlAssignModulesToFIlters'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {fetchFilterCatalogActionHandler} from '../actions/fetchFilterCatalogActionHandler'
import {createFilterActionHandler} from '../actions/createFilterActionHandler'

export default class MlAddFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {transactionId: ' ',
      transactionType: ' ',
      filterCatalogData : [],
      filterData:{},
      clustersData:{},
      isFilterActive : false,
      showFilters:false
    }
    this.optionBySelectTransactionType.bind(this);
    return this;
  }

  componentDidMount() {
  }

  getassignFilterToClusters(details){
    this.setState({'assignFilterToClusters':details})
  }

  optionBySelectTransactionType(value, calback, selObject){
    this.setState({transactionId:value});
    this.fetchFilterCatalogDetails(value);
  }

  onStatusChange(event){
    let filedName=event.target.name
    let fieldValue=event.target.value;
    if(filedName=='isActive'){
      fieldValue=event.target.checked;
    }
    this.setState({isFilterActive:fieldValue})
  }


  getFiltersData(details){
    this.setState({filterData:details});
  }

  getassignFilterToClusters(details){
    this.setState({clustersData:details});
  }
  async insertFilterDetails() {
    let jsonData={
      filterName :this.refs.name.value || "",
      filterDescription : this.refs.about.value || "",
      isActive : this.state.isFilterActive,
      clusterFields : this.state.clustersData || [],
      moduleName:this.state.transactionId || "",
      filterFields : this.state.filterData || []
    }
    const response = await createFilterActionHandler(jsonData)
    if(response){
      FlowRouter.go("/admin/settings/filtersList");
      return response;
    }

  }



  async fetchFilterCatalogDetails(value) {
    const response= await fetchFilterCatalogActionHandler(value);
    this.setState({filterCatalogData : response,showFilters : true})
  }

  render() {

    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler:this.insertFilterDetails.bind(this)
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/rolesList")
        }
      }
    ]
 /*   let transactionType=gql`query  {
      data:fetchTransaction{
        value:_id
        label:transactionDisplayName
      }
    }
     `;*/
    let transactionType = gql` query{data:fetchModules{label:name,value:name}}`;

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Filter</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-6 nopadding-left">
                <div className="left_wrap">
                  <ScrollArea
                    speed={0.8}
                    className="left_wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <div className="form_bg">
                      <form>
                        <div className="form-group">
                          <input type="text"  ref="name" placeholder="Name" className="form-control float-label" id=""/>

                        </div>


                        <div className="form-group">
                          <textarea placeholder="About" ref="about" className="form-control float-label"></textarea>
                        </div>




                        <MlAssignClustersToFilters getassignFilterToClusters={this.getassignFilterToClusters.bind(this)}/>

                        <div className="form-group switch_wrap inline_switch">
                          <label>Status</label>
                          <label className="switch">
                            <input type="checkbox" name={'isActive'} onChange={this.onStatusChange.bind(this)} />
                            <div className="slider"></div>
                          </label>
                        </div>

                        <br className="brclear"/>


                      </form>
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="col-md-6 nopadding-right"  >
                <div className="clearfix"></div>
                <div className="form_bg left_wrap">
                  <ScrollArea
                    speed={0.8}
                    className="left_wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <form>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Transaction Type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.transactionId} queryType={"graphql"}  query={transactionType} onSelect={this.optionBySelectTransactionType.bind(this)} isDynamic={true}/>
                      </div>
                      {this.state.showFilters?<MlAssignModulesToFilters getFiltersData={this.getFiltersData.bind(this)} filterCatalog={this.state.filterCatalogData}/>:""}
                    </form>
                  </ScrollArea>
                </div>
              </div>
            </ScrollArea>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
}

