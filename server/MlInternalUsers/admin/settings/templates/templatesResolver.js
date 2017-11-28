import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';
import mlTemplateAssignmentRepo from './mlTemplateAssignmentRepo';

MlResolver.MlQueryResolver.findTemplateSteps = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    // let response= MlSubProcess.findOne({"_id":id});
    const response = mlDBController.findOne('MlSubProcess', { _id: id }, context)
    return response;
  }
}

MlResolver.MlQueryResolver.findAssignedTemplates = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    // let response= MlTemplateAssignment.findOne({"_id":id});
    const response = mlDBController.findOne('MlTemplateAssignment', { _id: id }, context)
    return response;
  }
}


MlResolver.MlQueryResolver.findStepAssignedTemplates = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    const response = MlTemplates.findOne({ _id: id }, { templates: { $elemMatch: { stepCode: args.stepCode } } });
    const steps = response.templates;
    const filteredSteps = [];
    steps.map((step, key) => {
      if (step.stepCode == args.stepCode) {
        filteredSteps.push(step)
      }
    })
    response.templates = filteredSteps;
    return response;
  }
}

MlResolver.MlQueryResolver.findTemplates = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    const response = MlTemplates.findOne({ subProcessId: id });
    const steps = response.templates;
    const filteredSteps = [];
    steps.map((step, key) => {
      if (step.stepCode == args.stepCode || step.stepName == args.stepCode) {
        filteredSteps.push(step)
      }
    })
    response.templates = filteredSteps;
    return response;
  }
}

MlResolver.MlQueryResolver.fetchAssignedTemplate = (obj, args, context, info) => {
  if (args.process && args.subProcess && args.stepCode) {
    // todo: conditions based on record id for steps like registration,portfolio
    // resolve userType:internal/external and send with response
    const process = args.process;
    const subProcess = args.subProcess;
    const recordId = args.recordId;
    const stepCode = args.stepCode;
    const mode = args.mode;
    const template = mlTemplateAssignmentRepo.fetchTemplate(process, subProcess, stepCode, recordId, mode);
    return template;
  }
  return null;
}


MlResolver.MlQueryResolver.fetchSubProcess = (obj, args, context, info) => {
  // let result=MlSubProcess.find({"procesId":args.id, isActive:true}).fetch()||[];
  const result = mlDBController.find('MlSubProcess', { procesId: args.id, isActive: true }, context).fetch() || [];
  return result;
}

MlResolver.MlMutationResolver.createTemplateAssignment = (obj, args, context, info) => {
  if (args.template) {
    // let resp = MlTemplateAssignment.insert({...args.accountType});
    args.template.createdDate = new Date()
    if (Meteor.users.findOne({ _id: context.userId })) {
      args.template.createdBy = Meteor.users.findOne({ _id: context.userId }).username
    }
    const resp = mlDBController.insert('MlTemplateAssignment', args.template, context)
    if (resp) {
      const code = 200;
      const result = { template: resp }
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}


MlResolver.MlMutationResolver.updateTemplateAssignment = (obj, args, context, info) => {
  if (args.id) {
    // let template = MlTemplateAssignment.findOne({_id: args.id});
    const template = mlDBController.findOne('MlTemplateAssignment', { _id: args.id }, context)
    if (template.isSystemDefined) {
      const code = 409;
      const response = new MlRespPayload().errorPayload('System defined template assignment cannot be edited', code);
      return response;
    } else if (template) {
      // let resp = MlTemplateAssignment.update({_id: args.id}, {$set: args.template}, {upsert: true})
      args.template.modifiedDate = new Date()
      if (Meteor.users.findOne({ _id: context.userId })) {
        args.template.modifiedBy = Meteor.users.findOne({ _id: context.userId }).username
      }
      const resp = mlDBController.update('MlTemplateAssignment', args.id, args.template, { $set: true }, context)
      if (resp) {
        const code = 200;
        const result = { template: resp }
        const response = new MlRespPayload().successPayload(result, code);
        return response
      }
    }
  }
}

MlResolver.MlQueryResolver.findTemplateStepsSelect = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    const response = MlSubProcess.findOne({ _id: id });
    return response.steps;
  }
}

MlResolver.MlQueryResolver.findTemplatesSelect = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    const id = args.id;
    const response = MlTemplates.findOne({ subProcessId: id });
    const steps = response.templates;
    const filteredSteps = [];
    steps.map((step, key) => {
      if (step.stepName == args.stepName) {
        filteredSteps.push(step)
      }
    })
    //   response.templates = filteredSteps;
    return filteredSteps;
  }
}

// MlResolver.MlMutationResolver['updateTemplateAssignment'] = (obj, args, context, info) => {
//   if (args.id) {
//     let template = MlTemplateAssignment.findOne({_id: args.id});
//     if (template.isSystemDefined) {
//       let code = 409;
//       let response = new MlRespPayload().errorPayload("Cannot edit system defined Template Assignment", code);
//       return response;
//     }
//     else if (template) {
//       let resp = MlTemplateAssignment.update({_id: args.id}, {$set: args.template}, {upsert: true})
//       if (resp) {
//         let code = 200;
//         let result = {template: resp}
//         let response = new MlRespPayload().successPayload(result, code);
//         return response
//       }
//     }
//   }
// }
MlResolver.MlMutationResolver.updateStepAssignedTemplate = (obj, args, context, info) => {
  if (args.id) {
    const id = args.id;
    const response = MlTemplates.update({ _id: id, templates: { $elemMatch: { templateCode: args.templateCode } } }, { $set: { 'templates.$.isActive': args.isActive } })
    if (response) {
      const code = 200;
      const result = { template: response }
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}
