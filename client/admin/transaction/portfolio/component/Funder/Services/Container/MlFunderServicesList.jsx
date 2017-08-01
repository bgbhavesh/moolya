import React, {Component} from "react";
import {fetchServicesActionHandler, createBeSpokeServiceActionHandler, fetchBeSpokeServicesActionHandler, updateBeSpokeServiceActionHandler} from '../../../../../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import MlFunderServicesListView from '../Presentation/MlFunderServicesListView'

export default class  MlFunderServicesList extends Component {
  constructor(props) {
    super(props)
    this.state={
      createNewBeSpoke: false,
      showService: false,
      services:[],
      serviceDetails:{},
      serviceId:"",
      profileId:"",
      beSpokeServices:[],
      bookingStatus: false,
      beSpokeIndex:0,
      componentToView:'landingPage',
      serviceIndex:"",
      data: {}
    }
    // this.servicesListView.bind(this);
    this.getServiceDetails.bind(this);
  }
  componentWillMount(){
    this.getServiceDetails();
    this.getBeSpokeServiceDetails();
  }

  async getServiceDetails(){
    const response  =  await fetchServicesActionHandler(this.props.portfolioDetailsId)
    this.setState({services:response})
    return response
  }

  async getBeSpokeServiceDetails(){
    const response  =  await fetchBeSpokeServicesActionHandler(this.props.portfolioDetailsId)
    this.setState({beSpokeServices:response})
    return response
  }


  bookService(bookingStatus){
    if(bookingStatus){
      this.setState({componentToView:'bookService',createNewBeSpoke: true, showBeSpoke:false,showService:false,showBeSpokeService:false, bookingStatus: true})
    }
  }

  serviceInfo(details){
    this.setState({serviceDetails:details})
  }

  addBeSpoke(){
    this.setState({componentToView:'createBeSpoke',createNewBeSpoke: true, showBeSpoke:true, showService: false, showBeSpokeService: false})
  }

  viewMode(index,serviceId,profileId){
    this.setState({serviceIndex:index,componentToView:'services',createNewBeSpoke: true, showBeSpoke:false,showService:true, serviceId:serviceId, profileId:profileId})
  }

  viewModeBeSpoke(index,serviceId,profileId){
    this.setState({componentToView:'updateBeSpoke',createNewBeSpoke: true, showBeSpoke:false,showService:false,showBeSpokeService:true, serviceId:serviceId, profileId:profileId, beSpokeIndex:index})
  }

  componentView(view,index,serviceId, serviceProfileId){
    this.setState({componentToView: view})
    if(index && serviceId && serviceProfileId){
      let details = {
        index: index,
        serviceId: serviceId,
        serviceProfileId: serviceProfileId
      }
      this.setState({data: details})
    }
  }


  render() {
    return(
    <MlFunderServicesListView
        viewComponent={this.state.componentToView}
        componentToView={this.componentView.bind(this)}
        data={this.state.data}
        viewMode={this.viewMode.bind(this)}
        addBeSpoke={this.addBeSpoke.bind(this)}
        viewModeBeSpoke={this.viewModeBeSpoke.bind(this)}
        myPortfolio={this.props.myPortfolio}
        services={this.state.services}
        beSpokeServices={this.state.beSpokeServices}
        service={this.state.services[this.state.serviceIndex]}
        beSpokeService={this.state.beSpokeServices}
        beSpokeIndex={this.state.beSpokeIndex}
        serviceId={this.state.serviceId}
        profileId={this.state.profileId}
        serviceInfo={this.serviceInfo.bind(this)}
        bookService={this.bookService.bind(this)}
        serviceDetails={this.state.serviceDetails}
    />
    )
  }
}

