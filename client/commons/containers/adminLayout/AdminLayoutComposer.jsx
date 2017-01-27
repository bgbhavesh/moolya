import React, { Component } from 'react'
/*import { TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native'*/

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
       {/*const Composer= compose(*/}
         {/*graphql(config.query,config.options),*/}
      //    graphql(gql`mutation LeftNavMutation($name: String!) {
      //    mlLeftNavInsert(name: $name){
      //      name
      //   }
      //  }`, {options: { mutate: { name: 'mladmin'}}})
      // )(Component);

      return (<Composer {...config}/>);

    }
}
