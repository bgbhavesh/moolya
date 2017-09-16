var noData = "not mentioned";


// Will insert SEO-URL in Database
const MlSiteMapInsertion = class MlSiteMapInsertion {


  static  mlCreateSEOUrl(portfolio_user_id, urlFormationObject, uniqueSeoName) {
    let seoUrl = '/' + urlFormationObject.clusterName + '/' + urlFormationObject.chapterName + '/' + urlFormationObject.subChapterName + '/' + urlFormationObject.communityName + '/' + uniqueSeoName;
    let updateSiteMapObject = {
      userId: portfolio_user_id.userId,
      seoUrl: seoUrl,
      uniqueSeoId: 1,
      priority: 1,
      createdBy: ''
    }
    try {
      let existsSeoName = MlSitemap.findOne({seoUrl: seoUrl});

      if (existsSeoName) {
        let seoId = existsSeoName.uniqueSeoId + 1;
        updateSiteMapObject.uniqueSeoId = seoId;
        updateSiteMapObject.seoUrl = seoUrl +'_' +seoId;
        MlSiteMapInsertion.mlUpdateSiteMap(portfolio_user_id.portFolioId, updateSiteMapObject);
      } else {

        MlSiteMapInsertion.mlUpdateSiteMap(portfolio_user_id.portFolioId, updateSiteMapObject);

      }


    } catch (e) {
      console.log("Error" + e);
    }
  }

  static  mlUpdateSiteMap(portFolioId, updateObject) {

    MlSitemap.update(
      {portFolioId: portFolioId},
      {
        $set: updateObject
      },
      {upsert: true}
    )
  }


}

export default MlSiteMapInsertion;




