
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
                "$size":{
                  "$filter": {
                    "input": "$registration",
                    "as": "reg",
                    "cond": { "$eq": ["$$reg.status", "REG_KYC_U_KOFF"] }
                  }
                }
              }
            }
          },
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
                "$size":{
                  "$filter": {
                    "input": "$officeTrans",
                    "as": "office",
                    "cond": { "$in": ["$$office.status", ["Pending", "Payment Generated"]] }
                  }
                }
              }
            }
          },
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
                "$size":{
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
            "$addFields": {
              "active_Chapters.regValues": "$reqRegistration"
            }
          },
      //     {
      //       "$addFields": {
      //         "active_Chapters.reg_Values": {
      //           "$filter": {
      //             "input": "$active_Chapters",
      //             "as": "req_C",
      //             "cond": {
      //               "$filter": {
      //                 "input": "$$req_C.regValues",
      //                 "as": "req_R",
      //                 "cond": { "$cmp": ["$$req_R.registrationInfo.chapterId", "ss"] }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     },
          {
            "$project": {
              reqRegistration: 1,  
              regB4Portfolio:1,
              approved_portfolios:1,
              pending_officeApproval:1,  
              Pending_SC_Approval_reqInActive_SubChapters:1,
              clusterName: 1,
              active_Chapters: 1,
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
              },
            }
          }
        ]
          object.data = mlDBController.aggregate('MlClusters', pipeLine); 
        console.log('get daily Report', object);
        return object;
    }
}
const MlCronJobController = new MlCronJobControllerClass();
Object.freeze(MlCronJobController);
export default MlCronJobController;