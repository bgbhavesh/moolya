import React from 'react';
import gql from 'graphql-tag'
import MlIdeatorPortfolioTemplate from '../component/Ideator/MlIdeatorPortfolio'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
import MlViewIdeatorPortfolioTemplate from '../component/IdeatorView/MlViewIdeatorPortfolio'
import MlStartupEditTemplate from '../component/Startup/edit/MlStartupEditTemplate'
import MlViewStartupPortfolioTemplate from '../component/StartupView/MlViewStartupPortfolioTemplate'
import MlServiceProviderEditTabs from '../component/ServiceProvider/edit/MlServiceProviderEditTabs'
import MlServiceProviderViewTabs from '../component/ServiceProvider/view/MlServiceProviderViewTabs'
import MlAppIdeatorEditTabs from '../../../../app/ideators/components/MlAppIdeatorEditTabs'
import MlAppIdeatorTabs from '../../../../app/ideators/components/MlAppIdeatorTabs'
import MlFunderEditTemplate from '../component/Funder/MlFunderEditTemplate'
import MlFunderViewTemplate from '../component/FunderView/MlFunderViewTemplate'
import MlAppFunderViewTabs from '../../../../app/funders/components/MlAppFunderViewTabs'
import MlAppFunderEditTabs from '../../../../app/funders/components/MlAppFunderEditTabs'
import MlAppStartupEditTabs from '../../../../app/startup/components/MlAppStartupEditTabs'
import MlAppStartupViewTabs from '../../../../app/startup/components/MlAppStartupViewTabs'
import MlAppServiceProviderEditTabs from "../../../../app/serviceProvider/components/MlAppServiceProviderEditTabs";
import MlAppServiceProviderViewTabs from "../../../../app/serviceProvider/components/MlAppServiceProviderViewTabs";
/**
 * admin config files for internal users
 * */
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
  templateName:"Portfolio-Template-Investor-Edit",
  templateCode:"PFTFUNEDT",   //PFFUNEDT
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlFunderEditTemplate
};

const mlFunderViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Investor-View",
  templateCode:"PFTFUNVIW",
  userType:'internal',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlFunderViewTemplate
};
const mlServiceProviderEditExternalUserPortfolioTemplateConfig = {
  templateName: "Portfolio-Template-ServiceProvider-Edit",
  templateCode: "PFTSPSEDT",
  userType: 'internal',
  process: 'Registration',
  subProcess: 'Registration',
  stepCode: 'PORTFOLIO',
  stepName: 'Portfolio',
  component: MlServiceProviderEditTabs
};
const mlServiceProviderViewExternalUserPortfolioTemplateConfig = {
  templateName: "Portfolio-Template-ServiceProvider-View",
  templateCode: "PFTSPSVIW",
  userType: 'internal',
  process: 'Registration',
  subProcess: 'Registration',
  stepCode: 'PORTFOLIO',
  stepName: 'Portfolio',
  component: MlServiceProviderViewTabs
};
mlRegistrationTemplates.setTemplate(mlIdeatorEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlIdeatorViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlStartupEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlStartupViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlFunderEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlFunderViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlServiceProviderEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlServiceProviderViewExternalUserPortfolioTemplateConfig);

/**
 * app config files for external users
 * */
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

const mlAppStartupEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Startup-Edit",
  templateCode:"PFSTUEDT",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppStartupEditTabs
};

const mlAppStartupViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Startup-View",
  templateCode:"PFSTUVIW",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppStartupViewTabs
};

const mlAppFunderEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Investor-Edit",
  templateCode:"PFTFUNEDT",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppFunderEditTabs
};

const mlAppFunderViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Investor-View",
  templateCode:"PFTFUNVIW",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlAppFunderViewTabs
};

const mlAppServiceProviderEditExternalUserPortfolioTemplateConfig = {
  templateName: "Portfolio-Template-ServiceProvider-Edit",
  templateCode: "PFTSPSEDT",
  userType: 'external',
  process: 'Registration',
  subProcess: 'Registration',
  stepCode: 'PORTFOLIO',
  stepName: 'Portfolio',
  component: MlAppServiceProviderEditTabs
};

const mlAppServiceProviderViewExternalUserPortfolioTemplateConfig = {
  templateName: "Portfolio-Template-ServiceProvider-View",
  templateCode: "PFTSPSVIW",
  userType: 'external',
  process: 'Registration',
  subProcess: 'Registration',
  stepCode: 'PORTFOLIO',
  stepName: 'Portfolio',
  component: MlAppServiceProviderViewTabs
};

mlRegistrationTemplates.setTemplate(mlAppIdeatorEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppIdeatorViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppStartupEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppStartupViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppFunderViewExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppFunderEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppServiceProviderEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlAppServiceProviderViewExternalUserPortfolioTemplateConfig);
