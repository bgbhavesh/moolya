const noData = 'not mentioned';


// Will insert SEO-URL in Database
const MlSiteMapInsertion = class MlSiteMapInsertion {
  static mlCreateSEOUrl(siteMapDetails, urlFormationObject) {
    const uniqueSeoName = siteMapDetails.uniqueSeoName;
    let seoUrl = `${urlFormationObject.clusterName}/${urlFormationObject.chapterName}/${urlFormationObject.subChapterName}/${urlFormationObject.communityName}/${uniqueSeoName}`;
    const siteMapUrl = Meteor.absoluteUrl() + seoUrl;
    seoUrl = `/${seoUrl}`;
    siteMapDetails.originalUrl = seoUrl;
    siteMapDetails.siteMapUrl = siteMapUrl;
    siteMapDetails.seoUrl = seoUrl;


    try {
      const siteMapExistsCount = MlSitemap.find({ seoUrl }).count();
      if (siteMapExistsCount === 0) {
        const seoUrlCount = MlSitemap.find({ originalUrl: seoUrl }).count();
        if (seoUrlCount > 0) {
          siteMapDetails.seoUrl = `${seoUrl}-${seoUrlCount}`;
          siteMapDetails.siteMapUrl = `${siteMapUrl}-${seoUrlCount}`;
          MlSiteMapInsertion.mlUpdateSiteMap(siteMapDetails);
        } else {
          MlSiteMapInsertion.mlUpdateSiteMap(siteMapDetails);
        }
      } else {
        MlSiteMapInsertion.mlUpdateSiteMap(siteMapDetails);
      }
    } catch (e) {
      console.log(`Error${e}`);
    }
  }

  static mlUpdateSiteMap(siteMapDetails) {
    MlSitemap.update(
      { portFolioId: siteMapDetails.portFolioId },
      {
        $set: siteMapDetails
      },
      { upsert: true }
    )
  }
}

export default MlSiteMapInsertion;

