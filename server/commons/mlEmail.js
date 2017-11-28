/**
 * Created by venkatasrinag on 6/1/17.
 */


// TODO: Remove the dependency of Meteor Email Package and use NodeMailer(npm) package.
const from = Meteor.settings.private.fromEmailAddr;
Meteor.startup(() => {
  // console.log(encodeURIComponent("qasmtp@moolya.in"));
  process.env.MAIL_URL = Meteor.settings.private.smtpMailUrl;
});

class SmtpEmail {
  constructor() {
    this._createEmailJSON.bind(this);
    this._createEmailHTML.bind(this);
    this._createEmailAttachment.bind(this);
  }
  send(email) {
    Email.send(this._createEmailJSON(email));
  }
  sendHTML(email) {
    Email.send(this._createEmailHTML(email));
  }
  sendAttachment(email) {
    Email.send(this._createEmailAttachment(email));
  }

  _createEmailJSON(email) {
    return {
      from: email.from || from,
      to: email.to,
      subject: email.subject,
      text: email.text
    };
  }

  _createEmailHTML(email) {
    return {
      from: email.from || from,
      to: email.to,
      subject: email.subject,
      html: email.html
    }
  }

  _createEmailAttachment(email) {
    const emailConfig = {
      from: email.from || from,
      to: email.to,
      subject: email.subject,
      attachments: [{ contents: email.content, contentType: email.contentType, fileName: email.fileName }]
    }
    if (email.cc) {
      emailConfig.cc = email.cc;
    }
    return emailConfig;
  }
}


class eMailObjectCreation {
  createJson(email) {
    check(email, Object);
    return {
      message: {
        text: email.text,
        subject: email.subject,
        from_email: email.from,
        from_name: 'Moolya',
        to: [
          {
            email: email.to,
            type: 'to'
          }
        ],
        important: true,
        async: true
      }
    }
  }

  createAttachement(email) {
    check(email, Object);
    return {
      message: {
        text: email.text,
        subject: email.subject,
        from_email: email.from,
        from_name: 'Moolya',
        to: [
          {
            email: email.to,
            type: 'to'
          }
        ],
        attachments: email.attachments,
        important: true,
        async: true
      }
    }
  }

  createHTML(email) {
    check(email, Object);
    return {
      message: {
        html: email.html,
        subject: email.subject,
        from_email: email.from,
        from_name: 'Moolya',
        to: [
          {
            email: email.to,
            type: 'to'
          }
        ],
        important: true,
        async: true
      }
    }
  }
}


module.exports = class moolyaEmail {
  constructor() {
    //  Mandrill.config({username: Meteor.settings.private.emailConfig.username, key: Meteor.settings.private.emailConfig.key});
    //  this.emailObj = new eMailObjectCreation();
    this.emailObj = new SmtpEmail();
  }
  sendHtml(object) {
    // Mandrill.messages.send(this.emailObj.createHTML(object));
    this.emailObj.sendHTML(object);
  }
  sendJson(object) {
    // Mandrill.messages.send(this.emailObj.createJson(object));
    this.emailObj.sendJson(object);
  }
  sendAttachment(object) {
    // Mandrill.messages.send(this.emailObj.createAttachement(object));
    this.emailObj.sendAttachment(object);
  }
}
