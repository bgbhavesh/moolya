/**
 * Created by kanwarjeet on 9/8/17.
 */
import _ from 'lodash'
import MlUserContext from '../../mlUserContext';
import generateAbsolutePath from '../../../../lib/mlGenerateAbsolutePath'

async function findPortFolioDetails(pathName, fullUrl, originalUrl) {
  try { // Default Values
    const existsSeoName = MlSitemap.findOne({ seoUrl: originalUrl });
    if (!existsSeoName) {
      return 'Next';
    }
    const userID = existsSeoName.userId;

    const portFolio = {
      profilePic: '',
      firstName: '',
      lastName: '',
      displayName: '',
      clusterName: '',
      chapterName: '',
      listView: [],
      communityType: '',
      pathName,
      aboutDiscription: '',
      management: [],
      lookingForDescription: '',
      privateFields: {},
      currentUrl: fullUrl,
      twitterHandle: '@moolyaglobal',
      branches: []
    }

    const userObject = await mlDBController.findOne('users', { _id: userID });
    const displayName = userObject.profile.displayName;
    portFolio.displayName = displayName;
    if (userObject.profile) {
      portFolio.profilePic = userObject.profile.profileImage ? generateAbsolutePath(userObject.profile.profileImage) : '';
    }

    const defaultProfile = new MlUserContext().userProfileDetails(userID)
    const profileId = defaultProfile.profileId;

    if (!profileId) {
      return portFolio
    }
    const queryProfileId = {
      profileId
    }
    const resultParentPortFolio = await mlDBController.findOne('MlPortfolioDetails', queryProfileId);
    if (resultParentPortFolio) {
      portFolio.clusterName = resultParentPortFolio.clusterName;
      portFolio.chapterName = resultParentPortFolio.chapterName;
      portFolio.industryName = await getIndustryName(resultParentPortFolio.industryId);
      portFolio.identityType = resultParentPortFolio.identityType ? resultParentPortFolio.identityType : '';
    } else {
      return 'Next';
    }

    // Finding fields private to User.
    const privateFields = getPrivateFields(resultParentPortFolio.privateFields);
    portFolio.privateFields = privateFields
    // Store portfolio information.

    const query = {
      portfolioDetailsId: resultParentPortFolio._id
    }
    const dynamicLinksClasses = getDynamicLinksClasses();
    const dynamicListMenu = {
      IDE: getIDEMenu(dynamicLinksClasses),
      STU: getSTUMenu(dynamicLinksClasses),
      FUN: getFUNMenu(dynamicLinksClasses),
      SPS: getSPSMenu(dynamicLinksClasses),
      CMP: getCMPMenu(dynamicLinksClasses),
      INS: getINSMenu(dynamicLinksClasses)
    }
    let communityCode = '';
    if (resultParentPortFolio) {
      communityCode = resultParentPortFolio.communityCode;
      if (communityCode) {
        portFolio.listView = dynamicListMenu[communityCode]
      }
    }


    switch (communityCode) {
      case 'IDE': {
        return IDE(portFolio, query);
      }
        break;

      case 'STU': {
        return STU(portFolio, query)
      }
        break;
      case 'FUN': {
        return FUN(portFolio, query)
      }
        break;
      case 'SPS': {
        return ServiceProviderPortFolio(portFolio, query)
      }
        break;
      case 'CMP': {
        return CMP(portFolio, query)
      }
        break;
      case 'INS': {
        return INS(portFolio, query)
      }
        break;
      default:
        return portFolio
    }
  } catch (e) {
    console.log('Error MicroSite', e);
  }
}

