/**
 * Created by kanwarjeet on 9/8/17.
 */

async function findPortFolioDetails(idPortFolio,pathName) {
  let portFolio = {
    profilePic: '',
    firstName: '',
    clusterName: '',
    chapterName: '',
    listView: [],
    pathName:pathName,
    aboutDiscription:'',
    management: [],
    lookingForDescription:''

  }
  if(!idPortFolio){
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

  let dynamicLinks = {
    'About': '/about?id=' + idPortFolio + '',
    'Awards': '/awards?id=' + idPortFolio + '',
    'Looking_For': '/looking_for?id=' + idPortFolio + '',
    'Social_Links': '/social_links?id=' + idPortFolio + '',
    'Keywords': '' +
    '/keywords?id=' + idPortFolio + '',
    'Branches': '/branches?id=' + idPortFolio + '',
    'Management': '/management?id=' + idPortFolio + ''

  }

  let defaultListView = [{name: 'About', link: dynamicLinks.About,}, {name: 'Management', link: dynamicLinks.Management}, {name: 'Branches', link: dynamicLinks.Branches}, {name: 'Looking For', link: dynamicLinks.Looking_For}, {name: 'Social Links', link: dynamicLinks.Social_Links}, {name: 'Keywords', link: dynamicLinks.Keywords}];
  let dynamicListMenu = {
    'IDE': [{'name': 'About', 'link': dynamicLinks.About}, {name: 'Awards', link: dynamicLinks.Awards}, {name: 'Looking For', link: dynamicLinks.Looking_For  }, {name: 'Social Links', link: dynamicLinks.Social_Links}, {name: 'Keywords', link: dynamicLinks.Keywords}],
    'STU': defaultListView,
    'FUN': [{name: 'About', link: dynamicLinks.About}, {name: 'Management', link: dynamicLinks.Management}, {name: 'Branches',      link:  dynamicLinks.Branches   }, {name: 'Awards', link: dynamicLinks.Awards}, {name: 'Looking For', link: dynamicLinks.Looking_For}, {name: 'Social Links', link: dynamicLinks.Social_Links}, {name: 'Keywords', link: dynamicLinks.Keywords}],
    'SPS': [{name: 'About', link: dynamicLinks.About}, {name: 'Management', link: dynamicLinks.Management}, {name: 'Branches', link:  dynamicLinks.Branches   }, {name: 'Looking For', link: dynamicLinks.Looking_For}, {name: 'Social Links', link: dynamicLinks.Social_Links}],
    'CMP': defaultListView,
    'INS': defaultListView
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

async function IDE(portFolio, query) {

  let resultIdeatorPortfolio = await mlDBController.findOne('MlIdeatorPortfolio', query)
  if (resultIdeatorPortfolio) {
    portFolio.communityType = resultIdeatorPortfolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    let portfolioIdeatorDetails = resultIdeatorPortfolio.portfolioIdeatorDetails;
    if (portfolioIdeatorDetails) {
      profileInfo(portFolio, portfolioIdeatorDetails)
    }
    portFolio.aboutDiscription = resultIdeatorPortfolio.ideatorabout ? resultIdeatorPortfolio.ideatorabout.description : '';
    portFolio.lookingForDescription = resultIdeatorPortfolio.lookingFor ? resultIdeatorPortfolio.lookingFor.lookingForDescription :'';
    return portFolio
  }
}

async function STU(portFolio, query) {
  let resultStartUpPortFolio = await mlDBController.findOne('MlStartupPortfolio', query)
  if (resultStartUpPortFolio) {
    portFolio.communityType = resultStartUpPortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultStartUpPortFolio.aboutUs) {
      let aboutUs = resultStartUpPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '_________';
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl:''
      portFolio.aboutDiscription = aboutUs.description
    }
    let managementPortFolio = []
    let managementStartup = resultStartUpPortFolio.management
    if(managementStartup){
      managementStartup.forEach(function (management) {
        managementPortFolio.push({
          logo:management.logo ? management.logo.fileUrl : '',
          firstName: management.firstName,
          lastName:management.lastName,
          designation:management.designation
        })
      })

    }

    portFolio.management = managementPortFolio
    portFolio.lookingForDescription = resultStartUpPortFolio.lookingFor ? resultStartUpPortFolio.lookingFor[0].lookingDescription :''
    return portFolio
  }
}


async function FUN(portFolio, query) {
  let resultFunderPortfolio = await mlDBController.findOne('MlFunderPortfolio', query)
  if (resultFunderPortfolio) {
    portFolio.communityType = resultFunderPortfolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultFunderPortfolio.funderAbout) {
      profileInfo(portFolio, resultFunderPortfolio.funderAbout);
      portFolio.aboutDiscription = resultFunderPortfolio.successStories ? resultFunderPortfolio.successStories.description : ''
    }
    return portFolio
  }
}

async function ServiceProviderPortFolio(portFolio, query) {
  let resultServicePortFolio = await mlDBController.findOne('MlServiceProviderPortfolio', query)
  if (resultServicePortFolio) {
    portFolio.communityType = resultServicePortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultServicePortFolio.about) {
      let aboutUs = resultServicePortFolio.about
      portFolio.firstName = aboutUs.title ? aboutUs.title : '_______'
      portFolio.profilePic = aboutUs.aboutImages ? aboutUs.aboutImages[0].fileUrl : '_______';
      portFolio.aboutDiscription = aboutUs.aboutDescription;
    }
    return portFolio
  }
}

