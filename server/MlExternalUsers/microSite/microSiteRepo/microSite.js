/**
 * Created by kanwarjeet on 9/8/17.
 */
import _ from 'lodash'
import MlUserContext from '../../mlUserContext';
import generateAbsolutePath from '../../../../lib/mlGenerateAbsolutePath'
async function findPortFolioDetails(pathName, fullUrl, originalUrl) {
  try {  //Default Values
    const existsSeoName = MlSitemap.findOne({seoUrl: originalUrl});
    if (!existsSeoName) {
      return 'Next';
    }
    let userID = existsSeoName.userId;

    let portFolio = {
      profilePic: '',
      firstName: '',
      lastName: '',
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
      twitterHandle: '@moolyaglobal',
      branches: []
    }

    let userObject = await mlDBController.findOne('users', {'_id': userID});
    let displayName = userObject.profile.displayName;
    portFolio.displayName = displayName;
    if (userObject.profile)
      portFolio.profilePic = userObject.profile.profileImage ? generateAbsolutePath(userObject.profile.profileImage) : '';

    let defaultProfile = new MlUserContext().userProfileDetails(userID)
    let profileId = defaultProfile.profileId;

    if (!profileId) {
      return portFolio
    }
    let queryProfileId = {
      'profileId': profileId
    }
    let resultParentPortFolio = await mlDBController.findOne('MlPortfolioDetails', queryProfileId);
    if (resultParentPortFolio) {
      portFolio.clusterName = resultParentPortFolio.clusterName
      portFolio.chapterName = resultParentPortFolio.chapterName
    } else {
      return 'Next';
    }

    //Finding fields private to User.
    let privateFields = getPrivateFields(resultParentPortFolio.privateFields);
    portFolio.privateFields = privateFields
    // Store portfolio information.

    let query = {
      'portfolioDetailsId': resultParentPortFolio._id
    }
    let dynamicLinksClasses = getDynamicLinksClasses();
    let dynamicListMenu = {
      'IDE': getIDEMenu(dynamicLinksClasses),
      'STU': getSTUMenu(dynamicLinksClasses),
      'FUN': getFUNMenu(dynamicLinksClasses),
      'SPS': getSPSMenu(dynamicLinksClasses),
      'CMP': getCMPMenu(dynamicLinksClasses),
      'INS': getINSMenu(dynamicLinksClasses)
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
  } catch (e) {
    console.log('Error MicroSite', e);
  }
}

// Ideator Portfolio
async function IDE(portFolio, query) {
  let resultIDEPortfolio = await getPortFolio('MlIdeatorPortfolio', query);
  if (resultIDEPortfolio) {
    portFolio.communityType = getCommunityType(resultIDEPortfolio) // Replacing trailing 's'
    portFolio.communityTypes = resultIDEPortfolio.communityType;
    let resultIdea = await mlDBController.findOne('MlIdeas', {userId: resultIDEPortfolio.userId});
    if (resultIdea) {
      portFolio.aboutDiscription = resultIdea.ideaDescription ? resultIdea.ideaDescription : '';
    }

    //Get LookingFor Description

    if (resultIDEPortfolio.lookingFor) {
      portFolio.lookingForDescription = resultIDEPortfolio.lookingFor[0].lookingDescription ? resultIDEPortfolio.lookingFor[0].lookingDescription : resultIDEPortfolio.lookingFor[0].lookingForName;

    }
    portFolio.problemStatement='';
    portFolio.solutionStatement='';
    portFolio.IPandTM=''

    if (resultIDEPortfolio.problemSolution) {
      portFolio.problemStatement = resultIDEPortfolio.problemSolution.problemStatement ? resultIDEPortfolio.problemSolution.problemStatement : ''
      portFolio.solutionStatement = resultIDEPortfolio.problemSolution.solutionStatement ? resultIDEPortfolio.problemSolution.solutionStatement : ''

    }
   if(resultIDEPortfolio.intellectualPlanning)
   {
     portFolio.IPandTM = resultIDEPortfolio.intellectualPlanning.IPdescription ? resultIDEPortfolio.intellectualPlanning.IPdescription : ''
   }
    appendKeywords(portFolio);
    return portFolio
  }
}
// StartUp Portfolio
async function STU(portFolio, query) {
  let resultStartUpPortFolio = await getPortFolio('MlStartupPortfolio', query);
  if (resultStartUpPortFolio) {
    portFolio.communityType = getCommunityType(resultStartUpPortFolio) // Replacing trailing 's'
    portFolio.communityTypes = resultStartUpPortFolio.communityType;
    portFolio.aboutDiscription=''
    if (resultStartUpPortFolio.aboutUs) {

      let aboutUs = resultStartUpPortFolio.aboutUs;
      portFolio.aboutDiscription = aboutUs.startupDescription ? aboutUs.startupDescription : ''
    }

    portFolio.servicesProducts ='';
    if(resultStartUpPortFolio.serviceProducts){

      portFolio.servicesProducts = resultStartUpPortFolio.serviceProducts.spDescription?resultStartUpPortFolio.serviceProducts.spDescription:'';
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
  let resultFunderPortfolio = await getPortFolio('MlFunderPortfolio', query);
  if (resultFunderPortfolio) {
    portFolio.communityType = getCommunityType(resultFunderPortfolio) // Replacing trailing 's'
    portFolio.communityTypes = resultFunderPortfolio.communityType;
    if (resultFunderPortfolio.successStories)
      portFolio.aboutDiscription = resultFunderPortfolio.successStories.description ? resultFunderPortfolio.successStories.description : ''
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
  let resultServicePortFolio = await getPortFolio('MlServiceProviderPortfolio', query);
  if (resultServicePortFolio) {
    portFolio.communityType = getCommunityType(resultServicePortFolio)// Replacing trailing 's'
    portFolio.communityTypes = resultServicePortFolio.communityType;

    if (resultServicePortFolio.about) {
      let aboutUs = resultServicePortFolio.about
      portFolio.aboutDiscription = aboutUs.aboutDescription;

    }

    if (resultServicePortFolio.services) {

      portFolio.servicesDescription = resultServicePortFolio.services.servicesDescription ? resultServicePortFolio.services.servicesDescription : ''
    }
    getAwardsRewards(portFolio, resultServicePortFolio);
    getClients(portFolio, resultServicePortFolio);
    getLookingForDescription(portFolio, resultServicePortFolio);
    appendKeywords(portFolio);
  }
  return portFolio;
}

//Company PortFolio
async function CMP(portFolio, query) {
  let resultCompanyPortFolio = await getPortFolio('MlCompanyPortfolio', query);
  if (resultCompanyPortFolio) {
    portFolio.communityType = 'a Company';
    portFolio.communityTypes = 'Company';
    if (resultCompanyPortFolio.aboutUs) {
      let aboutUs = resultCompanyPortFolio.aboutUs
      portFolio.aboutDiscription = aboutUs.companyDescription;
    }

    if (resultCompanyPortFolio.sectorsAndServices) {
      portFolio.sectorsAndServices = resultCompanyPortFolio.sectorsAndServices.sectorsAndServicesDescription ? resultCompanyPortFolio.sectorsAndServices.sectorsAndServicesDescription : '';


    }
    if (resultCompanyPortFolio.policy) {
      portFolio.policy = resultCompanyPortFolio.policy.policyDescription ? resultCompanyPortFolio.policy.policyDescription : '';

    }
    getManagementInfo(portFolio, resultCompanyPortFolio);
    getAwardsRewards(portFolio, resultCompanyPortFolio);
    getResearchDev(portFolio, resultCompanyPortFolio);
    getLookingForDescription(portFolio, resultCompanyPortFolio);
    appendKeywords(portFolio);
  }
  return portFolio
}

//Institution PortFolio
async function INS(portFolio, query) {

  let resultINSPortFolio = await getPortFolio('MlInstitutionPortfolio', query);
  if (resultINSPortFolio) {
    portFolio.communityType = getCommunityType(resultINSPortFolio)
    portFolio.communityTypes = resultINSPortFolio.communityType;
    if (resultINSPortFolio.aboutUs) {
      let aboutUs = resultINSPortFolio.aboutUs
      portFolio.aboutDiscription = aboutUs.institutionDescription;
    }
    if (resultINSPortFolio.sectorsAndServices) {
      portFolio.sectorsAndServices = resultINSPortFolio.sectorsAndServices.sectorsAndServicesDescription ? resultINSPortFolio.sectorsAndServices.sectorsAndServicesDescription : '';


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
        logo: management.logo ? generateAbsolutePath(management.logo.fileUrl) : '',
        name: management.firstName?management.firstName:'' + ' ' + management.lastName? management.lastName:'',
        designation: management.designation?management.designation:'',
        description: management.about ? management.about : ''
      })
    })

  }
  portFolio.management = managementPortFolio
  return portFolio;
}

function getTechnologyInfo(portFolio, managementInfo) {
  let technologiesPortFolio = []
  let technologies = managementInfo.technologies;
  if (technologies) {
    technologies.forEach(function (tech) {
      technologiesPortFolio.push({
        logo: tech.logo ? generateAbsolutePath(tech.logo.fileUrl) : '',
        name: tech.technologyName? tech.technologyName:'',
        description: tech.technologyDescription ? tech.technologyDescription : ''
      })
    })

  }
  portFolio.technologies = technologiesPortFolio;
  return portFolio;
}
function getTeamInfo(portFolio, resultFunderPortfolio) {
  let teamPortFolio = []
  let principals = resultFunderPortfolio.principal;
  let teams = resultFunderPortfolio.team;

  if (principals) {
    principals.forEach(function (principal) {
      teamPortFolio.push({
        logo: principal.logo ? generateAbsolutePath(principal.logo.fileUrl) : '',
        name: principal.firstName?principal.firstName:'' + ' ' + principal.lastName?principal.lastName:'',
        designation: principal.designation?principal.designation:'',
        description: principal.aboutPrincipal ? principal.aboutPrincipal : ''
      })
    })

  }
  if (teams) {
    teams.forEach(function (team) {
      teamPortFolio.push({
        logo: team.logo ? generateAbsolutePath(team.logo.fileUrl) : '',
        name: team.firstName?team.firstName :'' + ' ' + team.lastName?team.lastName:'',
        designation: team.designation?team.designation:'',
        description: team.aboutTeam ? team.aboutTeam : ''

      })
    })

  }
  portFolio.teamManagement = teamPortFolio;
}

function getSuccessStoriesInfo(portFolio, resultPortfolio) {
  let successStoriesFolio = []
  let successStories = resultPortfolio.successStories;
  if (successStories) {
    successStories.forEach(function (successStory) {
      successStoriesFolio.push({
        logo: successStory.logo ? generateAbsolutePath(successStory.logo.fileUrl) : '',
        name: successStory.storyTitle ? successStory.storyTitle : '',
        description: successStory.description ? successStory.description : ''
      })
    })

  }
  portFolio.successStories = successStoriesFolio;
}

function getAreasOfInterest(portFolio, resultPortfolio) {
  let areasInterestsFolio = []
  let areasInterests = resultPortfolio.areaOfInterest;
  if (areasInterests) {
    areasInterests.forEach(function (interest) {
      areasInterestsFolio.push({
        logo: interest.logo ? generateAbsolutePath(interest.logo.fileUrl) : '',
        name: interest.industryTypeName ? interest.industryTypeName : ''
      })
    })

  }
  portFolio.areaOfInterest = areasInterestsFolio;
}

function getAwardsRewards(portFolio, resultPortfolio) {
  let awardsRewards = []
  let awardsRecognitions = resultPortfolio.awardsRecognition;
  if (awardsRecognitions) {
    awardsRecognitions.forEach(function (awards) {
      awardsRewards.push({
        logo: awards.logo ? generateAbsolutePath(awards.logo.fileUrl) : '',
        name: awards.awardName ? awards.awardName : '',
        description: awards.awardsDescription ? awards.awardsDescription : '',
      })
    })

  }
  portFolio.awardsRecognition = awardsRewards;
}

function getResearchDev(portFolio, resultPortfolio) {
  let researchAndDevelopmentPortFolio = []
  let researchAndDevelopments = resultPortfolio.researchAndDevelopment;
  if (researchAndDevelopments) {
    researchAndDevelopments.forEach(function (research) {
      researchAndDevelopmentPortFolio.push({
        logo: research.logo ? generateAbsolutePath(research.logo.fileUrl) : '',
        name: research.researchAndDevelopmentName ? research.researchAndDevelopmentName : '',
        description: research.researchAndDevelopmentDescription ? research.researchAndDevelopmentDescription : '',
      })
    })

  }
  portFolio.researchAndDevelopment = researchAndDevelopmentPortFolio;
}
function getIntrapreneurInfo(portFolio, resultPortfolio) {
  let intrapreneurFolio = []
  let intrapreneurs = resultPortfolio.intrapreneurRecognition;
  if (intrapreneurs) {
    intrapreneurs.forEach(function (intrapreneur) {
      intrapreneurFolio.push({
        logo: intrapreneur.logo ? generateAbsolutePath(intrapreneur.logo.fileUrl) : '',
        name: intrapreneur.intrapreneurName ? intrapreneur.intrapreneurName : '',
        description: intrapreneur.intrapreneurDescription ? intrapreneur.intrapreneurDescription : '',
      })
    })

  }
  portFolio.intrapreneurRecognition = intrapreneurFolio;
}
function getClients(portFolio, resultPortfolio) {
  let clientsFolio = []
  let clients = resultPortfolio.clients;
  if (clients) {
    clients.forEach(function (client) {
      clientsFolio.push({
        logo: client.logo ? generateAbsolutePath(client.logo.fileUrl) : '',
        name: client.companyName ? client.companyName : '',
        description: client.clientDescription ? client.clientDescription : '',
      })
    })

  }
  portFolio.clients = clientsFolio;
}
function getCommunityType(resultPortfolio) {
  let communityType = resultPortfolio.communityType;
  communityType = communityType.replace(/s$/, ''); // Replacing trailing 's'
  if (checkVowel(communityType.charAt(0))) {
    communityType = 'an ' + "\'" + communityType + "\'";
  } else {
    communityType = 'a ' + "\'" + communityType + "\'";
  }
  return communityType
}

function checkVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}
async function getPortFolio(collectionName, query) {
  let result = await
    mlDBController.findOne(collectionName, query);
  return result
}


function getSTUMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Team', className: dynamicLinksClasses.Management},
    {name: 'Technology', className: dynamicLinksClasses.Technology},
    {name: 'Services and Products', className: dynamicLinksClasses.servicesProducts},
    {name: 'Awards', className: dynamicLinksClasses.Awards},
    {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ];
}

function getCMPMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Management', className: dynamicLinksClasses.Management},
    {name: 'Awards', className: dynamicLinksClasses.Awards}, //Special Case where awards are treated as slides
    {name: 'Incubator Sectors', className: dynamicLinksClasses.Incubator_Sectors},
    {name: 'CSR', className: dynamicLinksClasses.CSR},
    {name: 'R&D', className: dynamicLinksClasses.RandD},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ];
}

function getINSMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Management', className: dynamicLinksClasses.Management},
    {name: 'Awards', className: dynamicLinksClasses.Awards},
    {name: 'Incubator Sectors', className: dynamicLinksClasses.Incubator_Sectors},
    {name: 'Intrapreneur', className: dynamicLinksClasses.Intrapreneur},
    {name: 'R&D', className: dynamicLinksClasses.RandD},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ];
}


function getSPSMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Awards and Rewards', className: dynamicLinksClasses.AwardsandRewards},
    {name: 'Clients', className: dynamicLinksClasses.Clients},
    {name: 'Services', className: dynamicLinksClasses.Services},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ];
}
function getFUNMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Team', className: dynamicLinksClasses.Team},
    {name: 'Success Stories', className: dynamicLinksClasses.Success_Stories},
    {name: 'Focus Areas', className: dynamicLinksClasses.Focus_Areas},
    {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ]
}


