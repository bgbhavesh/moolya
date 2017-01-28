import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'

export default class MoolyaLeftNav extends Component {
constructor(props){
  super(props);
  this.state={
    navOptions: props.navOptions,
    imageField: props.imageField,
    linkField: props.linkField,
    nameField: props.nameField,
  }
}
  componentDidMount()
  {
    let WinWidth = $(window).width();
    let WinHeight = $(window).height();
    $('.admin_menu, .admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));


  }
  onClickItem(e){
      console.log(e.target.id)
  }

  render()
  {    let path=FlowRouter.current().path
    //console.log(path)
    if (path === this.href) {
      return 'active';
    }
      let data = this.props.data && this.props.data.data? this.props.data.data: {};
        //console.log(data)
      let menu = data.menu||[];
      localStorage.setItem("leftNavSubMenu", JSON.stringify(menu));
      let navOptions= menu.map(function(dataItem) {
        let activeClass
        if(path==dataItem.link){
          activeClass='active_menu'
        }
      return (
          <li className={`menu_item ${activeClass} `} key={dataItem.name}>
            <a href={dataItem.link} id={dataItem.id} >
              <div className={"menu_in"}>
                <img src={dataItem.image}/>
                {dataItem.name}
              </div>
              <div className={"menu_item menu_item_in"}></div>
            </a>
          </li>
      )
    });
 /* let navOptions = self.state.navOptions.map(function(option) {

      return (
        <li className={"menu_item"} key={option.name}>
          <a href={option[self.state.linkField]}>
        <div className={"menu_in"}>
          <img src={option[self.state.imageField]}/>
          {option[self.state.nameField]}
          </div>
        <div className={"menu_item menu_item_in"}></div>
        </a>
        </li>
      )
    });*/
    return(
      <div className="admin_menu">
        <ScrollArea
          speed={0.8}
          className="admin_menu"
          smoothScrolling={true}
        >
          <ul>
            {navOptions }

            <li className="menu_item">
              <div className="menu_item menu_item_in"> </div>
            </li>
          </ul>
        </ScrollArea>
      </div>

    )
  }

}
MoolyaLeftNav.propTypes={
 // navOptions: React.PropTypes.array.isRequired,
 // imageField: React.PropTypes.string,
 // linkField: React.PropTypes.string,
 // nameField: React.PropTypes.string,
}
