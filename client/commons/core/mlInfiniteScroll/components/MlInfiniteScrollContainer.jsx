/** ************************************************************
 * Date: 12 Jul, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Infinite scroll main container
 * JavaScript file MlInfiniteScrollContainer.js
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from 'react';
import MlInfiniteScrollHeader from './MlInfiniteScrollHeader';
import MlInfiniteScrollFooter from "./MlInfiniteScrollFooter";
import MlInfiniteScrollView from "./MlInfiniteScrollView";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class MlInfiniteScrollContainer extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
  }

  componentWillMount() {
    let WinHeight = $(window).height();
    $('.infinite_scroll').height(WinHeight-(210+$('.app_header').outerHeight(true)));
  }


  componentWillReceiveProps(props) {
    console.log('props',props);
  }

  updateSearchValue(text){
    console.log(text);
  }

  loadMore(){
    const props = this.props;
    let data = this.props.data && this.props.data.data ? this.props.data.data : [];
    let options = {
      module: props.moduleName,
      queryProperty: {
        limit : props.perPageLimit,
        skip : data.length ? this.props.data.data.length : 0,
      }
    };
    if(props.sort) {
      options.queryProperty['sortBy'] = props.sortBy;
    }
    this.props.fetchMore(options);
  }

  render() {
    const that = this;
    const props = that.props;
    let viewComponent = this.props.viewComponent;
    let data = this.props.data && this.props.data.data ? this.props.data.data : [];
    let count = this.props.data && this.props.data.count ? this.props.data.count : 0;
    console.log('count', count);
    let hasMore = data.length == count ? false : true;

    return (
      <div className={props && props.isApp?'':"admin_main_wrap"}>
        <div className={props && props.isApp?'app_padding_wrap':"admin_padding_wrap"}>
          { props.header ? <MlInfiniteScrollHeader config={props.header} updateSearchValue={this.updateSearchValue} /> : '' }
          <MlInfiniteScrollView viewComponent={viewComponent} data={data} config={props} />
          <MlInfiniteScrollFooter hasMore={hasMore} loadMore={this.loadMore} />
        </div>
      </div>
      )

  }
}
