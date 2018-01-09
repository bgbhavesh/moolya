import EmailTemplates from 'swig-email-templates'

class MlCronJobControllerClass {
    constructor() {

    }
    dailyReport() {
        let object = {
            curDate: new Date(),
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
                  "Pending_SC_Approval_reqInActive_SubChapters": {
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
              "$group": {
                  "_id": "$_id",
                  "clusterName": { $first: "$clusterName" },
                  "reqRegistration": { $first: "$reqRegistration" },
                  "regB4Portfolio": { $first: "$regB4Portfolio" },
                  "approved_portfolios": { $first: "$approved_portfolios" },
                  "pending_officeApproval": { $first: "$pending_officeApproval" },
                  "Pending_SC_Approval_reqInActive_SubChapters": { $first: "$Pending_SC_Approval_reqInActive_SubChapters" },
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
                  Pending_SC_Approval_reqInActive_SubChapters: 1,
                  clusterName: 1,
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
                      pending_officeApproval: 1
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

        object.data = mlDBController.aggregate('MlClusters', pipeLine);
        // console.log('get daily Report', object);
        this.generateHtmlFile(object);
        return object;
    }

    generateHtmlFile(data) {
      console.log(data)

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
      console.log(absoluteFilePath)
      var context = {
        data: data
      };
      customTemplates.render(absoluteFilePath, context, function (err, html, text, subject) {
        console.log(err, html)
        // sendEmail(emailObject)
      });
    }
}
const MlCronJobController = new MlCronJobControllerClass();
Object.freeze(MlCronJobController);
export default MlCronJobController;
