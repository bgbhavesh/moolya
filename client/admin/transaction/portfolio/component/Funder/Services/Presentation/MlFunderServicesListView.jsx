import React, {Component} from "react";
import BeSpokeHandler from '../Container/beSpokeHandler'
import FunderAboutView from '../../MlFunderServiceBooking'
import MlAppServiceManageSchedule from '../../../../../../../app/calendar/manageScheduler/service/components/MlAppServiceManageSchedule'


export default class  MlFunderServicesListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      componentToView: 'landingPage',
      myPortfolio: false
    }
    this.servicesListView.bind(this);
  }
  componentWillMount(){
    let path = FlowRouter._current.path
    console.log(path,path.indexOf('edit'), path.indexOf('view'))
    if(path.indexOf('edit') > 0 || path.indexOf('view') > 0){
      console.log('edit or view');
      this.setState({myPortfolio: true})
    }else{
      console.log('Not edit or view');
      this.setState({myPortfolio: false})
    }
  }

  servicesListView(){
    let that = this;
    return(
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <div className="col-lg-12" id="show">
            {!this.state.myPortfolio? <div className="col-lg-2 col-md-4 col-sm-4">
              <a href=" " onClick={() => that.props.componentToView('createBeSpoke')}>
                <div className="list_block notrans">
                  <div className="hex_outer"><span className="ml ml-plus "></span></div>
                  <h3>Create a BeSpoke</h3>
                </div>
              </a>
            </div>:<div></div>}
            {this.props.services.map(function (services, index) {
              return (
                <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                  <div className="list_block img_list_block notrans" onClick={()=>that.props.viewMode(index,services._id, services.profileId)}>
                    <img src="/images/activity_1.jpg"/>
                    <h3>{services.displayName}</h3>
                  </div>
                </div>)})}
            {this.props.beSpokeServices.map(function (services, index) {
              return (
                <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                  <div className="list_block img_list_block notrans" onClick={()=>that.props.viewModeBeSpoke(index,services._id, services.profileId)}>
                    <img src="/images/activity_1.jpg"/>
                    <h3>{services.displayName}</h3>
                  </div>
                </div>)})}
          </div>
        </div>
      </div>
    )
  }

  render(){
    switch(this.props.viewComponent){
      case 'createBeSpoke':
        return(<BeSpokeHandler portfolioDetailsId={this.props.portfolioDetailsId}/>)
        break;
      case 'landingPage':
        return(this.servicesListView())
        break;
      case 'updateBeSpoke':
        return(
          <div className="app_main_wrap" style={{'overflow':'auto'}}>
            <div className="app_padding_wrap">
              <BeSpokeHandler beSpokeDetails={this.props.beSpokeService} beSpokeIndex={this.props.beSpokeIndex}/>
            </div>
          </div>
        )
        break;
      case 'services':
        return(
          <div className="app_main_wrap" style={{'overflow':'auto'}}>
            <div className="app_padding_wrap">
              <MlAppServiceManageSchedule
                viewMode={true}
                viewingMode={this.props.viewingMode?this.props.viewingMode: false}
                editingMode={this.props.editingMode?this.props.editingMode:false}
                serviceId={this.props.serviceId}
                profileId={this.props.profileId}
                serviceInfo={this.props.serviceInfo}
                bookService={this.props.bookService}
              />
            </div>
          </div>
        )
      break;
      case 'bookService':
        return(
          <div className="app_main_wrap" style={{'overflow':'auto'}}>
            <div className="app_padding_wrap">
              <FunderAboutView serviceDetails={this.props.serviceDetails}/>
            </div>
          </div>
        )
        break;
      default:
        return <div></div>
    }
  }
}

