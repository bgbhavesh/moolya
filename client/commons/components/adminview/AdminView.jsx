import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
import MoolyaInfinityView from '../infinityView/InfinityView'
import MoolyaListView from '../list/ListView'
import MoolyaMapView from '../map/MapView'
import MoolyaFooter from '../footer/Footer'
export default class MoolyaAdminView extends Component {
  constructor(props){
    super(props);
   /* this.state={
      viewMode:true
    }*/


  }

 /* viewModeChange(mode){
    this.setState({'viewMode':mode});
  }*/

  render()
    {
      let showInfinity = true;
      let viewMode = this.props.viewMode;
      let infinityViewProps = {viewMode: this.props.viewMode, onViewModeChange:this.props.onViewModeChange};
      let listViewProps={clusterListOptions:this.props.clusterListOptions,listRouterPath:this.props.listRouterPath,imageLink:this.props.imageLink,nameField:this.props.nameField,statusField:this.props.statusField}
      let footerProps={footerOptions:this.props.footerOptions,routerPath:this.props.routerPath,imagePath:this.props.imagePath}
      return (
        <div>
          <div className="admin_main_wrap">
            {viewMode ? <MoolyaMapView/> : <div><MoolyaListView {...listViewProps}/><MoolyaFooter {...footerProps}/></div> }
            {showInfinity && (<MoolyaInfinityView {...infinityViewProps} />)}
          </div>
        </div>

      )
    }

}

