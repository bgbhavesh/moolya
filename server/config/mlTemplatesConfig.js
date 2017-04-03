/**
 * Created by mohasin.m on 02/04/17.
 */


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


    {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"PFTIDE",templateName:"Portfolio-Template-Ideator",templateDescription:"Portfolio Template for Ideator",isActive: true,createdDate: "03-04-2017"},
    {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"PFTSTU",templateName:"Portfolio-Template-Startup",templateDescription:"Portfolio Template for Startup",isActive: true,createdDate: "03-04-2017"}]

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



