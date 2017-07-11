import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
// import funderListRoutes from '../actions/funderListRoutes'

export default class MlAppServiceProviderListView extends Component {

  viewDetails(portfolioId, e){
    if(this.props.config.isExplore)
      FlowRouter.go('/app/explore/provider/'+portfolioId)
    else
      FlowRouter.go('/app/provider/'+portfolioId)
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((provider, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        {/*<a href={funderListRoutes.funderDetailsRoute("funder",funder.portfolioDetailsId)}>*/}
        <a href='' onClick={that.viewDetails.bind(that, provider.portfolioDetailsId)}>
          <div className="funders_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            <h3>{provider.about&&provider.about.aboutTitle?provider.about.aboutTitle:""}</h3>
            <div className="list_icon"><span className="ml ml-funder"></span></div>
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

