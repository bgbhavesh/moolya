var Select = require('react-select');
import Moolyaselect from '../../commons/components/select/MoolyaSelect'
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
    }else if(element instanceof Moolyaselect){
      var selectObj = element;
      let isRequired = selectObj.props['data-required'];
      let value = selectObj.props['selectedValue']
      let multi= selectObj.props['multiSelect']

        if (isRequired && value.length==0&&multi) {
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
