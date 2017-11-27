/**
 * Created by venkatasrinag on 10/1/17.
 */
export const mlValidations = {
  formValidations(elements, errMessages) {
    if (elements != null && elements.length > 0) {
      for (element of elements) {
        if (element instanceof HTMLInputElement && element.required) {
          if (element.checkValidity() == false) {
            const obj = { element, errMsg: errMessages[element.name] }
            obj[element.name] = true;
            return obj;
          }
        }
      }
    }
  }
}
