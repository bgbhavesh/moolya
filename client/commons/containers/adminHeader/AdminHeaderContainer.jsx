import React, { Component } from 'react'

//import { createFragment } from 'apollo-client';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Header from '../../components/header/Header';
import AdminLayoutComposer from '../adminLayout/AdminLayoutComposer';
export default class AdminHeaderContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: 'mlAdminMenu',
    }
  }
  /* updateName(name) {
   console.log(name.target.value)
   let nameval=name.target.value
   this.setState({
   name:nameval
   })
   }*/
  render () {
    /*const query = gql`query{
     mlLeftNav{
     name,
     image,
     link,
     id
     }
     }`*/
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

    const rolequery = gql`
        query RoleQuery($name: String!) {
        data:FetchRole(name: $name){
            name
            role{
                  roleName,
                  roleValue
                }
            }
       
      }`
    let config={'component':Header,'query':query, 'options':{options: { variables: { name: this.state.name }}}};
   // let roleconfig={'component':Header,'query':rolequery, 'options':{options: { variables: { name: this.state.rolename }}}};
    let subMenu = JSON.parse(localStorage.getItem("leftNavSubMenu"))
    // if(subMenu && subMenu.length > 0){
    //     const data = {data:subMenu}
    //     return (<LeftNav {...data}/>)
    // }
    // else
    return(<div><AdminLayoutComposer {...config}/></div>)
  }
}



