import React from 'react';
import gql from 'graphql-tag'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';

import IdeatorIndividualHardReg from '../component/IdeatorIndividualHardReg';
import IdeatorCompanyHardReg from '../component/IdeatorCompanyHardReg';

import FunderCompanyHardReg from "../component/FunderCompanyHardReg";
import FunderIndividualHardReg from "../component/FunderIndividualHardReg";
import ServiceProviderCompanyHardReg from "../component/ServiceProviderCompanyHardReg";
import ServiceProviderIndividualHardReg from "../component/ServiceProviderIndividualHardReg";

import CompanyHardReg from "../component/CompanyHardReg";
import StartupHardReg from "../component/StartupHardReg";
import InstitutionHardReg from "../component/InstitutionHardReg";

const mlIdeatorCompanyHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Ideator-Company",
  templateCode:"HRTIDECMP",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:IdeatorCompanyHardReg
};
const mlIdeatorCompanyHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Ideator-Company",
  templateCode:"HRTIDECMP",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:IdeatorCompanyHardReg
};
const mlIdeatorIndividualHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Ideator-Individual",
  templateCode:"HRTIDEINV",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
 component:IdeatorIndividualHardReg
};
const mlIdeatorIndividualHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Ideator-Individual",
  templateCode:"HRTIDEINV",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:IdeatorIndividualHardReg
};

const mlFunderCompanyHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Funder-Company",
  templateCode:"HRTFUNCMP",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:FunderCompanyHardReg
};
const mlFunderCompanyHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Funder-Company",
  templateCode:"HRTFUNCMP",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:FunderCompanyHardReg
};

const mlFunderIndividualHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Funder-Individual",
  templateCode:"HRTFUNINV",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:FunderIndividualHardReg
};
const mlFunderIndividualHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Funder-Individual",
  templateCode:"HRTFUNINV",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:FunderIndividualHardReg
};
const mlServiceProviderCompanyHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-ServiceProvider-Company",
  templateCode:"HRTSPSCMP",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:ServiceProviderCompanyHardReg
};
const mlServiceProviderCompanyHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-ServiceProvider-Company",
  templateCode:"HRTSPSCMP",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:ServiceProviderCompanyHardReg
};
const mlServiceProviderIndividualHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-ServiceProvider-Individual",
  templateCode:"HRTSPSINV",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:ServiceProviderIndividualHardReg
};
const mlServiceProviderIndividualHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-ServiceProvider-Individual",
  templateCode:"HRTSPSINV",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:ServiceProviderIndividualHardReg
};

const mlCompanyHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Company",
  templateCode:"HRTCMP",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:CompanyHardReg
};
const mlCompanyHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Company",
  templateCode:"HRTCMP",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:CompanyHardReg
};

const mlStartupHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Startup-Company",
  templateCode:"HRTSTU",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:StartupHardReg
};
const mlStartupHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Startup-Company",
  templateCode:"HRTSTU",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:StartupHardReg
};


const mlInstitutionHardRegistrationExternalUserTemplateConfig={
  templateName:"Hard-Reg-Institution",
  templateCode:"HRTINS",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:InstitutionHardReg
};
const mlInstitutionHardRegistrationInternalUserTemplateConfig={
  templateName:"Hard-Reg-Institution",
  templateCode:"HRTINS",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'HARD',
  stepName:'Hard',
  component:InstitutionHardReg
};

mlRegistrationTemplates.setTemplate(mlIdeatorCompanyHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlIdeatorCompanyHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlIdeatorIndividualHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlIdeatorIndividualHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlFunderCompanyHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlFunderCompanyHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlFunderIndividualHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlFunderIndividualHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlServiceProviderCompanyHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlServiceProviderCompanyHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlServiceProviderIndividualHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlServiceProviderIndividualHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlCompanyHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlCompanyHardRegistrationInternalUserTemplateConfig)

mlRegistrationTemplates.setTemplate(mlStartupHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlStartupHardRegistrationInternalUserTemplateConfig);

mlRegistrationTemplates.setTemplate(mlInstitutionHardRegistrationExternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlInstitutionHardRegistrationInternalUserTemplateConfig);


