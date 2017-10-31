import React from "react";
require('react-fontawesome');
import {fetchMicroSiteUrl} from '../actions/micrositeActionHandler'
import MlLoader from '../../../commons/components/loader/loader'
export default class MlMicroSitePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
      loading: true
    }
    return this;
  }

  componentWillMount() {
    const resp = this.getSrcUrl()
  }

  async getSrcUrl() {
    const response = await fetchMicroSiteUrl()
    const url = response.url

    if (url) {
      let absoluteUrl = window.location.origin + '/view' + url
      this.setState({src: absoluteUrl})

    }
    else {
      this.setState({src: false})
    }

    this.setState({loading: false})

  }


  render() {
    const showLoader = this.state.loading;
    return (
      <div className="app_main_wrap">
        {showLoader === true ? ( <MlLoader />) :
          (this.state.src) ?
            (<div className="app_padding_wrap">
              <iframe src={this.state.src} style={{'height': '550px', 'width': '100%'}}>
              </iframe>
            </div>)
            :
            (<div align="center" style={{'text-align':'center','margin': '20px 0 0 0','fontSize': '25px','color': '#ef4647' }}>Portifolio not requested for Live</div>)
        }
      </div>)
  }

}
