/**
 * import of libs and routes
 * */
import React, {Component, PropTypes} from "react";
import {fetchPortfolioActionHandler} from '../../../ideators/actions/ideatorActionHandler'

export default class MlAppCompanyListView extends Component {

  /**
   * @props isExplore
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/company/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/company/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((company, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, company.portfolioDetailsId)}>
          <div className="funders_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            <h3>{company.aboutUs&&company.aboutUs.companyDescription?company.aboutUs.companyDescription:""}</h3>
            <div className="list_icon"><span className="ml ml-companies"></span></div>
            <div className="block_footer">
              <span>{company.chapterName}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row funders_list">
      <div className="col-md-12"><h2>Companies</h2></div>
      {list}</div>);

  }
}
