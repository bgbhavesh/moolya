import React from 'react';
import gql from 'graphql-tag'
import mlRegistrationTemplates from '../../../../commons/containers/templates/mlRegistrationTemplate';
const mlHardRegistrationInternalUserTemplateConfig={
  templateName:"softRegistrationAll",
  templateCode:"softRegistrationAll",
  userType:'internal',
  process:'registration',
  subProcess:'registration',
  stepCode:'softRegistration',
  stepName:'softRegistration'
};

const mlHardRegistrationExternalUserTemplateConfig={
  templateName:"softRegistrationAll",
  templateCode:"softRegistrationAll",
  userType:'external',
  process:'registration',
  subProcess:'registration',
  stepCode:'softRegistration',
  stepName:'softRegistration'
};

mlRegistrationTemplates.setTemplate(mlHardRegistrationInternalUserTemplateConfig);
mlRegistrationTemplates.setTemplate(mlHardRegistrationExternalUserTemplateConfig);

export {mlHardRegistrationInternalUserTemplateConfig,mlHardRegistrationExternalUserTemplateConfig};
