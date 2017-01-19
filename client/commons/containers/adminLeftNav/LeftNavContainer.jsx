import React, { Component } from 'react'

//import { createFragment } from 'apollo-client';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import LeftNav from '../../components/leftNavbar/LeftNav';
import LeftNavComposer from './LeftNavComposer';
export default class LeftNavContainer extends Component {
    constructor() {
        super()
      this.state = {
        name: 'mlAdminMenu'
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
      const query = gql`fragment subMenu on menu{
                  id
                  isLink
                  isMenu
                  name 
                  image
                  link
              }
              
              query LeftNavQuery($name: String!) {
        mlLeftNav(name: $name){
            name
            subMenu{
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

      let config={'component':LeftNav,'query':query, 'dataKey':'mlLeftNav', 'options':{options: { variables: { name: this.state.name }}}};
        return (
            <div >
                <LeftNavComposer {...config}/>

            </div>
        )
    }
}



