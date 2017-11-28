const documentType = [
  {
    _id: 'self', docTypeName: 'self', docTypeDisplayName: 'self', about: '', isActive: true
  },
  {
    _id: 'process', docTypeName: 'process', docTypeDisplayName: 'process', about: '', isActive: true
  },
  {
    _id: 'chapter', docTypeName: 'chapter', docTypeDisplayName: 'chapter', about: '', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < documentType.length; i++) {
    const documentTypeData = MlDocumentTypes.findOne({ _id: documentType[i]._id });
    if (!documentTypeData) {
      MlDocumentTypes.insert(documentType[i]);
    }
  }
})
