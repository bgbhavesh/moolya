/**
 * Created by vishwadeep on 23/6/17.
 */
import React, {Component} from "react";

export default class MlFunderServices extends Component {
  constructor(props){
    super(props)
    this.state =  {showAdd: false};
  }
  addNewService() {
    this.setState({showAdd:true})
    console.log('add new clicked')
  }

  render() {
    return (
      <div className="app_main_wrap" style={{'overflow': 'auto'}}>
        <div className="app_padding_wrap">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <a href="" onClick={this.addNewService.bind(this)}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Add New / under process</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
