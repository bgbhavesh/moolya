import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
export default class MoolyaListView extends Component {

  render(){
    let imagelink=this.props.imageLink;
    let namefield=this.props.nameField;
    let statusfield=this.props.statusField;
    let clusterListView = this.props.clusterListOptions.map(function(option) {

      return (
        <div className={"col-md-2"}  key={option.name}>
        <div className={"list_block"}>
        <div className={`cluster_status ${option[statusfield]}_cl `}></div>
        <div className={"hex_outer"}><img src={option[imagelink]}/></div>
        <h3>{option[namefield]}</h3>
        </div>
        </div>
      )
      })
    return(
      <div className="list_view_block">
      <div className="col-md-12">
        <div className="row">
          {clusterListView}

        {/*<div className="col-md-2">
          <div className="list_block">
            <div className="cluster_status active_cl"></div>
            <div className="hex_outer"><img src="/images/afghanistan.png"/></div>
            <h3>Afghanistan</h3>
          </div>
        </div>
        <div className="col-md-2">
          <div className="list_block">
            <div className="cluster_status inactive_cl"></div>
            <div className="hex_outer"><img src="/images/australia.png"/></div>
            <h3>Australia</h3>
          </div>
        </div>
        <div className="col-md-2">
          <div className="list_block">
            <div className="cluster_status add_cl"></div>
            <div className="hex_outer"><img src="/images/hongkong.png"/></div>
            <h3>Hong Kong</h3>
          </div>
        </div>
        <div className="col-md-2">
          <div className="list_block">
            <div className="cluster_status active_cl"></div>
            <div className="hex_outer"><img src="/images/germany.png"/></div>
            <h3>Germany</h3>
          </div>
        </div>
        <div className="col-md-2">
          <div className="list_block">
            <div className="cluster_status active_cl"></div>
            <div className="hex_outer"><img src="/images/india.png"/></div>
            <h3>India</h3>
          </div>
        </div>*/}
        </div>
      </div>
      </div>
    )
  }

}
MoolyaListView.propTypes={
  nameField:React.PropTypes.string,
  imageLink:React.PropTypes.string,
  statusField:React.PropTypes.string
}

