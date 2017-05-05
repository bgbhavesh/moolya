import React from 'react';
import gql from 'graphql-tag'
import MlIdeatorPortfolioTemplate from '../component/Ideator/MlIdeatorPortfolio'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
import MlViewIdeatorPortfolioTemplate from '../component/IdeatorView/MlViewIdeatorPortfolio'
import MlStartupEditTemplate from '../component/Startup/edit/MlStartupEditTemplate'
import MlViewStartupPortfolioTemplate from '../component/StartupView/MlViewStartupPortfolioTemplate'
import MlAppIdeatorEditTabs from '../../../../app/ideators/components/MlAppIdeatorEditTabs'
import MlAppIdeatorTabs from '../../../../app/ideators/components/MlAppIdeatorTabs'
import MlFunderEditTemplate from '../component/Funder/MlFunderEditTemplate'


const mlIdeatorEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-Edit",
  templateCode:"PFTIDEEDT",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlIdeatorPortfolioTemplate
};

const mlIdeatorViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-View",
  templateCode:"PFTIDEVIW",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlViewIdeatorPortfolioTemplate
};

const mlStartupEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Startup-Edit",
  templateCode:"PFSTUEDT",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlStartupEditTemplate
};

const mlStartupViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Startup-View",
  templateCode:"PFSTUVIW",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlViewStartupPortfolioTemplate
};
const mlFunderEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Funder-Edit",
  templateCode:"PFTFUNEDT",   //PFFUNEDT
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlFunderEditTemplate
};

// const mlFunderViewExternalUserPortfolioTemplateConfig={
//   templateName:"Portfolio-Template-Funder-View",
//   templateCode:"PFFUNVIW",
//   userType:'internal',
//   process:'Registration',
//   subProcess:'Registration',
//   stepCode:'PORTFOLIO',
//   stepName:'Portfolio',
//   component:MlViewStartupPortfolioTemplate
// };

mlRegistrationTemplates.setTemplate(mlIdeatorEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlIdeatorViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlStartupEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlStartupViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlFunderEditExternalUserPortfolioTemplateConfig);


const mlAppIdeatorEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-Edit",
  templateCode:"PFTIDEEDT",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppIdeatorEditTabs
};

const mlAppIdeatorViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-View",
  templateCode:"PFTIDEVIW",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppIdeatorTabs
};

// const mlAppStartupEditExternalUserPortfolioTemplateConfig={
//   templateName:"Portfolio-Template-Startup-Edit",
//   templateCode:"PFSTUEDT",
//   userType:'external',
//   process:'Registration',
//   subProcess:'Registration',
//   stepCode:'PORTFOLIO',
//   stepName:'Portfolio',
//   component:MlStartupEditTemplate
// };
//
// const mlAppStartupViewExternalUserPortfolioTemplateConfig={
//   templateName:"Portfolio-Template-Startup-View",
//   templateCode:"PFSTUVIW",
//   userType:'external',
//   process:'Registration',
//   subProcess:'Registration',
//   stepCode:'PORTFOLIO',
//   stepName:'Portfolio',
//   component:MlViewStartupPortfolioTemplate
// };

mlRegistrationTemplates.setTemplate(mlAppIdeatorEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppIdeatorViewExternalUserPortfolioTemplateConfig);
// mlRegistrationTemplates.setTemplate(mlAppStartupEditExternalUserPortfolioTemplateConfig);
// mlRegistrationTemplates.setTemplate(mlAppStartupViewExternalUserPortfolioTemplateConfig);
