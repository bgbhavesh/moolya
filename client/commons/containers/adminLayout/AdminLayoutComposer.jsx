import React, { Component } from 'react'

import { graphql,compose } from 'react-apollo';
import gql from 'graphql-tag'
export default class  AdminLayoutComposer extends Component {
    constructor(props) {
        super(props);
    }
    render () {
       let config=this.props;
        const Component=config.component;
       const Composer = graphql(config.query,config.options)(Component)

      return (<Composer {...config}/>);

    }
}
