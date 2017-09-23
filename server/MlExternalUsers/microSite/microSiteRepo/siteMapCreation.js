/**
 * Created by kanwarjeet on 9/22/17.
 */

import _ from 'lodash'
async function getSiteMapUrls() {


  let urls = [];
  const siteMapUrls = MlSitemap.find({},{sort:{"$natural": 1}}).fetch();
  _.forEach(siteMapUrls, (sMapUrl) => {
    urls.push({
      url: sMapUrl.seoUrl,
      changefreq: sMapUrl.changeFreq,
      priority: sMapUrl.priority,
      lastmod: '2005-01-01'
    })
  })
  return urls
}
export  default  getSiteMapUrls;
