
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
                  "$filter": {
                    "input": "$registration",
                    "as": "reg",
                    "cond": { "$eq": ["$$reg.status", "REG_KYC_U_KOFF"] }
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
                "reqPortfolio": {
                  "$filter": {
                    "input": "$portfolio",
                    "as": "port",
                    "cond": { "$eq": ["$$port.status", "REG_PORT_KICKOFF"] }
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
                "reqOffice": {
                  "$filter": {
                    "input": "$officeTrans",
                    "as": "office",
                    "cond": { "$in": ["$$office.status", ["Pending", "Payment Generated"]] }
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
                "reqInActive_SubChapters": {
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
            },
            {
              "$project": {
                reqRegistration: 1,
                // reqPortfolio:1,
                // regB4Portfolio: 1, 
                // reqOffice:1,    
                // reqInActive_SubChapters:1,
                clusterName:1,
                approved_portfolios: { $size: "$reqPortfolio" }, 
                regB4Portfolio: { $size: "$regB4Portfolio" },  
                pending_officeApproval:{$size:"$reqOffice"}, 
                Pending_SC_Approval: { $size: "$reqInActive_SubChapters" },
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
            },
            
            // {
            //   "$lookup":
            //   {
            //     from: "mlChapters",
            //     localField: '_id',
            //     foreignField: 'clusterId',
            //     as: "chapters"
            //   }
            // },
            // {
            //   "$addFields": {
            //     "reqChapters": {
            //       "$filter": {
            //         "input": "$chapters",
            //         "as": "chapt",
            //         "cond": { "$eq": ["$$chapt.isActive", true] }
            //       }
            //     }
            //   }
            // },
        
        
        
            //     { "$unwind": { path: "$chapters", preserveNullAndEmptyArrays: false } },
            //   { $replaceRoot: { newRoot: "$registration" } },
            //   {
            //     $group:
            //     {
            //       _id: '$registrationInfo.clusterId',
            //       clusterName: {$first:'$registrationInfo.clusterName'},
            //       count:
            //       {
            //         $sum: {
            //           "$cond": [
            //             {
            //               "$and": [
            //                 { "$eq": ["$status", "REG_KYC_A_APR"] },
            //               ]
            //             }, 1, 0],
            //         }
            //       }
            //     }
            //   }
          ]
        //   object.data = mlDBController.aggregate('MlClusters', pipeLine); 
        console.log('get daily Report', object);
    }
}
const MlCronJobController = new MlCronJobControllerClass();
Object.freeze(MlCronJobController);
export default MlCronJobController;