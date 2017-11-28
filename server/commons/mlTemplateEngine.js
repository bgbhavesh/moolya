

import _ from 'underscore';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

export default NotificationTemplateEngine = class NotificationTemplateEngine {
  static getNotificationTemplateDefinition(code, type) {
    const template = MlNotificationTemplates.findOne({ tempCode: code, type }) || {};
    return template;
  }

  static interpolateTemplateContent(content, reqObj) {
    var content = content || '';
    const obj = reqObj || {};
    try {
      const template = _.template(content);
      content = template(obj);
    } catch (e) {
    }
    // unescape the content
    content = _.unescape(content);
    return content;
  }

  static fetchTemplateContent(code, type, reqObj) {
    /** get template definition */
    const template = NotificationTemplateEngine.getNotificationTemplateDefinition(code, type);
    const content = template.content || '';

    /** interpolate the content */
    const interpolatedContent = NotificationTemplateEngine.interpolateTemplateContent(content, reqObj);

    return { tempConfig: template, content: interpolatedContent };
  }
}
