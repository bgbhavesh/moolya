/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlAnchorList from './MlAnchorList';
import MlAnchorObjective from './MlAnchorObjective';
import MlAnchorContact from './MlAnchorContact';
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";
import formHandler from '../../../../commons/containers/MlFormHandler';
import { updateSubChapterActionHandler } from '../../actions/updateSubChapter'
import { updateBackendUserActionHandler } from '../../../settings/backendUsers/actions/updateBackendUserAction'
import { findSubChapterActionHandler } from '../../actions/findSubChapter';

import moment from "moment";

class MlAnchorTabsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // module:'subchapter',
      objective: [
        {
          description: '',
          status: false
        }
      ],
      subChapter: {
        contactDetails: [],
      },
      contactDetailsFormData: {
        selectedIndex: -1,
        formData: {
          name : '',
          addressTypeName: '',
          contactNumber: '',
          buildingNumber: '',
          street: '',
          landmark: '',
          area: '',
          cityId: '',
          stateId: '',
          countryId: '',
          pincode: '',
          latitude: '',
          longitude: '',
          // emailId: '',
          // contactPersonRole: '',
          // addressTypeId: '',
          // status: false,
        },
      },
    };
    this.getObjectiveDetails = this.getObjectiveDetails.bind(this);
    this.getContactDetails = this.getContactDetails.bind(this);
    this.updateAnchorDetails = this.updateAnchorDetails.bind(this);
    this.onContactChange = this.onContactChange.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    return this;
  }

  async componentDidMount() {
    const { clusterId, chapterId, subChapterId } = this.props;
    const resp = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
    this.setState({ subChapter: resp });
  }

  async handleSuccess(response) {
    console.log("*************",response)
    if (response && response.success)
      toastr.success('Updated Successfully')
    else 
      toastr.error(response.result);
  }

  async updateAnchorDetails() {
    let response;
    console.log('state=',this.state)
    switch (this.state.module) {
      case 'subchapter':
        let stateContactDetails = JSON.parse(JSON.stringify(this.state.subChapter.contactDetails));
        const { objective: stateObjective } = this.state;
        if (this.state.contactDetailsFormData.selectedIndex === -1
          && this.state.contactDetailsFormData.formData.addressTypeName) {
          if (!stateContactDetails) stateContactDetails = [];
          stateContactDetails.push(this.state.contactDetailsFormData.formData);
        } else if (this.state.contactDetailsFormData.selectedIndex > -1) {
          stateContactDetails[this.state.contactDetailsFormData.selectedIndex] = this.state.contactDetailsFormData.formData;
        }
        if (this.state.contactDetailsFormData.formData.name && ! this.state.contactDetailsFormData.formData.addressTypeName) {
          toastr.error('Address type is required in contact form');
          return
        }
        
        const contactDetails = (stateContactDetails && stateContactDetails.length) ? stateContactDetails : undefined;
        const { clusterId, chapterId, subChapterId } = this.props;
        const objective = stateObjective && stateObjective.length && stateObjective.filter((ob) => {
          if (ob.description) {
            return ob;
          }
        });
        response = await updateSubChapterActionHandler(this.props.clusterId, this.props.chapterId, {
          subChapterId,
          objective,
          contactDetails,
        });
        const resp = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
        this.setState({
          subChapter: resp,
          contactDetailsFormData: {
            selectedIndex: -1,
            formData:JSON.parse(response.result)
            //  {
            //   name:'',
            //   addressTypeName: '',
            //   contactNumber: '', 
            //   buildingNumber: '',
            //   street: '',
            //   landmark: '',
            //   area: '',
            //   cityId: '',
            //   stateId: '',
            //   countryId: '',
            //   pincode: '',
            //   latitude: '',
            //   longitude: '',
            //   // emailId: '',
            //   // contactPersonRole: '',
            //   // addressTypeId: '',
            //   // status: false,
            // },
          },
        });
        return response;
      case 'users':
        const { profile } = this.state.contact;
        // profile.dateOfBirth = profile.dateOfBirth ? new Date(profile.dateOfBirth) : null;
        profile.dateOfBirth = profile.dateOfBirth ? moment(profile.dateOfBirth).format(Meteor.settings.public.dateFormat) : null;
        const updateUserObject = {
          userId: this.state.contact._id,
          userObject: { profile, username: profile.email },
        }

        var updateDetails = this.props;
        response = await updateBackendUserActionHandler(updateUserObject, updateDetails)
        this.setState({isUserUpdated: true});
        return response
        break
      default:
        console.log('save type required')
    }
  }

  getUserDetails(details) {
    //get tab details
  
    if (details.socialLinksInfo && details.socialLinksInfo[0]) {
      details.profile.InternalUprofile.moolyaProfile.socialLinksInfo = details.socialLinksInfo;
      // details.socialLinksInfo = undefined;
    }
    this.setState({ contact: details, module: "users", isUserUpdated: false })
  }
  getObjectiveDetails(details) {
    //get tab details
    this.setState({
      objective: details,
      module: "subchapter"
    });
  }

  getContactDetails(details) {
    this.setState({
      contactDetailsFormData: details,
      module: "subchapter"
    });
  }

  onContactChange(field, value) {
    var state = JSON.parse(JSON.stringify(this.state));
    state.contactDetailsFormData.formData[field] = value;
    this.setState(state);
  }

  render() {
    const MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async (event) => this.props.handler(this.updateAnchorDetails.bind(this), this.handleSuccess.bind(this))
      }, {
        showAction: true,
        actionName: 'cancel',
        handler: async (event) => {
          window.history.back()
        }
      }
    ]
    const steps =
      [
        {
          name: 'Anchors',
          component: <MlAnchorList data={this.props} getUserDetails={this.getUserDetails} isUserUpdated={this.state.isUserUpdated}/>,
          icon: <span className="ml ml-basic-Information"></span>
        },
        {
          name: 'Objectives',
          component: <MlAnchorObjective {...this.props} getObjectiveDetails={this.getObjectiveDetails} />,
          icon: <span className="ml ml-additional-Information"></span>
        },
        {
          name: 'Contact',
          component: <MlAnchorContact
            contactDetails={this.state.subChapter.contactDetails}
            selectedIndex={this.state.contactDetailsFormData.selectedIndex}
            formData={this.state.contactDetailsFormData.formData}
            onContactChange={this.onContactChange}
            {...this.props}
            getContactDetails={this.getContactDetails} />,
          icon: <span className="ml flaticon-ml-agenda"></span>
        }
      ]
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className='step-progress'>
            <div id="root">
              <StepZilla steps={steps} showNavigation={false} prevBtnOnLastStep={true} preventEnterSubmission={true} />
            </div>
          </div>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName" />
      </div>
    )
  }
}
;
export default MlAnchorTabsContainer = formHandler()(MlAnchorTabsContainer);
