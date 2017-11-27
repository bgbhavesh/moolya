export async function createleadsquaredActivity(email, code, notes, url) {
  console.log(url);
  const activityData = {
    EmailAddress: email,
    ActivityEvent: code,
    ActivityNote: notes
  }

  if (Meteor.settings.public.isLeadSquaredTrackingEnabled) {
    $.ajax({
      type: 'POST',
      url,
      data: JSON.stringify(activityData),
      success(response) {
        console.log(response);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  } else {
    console.log('Not Authorized..!!')
  }


  return ''
}
