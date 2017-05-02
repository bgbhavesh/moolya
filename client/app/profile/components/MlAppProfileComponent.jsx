import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag'
import MlAppLeftNav from '../../core/components/MlAppLeftNav'

class MlAppProfileComponent extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // this.fetchMenu()
    }

    // async fetchMenu(){
    //     const menuData = await appClient.query({forceFetch:true,query: query, variables: {name:'mlDefaultProfileMenu'}});
    //     this.setState({loading:false, menu:menuData&&menuData.data&&menuData.data.data?menuData.data.data.menu:[]});
    // }

    render(){
        return(
            <div>Srinag</div>
        )
    }
}
