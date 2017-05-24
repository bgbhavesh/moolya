
/**
 * Created by muralidhar on 23/05/17.
 */
import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";

class MlHierarchyAssignment{

  findHierarchy(clusterId,departmentId,subDepartmentId,roleId){
    let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
      parentDepartment: departmentId,
      parentSubDepartment: subDepartmentId,
      clusterId:clusterId
    }, context, {teamStructureAssignment: {$elemMatch: {roleId: roleId}}})
    return hierarchy;
  }

  canSelfAssignTransaction(transactionId,collection,userId) { //need to pass collection
    var isValidAssignment = false;
    let userID=userId,isPlatformAdmin=false,clusterId='',chapterId=[]
    let transaction = mlDBController.findOne(collection, {transactionId: transactionId});
    //get user details iterate through profiles match with role and get clusterId
    let user = mlDBController.findOne('users', {_id: userID}, context)
    let userProfiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
    userProfiles.map(function (doc,index) {
      if(doc.isDefault) {
        let userRoles = doc && doc.userRoles ? doc.userRoles : [];
        for (let i = 0; i < userRoles.length; i++) {
          let role = userRoles[i];
          if(role.clusterId=="all"){
            isPlatformAdmin = true
          }else if(role.clusterId!="all" && role.chapterId=="all" && role.subChapterId=="all" && role.communityId=="all"){
            clusterId = userRoles[i].clusterId;
          }else if(role.clusterId!="all" && role.chapterId!="all" && role.subChapterId=="all" && role.communityId=="all"){
            chapterId.push(userRoles[i].chapterId)
          }
        }
      }
    });
    if(isPlatformAdmin){
      //platform admin cannot assign to himself
    }
    else if(clusterId!='' || chapterId.length>=1){
      //check valid oprational area
      let chId = transaction.registrationInfo.chapterId ;
      if(transaction.registrationInfo.clusterId == clusterId ){
       //need to handle chapter
        /*chapterId.map(function (chapter,key) {
          if(chId == chapter){*/
            isValidAssignment = true;
            this.processAssignmentTransactions(transaction,userID);
        /*  }
        })*/
      }
    }
    if(isValidAssignment === true && transaction.canAssign){
      //proceed with assignment
      return true;
    }else{
      //throw error message
      return false;
    }
  }

  canUnAssignTransaction(transactionId,collection,userId){
     //check his team hierarchy below
    let transaction = mlDBController.findOne(collection, {transactionId: transactionId});
    this.processAssignmentTransactions(transaction,userId);
    if(transaction.canUnAssign){
      //proceed with assignment
      return true;
    }else{
      //throw error message
      return false;
    }
  }

  assignTransaction(transactionId,collection,userId,assignedUserId){

    let userRole = this.getUserRoles(userId);
    let assignedRole = this.getUserRoles(assignedUserId);
    let userhierarchy = this.findHierarchy(userRole.clusterId,userRole.departmentId,userRole.subDepartmentId,userRole.roleId);
    let assignedRolehierarchy = this.findHierarchy(assignedRole.clusterId,assignedRole.departmentId,assignedRole.subDepartmentId,assignedRole.roleId);
    if(userhierarchy._id == assignedRolehierarchy._id){
      let decision = this.hierarchyDecision(userhierarchy,userRole.roleId,assignedRole.roleId);
      return decision;
    }else{
      return false;
    }
  }

  getUserRoles(userId){
    let role = null
    let user = mlDBController.findOne('users', {_id: userId}, context)
    let userProfiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
    userProfiles.map(function (doc,index) {
      if(doc.isDefault) {
        let userRoles = doc && doc.userRoles ? doc.userRoles : [];
        role = userRoles[0];
      }
    });
    return role;
  }

  hierarchyDecision(hierarchy,userRole,assignedRole){

    let userRoleMapping = null;
    let assignedRoleMapping = null;
    let teamStructureAssignment = hierarchy.teamStructureAssignment;
    teamStructureAssignment.map(function (role, key){
      if(role.roleId==userRole){
        userRoleMapping = role;
        if (role.assignedLevel=='cluster' && role.reportingRole=='') {
          return true;
        }
      }else if(role.roleId == assignedRole){
        assignedRoleMapping = role;
      }
    })

    if(userRoleMapping.reportingRole == assignedRoleMapping.roleId){
        return false;
    }

    if(assignedRoleMapping.reportingRole == userRoleMapping.roleId){
        return true;
    }
    let tempReportingRole = assignedRoleMapping.reportingRole;
    teamStructureAssignment.map(function (role, key){
      if(tempReportingRole==role.roleId){
        if(role.roleId==userRoleMapping.roleId){
          return true;
        }
        tempReportingRole = role.reportingRole
      }
    })
    return false;

  }

  processAssignmentTransactions(transaction,userId) {

      if(transaction.allocation){
        transaction.canAssign = false;
        //check if it is already assigned to this user and above in hierarchy
        let allocation = transaction.allocation
        if(allocation.assigneeId==userId){
          transaction.canUnAssign = true;
        }
      }else{
        transaction.canAssign = true;
        transaction.canUnAssign = false;
      }

    return transaction;
  }

}

const mlHierarchyAssignment = new MlHierarchyAssignment();
Object.freeze(mlHierarchyAssignment);

export default mlHierarchyAssignment;

