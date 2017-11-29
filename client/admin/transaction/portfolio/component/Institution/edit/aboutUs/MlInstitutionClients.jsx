import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';
import { multipartASyncFormHandler } from '../../../../../../../commons/MlMultipartFormAction'
import { fetchInstitutionDetailsHandler } from '../../../../actions/findPortfolioInstitutionDetails';
import { putDataIntoTheLibrary } from '../../../../../../../commons/actions/mlLibraryActionHandler'
import MlLoader from '../../../../../../../commons/components/loader/loader'
import { mlFieldValidations } from '../../../../../../../commons/validations/mlfieldValidation';
import generateAbsolutePath from '../../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../../commons/utils/confirm';

const KEY = 'clients'

export default class MlInstitutionClients extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      privateKey: {},
      institutionClients: this.props.clientsDetails || [],
      popoverOpen: false,
      selectedIndex: -1,
      institutionClientsList: this.props.clientsDetails || [],
      selectedVal: null,
      selectedObject: 'default'
    };
    this.curSelectLogo = {};
    this.tabName = this.props.tabName || ''
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.libraryAction.bind(this);
    return this;
  }
  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount() {
    const empty = _.isEmpty(this.context.institutionPortfolio && this.context.institutionPortfolio.clients)
    if (!empty) {
      this.setState({ loading: false, institutionClients: this.context.institutionPortfolio.clients, institutionClientsList: this.context.institutionPortfolio.clients });
    }
  }

  addClient() {
    this.setState({ selectedObject: 'default', popoverOpen: !(this.state.popoverOpen), data: {} })
    if (this.state.institutionClients) {
      this.setState({ selectedIndex: this.state.institutionClients.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onTileSelect(index, uiIndex, e) {
    const cloneArray = _.cloneDeep(this.state.institutionClients);
    // let details = cloneArray[index]
    let details = _.find(cloneArray, { index });
    details = _.omit(details, '__typename');
    this.curSelectLogo = details.logo
    this.setState({
      selectedIndex: index, data: details, selectedObject: uiIndex, popoverOpen: !(this.state.popoverOpen), selectedVal: details.companyId
    });
    setTimeout(() => {
      _.each(details.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onLockChange(fieldName, field, e) {
    let isPrivate = false
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true
    }
    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, index: this.state.selectedIndex, tabName: KEY
    }
    this.setState({ privateKey }, function () {
      this.sendDataToParent()
    })
  }

  onSaveAction(e) {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    let setObject = this.state.institutionClients;
    if (this.context && this.context.institutionPortfolio && this.context.institutionPortfolio.clients) {
      setObject = this.context.institutionPortfolio.clients
    }
    this.setState({ institutionClientsList: setObject, popoverOpen: false })
    this.curSelectLogo = {}
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    const key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, { [key]: true });
    } else {
      updatedData = _.extend(updatedData, { [key]: false });
    }
    this.setState({ data: updatedData }, () => {
      // this.sendDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, () => {
      // this.sendDataToParent()
    })
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return { tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex }
  }

  getActualIndex(dataArray, checkIndex) {
    let response = _.findIndex(dataArray, { index: checkIndex });
    response = response >= 0 ? response : checkIndex;
    return response;
  }

  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const clients = this.state.institutionClients;
    let institutionClients = _.cloneDeep(clients);
    data.index = this.state.selectedIndex;
    data.logo = this.curSelectLogo;
    if (isSaveClicked) {
      const actualIndex = this.getActualIndex(institutionClients, this.state.selectedIndex);
      institutionClients[actualIndex] = data;
    }
    const arr = [];
    _.each(institutionClients, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      const newItem = _.omit(item, '__typename');
      const updateItem = _.omit(newItem, ['privateFields'])
      arr.push(updateItem)
    })
    institutionClients = arr;
    this.setState({ institutionClients })
    this.props.getInstitutionClients(institutionClients, this.state.privateKey);
  }

  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { clients: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file));
  }

  onFileUploadCallBack(file, resp) {
    if (resp) {
      const result = JSON.parse(resp)

      Confirm('', 'Do you want to add the file into the library', 'Ok', 'Cancel', (ifConfirm) => {
        if (ifConfirm) {
          const fileObjectStructure = {
            fileName: file.name,
            fileType: file.type,
            fileUrl: result.result,
            libraryType: 'image'
          }
          this.libraryAction(fileObjectStructure);
        }
      });

      if (result.success) {
        this.curSelectLogo = {
          fileName: file && file.name ? file.name : '',
          fileUrl: result.result
        };
        // this.setState({loading: true})
        // this.fetchOnlyImages();
      }
    }
  }

  async libraryAction(file) {
    const portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId, file, this.props.client)
    if (resp.code === 404) {
      toastr.error(resp.result)
    } else {
      toastr.success(resp.result)
      return resp;
    }
  }

  async fetchOnlyImages() {
    const response = await fetchInstitutionDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.clients) {
      const thisState = this.state.selectedIndex;
      const dataDetails = this.state.institutionClients
      const cloneBackUp = _.cloneDeep(dataDetails);
      const specificData = cloneBackUp[thisState];
      if (specificData) {
        const curUpload = response.clients[thisState]
        specificData.logo = curUpload.logo
        this.setState({ loading: false, institutionClients: cloneBackUp });
      } else {
        this.setState({ loading: false })
      }
    }
  }

  emptyClick(e) {
    if (this.state.popoverOpen) { this.setState({ popoverOpen: false }) }
  }

  render() {
    const that = this;
    const showLoader = that.state.loading;
    const clientsArray = that.state.institutionClientsList || [];
    let displayUploadButton = null;
    if (this.state.selectedObject != 'default') {
      displayUploadButton = true
    } else {
      displayUploadButton = false
    }
    return (
      <div onClick={this.emptyClick.bind(this)}>
        <h2>Clients</h2>
        {showLoader === true ? (<MlLoader/>) : (
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
                    <a href="" id="create_clientdefault" data-placement="right" data-class="large_popover" >
                      <div className="list_block notrans" onClick={this.addClient.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addClient.bind(this)}>Add New Client</h3>
                      </div>
                    </a>
                  </div>
                  {clientsArray.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                    <a href="" id={`create_client${idx}`}>
                      <div className="list_block">
                        <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        <div className="hex_outer portfolio-font-icons" onClick={that.onTileSelect.bind(that, details.index, idx)}>
                          <img src={details.logo && details.logo.fileUrl ? generateAbsolutePath(details.logo.fileUrl) : ''}/></div>
                        <h3>{details.companyName ? details.companyName : ''} </h3>
                      </div>
                    </a>
                  </div>))}
                </div>
              </div>
            </ScrollArea>
            <Popover placement="right" isOpen={this.state.popoverOpen} target={`create_client${this.state.selectedObject}`} toggle={this.toggle}>
              <PopoverTitle>Add New Client</PopoverTitle>
              <PopoverContent>
                <div className="ml_create_client">
                  <div className="medium-popover"><div className="row">
                    <div className="col-md-12">
                      <div className="form-group mandatory">
                        <input
                          type="text" name="companyName" placeholder="Company Name"
                          className="form-control float-label" defaultValue={this.state.data.companyName}
                          onBlur={this.handleBlur.bind(this)} ref={'companyName'} data-required={true}
                          data-errMsg="Company Name is required"/>
                        <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate" defaultValue={this.state.data.isCompanyNamePrivate} onClick={this.onLockChange.bind(this, 'companyName', 'isCompanyNamePrivate')}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="clientDescription" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.clientDescription} onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate} onClick={this.onLockChange.bind(this, 'clientDescription', 'isDescriptionPrivate')}/>
                      </div>
                      {displayUploadButton ? <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Upload Logo</span>
                          <input type="file" name="logo" id="logo" className="upload" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} />
                        </div>
                      </div> : ''}
                      <div className="clearfix"></div>
                      <div className="form-group">
                        <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate && this.state.data.makePrivate} name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                      </div>
                      <div className="ml_btn" style={{ textAlign: 'center' }}>
                        <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                      </div>
                    </div>
                  </div></div>
                </div>
              </PopoverContent>
            </Popover>
          </div>)}
      </div>
    )
  }
}
MlInstitutionClients.contextTypes = {
  institutionPortfolio: PropTypes.object
};
