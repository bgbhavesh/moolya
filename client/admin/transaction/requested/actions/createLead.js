export async function createLead(data, url) {
  console.log(url);
  const leadData = [
    {
      Attribute: 'FirstName',
      Value: data.firstName || ''
    },
    {
      Attribute: 'LastName',
      Value: data.lastName || ''
    },
    {
      Attribute: 'EmailAddress',
      Value: data.email
    },
    {
      Attribute: 'Phone',
      Value: data.contactNumber
    },
    /* {
        Attribute: "ProspectID",
        Value: MXCProspectId
      }, */
    {
      Attribute: 'Address',
      Value: data.cityName || ''
    }
  ]

  if (Meteor.settings.public.isLeadSquaredTrackingEnabled) {
    $.ajax({
      type: 'POST',
      url,
      data: JSON.stringify(leadData),
      success(response) {
        console.log(response);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  } else {
    console.log('Fired Lead Squared request')
  }


  return ''
}
