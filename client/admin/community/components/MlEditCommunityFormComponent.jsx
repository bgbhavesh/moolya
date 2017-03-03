import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {updateCommunityActionHandler} from '../actions/updateCommunityFormAction'
import {findCommunityDefActionHandler} from '../actions/findCommunityDefAction'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'

class MlEditCommunityFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state={
      loading:true,data:{},
      clusters: [{id:''}],
      chapters:[{id:''}],
    }
    this.findComDef.bind(this);
    this.addEventHandler.bind(this);
    this.updateCommunityAccess.bind(this)
    return this;
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
        $(this).val(true)
      } else {
        $(this).parent('.switch').removeClass('on');
        $(this).val(false)
      }
    });
  }
  componentWillMount() {
    const resp=this.findComDef();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateCommunityAccess();
    return resp;
  }

  async handleSuccess(response) {
    FlowRouter.go("/admin/dashboard");
  };

  async findComDef(){
    let Id=this.props.params;
    const response = await findCommunityDefActionHandler(Id);

    if(response) {
      this.setState({loading:false,data:response});
      // this.setState({documentId: this.state.data.documentId});
      // this.setState({id: this.state.data._id});
      if (this.state.data.clusters) {
        let clustersId = this.state.data.clusters[0].id;
        this.setState({clusters: [{id: clustersId}]});
      }
      if (this.state.data.chapters) {
        let chaptersId = this.state.data.chapters[0].id;
        this.setState({chapters: [{id: chaptersId}]});
      }
    }
    this.setState({loading:false,data:response});
  }

  async  updateCommunityAccess()
  {
      let communityDetails = {
          displayName         : this.refs.displayName.value,
          clusters            : this.state.clusters,
          chapters            : this.state.chapters,
          aboutCommunity      : this.refs.about.value,
          communityImageLink  : this.refs.upload.value,
          showOnMap           : this.refs.showOnMap.checked,
          isActive            : this.refs.status.checked
      }
      let id = this.props.params;
      const response = await updateCommunityActionHandler(id, communityDetails)
  }

  optionsBySelectClusters(val){
    let clusters=this.state.clusters
    clusters[0]['id']=val;
    this.setState({clusters:clusters})
  }

  optionsBySelectChapters(val){
    let chapters=this.state.chapters
    chapters[0]['id']=val;
    this.setState({chapters:chapters})
  }
  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }
  render() {
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
          showAction: true,
          actionName: 'add',
          handler: async(event) => this.props.handler(this.updateCommunityAccess.bind(this), this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery=gql`query($id:String){  
        data:fetchChapters(id:$id) {
          value:_id
          label:chapterName
        }  
      }`;
    let chapterOption={options: { variables: {id:this.state.clusters[0].id}}};
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Edit Community Details</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="communityName" defaultValue={this.state.data&&this.state.data.name} readOnly="true" placeholder="Community Name"
                         className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" defaultValue={this.state.data&&this.state.data.displayName} placeholder="Display Name" className="form-control float-label"
                         id=""/>

                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters[0].id} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectClusters.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters[0].id} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                </div>

              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group ">
                <div className="fileUpload mlUpload_btn">
                  <span>Upload Icon</span>
                  <input type="file" className="upload" ref="upload"/>
                </div>
              </div>
              <br className="brclear"/>
              <br className="brclear"/>
              <div className="form-group switch_wrap">
                <label>Show on map</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="showOnMap"/>
                  <div className="slider"></div>
                </label>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <textarea placeholder="About" ref="about" defaultValue={this.state.data&&this.state.data.aboutCommunity} className="form-control float-label" id="cl_about"></textarea>
              </div>
              <div className="form-group switch_wrap">
                <label>Status</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="status" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>)}
      </div>
    )
  }
}
;

export default MlEditCommunityFormComponent = formHandler()(MlEditCommunityFormComponent);
