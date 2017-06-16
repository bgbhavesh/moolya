import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let AddressTypeSchema = `
    type AddressType
    {
      addressTypeInfo:addressDetails
      _id :String
      addressUploadIcon:String
      isActive :Boolean
    }
    type addressDetails{
      addressName :String
      aboutAddress :String
      _id :String
      addressDisplayName :String
    }
    
    input addressTypeObject{
        addressName :String,
        aboutAddress :String,
        addressDisplayName :String,
        _id :String,
        addressUploadIcon:String,
        isActive :Boolean,
    }
    
   type Mutation 
    {
        updateAddressType(_id:String, addressType: addressTypeObject):String
        createAddressType(addressType:addressTypeObject):String
    }
    type Query{
        findAddressType(_id:String): AddressType
        fetchAddressTypes:[addressDetails]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],AddressTypeSchema]);
