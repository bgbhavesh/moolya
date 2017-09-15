import React, { Component, PropTypes } from 'react';
import getBreadCrumListBasedOnhierarchy from './actions/dynamicBreadCrumListHandler';

export default class VerticalBreadCrum extends Component {
  constructor(props) {
    super(props);
    this.state = { breadCrumList: [] };
    this.getHierarchyDetails.bind(this);
    this.setBreadCrumHierarchyCallback.bind(this);
    return this;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getHierarchyDetails();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setBreadCrumHierarchyCallback(list) {
    if (this._isMounted) {
      if (list && _.isArray(list)) {
        this.setState({ breadCrumList: list });
      } else {
        this.setState({ breadCrumList: [] });
      }
    }
  }

  getHierarchyDetails() {
    const menuConfig = this.context.menu && this.context.menu.menu ? this.context.menu.menu : [];
    let breadCrum = null;
    const path = Object.assign(FlowRouter._current.path);
    // let list = {};
    let firstLevel = '';
    if (path.includes('dashboard')) firstLevel = 'dashboard';
    else if (path.includes('clusters')) firstLevel = 'clusters';
    else if (path.includes('chapters')) firstLevel = 'chapters';
    else if (path.includes('community')) firstLevel = 'community';

    // if (firstLevel) {
    //   list = {
    //     linkUrl: path.split(firstLevel)[0] + firstLevel,
    //     linkName: properName(firstLevel),
    //   };
    // }

    if (this.props && this.props.breadcrum) {
      breadCrum = this.props.breadcrum;
      if (breadCrum.type === 'hierarchy') {
        const params = FlowRouter.current().params;
        getBreadCrumListBasedOnhierarchy(firstLevel, breadCrum.module, params, this.setBreadCrumHierarchyCallback.bind(this));
      } else if (breadCrum.type) {
        let module = properName(breadCrum.module);
        if (module === 'Roles') module = 'Roles & Permissions';
        let breadCrumObject = [
          { linkName: properName(breadCrum.type), linkId: breadCrum.type },
          { linkName: module, linkId: 'module' },
        ];
        if (breadCrum.subModule) {
          breadCrumObject.push({
            linkName: properName(breadCrum.subModule),
            linkId: 'subModule',
          });
        }

        breadCrumObject = StaticBreadCrumListHandler(breadCrumObject, breadCrum, menuConfig);
        this.setBreadCrumHierarchyCallback(
          breadCrumObject
        );
      }
    } else {
      const breadCrumObject = StaticBreadCrumListHandlerWithNoBredcum();
      this.setBreadCrumHierarchyCallback(
        breadCrumObject
      );
    }
  }

  render() {
    const path = FlowRouter.current().route.name;
    const params = FlowRouter.current().params;
    const queryParams = FlowRouter.current().queryParams;
    let menu,
      tabOptions;
    const breadCrumList = [];

    let counter = 0;
    const linksLength = this.state.breadCrumList.length;
    const list = this.state.breadCrumList.map((prop, id) => {
      ++counter;
      let lastLinkClass = '';
      const linkUrl = prop.linkUrl;
      if (counter === linksLength) {
        lastLinkClass = 'current';
      }
      return (<li key={prop.linkId} className={lastLinkClass}><a href={linkUrl}>{prop.linkName}</a></li>);
    });
    if (linksLength > 0) { list.push(<li key={'last'} className='timelineLast'></li>); }

    return (
      <div className="vTimeline">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

function StaticBreadCrumListHandler(list, breadCrum, menu) {
  let currentModule = {};
  if (breadCrum.type) {
    if (breadCrum.type === 'templates') { list[1].linkName += ' List'; }

    menu.map((object) => {
      if ((object.uniqueId).includes(breadCrum.type) || (breadCrum.type).includes(object.uniqueId)) {
        list[0].linkUrl = object.link;
        currentModule = object;
      }
    });
    if (breadCrum.subModule) {
      currentModule.subMenu.map((object) => {
        if ((object.uniqueId).includes(breadCrum.module)) {
          list[1].linkUrl = object.link;
        }
      });
    }
    const path = Object.assign(FlowRouter._current.path);
    const module = breadCrum.subModule || breadCrum.module;
    const pathHierarchy = path.split('/');
    for (const each of pathHierarchy) {
      if (each.startsWith('edit')) {
        const link = `${path.split('edit')[0] + module}List`;
        list[list.length - 1].linkUrl = link;
        list.push({
          linkName: 'Edit',
          linkUrl: '',
        });
      } else if (each.startsWith('add')) {
        const link = `${path.split('add')[0] + module}List`;
        list[list.length - 1].linkUrl = link;
        list.push({
          linkName: 'Add',
          linkUrl: '',
        });
      } else if (each.startsWith('create')) {
        const link = `${path.split('create')[0] + module}List`;
        list[list.length - 1].linkUrl = link;
        list.push({
          linkName: 'Create',
          linkUrl: '',
        });
      }
    }
  }
  list.splice(0, 1);
  if (!list || !list.length) return [];

  for (let i = 1; i < list.length; i++) {
    if (list[i].linkName === list[i - 1].linkName) {
      list.splice(i, 1);
      break;
    }
  }
  list.map((object) => {
    if (object.linkName === 'Office') object.linkName = 'Office Packages';
  });
  return list;
}

function StaticBreadCrumListHandlerWithNoBredcum() {
  const list = [];
  const path = Object.assign(FlowRouter._current.path);
  if (path.includes('community')) {
    const pathHierarchy = path.split('/');
    pathHierarchy.map((cname, index) => {
      if (cname && cname !== 'community' && cname !== 'admin') {
        let name = '';
        if (cname === 'STU') name = 'Startup';
        else if (cname === 'FUN') name = 'Investor';
        else if (cname === 'IDE') name = 'Ideator';
        else if (cname === 'CMP') name = 'Company';
        else if (cname === 'INS') name = 'Institute';
        else if (cname === 'SPS') name = 'Service Provider';
        if (name) {
          list.push({
            linkName: name,
            linkUrl: `${path.split(cname)[0] + cname}/communityDetails`,
          });
        } else if (cname) {
          list.push({
            linkName: properName(cname),
            linkUrl: path.split(cname)[0] + cname,
          });
        }
      }
    });
  }


  return list;
}

function properName(name) {
  if (name) { return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([A-Z])/g, ' $1').trim(); }
  return name;
}

VerticalBreadCrum.contextTypes = {
  menu: React.PropTypes.object,
};
