import EmailTemplates from 'swig-email-templates'; 
import { remove, compact } from 'lodash';
const fromEmail = Meteor.settings.private.fromEmailAddr; 

const today = new Date();
const dd = today.getDate().toString();
const mm = (today.getMonth()+1).toString(); //January is 0!
const yy = today.getFullYear().toString().substr(-2)
const curDated = dd+"-"+mm+"-"+yy;
const gcm = require("node-gcm");
const async = require("async");
const sender = new gcm.Sender("AAAAuB2v3xE:APA91bGFwduN9JGASvjzvM9UDD_IHA7b-Gbvkepy8K30W5VPg4p1t9O6jj1XKGUhOizaisud_Nk3kPfn_xBSkxhSgIysL9RVZRZyUpLxaco1YDu3h55w2Vu_3e72VnJnaxwyv-I0-bYW");

class MlCronJobControllerClass {
    constructor() {

    }
    dailyReport() {
        let object = {
            curDate: curDated,
            activeCluster: mlDBController.find('MlClusters', { isActive: true }).count(),
            activeChapters: mlDBController.find('MlChapters', { isActive: true }).count(),
            activeNon_moolyaSubChapters: mlDBController.find('MlSubChapters', { isActive: true, isDefaultSubChapter: false }).count()
        }

        var pipeLine = [
          { "$match": { isActive: true } },
          {
              "$lookup": {
                  from: "mlRegistration",
                  localField: '_id',
                  foreignField: 'registrationInfo.clusterId',
                  as: "registration"
              }
          },
          //registration lookup
          {
              "$addFields": {
                  "reqRegistration": {
                      "$filter": {
                          "input": "$registration",
                          "as": "reg",
                          "cond": { "$eq": ["$$reg.status", "REG_SOFT_APR"] }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "regB4Portfolio": {
                      "$size": {
                          "$filter": {
                              "input": "$registration",
                              "as": "reg",
                              "cond": { "$eq": ["$$reg.status", "REG_KYC_U_KOFF"] }
                          }
                      }
                  }
              }
          },
          //portfolio lookup
          {
              "$lookup":
              {
                  from: "mlPortfolioDetails",
                  localField: '_id',
                  foreignField: 'clusterId',
                  as: "portfolio"
              }
          },
          {
              "$addFields": {
                  "approved_portfolios": {
                      "$size": {
                          "$filter": {
                              "input": "$portfolio",
                              "as": "port",
                              "cond": { "$eq": ["$$port.status", "REG_PORT_KICKOFF"] }
                          }
                      }
                  }
              }
          },
          //office lookup
          {
              "$lookup":
              {
                  from: "mlOfficeTransaction",
                  localField: '_id',
                  foreignField: 'clusterId',
                  as: "officeTrans"
              }
          },
          {
              "$addFields": {
                  "pending_officeApproval": {
                      "$size": {
                          "$filter": {
                              "input": "$officeTrans",
                              "as": "office",
                              "cond": { "$in": ["$$office.status", ["Pending", "Payment Generated"]] }
                          }
                      }
                  }
              }
          },
          //subchapter lookup
          //todo:// active_subchapters
          {
              "$lookup":
              {
                  from: "mlSubChapters",
                  localField: '_id',
                  foreignField: 'clusterId',
                  as: "subChapters"
              }
          },
          {
              "$addFields": {
                  "pending_SC_Approval_reqInActive_SubChapters": {
                      "$size": {
                          "$filter": {
                              "input": "$subChapters",
                              "as": "subChapter",
                              "cond": {
                                  $and: [
                                      { "$eq": ["$$subChapter.isActive", false] },
                                      { "$eq": ["$$subChapter.isDefaultSubChapter", false] }]
                              }
                          }
                      }
                  }
              }
          },
          //chapter lookup
          {
              "$lookup":
              {
                  from: "mlChapters",
                  localField: '_id',
                  foreignField: 'clusterId',
                  as: "chapters"
              }
          },
          {
              "$addFields": {
                  "active_Chapters": {
                      "$filter": {
                          "input": "$chapters",
                          "as": "chapt",
                          "cond": { "$eq": ["$$chapt.isActive", true] }
                      }
                  }
              }
          },
          {
              "$unwind": {
                  "path": "$active_Chapters",
                  "preserveNullAndEmptyArrays": true
              }
          },
          //adding chapter data
          {
              "$addFields": {
                  "active_Chapters.regValues": {
                      "$filter": {
                          "input": "$reqRegistration",
                          "as": "chapter_reg",
                          "cond": { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] }
                      }
                  }
              }
          },
          //from here the data will start adding wrt registration
          {
              "$addFields": {
                  "active_Chapters.approved_Ideators": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "IDE"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.approved_startup": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "STU"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.approved_funder": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "FUN"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.approved_serviceProvider": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "SPS"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.approved_institution": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "INS"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.approved_companies": {
                      "$size": {
                          "$filter": {
                              "input": "$reqRegistration",
                              "as": "chapter_reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$chapter_reg.registrationInfo.chapterId", "$active_Chapters._id"] },
                                      { "$eq": ["$$chapter_reg.registrationInfo.registrationType", "CMP"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          //chapters portfolio's
          {
              "$addFields": {
                  "active_Chapters.approved_portfolios": {
                      "$size": {
                          "$filter": {
                              "input": "$portfolio",
                              "as": "port",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$port.status", "REG_PORT_KICKOFF"] },
                                      { "$eq": ["$$port.chapterId", "$active_Chapters._id"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.regB4Portfolio": {
                      "$size": {
                          "$filter": {
                              "input": "$registration",
                              "as": "reg",
                              "cond": {
                                  "$and": [
                                      { "$eq": ["$$reg.status", "REG_KYC_U_KOFF"] },
                                      { "$eq": ["$$reg.registrationInfo.chapterId", "$active_Chapters._id"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          //chapter pending office approval
          {
              "$addFields": {
                  "active_Chapters.pending_officeApproval": {
                      "$size": {
                          "$filter": {
                              "input": "$officeTrans",
                              "as": "office",
                              "cond": {
                                  "$and": [
                                      { "$in": ["$$office.status", ["Pending", "Payment Generated"]] },
                                      { "$eq": ["$$office.chapterId", "$active_Chapters._id"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$addFields": {
                  "active_Chapters.pending_SC_Approval_reqInActive_SubChapters": {
                      "$size": {
                          "$filter": {
                              "input": "$subChapters",
                              "as": "subChapter",
                              "cond": {
                                  $and: [
                                      { "$eq": ["$$subChapter.isActive", false] },
                                      { "$eq": ["$$subChapter.isDefaultSubChapter", false] },
                                      { "$eq": ["$$subChapter.chapterId", "$active_Chapters._id"] }
                                  ]
                              }
                          }
                      }
                  }
              }
          },
          {
              "$group": {
                  "_id": "$_id",
                  "clusterName": { $first: "$clusterName" },
                  "clusterCode": { $first: "$clusterCode" },
                  "reqRegistration": { $first: "$reqRegistration" },
                  "regB4Portfolio": { $first: "$regB4Portfolio" },
                  "approved_portfolios": { $first: "$approved_portfolios" },
                  "pending_officeApproval": { $first: "$pending_officeApproval" },
                  "pending_SC_Approval_reqInActive_SubChapters": { $first: "$pending_SC_Approval_reqInActive_SubChapters" },
                  "active_Chapters": { $push: "$active_Chapters" },
              }
          },
          // projection of all fields
          {
              "$project": {
                  // reqRegistration: 1,
                  regB4Portfolio: 1,
                  approved_portfolios: 1,
                  pending_officeApproval: 1,
                  pending_SC_Approval_reqInActive_SubChapters: 1,
                  clusterName: 1,
                  clusterCode: 1,
                  // active_Chapters: 1,
                  active_Chapters: {
                      clusterName: 1,
                      chapterName: 1,
                      approved_Ideators: 1,
                      approved_startup: 1,
                      approved_funder: 1,
                      approved_serviceProvider: 1,
                      approved_institution: 1,
                      approved_companies: 1,
                      approved_portfolios: 1,
                      regB4Portfolio: 1,
                      pending_officeApproval: 1,
                      pending_SC_Approval_reqInActive_SubChapters: 1
                  },
                  approved_Ideators: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "IDE"] }, 1, 0]
                              }
                          }
                      }
                  },
                  approved_startup: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "STU"] }, 1, 0]
                              }
                          }
                      }
                  },
                  approved_funder: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "FUN"] }, 1, 0]
                              }
                          }
                      }
                  },
                  approved_serviceProvider: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "SPS"] }, 1, 0]
                              }
                          }
                      }
                  },
                  approved_institution: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "INS"] }, 1, 0]
                              }
                          }
                      }
                  },
                  approved_companies: {
                      "$sum": {
                          "$map": {
                              "input": "$reqRegistration",
                              "as": "ss",
                              "in": {
                                  "$cond": [{ "$eq": ["$$ss.registrationInfo.registrationType", "CMP"] }, 1, 0]
                              }
                          }
                      }
                  }
              }
          }
      ]
        let reqData = mlDBController.aggregate('MlClusters', pipeLine);        
        object.data = this.generateClusterSeq(reqData)
        // console.log('get daily Report', object);
        this.generateHtmlFile(object);
        return object;
    }

    generateClusterSeq(array) {
      let sequence = [];
      sequence.push(remove(array, { clusterCode: "IN" })[0]);
      sequence.push(remove(array, { clusterCode: "US" })[0]);
      sequence.push(remove(array, { clusterCode: "GB" })[0]);
      sequence.push(remove(array, { clusterCode: "DE" })[0]);
      sequence.push(remove(array, { clusterCode: "SG" })[0]);
      sequence.push(remove(array, { clusterCode: "MY" })[0]);
      sequence = compact(sequence);
      return sequence.concat(array);
    }

    generateHtmlFile(data) {
      const _this = this;
      /* Templates Directory in src/ui/hcmMailTemplates folder - Can modify the templates as per required
      Useful Links :
      github.com/andrewrk/swig-email-templates
      github.com/andrewrk/swig-dummy-context
      github.com/paularmstrong/swig
      */
      let emailObject = {};
      var customTemplates = new EmailTemplates({
        swig:{
          cache:false
        }
      });
      var absoluteFilePath = Npm.require('fs').realpathSync(process.cwd() + '/../../../../..') + '/server/MlInternalUsers/cronRepo/cronMoolyaReport.html';
      var context = {
        data: data
      };
      customTemplates.render(absoluteFilePath, context, Meteor.bindEnvironment((err, html, text, subject) => {
        emailObject.html = html;
        emailObject.text = text;
        _this.sendHtmlEmail(emailObject);
      }))
    }

    sendHtmlEmail(emailObject) {
      if (Meteor.settings.public.instance != "DEV") {
        console.log("cron sending mail");
        Meteor.setTimeout(function () {
          mlEmail.sendHtml({
            from: fromEmail,
            to: "anil.kumar@raksan.in",
            cc: "rudra.pratap@raksan.in",
            subject: "moolya daily monitoring report",
            html: emailObject.html
          });
        }, 2 * 1000);
      } else {
        console.log("cron sending mail stopped in dev");
      }
    }

    sendPushNotifications() {
      // const message = new gcm.Message({
      //   data: {
      //     notification: {
      //         title: "RAKSAN NOTIFICATIONS ! ",
      //         icon: "logo.png",
      //         body: "Sample Notification From Raksan",
      //         click_action: "https://qaapp.moolya.global/"
      //     }
      //   }
      // });
      // let dbValues = mlDBController.find('users',{}).fetch()
      // console.log('******', dbValues);
      // console.log('******', JSON.stringify(data));
      // console.log('the lenght of the whole dicument is: ', data.length());


      // for (var start = 0; start < tokens.length; start += batchLimit) {
      //     var slicedTokens = tokens.slice(start, start + batchLimit);
      //     tokenBatches.push(slicedTokens);
      // }

      // async.each(tokenBatches, function (batch, callback) {
      //     sender.send(message, { registrationIds: batch }, function (err, result) {
      //         if (err) {
      //             // Stop executing other batches
      //             return callback(err);
      //         }
      //         callback();
      //     });
      // },
      // function (err) {
      //     if (err) {
      //         console.log(err);
      //     }
      // });

      let pipeLine =
      [
          { "$match": { "profile.isAllowedNotifications": true } },
          {
              "$lookup": {
                  from: "mlPortfolioDetails",
                  localField: '_id',
                  foreignField: 'userId',
                  as: "portfolio"
              }
          },
          {
              "$lookup": {
                  from: "mlLikes",
                  localField: '_id',
                  foreignField: 'userId',
                  as: "likes"
              }
          },
          {
              "$lookup": {
                  from: "mlViews",
                  localField: '_id',
                  foreignField: 'userId',
                  as: "views"
              }
          },
          {
              "$lookup": {
                  from: "mlConnections",
                  localField: '_id',
                  foreignField: 'actionUserId',
                  as: "connections"
              }
          },
          {
              "$addFields": {
                  "totalLikes": {
                      "$size":"$likes"
              
                  },
                  "totalViews": {
                      "$size":"$views"
              
                  },
                   "totalConnections": {
                      "$size":"$connections"
              
                  }
              }
          },
          {
              "$project":{
                  totalLikes: 1,
                  totalViews: 1,
                  totalConnections: 1,
                  "profile.firebaseId": 1
              }
          } 
      ]
      let usersData = mlDBController.aggregate('users', pipeLine);

      async.each(usersData, function (object, callback){
        if(object.profile.firebaseId){
          const message = new gcm.Message({
            data: {
              notification: {
                  title: "",
                  icon: "/images/moolya_logo.png",
                  body: "Your profile on moolya has " + object.totalLikes +" Likes, "+ object.totalViews + " Views and "+  object.totalConnections +" Connections",
                  click_action: "https://qaapp.moolya.global/app/myprofile"
              }
            }
          });
          var id = [];
          id.push(object.profile.firebaseId);
          if (object.totalConnections == 0 &&  object.totalLikes ==0 && object.totalViews ==0){
            //do not send the message
          }
          else {
            sender.send(message, { registrationIds: id }, function (err, result) {
              if (err) {
                  return callback(err);
              }
              callback();
            });
          }
        }
      },
      function (err){
        if (err){
          console.log(err);
        }
      })

    }
}
const MlCronJobController = new MlCronJobControllerClass();
Object.freeze(MlCronJobController);
export default MlCronJobController;
