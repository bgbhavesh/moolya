/**
 * Created by viswadeep on 10/5/17.
 */

import React from 'react';
import { render } from 'react-dom';
import 'react-responsive-tabs/styles.css'
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent"
import MyConnections from './MyConnections';
import MyFavourites from './MyFavourites';
import MyWishlist from './MyWishlist';
import MyFollowers from './MyFollowers';
import MyFollowings from './MyFollowings';
import MlInfiniteScroll from '../../../../commons/core/mlInfiniteScroll/components/MlInfiniteScroll';
import {mlAppMyConnectionConfig} from '../../config/mlAppMyConnectionsConfig';
import {mlAppMyFavouritesConfig} from '../../config/mlAppMyFavouritesConfig';
import {mlAppMyFollowersConfig} from '../../config/mlAppMyFollowersConfig';
import {mlAppMyFollowingsConfig} from '../../config/mlAppMyFollowingsConfig';

export default class MyList extends React.Component{
  constructor(props){
    super(props)
    this.state =  {
      tabs: [],
    };
  }

  componentWillMount()
  {
    let tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'horizon-item '+tab.tabClassName?tab.tabClassName:"", // Optional
        panelClassName: 'panel1',
        title: tab.title,
        getContent: () => tab.component
      }));
    }
    this.setState({tabs:getTabs() ||[]});
  }

  getTabComponents(){
    let tabs = [
      {
        tabClassName:'ml ml-connect', title: <b>My Connections</b>,
        component: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlAppMyConnectionConfig} />
      },
      {
        tabClassName:'ml my-ml-favourites',title: <b>My Favourites</b>,
        component: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlAppMyFavouritesConfig} />
      },
      {
        tabClassName:'ml ml-connect',title: <b>My Followers</b>,
        component: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlAppMyFollowersConfig} />
      },
      {
        tabClassName:'ml ml-connect',title: <b>I Follow</b>,
        component: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlAppMyFollowingsConfig} />
      }
    ]
    return tabs;
  }

  render(){
    let tabs = this.state.tabs;
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">
            <MlTabComponent tabs={tabs}/>
          </div>
        </div>
      </div>
    )
  }
};
