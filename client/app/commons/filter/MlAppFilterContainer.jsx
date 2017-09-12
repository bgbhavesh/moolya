/**
 * Created by pankaj on 5/9/17.
 */
import React, { Component, PropTypes } from 'react';
import MlAppFilterPresentation from './MlAppFilterPresentation';
import {initalizeFloatLabel} from '../../../../client/commons/utils/formElemUtil';
import gql from "graphql-tag";
import {appClient} from '../../core/appConnection';

export default class MlAppFilterContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterQuery: {}
    };
    console.log('props.filterData', props.filterData);
    this.updateFilterQuery = this.updateFilterQuery.bind(this);
  }

  componentDidMount() {
    $('.filter_btn').click(function(){
      $('.filter_table').toggleClass('filter_hide');
    });
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip({
        container:'body',
        trigger:"hover"
      });
      $('[data-toggle="tooltip').on('click', function () {
        $(this).tooltip('hide');
      });
    },1000);

    $('.filter_btn').click(function(){
      $('.filter_overlay').toggle();
      });

    $('.filter_overlay').click(function(){
      $('.filter_table').addClass('filter_hide');
      $(this).hide();
    });
    $('.save_btn').click(function(){
      $('.filter_table').addClass('filter_hide');
      $('.filter_overlay').toggle();
    });
    $('.cancel_btn').click(function(){
      $('.filter_table').addClass('filter_hide');
      $('.filter_overlay').toggle();
    });

    initalizeFloatLabel();
  }

  updateFilterQuery(value, filter){
    let filterQuery = this.state.filterQuery;
    if(value){
      filterQuery[filter] = value;
    } else {
      delete filterQuery[filter];
    }

    this.setState({
      filterQuery: filterQuery
    });
  }

  onApplyFilter () {
    console.log(this.state.filterQuery);
    this.props.submit(this.state.filterQuery);
    $('.filter_table').addClass('filter_hide');
  }

  onCancelFilter() {
    $('.filter_table').addClass('filter_hide');
  }

  render() {
    const that = this;
    const propsFilterData = this.props.filterData;
    let filterData = JSON.parse(JSON.stringify(propsFilterData));
    let filters = filterData.map(function (filter) {
      if(filter.graphQLOption && filter.graphQLOption.options && filter.graphQLOption.options.variables && typeof filter.graphQLOption.options.variables == "object"){
        let variables = filter.graphQLOption.options.variables;
        for(let variable in variables){
          let objectValue = variables[variable];
          console.log('objectValue', objectValue, " adf ",variables, " adf ",variable);
          if(objectValue.substr(0,2) === "$$"){
            let value = that.state.filterQuery[objectValue.substr(2)];
            console.log('value', value);
            filter.graphQLOption.options.variables[variable] = value ? value : "";
          }
        }
      }
      return filter;
    });
    console.log(filters, that.state.filterQuery, filterData );
    return (
      <div className="filter_table filter_hide">
        <div className="panel panel-default">
          <MlAppFilterPresentation
            filters={filters}
            connection={appClient}
            selectedData={that.state.filterQuery}
            updateFilterQuery={this.updateFilterQuery}
          />
          <div className="ml_icon_btn">
            <a href="#"  className="save_btn" onClick={that.onApplyFilter.bind(this)} >
              <span className="ml my-ml-save"></span>
            </a>
            <a href="#" id="cancel_contact" className="cancel_btn" onClick={that.onCancelFilter.bind(this)}>
              <span className="ml my-ml-cancel"></span>
            </a>
          </div>
        </div>
        <div className="filter_btn"  data-toggle="tooltip" title="Filter"><img src="/images/filter_icon.png"/></div>
      </div>
    );
  }
}
