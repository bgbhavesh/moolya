/**
 * import of libs and routes
 * */
import React, {Component, PropTypes} from "react";
import {fetchPortfolioActionHandler} from '../../../ideators/actions/ideatorActionHandler'

export default class MlAppInstitutionListView extends Component {

  /**
   * @props isExplore
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/institution/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/institution/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((intitution, idx) =>
      <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, intitution.portfolioDetailsId)}>
          <div className="ideators_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            {/*<h3>{intitution.aboutUs&&intitution.aboutUs.institutionDescription?intitution.aboutUs.institutionDescription:""}</h3>*/}
            <div className="premium">
              <span>{intitution.accountType}</span>
            </div>
            <h3>{intitution.firstName}</h3>
            <div className="list_icon"><span className="ml ml-institutions"></span></div>
            <div className="block_footer">
              <span>{intitution.chapterName}-{intitution.communityType}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row ideators_list">
      <div className="col-md-12"> <h2>Institutions</h2> </div>
      {list}
      </div>);

  }

}

