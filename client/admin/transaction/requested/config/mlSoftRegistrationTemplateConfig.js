import React from 'react';
import gql from 'graphql-tag'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
const mlSoftRegistrationInternalUserTemplateConfig={
  templateName:"softRegistrationAll",
  templateCode:"softRegistrationAll",
  userType:'internal',
  process:'registration',
  subProcess:'registration',
  stepCode:'softRegistration',
  stepName:'softRegistration'
};

const mlSoftRegistrationExternalUserTemplateConfig={
  templateName:"softRegistrationAll",
  templateCode:"softRegistrationAll",
  userType:'external',
  process:'registration',
  subProcess:'registration',
  stepCode:'softRegistration',
  stepName:'softRegistration'
};

mlRegistrationTemplates.setTemplate(mlSoftRegistrationInternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlSoftRegistrationExternalUserTemplateConfig);

export {mlSoftRegistrationInternalUserTemplateConfig,mlSoftRegistrationExternalUserTemplateConfig};
