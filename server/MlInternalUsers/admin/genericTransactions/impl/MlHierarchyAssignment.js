
/**
 * Created by muralidhar on 23/05/17.
 */
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

class MlHierarchyAssignment{

  findHierarchy(clusterId,departmentId,subDepartmentId,roleId){
    let roleDetails = mlDBController.findOne('MlRoles', {_id:roleId})
    let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
      parentDepartment: departmentId,
      parentSubDepartment: subDepartmentId,
      clusterId:roleDetails.isSystemDefined?"All":clusterId
    }, context, {teamStructureAssignment: {$elemMatch: {roleId: roleId}}})
    return hierarchy;
  }

  canSelfAssignTransaction(transactionId,collection,userId) {

    var isValidAssignment = false;
    let transaction = mlDBController.findOne(collection, {transactionId: transactionId});
    let userProfile=new MlAdminUserContext().userProfileDetails(userId)||{};
    let hirarichyLevel=userProfile.hierarchyLevel;
    let clusterId = userProfile && userProfile.defaultProfileHierarchyRefId?userProfile.defaultProfileHierarchyRefId:'';
    console.log(userProfile);
    if(this.validateProfileAccess(userProfile)){
      return true;
    } else if(clusterId!=''){
      //check valid oprational area
      if(transaction.registrationInfo.clusterId == clusterId){
        isValidAssignment = true;
        this.processAssignmentTransactions(transaction,userId);
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

  validateProfileAccess(userProfile){
    let hierarchyLevel = userProfile.hierarchyLevel
    let roleName = userProfile.roleName;
    if((hierarchyLevel==4 && roleName=="platformadmin") || (hierarchyLevel==3 && roleName=="clusteradmin")||(hierarchyLevel==2 && roleName=="chapteradmin")||(hierarchyLevel==1 && roleName=="subchapteradmin")||(hierarchyLevel==0 && roleName=="communityadmin")){
      return true;
    }else{
      return false;
    }
  }


  canSelfAssignTransactionAssignedTransaction(transactionId,collection,userId,assignedUserId) {
    return this.assignTransaction(transactionId, collection, userId, assignedUserId)
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
    if(userRole.roleName ==  "platformadmin" || userRole.roleName == "clusteradmin"){
      return true;
    }
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

