/**
 * Created by venkatsrinag on 11/5/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef';

let myOfficeSchema = `
    type OfficeMembers{
        userId:String,
        firstName:String,
        lastName:String,
        mobileNumber:String,
        emailId:String,
        userType:String,
        description:String,
        name:String,
        joiningDate:String,
        role:String,
        isActive:Boolean,
        isIndependent:Boolean,
        isInternalUserInteraction:Boolean,
        isExternalUserInteraction:Boolean,
        isFreeze:Boolean,
        isRetire:Boolean
    }

    type AvailableCommunities{
        communityName:String,
        communityId:String,
        userCount:String
    }
  
    type MyOffice{
        _id:String,
        userId:String,
        totalCount:Int,
        principalUserCount:Int,
        teamUserCount:Int,
        availableCommunities:[AvailableCommunities]
        barerCount:Int,
        description:String,
        branchType:String,
        location:String,
        landmark:String,
        area:String,
        city:String,
        state:String,
        country:String,
        zipCode: Int,
        isActive:Boolean,
        officeMembers:[OfficeMembers]
    }
    
    
    input officeMembers{
        userId:String,
        firstName:String,
        lastName:String,
        mobileNumber:String,
        emailId:String,
        userType:String,
        description:String,
        name:String,
        joiningDate:String,
        role:String,
        isActive:Boolean,
        isIndependent:Boolean,
        isInternalUserInteraction:Boolean,
        isExternalUserInteraction:Boolean,
        isFreeze:Boolean,
        isRetire:Boolean
    }

    input availableCommunities{
        communityName:String,
        communityId:String,
        userCount:String
    }
  
    input myOffice{
        totalCount:Int,
        principalUserCount:Int,
        teamUserCount:Int,
        availableCommunities:[availableCommunities]
        barerCount:Int,
        description:String,
        branchType:String,
        location:String,
        landmark:String,
        streetLocality : String
        area:String,
        city:String,
        state:String,
        country:String,
        zipCode: Int,
        about : String
        isActive:Boolean,
        officeMembers:[officeMembers],
        paymentLink:String
    }
  
    type Query{
        fetchMyOffice:[MyOffice]
        fetchMyOfficeMembers:[OfficeMembers]
    }
    
    type Mutation{       
        createMyOffice(myOffice:myOffice):response
        createOfficeMembers(myOfficeId:String, officeMembers:officeMembers):response
        updateOfficeMembers(myOfficeId:String, officeMembers:officeMembers):response
        updateMyOffice(myOffice:myOffice, myOfficeId:String):response
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], myOfficeSchema]);
