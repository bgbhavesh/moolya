import React from 'react';
import {upsertProcessDocActionHandler} from '../actions/upsertProcessDocAction'
import {findProcessDocActionHandler} from '../actions/findProcessDocAction'
class MandatoryProcessDocFormatter extends React.Component {
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
        if(fileterProcessDocuments[0].isActive){
          this.setState({"isActive": fileterProcessDocuments[0].isActive})
        }else{
          this.setState({"isActive": false})
        }
        this.setState({"isMandatory": fileterProcessDocuments[0].isMandatory})
      }
      return response;
    }

  }
  componentDidMount() {
    if(this.props.data.Mandatory){
      this.refs.status.checked = true
      this.setState({"isMandatory":true})

    }else{
      this.refs.status.checked = false
      this.setState({"isMandatory":false})
    }
  }
  async onChange(data) {
    if (this.refs.status.checked == true) {
      this.refs.status.checked = true;
      this.setState({isMandatory:true});
    } else {
      this.refs.status.checked = false;
      this.setState({isMandatory:false});
    }

    let processDocDetails = {
      id:this.props.processConfig,
      kycCategoryId:this.props.kycConfig,
      docTypeId:this.props.data.DocType,
      documentId:this.props.data.Id,
      isMandatory:this.refs.status.checked,
      isActive:this.state.isActive,
    };
    const response= await upsertProcessDocActionHandler(processDocDetails);
    if (response){
      if(response.success) {
        FlowRouter.go("/admin/documents/" + this.props.processConfig + "/" + this.props.kycConfig + "/" + this.props.docTypeConfig);
      }else if(response.result == "Can't update status as document is inactive or maditory"){
        //this.setState({"isMandatory" : false})
        toastr.error(response.result);
      }else{
        toastr.error(response.result);
      }
    }
  }

  render() {
    //console.log(this.props.data);
    return (
      <div className="input_types"><input  ref="status" checked={this.state.isMandatory} onChange={this.onChange.bind(this,this.props.data)}  id="checkbox1" type="checkbox" name="isMandatory" value="1" /><label htmlFor="checkbox1"><span></span></label></div>
    );
  }
};

export default MandatoryProcessDocFormatter;
