import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {fetchPortfolioActionHandler} from '../../ideators/actions/ideatorActionHandler'

export default class MlAppServiceProviderListView extends Component {

  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/serviceProvider/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/serviceProvider/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((provider, idx) =>
      <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, provider.portfolioDetailsId)}>
          <div className="ideators_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            <div className="premium">
              <span>{provider.accountType}</span>
            </div>
            <h3>{provider.about&&provider.about.aboutTitle?provider.about.aboutTitle:""}</h3>
            <div className="list_icon"><span className="ml my-ml-Service-Providers"></span></div>
            {/*<img src="/images/valuation.png" className="c_image"/>*/}
            <div className="block_footer">
              <span>{provider.chapterName}-{provider.communityType}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row ideators_list">
      <div className="col-md-12"><h2>Service Provider</h2></div>
      {list}
      </div>);

  }

}

