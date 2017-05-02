import React, { Component, PropTypes } from 'react';
import {appClient} from '../appConnection';
import gql from 'graphql-tag'
import MlAppContextProvider from '../../../commons/components/appContext/MlAppContextProvider';
import MlAppHeader from '../components/MlAppHeader'
import MlAppLeftNav from '../components/MlAppLeftNav'

import { withApollo } from 'react-apollo';

@withApollo

class MlAppComponent extends Component{
    constructor(props, c){
        super(props, c)
        let isProfileMenu = props.isProfileMenu || false;
        this.state = {loading:true, theme: null, language:null, menu:null, userType:null, isProfileMenu:isProfileMenu}
        this.fetchMenu.bind(this)
    }

    componentDidMount(){
        this.fetchMenu()
    }

    async fetchMenu(){
        let query = "";
        if(this.state.isProfileMenu)
            query = profileMenuQuery
        else
            query = defaultQuery;

        const menuData = await appClient.query({forceFetch:true,query: query, variables: {name:'mlDefaultMenu'}});
        const userType = await appClient.query({forceFetch:true,query:gql`query{data:fetchUserTypeFromProfile}`});
        this.setState({loading:false,userType:userType&&userType.data&&userType.data.data?userType.data.data:null,menu:menuData&&menuData.data&&menuData.data.data?menuData.data.data.menu:[]});
    }

    render(){
        const showLoader = this.state.loading;
        const MlComponent = function (props) {
            if (props.showLoader) {
                return <div className="loader_wrap"></div>;
            }
            return (
                <MlAppContextProvider theme={props.theme} menu={props.menu} language={props.language} userType={props.userType}>
                    <MlAppHeader/>
                    <MlAppLeftNav/>
                    {props.appContent}
                </MlAppContextProvider>
            );
        }
        return <MlComponent {...this.props} showLoader={showLoader} theme={this.state.theme} menu={this.state.menu} language={this.state.language} userType={this.state.userType}/>;
    }
}

const defaultQuery = gql`fragment subMenu on Menu{
                  uniqueId
                  isLink
                  isMenu
                  isDisabled
                  name
                  image
                  link
                  dynamicLink
                  subMenuMappingId
                  subMenusId
                  hideSubMenu
                  showInBreadCrum
              }

              query LeftNavQuery($name: String!) {
                data:fetchExternalUserMenu(name: $name){
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

const profileMenuQuery = gql`fragment subMenu on Menu{
                  uniqueId
                  isLink
                  isMenu
                  isDisabled
                  name
                  image
                  link
                  dynamicLink
                  subMenuMappingId
                  subMenusId
                  hideSubMenu
                  showInBreadCrum
              }

              query LeftNavQuery($name: String!) {
                data:fetchExternalUserProfileMenu(name: $name){
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

export default  MlAppLayout = MlAppComponent;