// Ideator Portfolio
async function IDE(portFolio, query) {
  const resultIDEPortfolio = await getPortFolio('MlIdeatorPortfolio', query);
  if (resultIDEPortfolio) {
    portFolio.communityType = getCommunityType(resultIDEPortfolio) // Replacing trailing 's'
    portFolio.communityTypes = resultIDEPortfolio.communityType;
    const resultIdea = await mlDBController.findOne('MlIdeas', { userId: resultIDEPortfolio.userId });
    if (resultIdea) {
      portFolio.aboutDiscription = resultIdea.ideaDescription ? resultIdea.ideaDescription : '';
      portFolio.aboutDiscriptionPrivate = (resultIdea.isIdeaTitlePrivate || resultIdea.isIdeaPrivate);
    }


    // Get LookingFor Description

    if (resultIDEPortfolio.lookingFor) {
      portFolio.lookingForDescription = resultIDEPortfolio.lookingFor[0].lookingDescription ? resultIDEPortfolio.lookingFor[0].lookingDescription : resultIDEPortfolio.lookingFor[0].lookingForName;
      portFolio.lookingForDescriptionPrivate = resultIDEPortfolio.lookingFor[0].makePrivate;
    }
    portFolio.problemStatement = '';
    portFolio.solutionStatement = '';
    portFolio.IPandTM = '';

    if (resultIDEPortfolio.problemSolution) {
      portFolio.problemStatement = resultIDEPortfolio.problemSolution.problemStatement ? resultIDEPortfolio.problemSolution.problemStatement : ''
      portFolio.solutionStatement = resultIDEPortfolio.problemSolution.solutionStatement ? resultIDEPortfolio.problemSolution.solutionStatement : ''
      portFolio.isProblemPrivate = resultIDEPortfolio.problemSolution.isProblemPrivate ? resultIDEPortfolio.problemSolution.isProblemPrivate : '';
    }
    if (resultIDEPortfolio.intellectualPlanning) {
      portFolio.IPandTM = resultIDEPortfolio.intellectualPlanning.IPdescription ? resultIDEPortfolio.intellectualPlanning.IPdescription : ''
      portFolio.isIntellectualPrivate = resultIDEPortfolio.intellectualPlanning.isIntellectualPrivate;
    }
    appendKeywords(portFolio);
    return portFolio
  }
}

