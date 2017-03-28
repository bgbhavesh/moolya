
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver['findTemplateSteps'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    var id= args.id;
    let response= MlSubProcess.findOne({"_id":id});
    return response;
  }
}

MlResolver.MlQueryResolver['findStepAssignedTemplates'] = (obj, args, context, info) => {9
  // TODO : Authorization
  if (args.id) {
    var id= args.id;
    let response= MlTemplateAssignment.findOne({"subProcess":id},{assignedTemplates:{$elemMatch:{stepCode:args.stepCode}}});
    return response;
  }
}

MlResolver.MlQueryResolver['fetchAssignedTemplate']=(obj, args, context, info) => {
  if (args.process&&args.subProcess&&args.stepCode) {
     let templateAssignment= MlTemplateAssignment.findOne({process:args.process,subProcess: args.subProcess,assignedTemplates: { $elemMatch: { "stepCode": args.stepCode } } },
                                             {fields: {'assignedTemplates.$': 1}});

    //todo: conditions based on record id for steps like registration,portfolio

    //resolve userType:internal/external and send with response

    let template=templateAssignment&&templateAssignment.assignedTemplates?templateAssignment.assignedTemplates[0]:null;
    return template;
  }
  return null;
}
