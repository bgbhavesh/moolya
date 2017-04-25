

export function mlFieldValidations(elements) {

  for (var  key in  elements) {
    let element = elements[key];
    if (element && element.getAttribute('data-required') && !element.value) {
      return element.getAttribute('data-errMsg');
    }
  }

}
