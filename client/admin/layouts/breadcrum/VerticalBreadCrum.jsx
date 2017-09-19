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

    if (this.props && this.props.breadcrum) {
      breadCrum = this.props.breadcrum;

      if (breadCrum.type === 'hierarchy') {
        const params = FlowRouter.current().params;
        getBreadCrumListBasedOnhierarchy( breadCrum.module, params, this.setBreadCrumHierarchyCallback.bind(this));
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
            // linkId: 'subModule',
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
  const path = Object.assign(FlowRouter._current.path);
  const module = breadCrum.subModule || breadCrum.module;
  const pathHierarchy = path.split('/');

  if (breadCrum.type) {
    if (breadCrum.type === 'templates') { list[1].linkName += ' List'; }
    if (breadCrum.type === 'transaction' && breadCrum.module === 'registrations') {
      list[1].linkUrl = `${path.split('transactions')[0]}transactions/registrationRequested`;
    }

    menu.map((object) => {
      if ((object.uniqueId).includes(breadCrum.type) || (breadCrum.type).includes(object.uniqueId)) {
        // list[0].linkUrl = object.link;
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
  if (list[0].linkName === 'Packages' && list[1].linkName === 'Office') {   //  for name correction
    list[1].linkName = 'Office Packages';
  }

  list.splice(0, 1);                                         // removing menu level from breadcrumb
  if (!list || !list.length) return [];

  for (let i = 1; i < list.length; i++) {
    if (list[i - 1].linkName === 'Registration') {          //  for name correction
      if (list[i].linkName === 'Stage Of Company') {
        list[i].linkName = 'Company Stages';
      } else if (list[i].linkName === 'Business') {
        list[i].linkName = 'Types Of Business';
      } else if (list[i].linkName === 'Entity') {
        list[i].linkName = 'Entity Types';
      }
    }
    if (list[i].linkName === list[i - 1].linkName) {
      list.splice(i, 1);
      break;
    }
  }
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
