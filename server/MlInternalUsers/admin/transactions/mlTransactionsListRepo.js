
import _ from 'lodash';

class MlTransactionsListRepo{

  constructor(){
    if(! MlTransactionsListRepo.instance){
      MlTransactionsListRepo.instance = this;
    }
      return MlTransactionsListRepo.instance;
  }

  fetchTransactions(transactionType,userId){
    let transasctions = [];
    let templateuserType=null,templateidentity=null,templateclusterId=null,templatechapterId=null,templatesubChapterId=null,templatecommunityCode=null;
    let baseQuery={templateProcessName:process,templateSubProcessName:subProcess,assignedTemplates: { $elemMatch: { "stepCode":stepCode } }};
    let specificQuery=[];
    let query={};
    let template=null;

    //find user default profile and all its associated roles
    let user = mlDBController.findOne('users', {_id: args.params.user}, context)
    let userprofile=user.profile.InternalUprofile.moolyaProfile.userProfiles
    let defaultProfile=_.filter(userprofile, [isDefault=true])
    let roles=defaultProfile.userRoles

    //for each role find get hierarchy id's that are available in hierarchy Mapping
    let hierarchyInfo = []
    roles.map(function (role, key){
      let roleHierarchy=mlDBController.find('MlHierarchyAssignments',{parentDepartment:"",parentSubDepartment:""}, context, {teamStructureAssignment: {$elemMatch: {roleId: role.roleId}}})
      hierarchyInfo.push(roleHierarchy)
    })

    //get all transactions that are available with the hierarchy levelcode and above
    let transactionsInfo = []
    hierarchyInfo.map(function (hierarchy,key) {
      let transactions = mlDBController.find('MlTransactions',{hierarchy:hierarchy._id})
      transactionsInfo.push(transactions)
    })

    switch(transactionType){
          case 'Registration':
            transasctions=_.filter(transactionsInfo, [transactionTypeName='Registration'])
          break;
          case 'Portfolio':
            transasctions=_.filter(transactionsInfo, [transactionTypeName='Portfolio'])
          break;
          case 'Office':
            transasctions=_.filter(transactionsInfo, [transactionTypeName='Office'])
          break;
          case 'Others':
          transasctions=_.filter(transactionsInfo, [transactionTypeName='Office'])
          break;
    }
   return null;
  }
}
const mlTransactionsListRepo = new MlTransactionsListRepo();
Object.freeze(mlTransactionsListRepo);
export default mlTransactionsListRepo;

