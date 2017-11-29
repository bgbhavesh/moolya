import React from 'react';
const FontAwesome = require('react-fontawesome');
import _ from 'underscore';
export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    return this;
  }


  render() {
    let src = this.props.data && this.props.data.content ? this.props.data.content : '';
    src = _.unescape(src);
    return (
      <form>
        <iframe srcDoc={src} style={{ height: '350px', width: '700px' }}>
        </iframe>
      </form>
    );
  }
}
