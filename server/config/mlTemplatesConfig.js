/**
 * Created by mohasin.m on 02/04/17.
 */

let process = MlprocessTypes.findOne({processName:"Registration"})
if(!process) {
  process = {
    processName   : "Registration",
    displayName   : "Registration",
    processDesc   : "Registration Details",
    isActive      : true
  }
  MlprocessTypes.insert(process);
}
let subProces = MlSubProcess.findOne({subProcessName:"Registration"})
if(!subProces) {
  let process = MlprocessTypes.findOne({processName:"Registration"})
  let stepDetails = [{stepId: "1", stepCode: "SOFT", stepName: "Soft",isActive:true},{stepId: "2", stepCode: "HARD", stepName: "Hard",isActive:true},{stepId: "3", stepCode: "PORTFOLIO", stepName: "Portfolio",isActive:true}]
  subProces = {
    processName           : "Registration",
    procesId              : process._id,
    subProcessName        : "Registration",
    subProcessDescription : "Registration Details",
    isActive              : true,
    steps                 : stepDetails,
    createdBy             : "System",
    createdDate           : "01-02-2017"
  };
  MlSubProcess.insert(subProces);
}

let proc = MlprocessTypes.findOne({processName:"Registration"});
let subProc = MlSubProcess.findOne({processName:"Registration"});
let template = MlTemplates.findOne({processName:"Registration","subProcessName":"Registration"});

let templates = [
  {stepName:"Soft",stepCode:"SOFT",templateCode:"SRTALL",templateName:"Soft-Reg-All",templateDescription:"Soft Registration Template For All Communities",isActive: true,createdDate: "03-04-2017"},

  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTIDECMP",templateName:"Hard-Reg-Ideator-Company",templateDescription:"Hard Registration Template for Ideator Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTIDEINV",templateName:"Hard-Reg-Ideator-Individual",templateDescription:"Hard Registration Template for Ideator Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTFUNCMP",templateName:"Hard-Reg-Funder-Company",templateDescription:"Hard Registration Template for Funder Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTFUNINV",templateName:"Hard-Reg-Funder-Individual",templateDescription:"Hard Registration Template for Funder Individual",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTSPSCMP",templateName:"Hard-Reg-ServiceProvider-Company",templateDescription:"Hard Registration Template for ServiceProvider Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTSPSINV",templateName:"Hard-Reg-ServiceProvider-Individual",templateDescription:"Hard Registration Template for ServiceProvider Individual",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTCMP",templateName:"Hard-Reg-Company",templateDescription:"Hard Registration Template for Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTSTU",templateName:"Hard-Reg-Startup-Company",templateDescription:"Hard Registration Template for Startup Company",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Hard",stepCode:"HARD",templateCode:"HRTINS",templateName:"Hard-Reg-Institution",templateDescription:"Hard Registration Template for Institution",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"PFTIDEEDT",templateName:"Portfolio-Template-Ideator-Edit",templateDescription:"Portfolio Template for Ideator Edit",isActive: true,createdDate: "03-04-2017"},
  {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"PFTIDEVIW",templateName:"Portfolio-Template-Ideator-View",templateDescription:"Portfolio Template for Ideator View",isActive: true,createdDate: "03-04-2017"}]

let templateObject = {
  procesId                    : proc._id,
  subProcessId                : subProc._id,
  processName                 : "Registration",
  subProcessName              : "Registration",
  templates                   : templates,
  createdBy                   : "System",
  createdDate                 : "03-04-2017",
  isActive                    : true
}
MlTemplates.update({processName:"Registration","subProcessName":"Registration"},{$set:templateObject},{upsert:true});


let mltemplateAssignment=MlTemplateAssignment.find({"templateProcessName" : "Registration","templateSubProcessName" : "Registration"}).fetch();

if(mltemplateAssignment.length<=0){
  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "all", "templatecommunityName" : "All", "templateuserType" : "all",
    "templateidentity" : "all",
    "assignedTemplates" : [{"stepName" : "Soft", "stepCode" : "SOFT","templateName":"Soft-Reg-All","templateCode":"SRTALL"}
    ]
  });

  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "IDE", "templatecommunityName" : "Ideators", "templateuserType" : "all",
    "templateidentity" : "Company",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTIDECMP","templateName":"Hard-Reg-Ideator-Company"}
    ]
  });

  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "IDE", "templatecommunityName" : "Ideators", "templateuserType" : "all",
    "templateidentity" : "Individual",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTIDEINV","templateName":"Hard-Reg-Ideator-Individual"}
    ]
  });


  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "FUN", "templatecommunityName" : "Funders", "templateuserType" : "all",
    "templateidentity" : "Company",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTFUNCMP","templateName":"Hard-Reg-Funder-Company"}
    ]
  });



  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "FUN", "templatecommunityName" : "Funders", "templateuserType" : "all",
    "templateidentity" : "Individual",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTFUNINV","templateName":"Hard-Reg-Funder-Individual"}
    ]
  });


  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "SPS", "templatecommunityName" : "Service Providers", "templateuserType" : "all",
    "templateidentity" : "Company",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTSPSCMP","templateName":"Hard-Reg-ServiceProvider-Company"}
    ]
  });



  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "SPS", "templatecommunityName" : "Service Providers", "templateuserType" : "all",
    "templateidentity" : "Individual",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTSPSINV","templateName":"Hard-Reg-ServiceProvider-Individual"}
    ]
  });


  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "CMP", "templatecommunityName" : "Companies", "templateuserType" : "all",
    "templateidentity" : "Company",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTCMP","templateName":"Hard-Reg-Company"}
    ]
  });


  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "STU", "templatecommunityName" : "Startups", "templateuserType" : "all",
    "templateidentity" : "Company",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTSTU","templateName":"Hard-Reg-Startup-Company"}
    ]
  });

  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "INS", "templatecommunityName" : "Institutions", "templateuserType" : "all",
    "templateidentity" : "all",
    "assignedTemplates" : [{"stepName" : "Hard", "stepCode" : "HARD","templateCode":"HRTINS","templateName":"Hard-Reg-Institution"}]
  });

  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "IDE", "templatecommunityName" : "ideators", "templateuserType" : "all",
    "templateidentity" : "edit", "assignedTemplates" : [{"stepName" : "Portfolio", "stepCode" : "PORTFOLIO","templateCode":"PFTIDEEDT","templateName":"Portfolio-Template-Ideator-Edit"}]
  });

  MlTemplateAssignment.insert({"templateprocess" :proc._id,"templatesubProcess" :subProc._id,"templateProcessName" : "Registration",
    "templateSubProcessName" : "Registration", "templateclusterId" : "all", "templateclusterName" : "All", "templatechapterId" : "all", "templatechapterName" : "All",
    "templatesubChapterId" : "all", "templatesubChapterName" : "All", "templatecommunityCode" : "IDE", "templatecommunityName" : "ideators", "templateuserType" : "all",
    "templateidentity" : "view", "assignedTemplates" : [{"stepName" : "Portfolio", "stepCode" : "PORTFOLIO","templateCode":"PFTIDEVIW","templateName":"Portfolio-Template-Ideator-View"}]
  });
}