function getIDEMenu(dynamicLinksClasses) {
  return [
    {name: 'About', className: dynamicLinksClasses.About},
    {name: 'Problems and Solutions', className: dynamicLinksClasses.Problems_and_Solutions},
    {name: 'Looking For', className: dynamicLinksClasses.Looking_For},
    {name: 'IP and TM', className: dynamicLinksClasses.IPandTM},
    {name: 'Keywords', className: dynamicLinksClasses.Keywords}
  ]
}
async function getBranches(portFolio, resultPortFolioBranches) {
  let branches = resultPortFolioBranches.branches;
  let outputBranches = [];
  if (branches) {
    await Promise.all(branches.map(async (branch) => {
      let city = branch.cityId ? await getCity(branch.cityId) : '';
      let state = branch.stateId ? await getState(branch.stateId) : '';
      let country = branch.countryId ? await getCountry(branch.countryId) : '';

      outputBranches.push({
        name: branch.name,
        branches_logo: branch.logo ? generateAbsolutePath(branch.logo.fileUrl) : '',
        addr1: branch.address1 ? branch.address1 : '',
        addr2: branch.address2 ? branch.address2 : '',
        area: branch.area ? branch.area : 'branch.area',
        state: state,
        country: country,
        city: city
      })
    }));
  }

  portFolio.branches = outputBranches;
}
function getDynamicLinksClasses() {
  let dynamicLinksClasses = {
    'About': 'pageAboutDiscription',
    'Awards': 'pageAwardsandRewards',
    'Looking_For': 'pageLookingFor',
    'Social_Links': 'pageSocialLinks',
    'Keywords': 'pageKeywords',
    'Branches': 'pageBranches',
    'Management': 'pageManagement',
    'Problems_and_Solutions': 'pageProblemsandSolutions',
    'IPandTM': 'pageIPandTM',
    'Focus_Areas': 'pageFocusAreas',
    'Success_Stories': 'pageSuccessStories',
    'Team': 'pageTeam',
    'Services': 'pageServices',
    'Clients': 'pageClients',
    'AwardsandRewards': 'pageAwardsandRewards',
    'Incubator_Sectors': 'pageIncubatorSectors',
    'Intrapreneur': 'pageIntrapreneur',
    'RandD': 'pageRandD',
    'CSR': 'pageCSR',
    'Technology':'pageTechnology',
    'servicesProducts':'pageServicesProducts'


  }

  return dynamicLinksClasses;
}

