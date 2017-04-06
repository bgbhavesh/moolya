/**
 * Created by venkatasrinag on 4/4/17.
 */
if(Meteor.isServer){
    MlPortfolioMenu.upsert({communityType:"ideator",}, {$set:{
        "communityType":"ideator",
        "templateName":"1",
            "menu": [
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedIdeator",
                  "name" : "Ideator",
                  "uniqueId" : "requested_ideator",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_ideator",
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedIdeas",
                  "name" : "Ideas",
                  "uniqueId" : "requested_ideas",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_ideas"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedProblemsAndSolutions",
                  "name" : "Problems & Solutions",
                  "uniqueId" : "requested_problemsAndSolutions",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_problemsAndSolutions"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedAudience",
                  "name" : "Audience",
                  "uniqueId" : "requested_audience",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_audience"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedLibrary",
                  "name" : "Library",
                  "uniqueId" : "requested_library",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_library"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedStrategyAndPlanning",
                  "name" : "Strategy & Planning",
                  "uniqueId" : "requested_strategyAndPlanning",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_strategyAndPlanning"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedIntellectualTrainingAndTrademark",
                  "name" : "Intellectual Planning & Trademaek",
                  "uniqueId" : "requested_IPAndT",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_IPAndT"
                },
                {
                  "link" : "/admin/transactions/portfolio/ideator/requestedLookingFor",
                  "name" : "Looking For",
                  "uniqueId" : "requested_lookingFor",
                  "isLink" : true,
                  "isMenu" : true,
                  "image" : "",
                  "dynamicLink" : true,
                  "dynamicLinkHandler" : "",
                  "subMenusId":"portfolio_requested",
                  "subMenuMappingId":"requested_lookingFor"
                }
            ]
        }
    })
}
