export function logout()
{
    let originalLogout = Meteor.logout;
    Meteor.logout()
    {
        let user = Meteor.user();
        if (user && user.profile && user.profile.isMoolyaBackend === true) {
            originalLogout.apply(Meteor, arguments);
        }
        FlowRouter.go("/login");
    }
}


// Utils = React.createClass({
//   statics: {
//       logout()
//       {
//         let originalLogout = Meteor.logout;
//         Meteor.logout()
//         {
//           let user = Meteor.user();
//           if (user && user.profile && user.profile.isMoolyaBackend === true) {
//             originalLogout.apply(Meteor, arguments);
//           }
//           FlowRouter.go("/login");
//         }
//       },
//
//       render(){
//         return;
//       }
//   }
// })


