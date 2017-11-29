import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import AlphaSearch from '../../../commons/components/alphaSearch/AlphaSearch';
import MlActionComponent from '../../../commons/components/actions/ActionComponent';
import Pagination from '../../../commons/components/pagination/Pagination';
import _ from 'lodash';
import ScrollArea from 'react-scrollbar'
export default class MlListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: 50,
      pageNumber: 1,
      sort: null,
      pubSelector: null
    }
    this.onPageChange.bind(this);
    this.onSizePerPageList.bind(this);
    this.onAlphaSearchChange.bind(this);
    this.onKeyUp.bind(this);
    this.constructSearchCriteria.bind(this);
    this.actionHandlerProxy = this.actionHandlerProxy.bind(this);
  }
  componentDidUpdate() {
    const WinHeight = $(window).height();
    $('.list_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
  }
  componentWillUpdate(nextProps, nextState) {
    if ((this.state.sizePerPage !== nextState.sizePerPage) || (this.state.pageNumber !== nextState.pageNumber)) {
      const hasQueryOptions = !!this.props.queryOptions;
      const variables = {
        offset: nextState.sizePerPage * (nextState.pageNumber - 1) || 0,
        limit: nextState.sizePerPage || 20 // 5
      }
      if (hasQueryOptions) {
        const dynamicQueryOptions = this.props.buildQueryOptions ? this.props.buildQueryOptions(this.props) : {};
        // let extendedVariables = _.extend(dynamicQueryOptions);
        const extendedVariables = _.merge(dynamicQueryOptions, variables);
        this.props.fetchMore(extendedVariables);
      }
      if (this.state.searchValue !== nextState.searchValue) {
        const searchCriteria = this.constructSearchCriteria(nextState.searchValue);
        variables.fieldsData = searchCriteria || null
        this.props.fetchMore(variables);
      }
      this.props.fetchMore(variables);
    } else if (this.state.searchValue !== nextState.searchValue) {
      const searchCriteria = this.constructSearchCriteria(nextState.searchValue);
      const variables = {
        offset: nextState.sizePerPage * (nextState.pageNumber - 1) || 0,
        fieldsData: searchCriteria || null
      }
      this.props.fetchMore(variables);
    }
  }

  constructSearchCriteria(search) {
    let fieldsAry = null;
    if (search && search.trim() !== '') {
      fieldsAry = [];
      _.find(this.props.options.searchFields, (num) => {
        fieldsAry.push({ fieldName: num, value: search.trim() })
      });
    }
    return fieldsAry;
  }

  onKeyUp(e) {
    this.setState({ searchValue: e.target.value });
  }

  onPageChange(page, sizePerPage) {
    console.log('parent page')
    console.log(page)
    this.setState({
      pageNumber: page
    });
  }

  onAlphaSearchChange(alpha) {
    // alert("selected alphabet is "+alpha);
    this.setState({ searchValue: alpha })
  }

  onSizePerPageList(sizePerPage) {
    this.setState({
      sizePerPage
    });
    this.props.fetchMore();
  }

  onSortChange(sortName, sortOrder) {
    const sortObj = [];
    if (sortOrder === 'asc') {
      sortObj.push(sortName, 'asc');
    } else {
      sortObj.push(sortName, 'desc');
    }
    this.setState({ sort: sortObj });
  }
  actionHandlerProxy(actionConfig) {
    // const selectedRow=this.state.selectedRow;
    const actions = this.props.actionConfiguration;
    const action = _.find(actions, { actionName: actionConfig.actionName });
    action.handler();
  }

  render() {
    const data = this.props.data && this.props.data.data ? this.props.data.data : [];
    const search = typeof this.props.search === 'undefined';
    const pConfig = _.extend(this.props, { sizePerPage: this.state.sizePerPage, pageNumber: this.state.pageNumber });
    const ListComponent = React.cloneElement(this.props.viewComponent, { data, config: pConfig });
    const totalRecords = this.props.data && this.props.data.totalRecords;
    const loading = this.props.loading;
    const config = this.props;
    const actionsProxyList = [];
    if (config.actionConfiguration) {
      const actionsConf = _.clone(config.actionConfiguration);
      const that = this;
      actionsConf.forEach((action) => {
        const act = { actionName: action.actionName, showAction: action.showAction };
        act.handler = that.actionHandlerProxy
        actionsProxyList.push(act);
      });
    }
    return (<div className="app_padding_wrap">
      { search ? <input type="text" className="form-control" id="btn-search" placeholder="Search..." onKeyUp={this.onKeyUp.bind(this)}/> : '' }
      {loading ? (<div className="loader_wrap"></div>) : (
        <div className="list_scroll">
          <ScrollArea
            speed={0.8}
            className="list_scroll"
            smoothScrolling={true}
          >
            <div className="list_view_block">


              <AlphaSearch onAlphaSearchChange={this.onAlphaSearchChange.bind(this)} />
              <div className="col-md-12">
                {ListComponent}
              </div>
              <Pagination onPageChange={this.onPageChange.bind(this)} totalRecords={totalRecords}/>
            </div>
          </ScrollArea>
        </div>
      )}
      {config.showActionComponent === true && <MlActionComponent ActionOptions={actionsProxyList} />}
    </div>)
  }
}
MlListView.propTypes = {
}

