import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'
import _ from 'lodash'


export default class MlAppLeftNav extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render(){
        let data = this.context.menu||{};
        let menu = data.menu || [];
        return(
            <div className="admin_menu">
              <ScrollArea speed={0.8} className="admin_menu" smoothScrolling={true}>
                  <ul>
                      <li className="menu_item">
                          <div className="menu_item menu_item_in"></div>
                      </li>
                  </ul>
              </ScrollArea>
            </div>
        )
    }
}

MlAppLeftNav.contextTypes = {
    menu: React.PropTypes.object
};
