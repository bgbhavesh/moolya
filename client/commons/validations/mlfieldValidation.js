var Select = require('react-select');
import {isValidNumber, format} from 'libphonenumber-js';

//import Moolyaselect from '../../commons/containers/select/MlSelectComposer'
export function mlFieldValidations(elements) {

  for (var  key in  elements) {
    let element = elements[key];
    if (element instanceof Select) {
      {
        var selectObj = element;
        let isRequired = selectObj.props['data-required'];
        let value = selectObj.props['value']
        if (isRequired && !value) {
          return selectObj.props['data-errMsg']
        }

      }
    }else if(element instanceof Object &&  element['props'] instanceof Object && element['props']!==undefined){
      var selectObj = element;
      var isRequired = selectObj.props['data-required'];
       var value = selectObj.props['selectedValue']
      var  multi= selectObj.props['multiSelect']

        if (isRequired && multi&&value.length==0) {
          return selectObj.props['data-errMsg']
        }else if (isRequired && !value) {
          return selectObj.props['data-errMsg']
        }


    }
    else if (element && element.getAttribute('data-required') && !element.value) {
        return element.getAttribute('data-errMsg');
      }
  }

}

/**
 * Validate the phone number based on country code
 * @param countryCode
 * @param contactNumber
 * @return {boolean}
 */
export function validatedPhoneNumber(countryCode, contactNumber){
  let isValidPhoneNumber = true;
  if (contactNumber) {
    isValidPhoneNumber = isValidNumber(format({country: countryCode, phone: contactNumber }, 'International'));
  }
  return isValidPhoneNumber;
}
