
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Taxation = `

    type statesInfo{
        stateName             : String
        taxPercentage         : String
    }
  
    type taxInformation{
        taxName               : String
        taxpercentage         : String
        applicableStates      : [statesInfo]
    }
    
    type taxation{
        taxationName          : String
        taxationValidityFrom  : String
        taxationValidityTo    : String
        aboutTaxation         : String
        isActive              : Boolean
        taxInformation        : [taxInformation]
    }

    input statesInfoInput{
        stateName             : String
        taxPercentage         : String
    }
  
    input taxInformationInput{
        taxName               : String
        taxpercentage         : String
        applicableStates      : [statesInfoInput]
    }
    
    input taxationInput{
        taxationName          : String
        taxationValidityFrom  : String
        taxationValidityTo    : String
        aboutTaxation         : String
        isActive              : Boolean
        taxInformation        : [taxInformationInput]
    }
    
    type Mutation{
        createTaxation(taxation:taxationInput):String
        updateTaxation(id:String,taxation:taxationInput): String
    }
    
    type Query{
        fetchTaxation(id:String) : taxation       
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Taxation]);

