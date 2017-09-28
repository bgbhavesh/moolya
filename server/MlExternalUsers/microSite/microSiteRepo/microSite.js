/**
 * Created by kanwarjeet on 9/8/17.
 */
import _ from 'lodash'
import MlUserContext from '../../mlUserContext';
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
      twitterHandle: '@kanwar00733',
      branches: []
    }

    let userObject = await mlDBController.findOne('users', {'_id': userID});
    let displayName = userObject.profile.displayName;
    portFolio.displayName = displayName;
    if (userObject.profile)
      portFolio.profilePic = userObject.profile.profileImage ? userObject.profile.profileImage : '';

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
  }catch (e){
    console.log('Error MicroSite',e);
  }
}

// Ideator Portfolio
async function IDE(portFolio, query) {
  let resultIDEPortfolio = await getPortFolio('MlIdeatorPortfolio', query);
  if (resultIDEPortfolio) {
    portFolio.communityType = getCommunityType(resultIDEPortfolio) // Replacing trailing 's'
    portFolio.communityTypes =resultIDEPortfolio.communityType;
    let resultIdea = await mlDBController.findOne('MlIdeas', {userId:resultIDEPortfolio.userId});
    if(resultIdea){
      portFolio.aboutDiscription = resultIdea.ideaDescription ? resultIdea.ideaDescription : '';
    }

    //Get LookingFor Description
    if(resultIDEPortfolio.lookingFor){
      portFolio.lookingForDescription = resultIDEPortfolio.lookingFor[0].lookingDescription ? resultIDEPortfolio.lookingFor[0].lookingDescription : resultIDEPortfolio.lookingFor[0].lookingForName;

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
    portFolio.communityTypes =resultStartUpPortFolio.communityType;
    if (resultStartUpPortFolio.aboutUs) {
      let aboutUs = resultStartUpPortFolio.aboutUs;
      portFolio.aboutDiscription = aboutUs.startupDescription?aboutUs.startupDescription:''
    }
    getManagementInfo(portFolio, resultStartUpPortFolio);
    getLookingForDescription(portFolio, resultStartUpPortFolio);
    await getBranches(portFolio, resultStartUpPortFolio);
    appendKeywords(portFolio);

  }
  return portFolio;
}

// Funder/Investor Portfolio
async function FUN(portFolio, query) {
  let resultFunderPortfolio = await getPortFolio('MlFunderPortfolio', query);
  if (resultFunderPortfolio) {
    portFolio.communityType = getCommunityType(resultFunderPortfolio) // Replacing trailing 's'
    portFolio.communityTypes =resultFunderPortfolio.communityType;
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
  let resultServicePortFolio = await getPortFolio('MlServiceProviderPortfolio', query);
  if (resultServicePortFolio) {
    portFolio.communityType = getCommunityType(resultServicePortFolio)// Replacing trailing 's'
    portFolio.communityTypes =resultServicePortFolio.communityType;

    if (resultServicePortFolio.about) {
      let aboutUs = resultServicePortFolio.about
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
  let resultCompanyPortFolio = await getPortFolio('MlCompanyPortfolio', query);
  if (resultCompanyPortFolio) {
    portFolio.communityType = 'a Company';
    portFolio.communityTypes ='Company';
    if (resultCompanyPortFolio.aboutUs) {
      let aboutUs = resultCompanyPortFolio.aboutUs
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

  let resultINSPortFolio = await getPortFolio('MlInstitutionPortfolio', query);
  if (resultINSPortFolio) {
    portFolio.communityType = getCommunityType(resultINSPortFolio)
    portFolio.communityTypes =resultINSPortFolio.communityType;
    if (resultINSPortFolio.aboutUs) {
      let aboutUs = resultINSPortFolio.aboutUs
      portFolio.aboutDiscription = aboutUs.institutionDescription;
    }

    getManagementInfo(portFolio, resultINSPortFolio);
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


async function getBranches(portFolio, resultPortFolioBranches) {
  let branches = resultPortFolioBranches.branches;
  let outputBranches = [];
  if(branches)
  {
    await Promise.all(branches.map(async (branch) => {
      let city = branch.cityId?await getCity(branch.cityId):'';
      let state =branch.stateId? await getState(branch.stateId):'';
      let country= branch.countryId?await getCountry(branch.countryId):'';

      outputBranches.push({
        name:branch.name,
        branches_logo: branch.logo ? branch.logo.fileUrl : '',
        addr1: branch.address1 ? branch.address1 : '',
        addr2: branch.address2 ? branch.address2 : '',
        area: branch.area ? branch.area : 'branch.area',
        state:state,
        country: country,
        city:city
      })
    }));
  }

  portFolio.branches = outputBranches;
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

async function getCity(cityId) {
  let result = await
    mlDBController.findOne('MlCities', {_id: cityId});
  if(result)
    return result.name
  else
    return ''
}

async function getState(stateId) {
  let result = await
    mlDBController.findOne('MlStates', {_id: stateId});
  if(result)
    return result.name;
  else
    return '';
}


async function getCountry(countryId) {
  let result = await
    mlDBController.findOne('MlCountries', {_id: countryId});
  if(result)
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

  let keywords = portFolio.displayName + ', '+portFolio.chapterName + ', ' + portFolio.clusterName + ', ' + portFolio.communityTypes;
  if (portFolio.chapterName && portFolio.chapterName.trim().length >  0 )
    keywords = keywords + ', ' + portFolio.displayName + " " + portFolio.chapterName;
  if (portFolio.clusterName && portFolio.clusterName.trim().length >  0 )
    keywords = keywords + ', ' +portFolio.displayName  + " " + portFolio.clusterName;
  if (portFolio.communityType && portFolio.communityType.trim().length >  0 )
    keywords = keywords + ', ' + portFolio.displayName  + " " + portFolio.communityTypes;
  portFolio.keywords = keywords;
  return portFolio
}
export  default  findPortFolioDetails;
