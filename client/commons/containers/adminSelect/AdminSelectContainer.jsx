import React, { Component } from 'react'

//import { createFragment } from 'apollo-client';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Select from '../../components/select/Select';
import AdminLayoutComposer from '../adminLayout/AdminLayoutComposer';
export default class AdminSelectContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: 'mlAdminRole'
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
    const query = gql`
        query RoleQuery($name: String!) {
        data:FetchRole(name: $name){
            name
            role{
                  roleName,
                  roleValue
                }
            }
       
      }`

    let config={'component':Select,'query':query, 'options':{options: { variables: { name: this.state.name }}}};

    return(<div><AdminLayoutComposer {...config}/></div>)
  }
}



