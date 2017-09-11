import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {fetchPortfolioActionHandler} from '../../ideators/actions/ideatorActionHandler'

/**
 * import of libs and routes
 * */
export default class MlAppFunderListView extends Component {

  /**
   * @props isExplore
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  async viewFunderDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/investor/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/funder/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render() {
    let that = this
    const data = this.props.data || [];
    const list = data.map((funder, idx) =>
      <div className="col-md-3 col-sm-4 col-lg-2" key={idx}>
        <a href='' onClick={that.viewFunderDetails.bind(that, funder.portfolioDetailsId)}>
          <div className="ideators_list_block">
            <div className="premium"><span>{funder.accountType}</span></div>
            <h3>{funder.funderAbout ? funder.funderAbout.firstName : ''}</h3>
            <div className="list_icon"><span className="ml my-ml-Investors"></span></div>
            <div className="block_footer">
              <span>{funder.chapterName} - {funder.communityType}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row ideators_list">
      <div className="col-md-12"> <h2>Investors</h2></div>
      {list}
      </div>);

  }

}

