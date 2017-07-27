/**
 * Created by vishwadeep on 6/7/17.
 */
/**
 * import of all the routes and libs
 * */
import {adminSection} from "../admin/adminRoutes";
import React from "react";
import {render} from "react-dom";
import {mount} from "react-mounter";
import AdminLayout from "../../admin/layouts/AdminLayout";
import MlAdminHeader from "../../admin/layouts/header/MlAdminHeader";
import MlViews from "../../admin/core/components/MlViews";
import {mlUsersClusterListConfig} from "../../admin/users/config/mlUsersClusterConfig";
import MlUsersAbout from "../../admin/users/components/MlUsersAbout";
import MlUsersAddressBook from "../../admin/users/components/MlUsersAddressBook";
import MlUsersConnections from "../../admin/users/components/MlUsersConnections";
import MlUsersFavourites from "../../admin/users/components/MlUsersFavourites";
import MlUsersWishlist from "../../admin/users/components/MlUsersWishlist";
import MlUsersTransactions from "../../admin/users/components/MlUsersTransactions";

/**
 * routes config for users modules
 * */

adminSection.route('/users/clusters', {
  name: 'users_cluster',
  action(params){
    mount(AdminLayout, {
      adminContent: <MlViews viewMode={false} showInfinity={false}
                             listConfig={mlUsersClusterListConfig}/>
    })
  }
});

adminSection.route('/users/:portfolioId/aboutuser', {
  name: 'users_about',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersAbout portfolioId={params.portfolioId}/>
    })
  }
})

adminSection.route('/users/:portfolioId/addressBook', {
  name: 'users_addressBook',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersAddressBook portfolioId={params.portfolioId}/>
    })
  }
})

adminSection.route('/users/:portfolioId/connections/ideator', {
  name: 'users_connectionsIdeator',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersConnections portfolioId={params.portfolioId}/>
    })
  }
})

adminSection.route('/users/:portfolioId/favourites/ideator', {
  name: 'users_favouritesIdeator',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersFavourites portfolioId={params.portfolioId}/>
    })
  }
})

adminSection.route('/users/:portfolioId/wishlist/ideator', {
  name: 'users_wishlistIdeator',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersWishlist portfolioId={params.portfolioId}/>
    })
  }
})

adminSection.route('/users/:portfolioId/transactions', {
  name: 'users_transactions',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
      adminContent: <MlUsersTransactions portfolioId={params.portfolioId}/>
    })
  }
})
