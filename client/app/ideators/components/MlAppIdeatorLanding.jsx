// import React, {Component} from "react";
// import {render} from "react-dom";
// import {fetchIdeators} from "../actions/IdeaActionHandler";
//
// export default class MlAppIdeatorLanding extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//         loading:true,
//         ideators:[]
//     }
//     this.fetchIdeators.bind(this)
//   }
//
//   componentWillMount(){
//       const resp = this.fetchIdeators()
//       return resp
//   }
//
//   async fetchIdeators() {
//       const response = await fetchIdeators();
//       if(response){
//         this.setState({loading:false, ideators:response})
//       }
//   }
//   viewIdeatorDetails(portfolioId, e){
//     if(this.props.isExplore)
//       FlowRouter.go('/app/explore/ideator/'+portfolioId)
//     else
//       FlowRouter.go('/app/ideator/'+portfolioId)
//   }
//   render() {
//     let that = this
//     return (
//       <div className="app_main_wrap">
//         <div className="app_padding_wrap">
//           <div className="col-md-12 ideators_list">
//             <div className="row">
//               {this.state.ideators.map(function (ideator, idx) {
//                   return (
//                     <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx}>
//                       {/*<a href={ideatorListRoutes.ideatorDetailsRoute("ideator",ideator.ideas[0].portfolioId)}>*/}
//                       <a href='' onClick={that.viewIdeatorDetails.bind(that, ideator.ideas[0].portfolioId)}>
//                         <div className="ideators_list_block">
//                           <div className="premium">
//                             <span>{ideator.accountType}</span>
//                           </div>
//                           <h3>{ideator.name}</h3>
//                           <div className="list_icon"><span className="ml ml-ideator"></span></div>
//                           <p>{ideator.ideas[0].title}<br/>...</p>
//                           <div className="block_footer">
//                             <span>{ideator.chapterName}</span>
//                           </div>
//                         </div>
//                       </a>
//                     </div>
//                   )
//               })}
//
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// };
