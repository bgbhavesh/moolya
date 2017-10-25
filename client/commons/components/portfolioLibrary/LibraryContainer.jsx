import React, {Component} from 'react';
import PortfolioLibrary from './PortfolioLibrary';
import SharedLibrary from  './sharedLibrary';
import { fetchSharedLibraryHandler } from '../../actions/mlLibraryActionHandler';
import MlConnectionHeader from './connectionHeader'
import ShowMore from './seeMore'


export default class LibraryParentContainer extends Component {
  constructor(props) {
    super(props)
    this.state ={
      componentToLoad: this.props.componentToLoad ? this.props.componentToLoad : "",
      data:[],
      sharedFiles:[],
      currentState:""
    }
    this.seeMoreData.bind(this);
  }

  viewComponent(view) {
    this.setState({
      componentToLoad: view
    })
  }

  sharedData(data) {
    this.setState({data: data})
  }

  showLibrary(response) {
    this.setState({ componentToLoad: "MainLibrary" })
  }

  connectionManagement(userId) {
    this.setState({ sharedFiles: [] })
    this.getSharedFiles(userId);
  }

  async getSharedFiles(userId) {
    const resp = await fetchSharedLibraryHandler(userId)
    this.setState({ sharedFiles: resp, showSharedFiles: true })
    this.setState({componentToLoad: "ShareLibrary" , data: resp})
  }

  seeMoreData(toView, data, current, type) {
    console.log('data' , data)
    this.setState({ componentToLoad: toView, data: data, currentState: current, type: type})
  }

  seeMoreDataInShare(toView, data, current, type) {
    this.setState({ componentToLoad: toView, data: data, currentState: current, type: type})
  }

  render() {

    switch(this.state.componentToLoad){

      case "PortfolioLibrary":
        return (
        <PortfolioLibrary
          isAdmin={this.props.isAdmin}
          tabName="Library"
          client={this.props.client}
          key="7"
          portfolioDetailsId={this.props.portfolioDetailsId}
          getSelectedAnnotations={this.props.getSelectedAnnotations}
          viewComponent={this.viewComponent.bind(this)}
          seeMoreData={this.seeMoreData.bind(this)}
        />
  )
      break;


      case "MainLibrary":
        return(
          <div className="app_main_wrap">
            <div className="app_padding_wrap">
              <PortfolioLibrary
                client={this.props.client}
                isAdmin={this.props.isAdmin ? this.props.isAdmin : false }
                viewComponent={this.viewComponent.bind(this)}
                sharedData={this.sharedData.bind(this)}
                seeMoreData={this.seeMoreData.bind(this)}
              />
            </div>
          </div>
        )
        break;


      case "ShareLibrary":
        return (
          <div className="app_main_wrap">
            <div className="app_padding_wrap">
              <h2>Library</h2>
              <MlConnectionHeader showLibrary={this.showLibrary.bind(this)} connectionManagement={this.connectionManagement.bind(this)} />
              <SharedLibrary
                data={this.state.data}
                seeMoreDataInShare={this.seeMoreDataInShare.bind(this)}
              />
            </div>
          </div>
        )
        break;


      case "SeeMore":
        return (
          <div className="app_main_wrap">
            <div className="app_padding_wrap">
              <h2>Library</h2>
              <ShowMore
                data={this.state.data}
                type={this.state.type}
                currentState={this.state.currentState}
                viewComponent={this.viewComponent.bind(this)}
                seeMoreData={this.seeMoreData.bind(this)}
              />
            </div>
          </div>
        )
        break;


    }
  }
}
