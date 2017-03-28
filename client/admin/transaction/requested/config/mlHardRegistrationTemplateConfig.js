import React from 'react';
import gql from 'graphql-tag'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
const mlHardRegistrationInternalUserTemplateConfig={
  templateName:"hardRegistrationAll",
  templateCode:"hardRegistrationAll",
  userType:'internal',
  process:'registration',
  subProcess:'registration',
  stepCode:'hardRegistration',
  stepName:'hardRegistration'
};

const mlHardRegistrationExternalUserTemplateConfig={
  templateName:"hardRegistrationAll",
  templateCode:"hardRegistrationAll",
  userType:'external',
  process:'registration',
  subProcess:'registration',
  stepCode:'hardRegistration',
  stepName:'hardRegistration'
};

mlRegistrationTemplates.setTemplate(mlHardRegistrationInternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlHardRegistrationExternalUserTemplateConfig);

export {mlHardRegistrationInternalUserTemplateConfig,mlHardRegistrationExternalUserTemplateConfig};
