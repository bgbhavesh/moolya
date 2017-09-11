/**
 * Created by kanwarjeet on 9/8/17.
 */

async function findPortFolioDetails(idPortFolio, pathName) {

  //Default Values
  let portFolio = {
    profilePic: '',
    firstName: '',
    clusterName: '',
    chapterName: '',
    listView: [],
    pathName: pathName,
    aboutDiscription: '',
    management: [],
    lookingForDescription: ''

  }
  if (!idPortFolio) {
    return portFolio
  }
  let query = {
    '_id': idPortFolio
  }
  let resultParentPortFolio = await mlDBController.findOne('MlPortfolioDetails', query);

  // Store portfolio information.
  if (resultParentPortFolio) {
    portFolio.clusterName = resultParentPortFolio.clusterName
    portFolio.chapterName = resultParentPortFolio.chapterName
  } else {
    return portFolio
  }

  query = {
    'portfolioDetailsId': idPortFolio
  }



  const dynamicLinks = getDynamicLinks(idPortFolio);
  let defaultListMenu = getDefaultMenu(dynamicLinks);

  let dynamicListMenu = {
    'IDE': [
            {name: 'About', link: dynamicLinks.About},
            {name: 'Awards', 'link': dynamicLinks.Awards},
            {name: 'Looking For', link: dynamicLinks.Looking_For},
            {name: 'Social Links', link: dynamicLinks.Social_Links},
            {name: 'Keywords', link: dynamicLinks.Keywords}
          ],
    'STU': defaultListMenu,
    'FUN': [
      {name: 'About', link: dynamicLinks.About},
      { name: 'Management', link: dynamicLinks.Management},
      {name: 'Branches', link: dynamicLinks.Branches},
      {name: 'Awards', link: dynamicLinks.Awards    },
      {name: 'Looking For', link: dynamicLinks.Looking_For},
      {name: 'Social Links', link: dynamicLinks.Social_Links},
      {name: 'Keywords', link: dynamicLinks.Keywords}
      ],

    'SPS': [
      {name: 'About', link: dynamicLinks.About},
      {name: 'Management', link: dynamicLinks.Management},
      {name: 'Branches', link: dynamicLinks.Branches},
      {name: 'Looking For', link: dynamicLinks.Looking_For},
      {name: 'Social Links', link: dynamicLinks.Social_Links}
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
      return IDE(portFolio, query)
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
function IDE(portFolio, query) {
  let resultIDEPortfolio = getResultPortFolio('MlIdeatorPortfolio', query);
  if (resultIDEPortfolio) {
    portFolio.communityType = getCommunityType(resultIDEPortfolio) // Replacing trailing 's'
    let portfolioIdeatorDetails = resultIDEPortfolio.portfolioIdeatorDetails;
    if (portfolioIdeatorDetails) {
      getProfileInfo(portFolio, portfolioIdeatorDetails)
    }
    portFolio.aboutDiscription = resultIDEPortfolio.ideatorabout ? resultIDEPortfolio.ideatorabout.description : '';
    //Get LookingFor Description
    getLookingForDescription(portFolio, resultIDEPortfolio);
    return portFolio
  }
}
// StartUp Portfolio
function STU(portFolio, query) {
  let resultStartUpPortFolio = getResultPortFolio('MlStartupPortfolio', query);
  if (resultStartUpPortFolio) {
    portFolio.communityType = getCommunityType(resultStartUpPortFolio) // Replacing trailing 's'
    if (resultStartUpPortFolio.aboutUs) {
      let aboutUs = resultStartUpPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '_________';
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.description
    }
    getManagementInfo(portFolio, resultStartUpPortFolio);
    getLookingForDescription(portFolio, resultStartUpPortFolio);
  }
  return portFolio;
}

// Funder/Investor Portfolio
function FUN(portFolio, query) {
  let resultFunderPortfolio = getResultPortFolio('MlFunderPortfolio', query);
  if (resultFunderPortfolio) {
    portFolio.communityType = getCommunityType(resultFunderPortfolio) // Replacing trailing 's'
    if (resultFunderPortfolio.funderAbout) {
      getProfileInfo(portFolio, resultFunderPortfolio.funderAbout);

    }
    portFolio.aboutDiscription = resultFunderPortfolio.successStories ? resultFunderPortfolio.successStories.description : ''
    getLookingForDescription(portFolio, resultFunderPortfolio);
  }
  return portFolio
}

// ServiceProvider Portfolio
function ServiceProviderPortFolio(portFolio, query) {
  let resultServicePortFolio = getResultPortFolio('MlServiceProviderPortfolio', query);
  if (resultServicePortFolio) {
    portFolio.communityType = getCommunityType(resultServicePortFolio)// Replacing trailing 's'

    if (resultServicePortFolio.about) {
      let aboutUs = resultServicePortFolio.about
      portFolio.firstName = aboutUs.title ? aboutUs.title : '_______'
      portFolio.profilePic = aboutUs.aboutImages ? aboutUs.aboutImages[0].fileUrl : '_______';
      portFolio.aboutDiscription = aboutUs.aboutDescription;

    }
    getLookingForDescription(portFolio, resultServicePortFolio);
  }
  return portFolio;
}

//Company PortFolio
function CMP(portFolio, query) {
  let resultCompanyPortFolio = getResultPortFolio('MlCompanyPortfolio', query);
  if (resultCompanyPortFolio) {
    portFolio.communityType = resultCompanyPortFolio.communityType;
    if (resultCompanyPortFolio.aboutUs) {
      let aboutUs = resultCompanyPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '__________'
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.companyDescription;
    }
    getManagementInfo(portFolio, resultCompanyPortFolio);
    getLookingForDescription(portFolio, resultCompanyPortFolio);
  }
  return portFolio
}

//Institution PortFolio
function INS(portFolio, query) {

  let resultINSPortFolio = getResultPortFolio('MlInstitutionPortfolio', query);
  if (resultINSPortFolio) {
    portFolio.communityType = getCommunityType(resultINSPortFolio)
    if (resultINSPortFolio.aboutUs) {
      let aboutUs = resultINSPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '____________'
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.institutionDescription;
    }

    getManagementInfo(portFolio, resultINSPortFolio);
    getLookingForDescription(portFolio, resultINSPortFolio);
  }
  return portFolio
}

function getProfileInfo(portFolio, portFolioProfileInfo) {
  portFolio.firstName = portFolioProfileInfo.firstName;
  portFolio.lastName = portFolioProfileInfo.lastName;
  portFolio.profilePic = portFolioProfileInfo.profilePic;
  return portFolio;
}


function getLookingForDescription(portFolio, resultPortFolioDescription) {
  portFolio.lookingForDescription = resultPortFolioDescription.lookingFor ? resultPortFolioDescription.lookingFor[0].lookingDescription : '';
  return portFolio
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
  return communityType.replace(/s$/, '');  // Replacing trailing 's'
}


async function getResultPortFolio(collectionName, query) {
  return await mlDBController.findOne(collectionName, query);
}

function getDefaultMenu(dynamicLinks) {
  let defaultListView =
    [
      {name: 'About', link: dynamicLinks.About,},
      {name: 'Management', link: dynamicLinks.Management},
      {name: 'Branches', link: dynamicLinks.Branches},
      {name: 'Looking For', link: dynamicLinks.Looking_For},
      {name: 'Social Links', link: dynamicLinks.Social_Links},
      {name: 'Keywords', link: dynamicLinks.Keywords}
    ];
  return defaultListView
}


function getDynamicLinks(idPortFolio) {
  const dynamicLinks = {
    'About': '/about?id=' + idPortFolio + '',
    'Awards': '/awards?id=' + idPortFolio + '',
    'Looking_For': '/looking_for?id=' + idPortFolio + '',
    'Social_Links': '/social_links?id=' + idPortFolio + '',
    'Keywords': '' +
    '/keywords?id=' + idPortFolio + '',
    'Branches': '/branches?id=' + idPortFolio + '',
    'Management': '/management?id=' + idPortFolio + ''

  }

  return dynamicLinks;
}

export  default  findPortFolioDetails;
