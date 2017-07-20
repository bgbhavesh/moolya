import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['createBugReport'] = (obj, args, context, info) => {

  var bugReportData={details:args.details.details,reportedUrl:args.details.reportedUrl};
  bugReportData.createdBy = null;
  bugReportData.createdDate = new Date();
  let result = mlDBController.insert('MlBugReport',bugReportData, context);
  if (result) {
    let code = 200;
    let result = {bugReportId: result};
    let response = new MlRespPayload().successPayload(result, code);
    return response;
  }
}
