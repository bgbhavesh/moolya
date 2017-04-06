import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {findPortfolioActionHandler} from '../actions/findPortfolioDetails'

export default class MlPortfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.findPortfolioDetails.bind(this);
        return this;
    }

    async componentWillMount() {
        // const resp = await this
    }

    async findPortfolioDetails(){
        const response = await findPortfolioActionHandler(this.props.config);
        this.setState({loading: false, portfolioDetails: response});
        return response;
    }

    async fetchEditPortfolioTemplate(regDetails) {
        const reg= await fetchTemplateHandler({process:"Portfolio",subProcess:"Portfolio", stepCode:"Portfolio", recordId:""});
    }

    async fetchViewPortfolioTemplate(regDetails) {
        const reg= await fetchTemplateHandler({process:"Portfolio",subProcess:"Portfolio", stepCode:"Portfolio", recordId:""});
    }

    render(){
    }

}
