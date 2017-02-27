
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Taxation = `
    type taxation{
        _id                   : String                  
        taxationName          : String
        taxationValidityFrom  : String
        taxationValidityTo    : String
        aboutTaxation         : String
        isActive              : Boolean
        taxInformation        : [taxInformation]
    }
    
    type taxInformation{
       taxId                 : String
        taxName               : String
        taxPercentage         : String
        applicableStates      : String
        aboutTax              : String
        statesInfo            : [statesInfo]
    }
    type statesInfo{
        stateName             : String
        taxPercentage         : String
        isChecked             : Boolean
        taxId                 : String
    }
    input statesInfoInput{
        stateName             : String
        taxPercentage         : String
        isChecked             : Boolean
        taxId                 : String
    }
  
    input taxInformationInput{
        taxId                 : String
        taxName               : String
        taxPercentage         : String
        applicableStates      : String
        aboutTax              : String
        statesInfo            : [statesInfoInput]
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

