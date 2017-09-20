import React from "react";
require('react-fontawesome');
import {fetchMicroSiteUrl} from '../actions/micrositeActionHandler'

export default class MlMicroSitePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
    }
    return this;
  }

  componentWillMount() {
    const resp = this.getSrcUrl()
  }

  async getSrcUrl() {
    const response = await fetchMicroSiteUrl()
    if (response) {
      let absoluteUrl = window.location.origin + '/' +response.url
      this.setState({src: absoluteUrl})
    }
    return response
  }


  render() {
    return (
      <form>
        <iframe src={this.state.src} style={{'height': '550px', 'width': '93%'}}>
        </iframe>
      </form>
    );
  }

}