async function CMP(portFolio, query) {
  let resultCompanyPortFolio = await mlDBController.findOne('MlCompanyPortfolio', query)
  if (resultCompanyPortFolio) {
    portFolio.communityType = resultCompanyPortFolio.communityType
    if (resultCompanyPortFolio.aboutUs) {
      let aboutUs = resultCompanyPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '__________'
      portFolio.profilePic = aboutUs.logo ? aboutUs.logo[0].fileUrl : ''
      portFolio.aboutDiscription = aboutUs.companyDescription;
    }

    let managementPortFolio = []
    let managementCompany = resultCompanyPortFolio.management;
    if(managementCompany){
      managementCompany.forEach(function (management) {
        managementPortFolio.push({
          logo:management.logo ? management.logo.fileUrl : '',
          firstName: management.firstName,
          lastName:management.lastName,
          designation:management.designation
        })
      })

    }
    portFolio.management = managementPortFolio
    return portFolio
  }
}


async function INS(portFolio, query) {
  let resultServicePortFolio = await mlDBController.findOne('MlInstitutionPortfolio', query)
  if (resultServicePortFolio) {
    portFolio.communityType = resultServicePortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultServicePortFolio.aboutUs) {
      let aboutUs = resultServicePortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '____________'
      portFolio.profilePic = aboutUs.logo ?aboutUs.logo[0].fileUrl:''
      portFolio.aboutDiscription = aboutUs.institutionDescription;
    }
    let managementPortFolio = []
    let managementInstitution = resultServicePortFolio.management;
    if(managementInstitution){
      managementInstitution.forEach(function (management) {
        managementPortFolio.push({
          logo:management.logo ? management.logo.fileUrl : '',
          firstName: management.firstName,
          lastName:management.lastName,
          designation:management.designation
        })
      })

    }

    portFolio.management = managementPortFolio
    portFolio.lookingForDescription = resultServicePortFolio.lookingFor ? resultServicePortFolio.lookingFor[0].lookingDescription :'';

    return portFolio
  }
}

function profileInfo(portFolio, portFolioProfileInfo) {
  portFolio.firstName = portFolioProfileInfo.firstName;
  portFolio.lastName = portFolioProfileInfo.lastName;
  portFolio.profilePic = portFolioProfileInfo.profilePic;
  return portFolio;
}

export  default  findPortFolioDetails;