// StartUp Portfolio
async function STU(portFolio, query) {
  const resultStartUpPortFolio = await getPortFolio('MlStartupPortfolio', query);
  if (resultStartUpPortFolio) {
    portFolio.communityType = getCommunityType(resultStartUpPortFolio) // Replacing trailing 's'
    portFolio.communityTypes = resultStartUpPortFolio.communityType;
    portFolio.aboutDiscription = '';
    if (resultStartUpPortFolio.aboutUs) {
      const aboutUs = resultStartUpPortFolio.aboutUs;
      portFolio.aboutDiscription = aboutUs.startupDescription ? aboutUs.startupDescription : ''
      portFolio.aboutDiscriptionPrivate = aboutUs.isDescriptionPrivate;
    }

    portFolio.servicesProducts = '';
    if (resultStartUpPortFolio.serviceProducts) {
      portFolio.servicesProducts = resultStartUpPortFolio.serviceProducts.spDescription ? resultStartUpPortFolio.serviceProducts.spDescription : '';
      portFolio.isServicesProductsDescriptionPrivate = resultStartUpPortFolio.serviceProducts.isDescriptionPrivate;
    }
    getManagementInfo(portFolio, resultStartUpPortFolio);
    getTechnologyInfo(portFolio, resultStartUpPortFolio);
    getAwardsRewards(portFolio, resultStartUpPortFolio);
    getLookingForDescription(portFolio, resultStartUpPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio;
}

// Funder/Investor Portfolio
async function FUN(portFolio, query) {
  const resultFunderPortfolio = await getPortFolio('MlFunderPortfolio', query);
  if (resultFunderPortfolio) {
    portFolio.communityType = getCommunityType(resultFunderPortfolio) // Replacing trailing 's'
    portFolio.communityTypes = resultFunderPortfolio.communityType;
    if (resultFunderPortfolio.successStories) {
      portFolio.aboutDiscription = resultFunderPortfolio.successStories.description ? resultFunderPortfolio.successStories.description : ''
      portFolio.aboutDiscriptionPrivate = resultFunderPortfolio.successStories.isDescriptionPrivate;
    }
    getTeamInfo(portFolio, resultFunderPortfolio)
    getSuccessStoriesInfo(portFolio, resultFunderPortfolio);
    getAreasOfInterest(portFolio, resultFunderPortfolio);
    getLookingForDescription(portFolio, resultFunderPortfolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

// ServiceProvider Portfolio
async function ServiceProviderPortFolio(portFolio, query) {
  const resultServicePortFolio = await getPortFolio('MlServiceProviderPortfolio', query);
  if (resultServicePortFolio) {
    portFolio.communityType = getCommunityType(resultServicePortFolio)// Replacing trailing 's'
    portFolio.communityTypes = resultServicePortFolio.communityType;

    if (resultServicePortFolio.about) {
      const aboutUs = resultServicePortFolio.about;
      portFolio.aboutDiscription = aboutUs.aboutDescription;
      portFolio.aboutDiscriptionPrivate = aboutUs.isDescriptionPrivate;

      if (portFolio.identityType === 'Company') {
        portFolio.companyName = aboutUs.aboutTitle ? aboutUs.aboutTitle : '';
      }
    }
    portFolio.servicesDescription = '';
    if (resultServicePortFolio.services) {
      portFolio.servicesDescription = resultServicePortFolio.services.servicesDescription ? resultServicePortFolio.services.servicesDescription : ''
      portFolio.isServicesPrivate = resultServicePortFolio.services.isServicesPrivate;
    }

    getAwardsRewards(portFolio, resultServicePortFolio);
    getClients(portFolio, resultServicePortFolio);
    getLookingForDescription(portFolio, resultServicePortFolio);
    appendKeywords(portFolio);
  }
  return portFolio;
}

// Company PortFolio
async function CMP(portFolio, query) {
  const resultCompanyPortFolio = await getPortFolio('MlCompanyPortfolio', query);
  if (resultCompanyPortFolio) {
    portFolio.communityType = "'a Company'";
    portFolio.communityTypes = 'Company';
    if (resultCompanyPortFolio.aboutUs) {
      const aboutUs = resultCompanyPortFolio.aboutUs
      portFolio.aboutDiscription = aboutUs.companyDescription;
      portFolio.aboutDiscriptionPrivate = aboutUs.isDescriptionPrivate;
    }
    portFolio.sectorsAndServices = '';
    portFolio.policy = '';
    if (resultCompanyPortFolio.sectorsAndServices) {
      portFolio.sectorsAndServices = resultCompanyPortFolio.sectorsAndServices.sectorsAndServicesDescription ? resultCompanyPortFolio.sectorsAndServices.sectorsAndServicesDescription : '';
      portFolio.isSectorsAndServicesPrivate = resultCompanyPortFolio.sectorsAndServices.isSectorsAndServicesPrivate;
    }
    if (resultCompanyPortFolio.policy) {
      portFolio.policy = resultCompanyPortFolio.policy.policyDescription ? resultCompanyPortFolio.policy.policyDescription : '';
      portFolio.isPolicyDescriptionPrivate = resultCompanyPortFolio.policy.isPolicyDescriptionPrivate;
    }
    getManagementInfo(portFolio, resultCompanyPortFolio);
    getAwardsRewards(portFolio, resultCompanyPortFolio);
    getResearchDev(portFolio, resultCompanyPortFolio);
    getLookingForDescription(portFolio, resultCompanyPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

// Institution PortFolio
async function INS(portFolio, query) {
  const resultINSPortFolio = await getPortFolio('MlInstitutionPortfolio', query);
  if (resultINSPortFolio) {
    portFolio.communityType = getCommunityType(resultINSPortFolio)
    portFolio.communityTypes = resultINSPortFolio.communityType;
    if (resultINSPortFolio.aboutUs) {
      const aboutUs = resultINSPortFolio.aboutUs
      portFolio.aboutDiscription = aboutUs.institutionDescription;
      portFolio.aboutDiscriptionPrivate = aboutUs.isDescriptionPrivate;
    }
    portFolio.sectorsAndServices = '';
    if (resultINSPortFolio.sectorsAndServices) {
      portFolio.sectorsAndServices = resultINSPortFolio.sectorsAndServices.sectorsAndServicesDescription ? resultINSPortFolio.sectorsAndServices.sectorsAndServicesDescription : '';
      portFolio.isSectorsAndServicesPrivate = resultINSPortFolio.sectorsAndServices.isSectorsAndServicesPrivate;
    }

    getIntrapreneurInfo(portFolio, resultINSPortFolio);
    getManagementInfo(portFolio, resultINSPortFolio);
    getAwardsRewards(portFolio, resultINSPortFolio);
    getResearchDev(portFolio, resultINSPortFolio);
    getLookingForDescription(portFolio, resultINSPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio
}


function getLookingForDescription(portFolio, resultPortFolioDescription) {
  try {
    if (resultPortFolioDescription.lookingFor) {
      portFolio.lookingForDescription = resultPortFolioDescription.lookingFor[0].lookingDescription ? resultPortFolioDescription.lookingFor[0].lookingDescription : resultPortFolioDescription.lookingFor[0].lookingForName;
      portFolio.lookingForDescriptionPrivate = resultPortFolioDescription.lookingFor[0].makePrivate;
    }
  } catch (e) {

  }
}

function getManagementInfo(portFolio, managementInfo) {
  const managementPortFolio = []
  const managementInstitution = managementInfo.management;
  if (managementInstitution) {
    managementInstitution.forEach((management) => {
      managementPortFolio.push({
        logo: management.logo ? generateAbsolutePath(management.logo.fileUrl) : '',
        name: management.firstName ? management.firstName : `${'' + ' '}${management.lastName}` ? management.lastName : '',
        designation: management.designation ? management.designation : '',
        description: management.about ? management.about : '',
        makePrivate: management.makePrivate ? management.makePrivate : false
      })
    })
  }
  portFolio.management = managementPortFolio
  return portFolio;
}

function getTechnologyInfo(portFolio, managementInfo) {
  const technologiesPortFolio = []
  const technologies = managementInfo.technologies;
  if (technologies) {
    technologies.forEach((tech) => {
      technologiesPortFolio.push({
        logo: tech.logo ? generateAbsolutePath(tech.logo.fileUrl) : '',
        name: tech.technologyName ? tech.technologyName : '',
        description: tech.technologyDescription ? tech.technologyDescription : '',
        makePrivate: tech.makePrivate ? tech.makePrivate : false
      })
    })
  }
  portFolio.technologies = technologiesPortFolio;
  return portFolio;
}

function getTeamInfo(portFolio, resultFunderPortfolio) {
  const teamPortFolio = []
  const principals = resultFunderPortfolio.principal;
  const teams = resultFunderPortfolio.team;

  if (principals) {
    principals.forEach((principal) => {
      teamPortFolio.push({
        logo: principal.logo ? generateAbsolutePath(principal.logo.fileUrl) : '',
        name: principal.firstName ? principal.firstName : `${'' + ' '}${principal.lastName}` ? principal.lastName : '',
        designation: principal.designation ? principal.designation : '',
        description: principal.aboutPrincipal ? principal.aboutPrincipal : '',
        makePrivate: principal.makePrivate ? principal.makePrivate : false
      })
    })
  }
  if (teams) {
    teams.forEach((team) => {
      teamPortFolio.push({
        logo: team.logo ? generateAbsolutePath(team.logo.fileUrl) : '',
        name: team.firstName ? team.firstName : `${'' + ' '}${team.lastName}` ? team.lastName : '',
        designation: team.designation ? team.designation : '',
        description: team.aboutTeam ? team.aboutTeam : '',
        makePrivate: team.makePrivate ? team.makePrivate : false

      })
    })
  }
  portFolio.teamManagement = teamPortFolio;
}

function getSuccessStoriesInfo(portFolio, resultPortfolio) {
  const successStoriesFolio = []
  const successStories = resultPortfolio.successStories;
  if (successStories) {
    successStories.forEach((successStory) => {
      successStoriesFolio.push({
        logo: successStory.logo ? generateAbsolutePath(successStory.logo.fileUrl) : '',
        name: successStory.storyTitle ? successStory.storyTitle : '',
        description: successStory.description ? successStory.description : '',
        makePrivate: successStory.makePrivate ? successStory.makePrivate : false
      })
    })
  }
  portFolio.successStories = successStoriesFolio;
}

function getAreasOfInterest(portFolio, resultPortfolio) {
  const areasInterestsFolio = []
  const areasInterests = resultPortfolio.areaOfInterest;
  if (areasInterests) {
    areasInterests.forEach((interest) => {
      areasInterestsFolio.push({
        logo: interest.logo ? generateAbsolutePath(interest.logo.fileUrl) : '',
        name: interest.industryTypeName ? interest.industryTypeName : '',
        makePrivate: interest.makePrivate ? interest.makePrivate : false
      })
    })
  }
  portFolio.areaOfInterest = areasInterestsFolio;
}

function getAwardsRewards(portFolio, resultPortfolio) {
  const awardsRewards = []
  const awardsRecognitions = resultPortfolio.awardsRecognition;
  if (awardsRecognitions) {
    awardsRecognitions.forEach((awards) => {
      awardsRewards.push({
        logo: awards.logo ? generateAbsolutePath(awards.logo.fileUrl) : '',
        name: awards.awardName ? awards.awardName : '',
        description: awards.awardsDescription ? awards.awardsDescription : '',
        makePrivate: awards.makePrivate ? awards.makePrivate : false
      })
    })
  }
  portFolio.awardsRecognition = awardsRewards;
}

function getResearchDev(portFolio, resultPortfolio) {
  const researchAndDevelopmentPortFolio = []
  const researchAndDevelopments = resultPortfolio.researchAndDevelopment;
  if (researchAndDevelopments) {
    researchAndDevelopments.forEach((research) => {
      researchAndDevelopmentPortFolio.push({
        logo: research.logo ? generateAbsolutePath(research.logo.fileUrl) : '',
        name: research.researchAndDevelopmentName ? research.researchAndDevelopmentName : '',
        description: research.researchAndDevelopmentDescription ? research.researchAndDevelopmentDescription : '',
        makePrivate: research.makePrivate ? research.makePrivate : false
      })
    })
  }
  portFolio.researchAndDevelopment = researchAndDevelopmentPortFolio;
}

function getIntrapreneurInfo(portFolio, resultPortfolio) {
  const intrapreneurFolio = []
  const intrapreneurs = resultPortfolio.intrapreneurRecognition;
  if (intrapreneurs) {
    intrapreneurs.forEach((intrapreneur) => {
      intrapreneurFolio.push({
        logo: intrapreneur.logo ? generateAbsolutePath(intrapreneur.logo.fileUrl) : '',
        name: intrapreneur.intrapreneurName ? intrapreneur.intrapreneurName : '',
        description: intrapreneur.intrapreneurDescription ? intrapreneur.intrapreneurDescription : '',
        makePrivate: intrapreneur.makePrivate ? intrapreneur.makePrivate : false
      })
    })
  }
  portFolio.intrapreneurRecognition = intrapreneurFolio;
}

function getClients(portFolio, resultPortfolio) {
  const clientsFolio = []
  const clients = resultPortfolio.clients;
  if (clients) {
    clients.forEach((client) => {
      clientsFolio.push({
        logo: client.logo ? generateAbsolutePath(client.logo.fileUrl) : '',
        name: client.companyName ? client.companyName : '',
        description: client.clientDescription ? client.clientDescription : '',
        makePrivate: client.makePrivate ? client.makePrivate : false
      })
    })
  }
  portFolio.clients = clientsFolio;
}

function getCommunityType(resultPortfolio) {
  let communityType = resultPortfolio.communityType;
  communityType = communityType.replace(/s$/, ''); // Replacing trailing 's'
  if (checkVowel(communityType.charAt(0))) {
    communityType = `${'an ' + "\'"}${communityType}\'`;
  } else {
    communityType = `${'a ' + "\'"}${communityType}\'`;
  }
  return communityType
}

function checkVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}

async function getPortFolio(collectionName, query) {
  const result = await
    mlDBController.findOne(collectionName, query);
  return result
}


function getSTUMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Team', className: dynamicLinksClasses.Management },
    { name: 'Technology', className: dynamicLinksClasses.Technology },
    { name: 'Services and Products', className: dynamicLinksClasses.servicesProducts },
    { name: 'Awards', className: dynamicLinksClasses.Awards },
    { name: 'Looking For', className: dynamicLinksClasses.Looking_For },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ];
}

function getCMPMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Management', className: dynamicLinksClasses.Management },
    { name: 'Awards', className: dynamicLinksClasses.Awards }, // Special Case where awards are treated as slides
    { name: 'Incubator Sectors', className: dynamicLinksClasses.Incubator_Sectors },
    { name: 'CSR', className: dynamicLinksClasses.CSR },
    { name: 'R&D', className: dynamicLinksClasses.RandD },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ];
}

function getINSMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Management', className: dynamicLinksClasses.Management },
    { name: 'Awards', className: dynamicLinksClasses.Awards },
    { name: 'Incubator Sectors', className: dynamicLinksClasses.Incubator_Sectors },
    { name: 'Intrapreneur', className: dynamicLinksClasses.Intrapreneur },
    { name: 'R&D', className: dynamicLinksClasses.RandD },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ];
}


function getSPSMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Awards and Rewards', className: dynamicLinksClasses.AwardsandRewards },
    { name: 'Clients', className: dynamicLinksClasses.Clients },
    { name: 'Services', className: dynamicLinksClasses.Services },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ];
}

function getFUNMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Team', className: dynamicLinksClasses.Team },
    { name: 'Success Stories', className: dynamicLinksClasses.Success_Stories },
    { name: 'Focus Areas', className: dynamicLinksClasses.Focus_Areas },
    { name: 'Looking For', className: dynamicLinksClasses.Looking_For },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ]
}


