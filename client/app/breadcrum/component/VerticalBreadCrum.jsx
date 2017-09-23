import React, { Component, PropTypes } from 'react';
import { fetchPortfolioImageHandler } from '../../ideators/actions/ideatorActionHandler';
import { getTeamUsersActionHandler } from '../../internalTask/actions/fetchOffices';
import { fetchInternalTaskInfo } from '../../internalTask/actions/fetchInternalTaskInfo';
import { findRegistrationActionHandler } from '../../registrations/actions/findRegistration';
import { fetchAllOfficeMembers } from '../../investment/actions/fetchAllTeamMember';

export default class VerticalBreadCrum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 1,
      list: [],
    };
    this.setDefaultName = this.setDefaultName.bind(this);
    this.fetchNameToDisplay.bind(this);
    this.getHierarchyDetails = this.getHierarchyDetails.bind(this);
  }

  setDefaultName(type) {
    const object = {};
    let name = type;
    if (type.includes('Id')) {
      name = type.split('Id')[0];
    }
    object[type] = properName(name);
    this.setState(object);
  }

  renderBreadcrumb() {
    this.setState({ toggle: !this.state.toggle });
  }

  componentWillMount() {
    const routePath = Object.assign(FlowRouter._current.route.path);
    const routePathHierarchy = routePath.split('/');

    routePathHierarchy.map((object, index) => {
      if (object.startsWith(':')) {
        this.fetchNameToDisplay();
      }
    });
  }

  componentDidMount() {
    this.context.breadCrum.subscribe(this.renderBreadcrumb.bind(this));
    this.getHierarchyDetails();
  }

  getHierarchyDetails() {

  }

  async fetchNameToDisplay() {
    const object = {};

    if (FlowRouter.getParam('portfolioId')) {
      var response = await fetchPortfolioImageHandler(FlowRouter.getParam('portfolioId'));
      if (response) {
        object['portfolioId'] = response.portfolioUserName;
        this.setState(object);
      } else this.setDefaultName('portfolioId');
    } else if ( FlowRouter.getParam('taskId')) {
      var response = await fetchInternalTaskInfo(FlowRouter.getParam('taskId'));
      if (response) {
        object['taskId'] = response.name;
        this.setState(object);
      } else this.setDefaultName('taskId');
    } else if (FlowRouter.getParam('officeId')) {
      var response = await getTeamUsersActionHandler(FlowRouter.getParam('officeId'));
      if (response) {
        object['officeId'] = response.name;
        this.setState(object);
      } else this.setDefaultName('officeId');
    } else if (FlowRouter.getParam('memberId')) {
      const id = FlowRouter.getParam('memberId');
      var response = await fetchAllOfficeMembers();
      if (response) {
        response.map((obj) => {
          if (obj._id === id) {
            object['memberId'] = obj.name;
            this.setState(object);
          }
        });
      } else this.setDefaultName('memberId');
    } else if (FlowRouter.getParam('id')) {
      var response = await findRegistrationActionHandler(FlowRouter.getParam('id'));
      if (response && response.registrationInfo && response.registrationInfo.registrationType) {
        const resType = response.registrationInfo.communityName;
        object['id'] = resType;
        this.setState(object);
      } else this.setDefaultName('id');
    } else if (FlowRouter.getParam('communityType')) {
      object['communityType'] = properName(id);
      this.setState(object);
    } else {
      this.setDefaultName('communityType');
    }
  }

  onLinkClicked() {
    this.props.breadcrumbClicked();
  }

  render() {
    const path = Object.assign(FlowRouter._current.path);
    const routePath = Object.assign(FlowRouter._current.route.path);

    const tab = FlowRouter.getQueryParam('tab', path);
    const subtab = FlowRouter.getQueryParam('subtab', path);

    const pathHierarchy = path.split('app/')[1].split('/');
    const routePathHierarchy = routePath.split('app/')[1].split('/');

    let list = [];

    if (routePath === '/officeMember/:officeId/:memberId') {
      // return [
      //   {linkName : 'Edit Office'}
      // ]
      // const cname = routePathHierarchy[index].split(':')[1];
      // const name = this.state[cname];
    }

    for (const index in routePathHierarchy) {
      if (routePathHierarchy[index] === ':communityType') {
        const tempList = list;
        list = [];
        list.push(tempList[0]);
      }
      if (routePathHierarchy[index] === 'manageSchedule') {
        list.push({
          name: properName(routePathHierarchy[index]),
          link: '/app/calendar/manageSchedule/all/activityList',
        });
      } else if (!routePathHierarchy[index] || routePathHierarchy[index] === '' ||routePathHierarchy[index] === ':isFirst'
        || routePathHierarchy[index - 1] === 'manageSchedule') {
        // do nothing
      } else if ((routePathHierarchy[index] === 'view' || routePathHierarchy[index] === 'edit')
        && (routePathHierarchy[index - 1] === 'portfolio')) {

      } else if (routePathHierarchy[index].startsWith(':')) {
        if (routePathHierarchy[index] === ':officeId') {
          list[list.length - 1].link = path.split(pathHierarchy[index])[0] + pathHierarchy[index].split('?')[0];
        } else {
          const cname = routePathHierarchy[index].split(':')[1];
          const name = this.state[cname];    // get name from DATABASE using ID and set here
          // if (routePathHierarchy[index-2] === 'view' || routePathHierarchy[index-2] === 'edit'){
          //   name += ' ('+routePathHierarchy[index-2] +')';
          // }
          // else if(routePathHierarchy[index-2] === 'explore'){
          //   name += ' ('+properName(routePathHierarchy[index-1]) +')';
          // }
          list.push({
            name,
            link: path.split(pathHierarchy[index])[0] + pathHierarchy[index].split('?')[0],
          });
        }
      } else if ((routePathHierarchy[index] === 'view' || routePathHierarchy[index] === 'edit')) {
        list.push({
          name: properName(routePathHierarchy[index]),
          link: path,
        });
        break;
      } else if (routePathHierarchy[index] === 'all' && routePathHierarchy[index - 1] !== 'manageSchedule') {
        list[index - 1].link = path;
        break;
      } else if (routePathHierarchy[index] === 'addOffice' || routePathHierarchy[index] === 'editOffice') {
        list.push({
          name: properName('myOffice'),
          link: `${path.split(routePathHierarchy[index])[0]}myOffice`,
        });
        list.push({
          name: properName(routePathHierarchy[index]),
          link: path.split(routePathHierarchy[index])[0] + routePathHierarchy[index],
        });
      } else {
        list.push({
          name: properName(routePathHierarchy[index]),
          link: path.split(routePathHierarchy[index])[0] + routePathHierarchy[index],
        });
      }
    }

    if (tab) {
      list.push({
        name: properName(tab),
        link: path.split('&')[0],
      });
      if (subtab && tab !== 'about') {
        list.push({
          name: properName(subtab),
          link: '',
        });
      }
    }

    if (list[0].name === 'Calendar') {
      list.splice(0, 1);
    }

    list.splice(0, 1);

    let currentClassName = '';
    const mlist = list.map((obj, index) => {
      if (index + 1 === list.length) currentClassName = 'current';
      return (<li key={index} className={currentClassName} onClick={ this.onLinkClicked.bind(this)}><a href={obj.link} >{obj.name}</a></li>);
    });

    if (list.length > 0) { mlist.push(<li key={'last'} className='timelineLast'></li>); }
    return (
      <div className="vTimeline">
        <ul>
          {mlist}
        </ul>
      </div>
    );
  }
}

function properName(name) {
  if (name) { return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([A-Z])/g, ' $1').trim(); }
  return name;
}

VerticalBreadCrum.contextTypes = {
  breadCrum: PropTypes.object,
};
