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
      breadCrumList: [],
      toggle: 1,
    };
    this.setDefaultName = this.setDefaultName.bind(this);
    this.fetchNameToDisplay.bind(this);
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

  componentDidMount() {
    this.context.breadCrum.subscribe(this.renderBreadcrumb.bind(this));
  }

  componentWillMount() {
    const path = Object.assign(FlowRouter._current.path);
    const routePath = Object.assign(FlowRouter._current.route.path);
    const pathHierarchy = path.split('/');
    const routePathHierarchy = routePath.split('/');

    routePathHierarchy.map((object, index) => {
      if (object.includes(':')) {
        const id = pathHierarchy[index].split('?')[0];
        this.fetchNameToDisplay(object, id);
      }
    });
  }

  async fetchNameToDisplay(type, id) {
    const object = {};
    type = type.split(':')[1].trim();
    if (type === 'portfolioId') {
      var response = await fetchPortfolioImageHandler(id);
      if (response) {
        object[type] = response.portfolioUserName;
        this.setState(object);
      } else this.setDefaultName(type);
    } else if (type === 'taskId') {
      var response = await fetchInternalTaskInfo(id);
      if (response) {
        object[type] = response.name;
        this.setState(object);
      } else this.setDefaultName(type);
    } else if (type === 'officeId') {
      var response = await getTeamUsersActionHandler(id);
      if (response) {
        object[type] = response.name;
        this.setState(object);
      } else this.setDefaultName(type);
    } else if (type === 'memberId') {
      var response = await fetchAllOfficeMembers();
      if (response) {
        response.map((obj) => {
          if (obj._id === id) {
            object[type] = obj.name;
            this.setState(object);
          }
        });
      } else this.setDefaultName(type);
    } else if (type === 'id') {
      var response = await findRegistrationActionHandler(id);
      if (response && response.registrationInfo && response.registrationInfo.registrationType) {
        const resType = response.registrationInfo.communityName;
        object[type] = resType;
        this.setState(object);
      } else this.setDefaultName(type);
    } else {
      this.setDefaultName(type);
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

    for (const index in routePathHierarchy) {
      if (routePathHierarchy[index] === ':communityType') {
        const tempList = list;
        list = [];
        list.push(tempList[0]);
      }
      if (routePathHierarchy[index] === 'manageSchedule') {
        list.push({
          name: properName(routePathHierarchy[index]),
           // +' ('+getNameFromDB(pathHierarchy[index],routePathHierarchy[index]) +')' ,
          link: '/app/calendar/manageSchedule',
        });
      } else if (!routePathHierarchy[index] || routePathHierarchy[index] === '' || pathHierarchy[index] === 'true'
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

    let className = '';
    const mlist = list.map((obj, index) => {
      if (index + 1 === list.length) className = 'current';
      return (<li key={index} className={className} onClick={ this.onLinkClicked.bind(this)}><a href={obj.link} >{obj.name}</a></li>);
    });

    if (list.length > 0) { mlist.push(<li key={'last'} className='timelineLast'></li>); }

    mlist.splice(0, 1);
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
  breadCrum: PropTypes.Object,
};