function getIDEMenu(dynamicLinksClasses) {
  return [
    { name: 'About', className: dynamicLinksClasses.About },
    { name: 'Problems and Solutions', className: dynamicLinksClasses.Problems_and_Solutions },
    { name: 'Looking For', className: dynamicLinksClasses.Looking_For },
    { name: 'IP and TM', className: dynamicLinksClasses.IPandTM },
    { name: 'Keywords', className: dynamicLinksClasses.Keywords }
  ]
}

function getDynamicLinksClasses() {
  const dynamicLinksClasses = {
    About: 'pageAboutDiscription',
    Awards: 'pageAwardsandRewards',
    Looking_For: 'pageLookingFor',
    Social_Links: 'pageSocialLinks',
    Keywords: 'pageKeywords',
    Branches: 'pageBranches',
    Management: 'pageManagement',
    Problems_and_Solutions: 'pageProblemsandSolutions',
    IPandTM: 'pageIPandTM',
    Focus_Areas: 'pageFocusAreas',
    Success_Stories: 'pageSuccessStories',
    Team: 'pageTeam',
    Services: 'pageServices',
    Clients: 'pageClients',
    AwardsandRewards: 'pageAwardsandRewards',
    Incubator_Sectors: 'pageIncubatorSectors',
    Intrapreneur: 'pageIntrapreneur',
    RandD: 'pageRandD',
    CSR: 'pageCSR',
    Technology: 'pageTechnology',
    servicesProducts: 'pageServicesProducts'


  }

  return dynamicLinksClasses;
}

