
/**
 * Created by mohammed.mohasin on 04/04/17.
 */
import _ from 'lodash';
class MlTemplateAssignmentRepo{

  constructor(){
    if(! MlTemplateAssignmentRepo.instance){
       MlTemplateAssignmentRepo.instance = this;
    }
      return MlTemplateAssignmentRepo.instance;
  }

  fetchTemplateProxy(query){
    let templateAssignment= MlTemplateAssignment.findOne(query,{fields:{'assignedTemplates.$': 1}});
    template=templateAssignment&&templateAssignment.assignedTemplates?templateAssignment.assignedTemplates[0]:null;
    return template;
  }

  fetchTemplate(process,subProcess,stepCode,recordId){
    let templateuserType=null,templateidentity=null,templateclusterId=null,templatechapterId=null,templatesubChapterId=null,templatecommunityCode=null;
    let baseQuery={templateProcessName:process,templateSubProcessName:subProcess,assignedTemplates: { $elemMatch: { "stepCode":stepCode } }};
    let specificQuery=[];
    let query={};
    let template=null;
    switch(process){
      case 'Registration':
        switch(subProcess){
          case 'Registration':
            let regRec=MlRegistration.findOne(recordId)||{};

             if(regRec){
               let regInfo=regRec.registrationInfo||{};
               let {userType,identityType,clusterId,chapterId,subChapterId,registrationType}=regInfo;
               templateuserType=userType;templateidentity=identityType;templateclusterId=clusterId;
               templatechapterId=chapterId;templatesubChapterId=subChapterId;templatecommunityCode=registrationType;
               }
            break;
        }
        break;
      case 'Portfolio':
        break;
    }

    //check for specific condition for all criteria fields of templateAssignment
    if(templateuserType!==null&&templateidentity!=null&&templateclusterId!=null&&templatechapterId!=null&&templatesubChapterId!=null&&templatecommunityCode!=null){
          let val={templateuserType,templateidentity,templateclusterId,templatechapterId,templatesubChapterId,templatecommunityCode};
          query=_.extend(val,baseQuery);
          template=this.fetchTemplateProxy(query);
          if(template){return template;};
    }


    //check for all or specific condition for all criteria fields of templateAssignment
    let val={templateuserType,templateidentity,templateclusterId,templatechapterId,templatesubChapterId,templatecommunityCode};
             for (var key in val) {
                  let qu={};
                  qu[key]={$in:['all',val[key]]};
                  specificQuery.push(qu);//console.log(qu);
             }
             query=_.extend({$and:specificQuery},baseQuery);//console.log(query);
             template=this.fetchTemplateProxy(query);
             if(template){return template;};

    //check for 'all' condition on criteria fields of template assignment
      val={templateuserType:"all",templateidentity:"all",templateclusterId:"all",templatechapterId:"all",templatesubChapterId:"all",templatecommunityCode:"all"};
          query=_.extend(val,baseQuery);
          template=this.fetchTemplateProxy(query);
          if(template){return template;};

   return null;
  }
}
const mlTemplateAssignmentRepo = new MlTemplateAssignmentRepo();
Object.freeze(mlTemplateAssignmentRepo);

export default mlTemplateAssignmentRepo;

