

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

export function passwordVisibilityHandler(){
  $('.password_icon').unbind().click(function(){
    if($(this).hasClass('hide_p')){
      $(this).parents('.form-group').find('input').attr('type','text');
      $(this).removeClass('hide_p').removeClass('fa-eye-slash').addClass('fa-eye');
    }else{
      $(this).parents('.form-group').find('input').attr('type','password');
      $(this).addClass('hide_p').removeClass('fa-eye').addClass('fa-eye-slash');;
    }
  });
}
