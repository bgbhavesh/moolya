/**
 * Created by muralidhar on 18/02/17.
 */
import MlSchemas from '../../common/commonSchemas'

MlDocumentMapping = new Mongo.Collection('mlDocumentMapping');

MlDocumentMappingSchema = new SimpleSchema({
  documentId:{
    type:String,
    optional:false
  },

  documentDisplayName:{
    type:String,
    optional:false
  },

  allowableFormat:{
    type:Array,
    optional:true
  },

  'allowableFormat.$':{
    type:Object,
    optional:true
  },

  'allowableFormat.$.id':{
    type:String,
    optional:true
  },

  'allowableFormat.$.name':{
    type:String,
    optional:true
  },

  documentName:{
    type:String,
    optional:false
  },

  kycCategory:{
    type:Array,
    optional:false
  },

  'kycCategory.$':{
    type:Object,
    optional:true
  },

  'kycCategory.$.id':{
    type:String,
    optional:true
  },

  'kycCategory.$.name':{
    type:String,
    optional:true
  },

  documentType:{
    type:Array,
    optional:false
  },

  'documentType.$':{
    type:Object,
    optional:true
  },

  'documentType.$.id':{
    type:String,
    optional:true
  },

  'documentType.$.name':{
    type:String,
    optional:true
  },

  allowableMaxSize:{
    type:String,
    optional:true
  },
  clusters:{
    type:Array,
    optional:true
  },
  'clusters.$':{
    type:Object,
    optional:true
  },
  'clusters.$.id':{
    type:String,
    optional:true
  },
  'clusters.$.name':{
    type:String,
    optional:true
  },
  chapters:{
    type:Array,
    optional:true
  },
  'chapters.$':{
    type:Object,
    optional:true
  },
  'chapters.$.id':{
    type:String,
    optional:true
  },
  'chapters.$.name':{
    type:String,
    optional:true
  },
  subChapters:{
    type:Array,
    optional:true
  },
  'subChapters.$':{
    type:Object,
    optional:true
  },
  'subChapters.$.id':{
    type:String,
    optional:true
  },
  'subChapters.$.name':{
    type:String,
    optional:true
  },
  validity:{
    type:String,
    optional:true
  },
  inputLength:{
    type:String,
    optional:true
  },
  remarks:{
    type:String,
    optional:true
  },
  issuingAuthority:{
    type:String,
    optional:true
  },
  isActive:{
  type:Boolean,
  optional:true
  }
})


MlDocumentMapping.attachSchema(MlDocumentMappingSchema);
MlSchemas["MlDocumentMapping"] = MlDocumentMappingSchema;
