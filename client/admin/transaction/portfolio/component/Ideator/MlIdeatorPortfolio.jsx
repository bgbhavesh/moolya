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
        this.getIdeatorDetails.bind(this);
    }

    getIdeatorDetails(details){
        console.log(details);
    }

    getTabComponents(){
        let tabs = [
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideator" , component:<MlIdeatorDetails key="1" getIdeatorDetails={this.getIdeatorDetails}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideas", component:<div  key="2"> second </div>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Problem Solutions", component:<div key="3"> third </div>}
        ]
        return tabs;
    }

    componentWillMount()
    {
        let tabs = this.getTabComponents();
        function getTabs() {
          return tabs.map(tab => ({
            tabClassName: 'tab', // Optional
            panelClassName: 'panel', // Optional
            title: tab.title,
            getContent: () => tab.component
          }));
        }
        this.setState({tabs:getTabs() ||[]});
    }

    render(){
        let tabs = this.state.tabs;
        return <MlTabComponent tabs={tabs}/>
    }
}
