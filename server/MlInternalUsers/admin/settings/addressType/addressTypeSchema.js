import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let AddressTypeSchema = `
    type AddressType
    {
      addressName :String
      aboutAddress :String
      addressDisplayName :String
      _id :String
      addressUploadIcon:String
      isActive :Boolean
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
        fetchAddressTypes:[AddressType]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],AddressTypeSchema]);
