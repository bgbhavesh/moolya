import React, { Component } from 'react'
/*import { TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native'*/

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
export default class LeftNavComposer extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        let config=this.props;
       const Component=config.component;
        const Composer = graphql(config.query,config.options)(Component);

        return (<Composer {...config}/>);
    }
}



