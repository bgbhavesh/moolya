/**
 * Created by venkatasrinag on 27/1/17.
 * Updated by mohdmohasin on 15/02/2017
 */
MlHierarchy = new Mongo.Collection('mlHierarchy');

MlHierarchySpecifics=new SimpleSchema({
  code:{ //unique code for each hierarchy level Cluster,Chapter,SubChapter,Community
    type:String,
    optional:true
  },
  level:{ //level assigned(bottoms top)
    type:Number,
    decimal:false,
    optional:true
  },
  module:{ //module for the hierarchy such as Cluster,Chapter,Sub Chapter or Community
    type:String,
    optional:true
  },
  moduleFieldRef:{ //module specific unique field for clusterId,chapterId,subChapterId or communityId
    type:String,
    optional:true
  },
  isParent:{ //if the hierarchy is the parent level
    type:Boolean,
    optional:true
  }
});

MlHierarchySchema = new SimpleSchema([MlHierarchySpecifics,{
  immediateParentCode:{
    type:String,
     optional:true
  },
  immediateParentLevel:{
    type:Number,
    decimal:false,
    optional:true
  },
  parent:{
    type:[MlHierarchySpecifics],
    optional:true
  },
  child:{
    type:[MlHierarchySpecifics],
    optional:true
  }
}]);


MlHierarchy.attachSchema(MlHierarchySchema);
