import React from 'react';
import {upsertProcessDocActionHandler} from '../actions/upsertProcessDocAction'
import {findProcessDocActionHandler} from '../actions/findProcessDocAction'
import {OnToggleSwitch, MoolyaToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class DocumentActiveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{},isActive:false,isMandatory:false};
    this.findProcessDocument=this.findProcessDocument.bind(this);
    return this;
  }
  componentWillMount(){
    //  console.log(this.props.config);
    const processResp=this.findProcessDocument();


    return processResp;
  }
  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async findProcessDocument(){
    let pid=this.props.processConfig
    const response =await  findProcessDocActionHandler(pid);

    console.log(response)
    if(response){
      if(response.processDocuments) {
        let processDocuments = response.processDocuments
        let kycid = this.props.kycConfig;
        let doctypeId = this.props.data.DocType;
        let documentId= this.props.data.Id
        let fileterProcessDocuments = _.filter(processDocuments, function (docs) {
          return docs.kycCategoryId == kycid && docs.docTypeId == doctypeId&&docs.documentId== documentId
        });
        if(fileterProcessDocuments[0].isMandatory){
          this.setState({"isMandatory": fileterProcessDocuments[0].isMandatory})
        }else{
          this.setState({"isMandatory": false})
        }
        this.setState({"isActive": fileterProcessDocuments[0].isActive})
      }
      return response;
    }

  }
  componentDidMount() {
    if(this.props.data.Active==true){
      this.refs.status.checked = true
      this.setState({"isActive":true})

    }else{
      this.refs.status.checked = false
      this.setState({"isActive":false})
    }
  }
  async onChange(data) {
   if (this.refs.status.checked == true) {
      this.refs.status.checked = true;
      this.setState({isActive:true});
    } else {
      this.refs.status.checked = false;
      this.setState({isActive:false});
    }

    let processDocDetails = {
      id:this.props.processConfig,
      kycCategoryId:this.props.kycConfig,
      docTypeId:this.props.data.DocType,
      documentId:this.props.data.Id,
      isMandatory:this.state.isMandatory,
      isActive:this.refs.status.checked

    };
    const response= await upsertProcessDocActionHandler(processDocDetails);
    if (response){
      if(response.success) {
        FlowRouter.go("/admin/documents/" + this.props.processConfig + "/" + this.props.kycConfig + "/" + this.props.docTypeConfig);
      } else if(response.result == "Can't update status as document is inactive or maditory"){
        //this.setState({"isActive" : true})
        toastr.error(response.result);
      }else {
        toastr.error(response.result);
      }
    }
  }

  render() {
    console.log(this.props.data);
    return (
      <div className="form-group switch_wrap"><label className="switch"><input type="checkbox" ref="status" id="status" checked={this.state.isActive} onChange={this.onChange.bind(this,this.props.data)}/><div className="slider"></div></label></div>
    );
  }
};

export default DocumentActiveComponent;
