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
import MlUsersPortfolioLanding from "../../admin/users/components/MlUsersPortfolioLanding";
import MlUsersConnectionsTabs from "../../admin/users/components/MlUsersConnectionsTabs";
import MlUsersFavouriteTabs from "../../admin/users/components/MlUsersFavouriteTabs";
// import MlUsersWishlist from "../../admin/users/components/MlUsersWishlist";
import MlUsersTransactions from "../../admin/users/components/MlUsersTransactions";
import MlUsersHistoryList from '../../admin/users/components/MlUsersTabHistoryList'

/**
 * routes config for users modules
 * */

adminSection.route('/users/clusters', {
  name: 'users_cluster',
  action(params){
    mount(AdminLayout, {
      headerContent:<MlAdminHeader breadcrum={{type:'users','showBreadCrum':true,'module':'clusters'}} />,
      adminContent: <MlViews viewMode={false} showInfinity={false}
                             listConfig={mlUsersClusterListConfig}/>
    })
  }
});

adminSection.route('/users/:registrationId/:portfolioId/aboutuser', {
  name: 'users_about',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'about'}}/>,
      adminContent: <MlUsersAbout config={params}/>
    })
  }
})

adminSection.route('/users/:registrationId/:portfolioId/addressBook', {
  name: 'users_addressBook',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'addressBook'}}/>,
      adminContent: <MlUsersAddressBook config={params}/>
    })
  }
})

adminSection.route('/users/:registrationId/:portfolioId/portfolio', {
  name: 'users_portfolio',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'portfolio'}}/>,
      adminContent: <MlUsersPortfolioLanding config={params}/>
    })
  }
})

adminSection.route('/users/:registrationId/:portfolioId/connections', {
  name: 'users_connections',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'connections'}}/>,
      adminContent: <MlUsersConnectionsTabs config={params}/>
    })
  }
})

adminSection.route('/users/:registrationId/:portfolioId/favourites', {
  name: 'users_favourites',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'favourites'}}/>,
      adminContent: <MlUsersFavouriteTabs config={params}/>
    })
  }
})

// adminSection.route('/users/:registrationId/:portfolioId/wishlist/ideator', {
//   name: 'users_wishlistIdeator',
//   action(params){
//     mount(AdminLayout, {
//       headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'users'}}/>,
//       adminContent: <MlUsersWishlist config={params}/>
//     })
//   }
// })

adminSection.route('/users/:registrationId/:portfolioId/transactions', {
  name: 'users_transactions',
  action(params){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'transactions'}}/>,
      adminContent: <MlUsersTransactions config={params}/>
    })
  }
})
adminSection.route('/users/:registrationId/:portfolioId/history', {
  name: 'users_History',
  action(params){
    mount(AdminLayout,{
      headerContent: <MlAdminHeader breadcrum={{type: 'users', 'showBreadCrum': true, 'module': 'History'}}/>,
      adminContent:<MlUsersHistoryList config={params}/> })
  }
});
