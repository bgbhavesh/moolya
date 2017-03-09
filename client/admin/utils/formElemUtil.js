

export function OnToggleSwitch(isExisting,isChanged){
  if(isExisting){
  $('.switch input[type=checkbox]').each(function () {
    if ($(this).is(':checked')) {
      $(this).parent('.switch').addClass('on');
    } else {
      $(this).parent('.switch').removeClass('on');
    }
  });
  }
  if(isChanged){
  $('.switch input').change(function () {
    if ($(this).is(':checked')) {
      $(this).parent('.switch').addClass('on');
    } else {
      $(this).parent('.switch').removeClass('on');
    }
  });
  }

}

export function initalizeFloatLabel(){
    $('.float-label').jvFloat();
}
