/**
 * Created by vishwadeep on 8/8/17.
 */
import _ from 'lodash'
import MlAdminUserContext from '../../../../../server/mlAuthorization/mlAdminUserContext'

class MlNonMoolyaAccess {
  constructor() {
  }

  getExternalUserCanSearch(context) {
    var curUserProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if (!curUserProfile.isMoolya) {
      var matchSubChapter = []
      if (curUserProfile.defaultSubChapters.indexOf("all") < 0) {
        let subChapterId = curUserProfile.defaultSubChapters ? curUserProfile.defaultSubChapters[0] : ''
        let subChapterDetails = mlDBController.findOne('MlSubChapters', {
          _id: subChapterId,
          isDefaultSubChapter: false
        }, context)
        if (subChapterDetails && subChapterDetails.internalSubChapterAccess) {
          matchSubChapter = subChapterDetails.associatedSubChapters ? subChapterDetails.associatedSubChapters : []
          let canSearch = subChapterDetails.internalSubChapterAccess.externalUser ? subChapterDetails.internalSubChapterAccess.externalUser.canSearch : false
          if (canSearch)
            matchSubChapter = _.concat(curUserProfile.defaultSubChapters, matchSubChapter)
        }
      }
      return matchSubChapter
    } else
      return true
  }
}

const mlNonMoolyaAccess = new MlNonMoolyaAccess();
Object.freeze(mlNonMoolyaAccess);
export default mlNonMoolyaAccess;
