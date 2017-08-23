import React, {Component} from "react";
import {fetchPortfolioActionHandler} from '../../../ideators/actions/ideatorActionHandler'

export default class MlAppInstitutionListView extends Component {

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
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, intitution.portfolioDetailsId)}>
          <div className="funders_list_block">
            {/*<div className="premium"><span>Starter</span></div>*/}
            <h3>{intitution.aboutUs&&intitution.aboutUs.institutionDescription?intitution.aboutUs.institutionDescription:""}</h3>
            <div className="list_icon"><span className="ml ml-institutions"></span></div>
            <div className="block_footer">
              <span>{intitution.chapterName}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="row funders_list">{list}</div>);

  }

}

