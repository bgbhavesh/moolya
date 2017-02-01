import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {client} from '../../../commons/containers/adminLayout/apolloConnection';
import {ApolloProvider} from 'react-apollo';
import  MlAdminHeader from '../../../commons/components/header/MlAdminHeader'
import MlAdminLeftNav from '../../../commons/components/leftNavbar/MlAdminLeftNav'
import Menu from './Menu';
import Theme from './Theme';
export default class MlAppContextProvider extends Component {

  constructor(props,c){
    super(props,c);
    this.menu = new Menu(this.props.menu);
    this.theme = new Theme(this.props.theme);

  }

  getChildContext() {
    return {theme: this.theme,language:'',menu:this.menu}
  }

  componentWillReceiveProps(next) {
    this.menu.setMenu(next.menu);
  }


  render(){
    var that=this;
    //remove the children prop and pass the remaining
    var propz=_.omit(this.props, ['children']);
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child,propz));

    return <div>{childrenWithProps}</div>
  }

}


MlAppContextProvider.childContextTypes = {
  theme: React.PropTypes.object,
  language: React.PropTypes.string,
  menu: React.PropTypes.object
}