function getPrivateFields(privateFieldsObjects) {
  const privateFields = {}
  _.forEach(privateFieldsObjects, (value) => {
    privateFields[value.keyName] = true
  });

  return privateFields
}


async function getIndustryName(industryId) {
  let industryName = '';
  if (industryId) {
    const industryResult = await mlDBController.findOne('MlIndustries', industryId);
    industryName = industryResult.industryDisplayName
  }

  return industryName;
}

function appendKeywords(portFolio) {
  let keywords = `${portFolio.chapterName}, ${portFolio.clusterName}, ${portFolio.communityTypes},${portFolio.industryName}`;

  const focusArea = portFolio.areaOfInterest;

  if (portFolio.companyName && portFolio.companyName.length > 0) {
    keywords += `,${portFolio.companyName}`;
  }

  if (focusArea && focusArea.length > 0) {
    focusArea.forEach((f) => {
      keywords += `,${f.name}`;
    })
  }

  const displayKeywords = keywords;

  keywords = `${portFolio.displayName}, ${keywords}`;

  if (portFolio.chapterName && portFolio.chapterName.trim().length > 0) { keywords = `${keywords}, ${portFolio.displayName} ${portFolio.chapterName}`; }
  if (portFolio.clusterName && portFolio.clusterName.trim().length > 0) { keywords = `${keywords}, ${portFolio.displayName} ${portFolio.clusterName}`; }
  if (portFolio.communityType && portFolio.communityType.trim().length > 0) { keywords = `${keywords}, ${portFolio.displayName} ${portFolio.communityTypes}`; }

  portFolio.displayKeywords = displayKeywords.split(',');
  portFolio.keywords = keywords;
}

export default findPortFolioDetails;
