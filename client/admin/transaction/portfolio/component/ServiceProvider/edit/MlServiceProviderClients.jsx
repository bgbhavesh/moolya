import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel} from "../../../../../utils/formElemUtil";
import {graphql} from "react-apollo";
import _ from "lodash";
import {multipartASyncFormHandler} from "../../../../../../commons/MlMultipartFormAction";
import {fetchServiceProviderClients} from "../../../actions/findPortfolioServiceProviderDetails";
import {putDataIntoTheLibrary} from '../../../../../../commons/actions/mlLibraryActionHandler'
import MlLoader from "../../../../../../commons/components/loader/loader";
var FontAwesome = require('react-fontawesome');


export default class MlServiceProviderClients extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      serviceProviderClients:[],
      popoverOpen: false,
      selectedIndex: -1,
      serviceProviderClientsList:[],
      selectedVal: null,
      selectedObject: "default",
      privateKey:{},
    }
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.imagesDisplay.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    this.imagesDisplay();
  }

  componentWillMount() {
    // let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.clients)
    // if (!empty) {
    //   this.setState({
    //     loading: false,
    //     serviceProviderClients: this.context.startupPortfolio.clients,
    //     serviceProviderClientsList: this.context.startupPortfolio.clients
    //   });
    // }
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.serviceProviderPortfolio && that.context.serviceProviderPortfolio.clients)
    if (empty) {
      const response = await fetchServiceProviderClients(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, serviceProviderClients: response, serviceProviderClientsList: response});
        // _.each(response.privateFields, function (pf) {
        //   $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
        // })
      }
    } else {
      this.setState({
        loading: false,
        serviceProviderClients: that.context.serviceProviderPortfolio.clients,
        serviceProviderClientsList: that.context.serviceProviderPortfolio.clients
      });
    }
  }

  addClient() {
    this.setState({selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {}})
    if (this.state.serviceProviderClients) {
      this.setState({selectedIndex: this.state.serviceProviderClients.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }

  onTileSelect(index, e) {
    let cloneArray = _.cloneDeep(this.state.serviceProviderClients);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen),
      "selectedVal": details.companyId
    });

    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let key = e.target.id;
    var isPrivate = false;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, {[key]: true});
      isPrivate = true
    } else {
      details = _.extend(details, {[key]: false});
    }
    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex}
    this.setState({privateKey:privateKey})
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  onSaveAction(e) {
    this.setState({serviceProviderClientsList: this.state.serviceProviderClients, popoverOpen: false})
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    let key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, {[key]: true});
    } else {
      updatedData = _.extend(updatedData, {[key]: false});
    }
    this.setState({data: updatedData}, function () {
      this.sendDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.target.value});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent() {
    let data = this.state.data;
    let clients = this.state.serviceProviderClients;
    let serviceProviderClients = _.cloneDeep(clients);
    data.index = this.state.selectedIndex;
    serviceProviderClients[this.state.selectedIndex] = data;
    let arr = [];
    _.each(serviceProviderClients, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      // let updateItem = _.omit(newItem, 'logo');
      let updateItem =_.omit(newItem,"privateFields");
      arr.push(updateItem)
    })
    serviceProviderClients = arr;
    this.setState({serviceProviderClients: serviceProviderClients})
    this.props.getServiceProviderClients(serviceProviderClients, this.state.privateKey);

  }

  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {clients: [{logo: {fileUrl: '', fileName: fileName}, index: this.state.selectedIndex}]}
    };
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file));
  }

  onFileUploadCallBack(file,resp) {
    if (resp) {
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if(userOption){
        let fileObjectStructure = {
          fileName: file.name,
          fileType: file.type,
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure)
      }
      if (result.success) {
        this.setState({loading: true})
        this.fetchOnlyImages();
        this.imagesDisplay();
      }
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  async fetchOnlyImages() {
    const response = await fetchServiceProviderClients(this.props.portfolioDetailsId);
    if (response) {
      let thisState = this.state.selectedIndex;
      let dataDetails = this.state.serviceProviderClients
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if (specificData) {
        let curUpload = response[thisState]
        specificData['logo'] = curUpload['logo']
        this.setState({loading: false, serviceProviderClients: cloneBackUp});
      } else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay() {
    const response = await fetchServiceProviderClients(this.props.portfolioDetailsId);
    if (response) {
      let detailsArray = response && response.clients ? response.clients : []
      let dataDetails = this.state.serviceProviderClients
      let cloneBackUp = _.cloneDeep(dataDetails);
      _.each(detailsArray, function (obj, key) {
        cloneBackUp[key]["logo"] = obj.logo;
      })
      let listDetails = this.state.serviceProviderClientsList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, serviceProviderClients: cloneBackUp, serviceProviderClientsList: cloneBackUpList});
    }
  }

  emptyClick(e) {
    if (this.state.popoverOpen)
      this.setState({popoverOpen: false})
  }

  render() {
    let that = this;
    const showLoader = that.state.loading;
    let clientsArray = that.state.serviceProviderClientsList || [];
    let displayUploadButton = null;
    if (this.state.selectedObject != "default") {
      displayUploadButton = true
    } else {
      displayUploadButton = false
    }
    return (
      <div onClick={this.emptyClick.bind(this)}>
        <h2>Clients</h2>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="requested_input main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="" id="create_clientdefault" data-placement="right" data-class="large_popover">
                      <div className="list_block notrans" onClick={this.addClient.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addClient.bind(this)}>Add New Client</h3>
                      </div>
                    </a>
                  </div>
                  {clientsArray.map(function (details, idx) {
                    if(details.makePrivate){
                      $("#makePrivate"+idx).removeClass('un_lock fa-unlock').addClass('fa-lock');
                    }else{
                      $("#makePrivate"+idx).removeClass('fa-lock').addClass('un_lock fa-unlock');
                    }
                    return (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={"create_client" + idx}>
                        <div className="list_block">
                          {/*<FontAwesome name='unlock' id="makePrivate" defaultValue={}/>*/}
                          <FontAwesome name='unlock' className="input_icon un_lock" id={"makePrivate" + idx}
                                       defaultValue={details.makePrivate}/>
                          <div className="hex_outer portfolio-font-icons" onClick={that.onTileSelect.bind(that, idx)}>
                            <img src={details.logo && details.logo.fileUrl}/></div>
                          {/*<h3>{details.description} <span className="assets-list">50</span></h3>*/}
                          <h3>{details.companyName ? details.companyName : ""} </h3>
                        </div>
                      </a>
                    </div>)
                  })}
                </div>
              </div>
            </ScrollArea>
            <Popover placement="right" isOpen={this.state.popoverOpen}
                     target={"create_client" + this.state.selectedObject} toggle={this.toggle}>
              <PopoverTitle>Add New Client</PopoverTitle>
              <PopoverContent>
                <div className="ml_create_client">
                  <div className="medium-popover">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" name="companyName" placeholder="Company Name"
                                 className="form-control float-label" defaultValue={this.state.data.companyName}
                                 onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isCompanyNamePrivate"
                                       defaultValue={this.state.data.isCompanyNamePrivate}
                                       onClick={this.onLockChange.bind(this, "companyName", "isCompanyNamePrivate")}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="clientDescription" placeholder="About" className="form-control float-label"
                                 id="" defaultValue={this.state.data.clientDescription} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isClientDescriptionPrivate"
                                       defaultValue={this.state.data.isClientDescriptionPrivate}
                                       onClick={this.onLockChange.bind(this,"clientDescription", "isClientDescriptionPrivate")}/>
                        </div>
                        {displayUploadButton ? <div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" name="logo" id="logo" className="upload" accept="image/*"
                                   onChange={this.onLogoFileUpload.bind(this)}/>
                          </div>
                        </div> : ""}
                        <div className="clearfix"></div>
                        <div className="form-group">
                          <div className="input_types"><input id="makePrivate" type="checkbox"
                                                              checked={this.state.data && this.state.data.makePrivate}
                                                              name="checkbox"
                                                              onChange={this.onStatusChangeNotify.bind(this)}/><label
                            htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{'textAlign': 'center'}}>
                          <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>)}
      </div>
    )
  }
}
MlServiceProviderClients.contextTypes = {
  serviceProviderPortfolio: PropTypes.object,
};
