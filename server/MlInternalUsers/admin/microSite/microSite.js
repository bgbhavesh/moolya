/**
 * Created by kanwarjeet on 9/8/17.
 */

async function findPortFolioDetails(idPortFolio) {
  let query = {
    '_id': idPortFolio
  }
  let resultParentPortFolio = await mlDBController.findOne('MlPortfolioDetails', query)
  let portFolio = {}                                                      // Store portfolio information.
  if (resultParentPortFolio) {
    portFolio.clusterName = resultParentPortFolio.clusterName
    portFolio.chapterName = resultParentPortFolio.chapterName
  }

  query = {
    'portfolioDetailsId': idPortFolio
  }


  switch (resultParentPortFolio.communityCode) {
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
      console.log('coming')
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
      return {profilePic: '', firstName: '', lastName: '', communityType: '', clusterName: '', chapterName: ''}
  }
}

async function IDE(portFolio, query) {

  let resultIdeatorPortfolio = await mlDBController.findOne('MlIdeatorPortfolio', query)
  if (resultIdeatorPortfolio) {
    portFolio.communityType = resultIdeatorPortfolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultIdeatorPortfolio.portfolioIdeatorDetails) {
      profileInfo(portFolio, resultIdeatorPortfolio.portfolioIdeatorDetails)
    }
    return portFolio
  }
}

async function STU(portFolio, query) {
  let resultStartUpPortFolio = await mlDBController.findOne('MlStartupPortfolio', query)
  if (resultStartUpPortFolio) {
    portFolio.communityType = resultStartUpPortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultStartUpPortFolio.aboutUs) {
      let aboutUs = resultStartUpPortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '--------'
      portFolio.profilePic = aboutUs.logo[0].fileUrl;
    }
    return portFolio
  }
}


async function FUN(portFolio, query) {
  let resultFunderPortfolio = await mlDBController.findOne('MlFunderPortfolio', query)
  if (resultFunderPortfolio) {
    portFolio.communityType = resultFunderPortfolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultFunderPortfolio.funderAbout) {
      profileInfo(portFolio, resultFunderPortfolio.funderAbout)
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
      portFolio.firstName = aboutUs.title ? aboutUs.title : '--------'
      portFolio.profilePic = aboutUs.aboutImages ? aboutUs.aboutImages[0].fileUrl : '--------';
    }
    return portFolio
  }
}

async function CMP(portFolio, query) {
  let resultServicePortFolio = await mlDBController.findOne('MlCompanyPortfolio', query)
  if (resultServicePortFolio) {
    portFolio.communityType = resultServicePortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    if (resultServicePortFolio.aboutUs) {
      let aboutUs = resultServicePortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '--------'
      portFolio.profilePic = aboutUs.logo[0].fileUrl;
    }
    return portFolio
  }
}


async function INS(portFolio, query) {
  let resultServicePortFolio = await mlDBController.findOne('MlInstitutionPortfolio', query)
  if (resultServicePortFolio) {
    portFolio.communityType = resultServicePortFolio.communityType.replace(/s$/, ''); // Replacing trailing 's'
    console.log(resultServicePortFolio)
    if (resultServicePortFolio.aboutUs) {
      let aboutUs = resultServicePortFolio.aboutUs
      portFolio.firstName = aboutUs.title ? aboutUs.title : '____________'
      portFolio.profilePic = aboutUs.logo[0].fileUrl;
    }
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
