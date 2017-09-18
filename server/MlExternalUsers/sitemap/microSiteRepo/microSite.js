/**
 * Created by kanwarjeet on 9/8/17.
 */
import _ from 'lodash'
async function findPortFolioDetails(pathName, fullUrl, originalUrl) {

  //Default Values
  const existsSeoName = MlSitemap.findOne({seoUrl: originalUrl});
  if (!existsSeoName) {
    return 'Next';
  }
  let idPortFolio = existsSeoName.portFolioId;
  let userID  = existsSeoName.userId;
  let portFolio = {
    profilePic: '',
    firstName:'',
    lastName:'',
    displayName: '',
    clusterName: '',
    chapterName: '',
    listView: [],
    communityType: '',
    pathName: pathName,
    aboutDiscription: '',
    management: [],
    lookingForDescription: '',
    privateFields: {},
    currentUrl: fullUrl,
    twitterHandle: '@kanwar00733'

  }

  let userObject  = await mlDBController.findOne('users', {'_id': userID});
  let displayName = userObject.profile.displayName;
  portFolio.displayName = displayName
  if (!idPortFolio) {
    return portFolio
  }
  let query = {
    '_id': idPortFolio
  }
  let resultParentPortFolio = await mlDBController.findOne('MlPortfolioDetails', query);
  if (resultParentPortFolio) {
    portFolio.clusterName = resultParentPortFolio.clusterName
    portFolio.chapterName = resultParentPortFolio.chapterName
  } else {
    return 'Redirect_to_login';
  }

  let privateFieldsObjects = resultParentPortFolio.privateFields;
  let privateFields = {}
  _.forEach(privateFieldsObjects, function (value) {
    privateFields[value.keyName] = true
  });
  portFolio.privateFields = privateFields
  // Store portfolio information.

  query = {
    'portfolioDetailsId': idPortFolio
  }
  let dynamicLinksClasses = getDynamicLinksClasses()
  let defaultListMenu = getDefaultMenu(dynamicLinksClasses);
  let dynamicListMenu = {
    'IDE': [
      {name: 'About', className: dynamicLinksClasses.About},
      {name: 'Awards', className: dynamicLinksClasses.Awards},
      {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
      {name: 'Social Links', className: dynamicLinksClasses.Social_Links},
      {name: 'Keywords', className: dynamicLinksClasses.Keywords}
    ],
    'STU': defaultListMenu,
    'FUN': [
      {name: 'About', className: dynamicLinksClasses.About},
      {name: 'Management', className: dynamicLinksClasses.Management},
      {name: 'Branches', className: dynamicLinksClasses.Branches},
      {name: 'Awards', className: dynamicLinksClasses.Awards},
      {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
      {name: 'Social Links', className: dynamicLinksClasses.Social_Links},
      {name: 'Keywords', className: dynamicLinksClasses.Keywords}
    ],

    'SPS': [
      {name: 'About', className: dynamicLinksClasses.About},
      {name: 'Management', className: dynamicLinksClasses.Management},
      {name: 'Branches', className: dynamicLinksClasses.Branches},
      {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
      {name: 'Social Links', className: dynamicLinksClasses.Social_Links}
    ],
    'CMP': defaultListMenu,
    'INS': defaultListMenu
  }
  let communityCode = ''
  if (resultParentPortFolio) {
    communityCode = resultParentPortFolio.communityCode;
    if (communityCode)
      portFolio.listView = dynamicListMenu[communityCode]
  }


  switch (communityCode) {
    case 'IDE': {

      return IDE(portFolio, query);
    }
      break;

    case "STU": {
      return STU(portFolio, query)
    }
      break;
    case "FUN": {
      return FUN(portFolio, query)
    }
      break;
    case "SPS": {

      return ServiceProviderPortFolio(portFolio, query)
    }
      break;
    case "CMP": {
      return CMP(portFolio, query)
    }
      break;
    case "INS": {
      return INS(portFolio, query)
    }
      break;
    default:
      return portFolio
  }
}

// Ideator Portfolio
async function IDE(portFolio, query) {
  let resultIDEPortfolio = await getResultPortFolio('MlIdeatorPortfolio', query);
  if (resultIDEPortfolio) {
    portFolio.communityType = getCommunityType(resultIDEPortfolio) // Replacing trailing 's'
    let portfolioIdeatorDetails = resultIDEPortfolio.portfolioIdeatorDetails;
    if (portfolioIdeatorDetails) {
      getProfileInfo(portFolio, portfolioIdeatorDetails)
    }
    portFolio.aboutDiscription = resultIDEPortfolio.ideatorabout ? resultIDEPortfolio.ideatorabout.description : '';
    //Get LookingFor Description
    portFolio.lookingForDescription = resultIDEPortfolio.lookingFor ? resultIDEPortfolio.lookingFor.lookingForDescription : '';

    appendKeywords(portFolio);
    return portFolio
  }
}
// StartUp Portfolio
async function STU(portFolio, query) {
  let resultStartUpPortFolio = await getResultPortFolio('MlStartupPortfolio', query);
  if (resultStartUpPortFolio) {
    portFolio.communityType = getCommunityType(resultStartUpPortFolio) // Replacing trailing 's'
    if (resultStartUpPortFolio.aboutUs) {
      let aboutUs = resultStartUpPortFolio.aboutUs
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.startupDescription
    }
    getManagementInfo(portFolio, resultStartUpPortFolio);
    getLookingForDescription(portFolio, resultStartUpPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio;
}

// Funder/Investor Portfolio
async function FUN(portFolio, query) {
  let resultFunderPortfolio = await getResultPortFolio('MlFunderPortfolio', query);
  if (resultFunderPortfolio) {
    portFolio.communityType = getCommunityType(resultFunderPortfolio) // Replacing trailing 's'
    if (resultFunderPortfolio.funderAbout) {
      getProfileInfo(portFolio, resultFunderPortfolio.funderAbout);

    }
    if (resultFunderPortfolio.successStories)
      portFolio.aboutDiscription = resultFunderPortfolio.successStories.description ? resultFunderPortfolio.successStories.description : ''
    getManagementInfo(portFolio, resultFunderPortfolio);
    getLookingForDescription(portFolio, resultFunderPortfolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

// ServiceProvider Portfolio
async function ServiceProviderPortFolio(portFolio, query) {
  let resultServicePortFolio = await getResultPortFolio('MlServiceProviderPortfolio', query);
  if (resultServicePortFolio) {
    portFolio.communityType = getCommunityType(resultServicePortFolio)// Replacing trailing 's'

    if (resultServicePortFolio.about) {
      let aboutUs = resultServicePortFolio.about
      portFolio.profilePic = aboutUs.aboutImages ? aboutUs.aboutImages[0].fileUrl : '';
      portFolio.aboutDiscription = aboutUs.aboutDescription;

    }
    getManagementInfo(portFolio, resultServicePortFolio);
    getLookingForDescription(portFolio, resultServicePortFolio);
    appendKeywords(portFolio);
  }
  return portFolio;
}

//Company PortFolio
async function CMP(portFolio, query) {
  let resultCompanyPortFolio = await getResultPortFolio('MlCompanyPortfolio', query);
  if (resultCompanyPortFolio) {
    portFolio.communityType = 'a Company';
    if (resultCompanyPortFolio.aboutUs) {
      let aboutUs = resultCompanyPortFolio.aboutUs
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.companyDescription;
    }
    getManagementInfo(portFolio, resultCompanyPortFolio);
    getLookingForDescription(portFolio, resultCompanyPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

//Institution PortFolio
async function INS(portFolio, query) {

  let resultINSPortFolio = await getResultPortFolio('MlInstitutionPortfolio', query);
  if (resultINSPortFolio) {
    portFolio.communityType = getCommunityType(resultINSPortFolio)
    if (resultINSPortFolio.aboutUs) {
      let aboutUs = resultINSPortFolio.aboutUs
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.institutionDescription;
    }

    getManagementInfo(portFolio, resultINSPortFolio);
    getLookingForDescription(portFolio, resultINSPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

function getProfileInfo(portFolio, portFolioProfileInfo) {
  portFolio.profilePic = portFolioProfileInfo.profilePic;
  return portFolio;
}


function getLookingForDescription(portFolio, resultPortFolioDescription) {
  try {

    if (resultPortFolioDescription.lookingFor) {
      portFolio.lookingForDescription = resultPortFolioDescription.lookingFor[0].lookingDescription ? resultPortFolioDescription.lookingFor[0].lookingDescription : '';

    }

  } catch (e) {

  }

}

function getManagementInfo(portFolio, managementInfo) {
  let managementPortFolio = []
  let managementInstitution = managementInfo.management;
  if (managementInstitution) {
    managementInstitution.forEach(function (management) {
      managementPortFolio.push({
        logo: management.logo ? management.logo.fileUrl : '',
        firstName: management.firstName,
        lastName: management.lastName,
        designation: management.designation
      })
    })

  }
  portFolio.management = managementPortFolio
  return portFolio;
}

function getCommunityType(resultPortfolio) {
  let communityType = resultPortfolio.communityType;
  communityType = communityType.replace(/s$/, ''); // Replacing trailing 's'
  if (checkVowel(communityType.charAt(0))) {
    communityType = 'an ' + communityType;
  } else {
    communityType = 'a ' + communityType;
  }
  return communityType
}

function checkVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}
async function getResultPortFolio(collectionName, query) {
  let result = await
    mlDBController.findOne(collectionName, query);
  return result
}

function getDefaultMenu(dynamicLinksClasses) {
  let defaultListView =
    [
      {name: 'About', className: dynamicLinksClasses.About},
      {name: 'Management', className: dynamicLinksClasses.Management},
      {name: 'Branches', className: dynamicLinksClasses.Branches},
      {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
      {name: 'Social Links', className: dynamicLinksClasses.Social_Links},
      {name: 'Keywords', className: dynamicLinksClasses.Keywords}
    ];
  return defaultListView
}


function getDynamicLinksClasses() {
  let dynamicLinksClasses = {
    'About': 'pageAboutDiscription',
    'Awards': 'pageAwards',
    'Looking_For': 'pageLookingFor',
    'Social_Links': 'pageSocialLinks',
    'Keywords': 'pageKeywords',
    'Branches': 'pageBranches',
    'Management': 'pageManagement'

  }

  return dynamicLinksClasses;
}


function appendKeywords(portFolio) {

  let keywords = portFolio.firstName + ', ' + portFolio.lastName + ',' + portFolio.chapterName + ', ' + portFolio.clusterName + ', ' + portFolio.communityType;
  if (portFolio.chapterName.trim() != '')
    keywords = keywords + ', ' + portFolio.firstName + " " + portFolio.lastName + " " + portFolio.chapterName;
  if (portFolio.clusterName.trim() != '')
    keywords = keywords + ', ' + portFolio.firstName + " " + portFolio.lastName + " " + portFolio.clusterName;
  if (portFolio.communityType.trim() != '')
    keywords = keywords + ', ' + portFolio.firstName + " " + portFolio.lastName + " " + portFolio.communityType;
  portFolio.keywords = keywords;
  return portFolio
}
export  default  findPortFolioDetails;
