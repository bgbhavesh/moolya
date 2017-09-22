import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {fetchPortfolioActionHandler} from '../../ideators/actions/ideatorActionHandler'
import CDNImage from '../../../commons/components/CDNImage/CDNImage'

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
      <div className="col-md-3 col-sm-4 col-lg-2" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, provider.portfolioDetailsId)}>
          <div className="ideators_list_block">
            <div className="premium">
              <span>{provider.accountType}</span>
            </div>
            <h3>{provider.about&&provider.about.aboutTitle?provider.about.aboutTitle:""}</h3>
            {provider.profileImage ? <CDNImage src={provider.profileImage} className="c_image"/> :
              <div className="list_icon">
                <span className="ml my-ml-Service-Providers"></span>
              </div>}

            <div className="block_footer">
              <span>{provider.chapterName}{!provider.isDefaultSubChapter?"-" +provider.subChapterName:""}</span>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="ideators_list">
      <div className="col-md-12"><h2>Service Providers</h2></div>
      {data && !data.length?(
        <div className="alert alert-info col-md-8 col-md-offset-2 text-center" style={{'marginTop':'40px'}}>
          There are no registrations to be shown here.
        </div>
      ):(<div>{list}</div>)
      }
      </div>);

  }

}

