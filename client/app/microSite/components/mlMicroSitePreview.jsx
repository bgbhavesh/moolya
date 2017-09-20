import React from "react";
require('react-fontawesome');
import {fetchMicroSiteUrl} from '../actions/micrositeActionHandler'
import MlLoader from '../../../commons/components/loader/loader'
export default class MlMicroSitePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
      loading:true
    }
    return this;
  }

  componentWillMount() {
    const resp = this.getSrcUrl()
  }
  componentDidMount() {

  }

  async getSrcUrl() {
    const response = await fetchMicroSiteUrl()
    if (response) {
      let absoluteUrl = window.location.origin + '/' + response.url

      this.setState({src: absoluteUrl})
      this.setState({loading: false})

    }
    return response
  }


  render() {
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader />) : (
          <form>
            <iframe src={this.state.src} style={{'height': '550px', 'width': '93%'}}>
            </iframe>
          </form>
        )}
      </div>)
  }

}
