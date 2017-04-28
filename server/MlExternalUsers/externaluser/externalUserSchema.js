/**
 * Created by venkatsrinag on 28/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'

let externalUser = `
    input externalUser{
        username: String,
        profile:profile
    }
    
    input profile{
        isExternaluser:Boolean,
        city:String,
        state:String,
        country:String,
        cluster:String,
        chapter:String,
        community:String,
        externalUserProfile:externalUserProfile
    }
    
    input userPortfolios{
        portfolioId:String,
        isDefault:Boolean
    }
    
    input userProfiles{
        registrationId:String,
        portfolio:[userPortfolios],
        countryName:String,
        countryId:String,
        cityName:String,
        mobileNumber:String,
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        communityId:String,
        communityName:String,
        communityType:String,
        isDefault:Boolean,
        isProfileActive:Boolean,
        accountType:String
    }
    
    input externalUserProfile{
        firstName:String,
        lastName:String,
        middleName:String,
        userProfiles:[userProfiles]
    }
    
    type Query{
        fetchIdeatorUsers:[externalUser]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],externalUser]);
