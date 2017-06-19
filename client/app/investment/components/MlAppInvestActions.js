/**
 * Created by pankaj on 19/6/17.
 */

import {createStageActionHandler} from '../actions/createStage';
import {updateStageActionHandler} from '../actions/updateStage';

module.exports = {
  assess: {
    config:{
      showAction: true,
      actionName: "assess",
      hasPopOver:true,
      popOverTitle:'Assess',
      placement:'top',
      target:'assess',
      actionComponent:'Hi',
      popOverComponent:'<h1>Hi</h1>'//action.popOverComponent};
    },
    handler: async (ref) => {
      console.log('Here', this, ref);
    }
  },
  like: {
    config:{
      showAction: true,
      actionName: "like",
    },
    handler: async (ref) => {
      const currentStage = ref.props.currentStage;
      changeStage(ref, currentStage, "likes");
    }
  },
  comment: {
    config:{
      showAction: true,
      actionName: "comment",
    },
    handler: async (ref) => {
      const currentStage = ref.props.currentStage;
      changeStage(ref, currentStage, "comment");
    }
  },
  wishlist: {
    config:{
      showAction: true,
      actionName: "wishlist",
    },
    handler: async (ref) => {
      const currentStage = ref.props.currentStage;
      changeStage(ref, currentStage, "wishlist");
    }
  },
  shortlist: {
    config:{
      showAction: true,
      actionName: "shortlist",
    },
    handler: async (ref) => {
      const currentStage = ref.props.currentStage;
      changeStage(ref, currentStage, "shortlist");
    }
  },
  onboard: {
    config:{
      showAction: true,
      actionName: "onboard",
    },
    handler: async (ref) => {
      const currentStage = ref.props.currentStage;
      changeStage(ref, currentStage, "onboard");
    }
  }
}

async function changeStage(that, currentStage, currentStageName){
  if(!that.state.selected.resourceId){
    toastr.error('Please select a portfolio');
    return false;
  }
  if(currentStage.stageName == currentStageName){
    toastr.error('Already in '+stage.stageName+' Stage');
    return false;
  }
  let dataToInsert = {
    "resourceId": that.state.selected.resourceId,
    "resourceType": "portfolio",
    "resourceStage": currentStageName
  };
  let response;
  if(that.state.selected.stage.length){
    response = await updateStageActionHandler(that.state.selected.stage[0]._id, dataToInsert);
  } else {
    response = await createStageActionHandler(dataToInsert);
  }
  if(response.success){
    toastr.success('Updated Successfully');
    that.props.fetchPortfolio();
  }
}
