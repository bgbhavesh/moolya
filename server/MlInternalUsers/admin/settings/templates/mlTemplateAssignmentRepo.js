
/**
 * Created by mohammed.mohasin on 04/04/17.
 */
import _ from 'lodash';
class MlTemplateAssignmentRepo {
  constructor() {
    if (!MlTemplateAssignmentRepo.instance) {
      MlTemplateAssignmentRepo.instance = this;
    }
    return MlTemplateAssignmentRepo.instance;
  }

  fetchTemplateProxy(query) {
    const templateAssignment = MlTemplateAssignment.findOne(query, { fields: { 'assignedTemplates.$': 1 } });
    template = templateAssignment && templateAssignment.assignedTemplates ? templateAssignment.assignedTemplates[0] : null;
    return template;
  }

  fetchTemplate(process, subProcess, stepCode, recordId, mode) {
    let templateuserType = null,
      templateidentity = null,
      templateclusterId = null,
      templatechapterId = null,
      templatesubChapterId = null,
      templatecommunityCode = null;
    const baseQuery = { templateProcessName: process, templateSubProcessName: subProcess, assignedTemplates: { $elemMatch: { stepCode } } };
    const specificQuery = [];
    let query = {};
    let template = null;
    switch (process) {
      case 'Registration':
        switch (subProcess) {
          case 'Registration':
            if (stepCode == 'PORTFOLIO') {
              const pfRec = MlPortfolioDetails.findOne(recordId) || {};
              if (pfRec) {
                const pfInfo = pfRec || {};
                const {
                  userType, cluster, chapter, subChapter, communityCode
                } = pfInfo;
                templateuserType = userType; templateidentity = mode; templateclusterId = cluster;
                templatechapterId = chapter; templatesubChapterId = subChapter; templatecommunityCode = communityCode;
              }
            } else {
              const regRec = MlRegistration.findOne(recordId) || {};
              if (regRec) {
                const regInfo = regRec.registrationInfo || {};
                const {
                  userType, identityType, clusterId, chapterId, subChapterId, registrationType
                } = regInfo;
                templateuserType = userType;
                templateidentity = identityType;
                templateclusterId = clusterId;
                templatechapterId = chapterId;
                templatesubChapterId = subChapterId;
                templatecommunityCode = registrationType;
              }
            }
            break;
          case 'Portfolio': {
          }
            break;
        }
        break;
    }

    // check for specific condition for all criteria fields of templateAssignment
    if (templateuserType !== null && templateidentity != null && templateclusterId != null && templatechapterId != null && templatesubChapterId != null && templatecommunityCode != null) {
      const val = {
        templateuserType, templateidentity, templateclusterId, templatechapterId, templatesubChapterId, templatecommunityCode
      };
      query = _.extend(val, baseQuery);
      template = this.fetchTemplateProxy(query);
      if (template) { return template; }
    }


    // check for all or specific condition for all criteria fields of templateAssignment
    let val = {
      templateuserType, templateidentity, templateclusterId, templatechapterId, templatesubChapterId, templatecommunityCode
    };
    for (const key in val) {
      const qu = {};
      qu[key] = { $in: ['all', val[key]] };
      specificQuery.push(qu);// console.log(qu);
    }
    query = _.extend({ $and: specificQuery }, baseQuery);// console.log(query);
    template = this.fetchTemplateProxy(query);
    if (template) { return template; }

    // check for 'all' condition on criteria fields of template assignment
    val = {
      templateuserType: 'all', templateidentity: 'all', templateclusterId: 'all', templatechapterId: 'all', templatesubChapterId: 'all', templatecommunityCode: 'all'
    };
    query = _.extend(val, baseQuery);
    template = this.fetchTemplateProxy(query);
    if (template) { return template; }

    return null;
  }
}
const mlTemplateAssignmentRepo = new MlTemplateAssignmentRepo();
Object.freeze(mlTemplateAssignmentRepo);

export default mlTemplateAssignmentRepo;

