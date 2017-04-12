import React from 'react';
import gql from 'graphql-tag'
import MlIdeatorPortfolioTemplate from '../component/Ideator/MlIdeatorPortfolio'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
import MlViewIdeatorPortfolioTemplate from '../component/IdeatorView/MlViewIdeatorPortfolio'

const mlIdeatorEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-Edit",
  templateCode:"PFTIDEEDT",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlIdeatorPortfolioTemplate
};

const mlIdeatorViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Template-Ideator-View",
  templateCode:"PFTIDEVIW",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO',
  stepName:'Portfolio',
  component:MlViewIdeatorPortfolioTemplate
};

const mlStartupEditExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Ideator-Edit",
  templateCode:"PFSTUEDT",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO-IDEATOR',
  stepName:'Portfolio',
  // component:IdeatorCompanyHardReg
};

const mlStartupViewExternalUserPortfolioTemplateConfig={
  templateName:"Portfolio-Startup-View",
  templateCode:"PFSTUVIW",
  userType:'external',
  process:'Registration',
  subProcess:'Registration',
  stepCode:'PORTFOLIO-STARTUP',
  stepName:'Portfolio-Startup',
  // component:IdeatorCompanyHardReg
};

mlRegistrationTemplates.setTemplate(mlIdeatorEditExternalUserPortfolioTemplateConfig);
mlRegistrationTemplates.setTemplate(mlIdeatorViewExternalUserPortfolioTemplateConfig);
