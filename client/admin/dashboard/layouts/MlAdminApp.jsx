import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {client} from '../../../commons/containers/adminLayout/apolloConnection';
import {ApolloProvider} from 'react-apollo';
import  MlAdminHeader from '../../../commons/components/header/MlAdminHeader'
import MlAdminLeftNav from '../../../commons/components/leftNavbar/MlAdminLeftNav'
import MlAppContextProvider from './MlAppContextProvider';
import { graphql,compose } from 'react-apollo';
import gql from 'graphql-tag'

import { withApollo } from 'react-apollo';

@withApollo
class MlAdminAppComponent extends Component {

  constructor(p, c) {
    super(p, c)
    this.state = { theme: null,language:null,menu:null,loading:true};
    this.fetchMenu.bind(this);
  }

  componentDidMount(){
    this.fetchMenu();
  }

  async fetchMenu(){
    const menuData=await client.query({query: query,
                  variables: { name:'mlAdminMenu' }
     });
    this.setState({loading:false,menu:menuData&&menuData.data&&menuData.data.data?menuData.data.data.menu:[]});
  }

  render(){

    const showLoader=this.state.loading;
    const MlComponent=function(props){
      if (props.showLoader) {
        return <div>Loading</div>;
      }

      return (<MlAppContextProvider theme={props.theme} menu={props.menu} language={props.language}>
        <MlAdminHeader/>
        <MlAdminLeftNav/>
        {props.adminContent}
      </MlAppContextProvider>)

    };

    return <MlComponent {...this.props} showLoader={showLoader} theme={this.state.theme} menu={this.state.menu} language={this.state.language}/>;
  }
}

const query = gql`fragment subMenu on Menu{
                  id
                  isLink
                  isMenu
                  name
                  image
                  link
              }

              query LeftNavQuery($name: String!) {
        data:FetchMenu(name: $name){
            name
            menu{
              ...subMenu
                 subMenu{
                  ...subMenu
                    subMenu{
                      ...subMenu
                          subMenu{
                             ...subMenu
                                 }
                           }
                      }
                   }
            }

      }`

//export default  MlAdminApp = graphql(query,{options: { variables: { name:'mlAdminMenu' }}})(MlAdminAppComponent);
export default  MlAdminApp = MlAdminAppComponent;
