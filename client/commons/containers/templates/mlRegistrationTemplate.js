
/**
 * Created by mohammed.mohasin on 03/02/17.
 */

import _ from 'lodash';

class MlRegistrationTemplates {
  constructor() {
    if (!MlRegistrationTemplates.instance) {
      MlRegistrationTemplates.instance = this;
      this.setTemplate.bind(this);
      this.getTemplate.bind(this);
      this.templates = [];
    }
    return MlRegistrationTemplates.instance;
  }

  setTemplate(templateConfig) {
    if (templateConfig && _.isObject(templateConfig)) {
      this.templates.push(templateConfig);
    }
  }
  getTemplate(templateName, userType) {
    const templateData = _.find(this.templates, { templateName, userType });
    // console.log(templateData);
    return templateData;
  }
}

const mlRegistrationTemplates = new MlRegistrationTemplates();
Object.freeze(mlRegistrationTemplates);

export default mlRegistrationTemplates;

