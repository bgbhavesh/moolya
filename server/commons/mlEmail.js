/**
 * Created by venkatasrinag on 6/1/17.
 */
"use strict";
class eMailObjectCreation {
    createJson(email){
        check(email, Object);
        return{
            "message":{
                "text": email.text,
                "subject": email.subject,
                "from_email": email.from,
                "from_name": "Moolya",
                "to":[
                    {
                        "email": email.to,
                        "type": "to"
                    }
                ],
                "important": true,
                "async": true
            }
        }
    }

    createAttachement(email){
        check(email, Object);
        return{
            "message":{
                "text": email.text,
                "subject": email.subject,
                "from_email": email.from,
                "from_name": "Moolya",
                "to":[
                    {
                      "email": email.to,
                      "type": "to"
                    }
                ],
                "attachments":email.attachments,
                "important": true,
                "async": true
            }
        }
    }

    createHTML(email){
        check(email, Object);
        return {
            "message": {
                "html": email.html,
                "subject": email.subject,
                "from_email": email.from,
                "from_name": "Moolya",
                "to": [
                    {
                        "email": email.to,
                        "type": "to"
                    }
                ],
                "important": true,
                "async": true
            }
        }
    }
}


module.exports = class moolyaEmail{
    constructor(){
        Mandrill.config({username: Meteor.settings.private.emailConfig.username, key: Meteor.settings.private.emailConfig.key});
        this.emailObj = new eMailObjectCreation();
    }
    sendHtml(object){
        Mandrill.messages.send(this.emailObj.createHTML(object));
    }
    sendJson(object){
        Mandrill.messages.send(this.emailObj.createJson(object));
    }
    sendAttachment(object){
        Mandrill.messages.send(this.emailObj.createAttachement(object));
    }
}
