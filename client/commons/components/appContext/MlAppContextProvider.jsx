import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import Menu from '../../../admin/core/components/Menu';
import Theme from '../../../admin/core/components/Theme';
export default class MlAppContextProvider extends Component {

  constructor(props,c){
    super(props,c);
    this.menu = new Menu(this.props.menu);
    this.theme = new Theme(this.props.theme);

  }

  getChildContext() {
    return {theme: this.theme,language:'',menu:this.menu,userType:this.props.userType}
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
  menu: React.PropTypes.object,
  userType:React.PropTypes.string
}