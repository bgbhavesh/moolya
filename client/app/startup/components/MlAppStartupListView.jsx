import React, {Component, PropTypes} from "react";
import {render} from "react-dom";

export default class MlAppStartupListView extends Component {

  viewDetails(portfolioId, e){
    if(this.props.config.isExplore)
      FlowRouter.go('/app/explore/startup/'+portfolioId)
    else
      FlowRouter.go('/app/startup/'+portfolioId)
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((startup, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, startup.portfolioDetailsId)}>
          <div className="funders_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            <h3>{startup.aboutUs&&startup.aboutUs.description?startup.aboutUs.description:""}</h3>
            <div className="list_icon"><span className="ml ml-startup"></span></div>
            <div className="block_footer">
              <span>New York</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row funders_list">{list}</div>);

  }

}

