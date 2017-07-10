var Select = require('react-select');
//import Moolyaselect from '../../commons/components/select/MoolyaSelect'
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
