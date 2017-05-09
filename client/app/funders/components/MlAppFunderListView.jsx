import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import funderListRoutes from '../actions/funderListRoutes'
var FontAwesome = require('react-fontawesome');

export default class MlAppFunderListView extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((funder, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href={funderListRoutes.funderDetailsRoute("funder",funder.portfolioDetailsId)}>
          <div className="funders_list_block">
            <div className="premium"><span>Starter</span></div>
            <h3>{funder.funderAbout.firstName}</h3>
            <div className="list_icon"><span className="ml ml-funder"></span></div>
            <div className="block_footer">
              <span>Hyderabad</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row communities_list">{list}</div>);

  }

}

