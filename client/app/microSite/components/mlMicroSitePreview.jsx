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
      <div>
        {showLoader === true ? ( <MlLoader />) :
          (this.state.src) ?
            (<form>
              <iframe src={this.state.src} style={{'height': '550px', 'width': '93%'}}>
              </iframe>
            </form>)
            :
            (<div align="center" style={{fontSize: '30px'}}>Portifolio not requested for Live</div>)
        }
      </div>)
  }

}
