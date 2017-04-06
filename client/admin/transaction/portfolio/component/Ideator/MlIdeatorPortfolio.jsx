import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import '../../../../../stylesheets/tab.css'

import MlTabComponent from '../../../../../commons/components/tabcomponent/MlTabComponent'
import MlIdeatorDetails from '../Ideator/MlIdeatorDetails'

export default class MlIdeatorPortfolioTemplate extends React.Component{
    constructor(props){
        super(props)
        this.state =  {tabs: []};
    }

    getTabComponents(){
        let tabs = [
          {component:<MlIdeatorDetails tabTitle="first tab" key="1"/>},
          {component:<div tabTitle="second tab" key="2"> second </div>},
          {component:<div tabTitle="third tab" key="3"> third </div>}
        ]
        return tabs;
    }

    componentWillMount(){
        let tabs = this.getTabComponents();
        let components = [];
        for(var i = 0; i < tabs.length; i++){
            components.push(tabs[i].component)
        }
        this.setState({tabs:components ||[]});
    }

    render(){
        let tabs = this.state.tabs;
        return <MlTabComponent tabs={tabs}/>
    }
}