async function getCity(cityId) {
  let result = await
    mlDBController.findOne('MlCities', {_id: cityId});
  if (result)
    return result.name
  else
    return ''
}

async function getState(stateId) {
  let result = await
    mlDBController.findOne('MlStates', {_id: stateId});
  if (result)
    return result.name;
  else
    return '';
}


async function getCountry(countryId) {
  let result = await
    mlDBController.findOne('MlCountries', {_id: countryId});
  if (result)
    return result.displayName
  else
    return '';
}

function getPrivateFields(privateFieldsObjects) {
  let privateFields = {}
  _.forEach(privateFieldsObjects, function (value) {
    privateFields[value.keyName] = true
  });

  return privateFields
}

function appendKeywords(portFolio) {

  let keywords = portFolio.displayName + ', ' + portFolio.chapterName + ', ' + portFolio.clusterName + ', ' + portFolio.communityTypes;
  if (portFolio.chapterName && portFolio.chapterName.trim().length > 0)
    keywords = keywords + ', ' + portFolio.displayName + " " + portFolio.chapterName;
  if (portFolio.clusterName && portFolio.clusterName.trim().length > 0)
    keywords = keywords + ', ' + portFolio.displayName + " " + portFolio.clusterName;
  if (portFolio.communityType && portFolio.communityType.trim().length > 0)
    keywords = keywords + ', ' + portFolio.displayName + " " + portFolio.communityTypes;
  portFolio.keywords = keywords;
  return portFolio
}
export  default  findPortFolioDetails;
