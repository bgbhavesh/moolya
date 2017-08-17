/**
 * Created by vishwadeep on 8/8/17.
 */
import _ from 'lodash'
import MlAdminUserContext from '../../../../../server/mlAuthorization/mlAdminUserContext'
import MlUserContext from '../../../../MlExternalUsers/mlUserContext'
class MlNonMoolyaAccess {
  constructor() {
  }

  getExternalUserCanSearch(context) {
    var curUserProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if (!curUserProfile.isMoolya) {
      var matchSubChapter = []
      var matchChapter = []
      if (curUserProfile.defaultSubChapters.indexOf("all") < 0) {
        let subChapterId = curUserProfile.defaultSubChapters ? curUserProfile.defaultSubChapters[0] : ''
        let subChapterDetails = mlDBController.findOne('MlSubChapters', {
          _id: subChapterId,
          isDefaultSubChapter: false
        }, context)
        if (subChapterDetails && subChapterDetails.internalSubChapterAccess && subChapterDetails.internalSubChapterAccess.externalUser && subChapterDetails.internalSubChapterAccess.externalUser.canSearch) {
          matchSubChapter = subChapterDetails.associatedSubChapters ? subChapterDetails.associatedSubChapters : []
          matchSubChapter = _.concat(curUserProfile.defaultSubChapters, matchSubChapter)
          matchChapter = this.attachAssociatedChaptersContext(curUserProfile.defaultChapters, matchSubChapter)
        } else {
          matchSubChapter = _.concat(curUserProfile.defaultSubChapters)
          matchChapter = _.concat(curUserProfile.defaultChapters)
        }
      }
      var matchObj= {chapters:matchChapter,subChapters:matchSubChapter}
      return matchObj
    } else
      return true
  }

  /**
   * checking the condition for the external user only
   * */
  //todo:// type merge in one function
  /*****************merge the two ['registration && portfolio'] with registation **************************/
  canExternalUserView(payload, context) {
    var success = true
    var userType = mlDBController.findOne('users', {_id: context.userId}) || {}
    if (userType && userType.profile && !userType.profile.isInternaluser) {
      var curUserProfile = new MlUserContext().userProfileDetails(context.userId);
      let accessPortfolio = mlDBController.findOne('MlPortfolioDetails', {_id: payload}) || {}
      if (accessPortfolio && (accessPortfolio.subChapterId == curUserProfile.subChapterId)) {
        success = true
      } else {
        let subChapter = mlDBController.findOne('MlSubChapters', {
          _id: curUserProfile.subChapterId,
          isDefaultSubChapter: false
        }, context)
        if (subChapter && subChapter.internalSubChapterAccess && subChapter.internalSubChapterAccess.externalUser && subChapter.internalSubChapterAccess.externalUser.canView)
          success = true
        else
          success = false
      }
    }
    return success
  }

  // canExternalUserViewReg(payload, context) {
  //   var success = true
  //   var userType = mlDBController.findOne('users', {_id: context.userId}) || {}
  //   if (userType && userType.profile && userType.profile.isInternaluser && !userType.profile.isMoolya) {
  //     var curUserProfile = new MlAdminUserContext().userProfileDetails(context.userId);
  //     let accessType = mlDBController.findOne('MlRegistration', {_id: payload}) || {}
  //     let subChapterId = curUserProfile && curUserProfile.defaultSubChapters && curUserProfile.defaultSubChapters.length > 0 ? curUserProfile.defaultSubChapters[0] : ''
  //     if (accessType && accessType.registrationInfo && (accessType.registrationInfo.subChapterId == subChapterId)) {
  //       success = true
  //     } else {
  //       let subChapter = mlDBController.findOne('MlSubChapters', {
  //         _id: subChapterId,
  //         isDefaultSubChapter: false
  //       }, context)
  //       if (subChapter && subChapter.internalSubChapterAccess && subChapter.internalSubChapterAccess.externalUser && subChapter.internalSubChapterAccess.externalUser.canView)
  //         success = true
  //       else
  //         success = false
  //     }
  //   }
  //   return success
  // }

  /*****************merge the two ['registration && portfolio'] with portfolio **************************/

  attachAssociatedSubChaptersContext(defaultSubChapters) {
    var subChapters = mlDBController.find('MlSubChapters', {_id: {$in: defaultSubChapters}}).fetch()
    var associatedSubChaptersAry = _.map(subChapters, 'associatedSubChapters')
    defaultSubChapters = _.concat(defaultSubChapters, associatedSubChaptersAry[0])
    return defaultSubChapters
  }

  attachAssociatedChaptersContext(defaultChapters, defaultSubChapters) {
    var subChapters = mlDBController.find('MlSubChapters', {_id: {$in: defaultSubChapters}}).fetch()
    var associatedChaptersAry = _.map(subChapters, 'chapterId')
    defaultChapters = _.concat(defaultChapters, associatedChaptersAry)
    defaultChapters = _.uniq(defaultChapters)
    return defaultChapters
  }
}

const mlNonMoolyaAccess = new MlNonMoolyaAccess();
Object.freeze(mlNonMoolyaAccess);
export default mlNonMoolyaAccess;
