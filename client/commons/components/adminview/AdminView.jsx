import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
import MoolyaInfinityView from '../infinityView/InfinityView'
import MoolyaListView from '../list/ListView'
import MoolyaMapView from '../map/MapView'
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

      return (
        <div>
          <div className="admin_main_wrap">
            {viewMode ? <MoolyaMapView/> : <MoolyaListView/>}
            {showInfinity && (<MoolyaInfinityView {...infinityViewProps} />)}
          </div>
        </div>

      )
    }

}

