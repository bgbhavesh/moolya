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
    this.state={
      viewMode:true
    }


  }
  componentDidMount()
  {

  }

  viewModeChange(mode){
    this.setState({'viewMode':mode});
  }

  render()
    {
      let showInfinity = true;
      let viewMode = this.state.viewMode;
      let infinityViewProps = {viewMode: this.state.viewMode, onViewModeChange:this.viewModeChange.bind(this)};
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

