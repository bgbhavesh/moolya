/**
 * import of libs and routes
 * */
import React, {Component, PropTypes} from "react";
import {fetchPortfolioActionHandler} from '../../../ideators/actions/ideatorActionHandler'
import CDNImage from '../../../../commons/components/CDNImage/CDNImage';

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
    const list=  data.map((institution, idx) =>
      <div className="col-md-3 col-sm-4 col-lg-2" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, institution.portfolioDetailsId)}>
          <div className="ideators_list_block">
            <div className="premium">
              <span>{institution.accountType}</span>
            </div>
            <h3>{institution.firstName}</h3>
            {institution.profileImage ? <CDNImage src={institution.profileImage} className="c_image"/> :
              <div className="list_icon">
                <span className="ml my-ml-Institutions"></span>
              </div>}

            <div className="block_footer">
              <span>{institution.chapterName} - {institution.communityType}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="ideators_list">
      <div className="col-md-12"> <h2>Institutions</h2> </div>
      {list}
      </div>);

  }

}

