import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let chapterSchema = `
    type Chapter{
        _id:String,
        clusterId:String,
        chapterCode:String,
        chapterName:String,
        displayName:String,
        about:String,
        chapterImage:String,
        stateName:String,
        stateId:String,
        cityId:String,
        cityName:String,
        latitude:Float,
        longitude:Float,
        email:String,
        showOnMap:Boolean,
        isActive:Boolean
        status:status
        
    }
    
    input chapterObject{
        _id:String,
        clusterId:String,
        chapterCode:String,
        clusterName:String,
        chapterCode:String,
        chapterName:String,
        displayName:String,
        about:String,
        chapterImage:String,
        stateName:String,
        stateId:String,
        cityId:String,
        cityName:String,
        latitude:Float,
        longitude:Float,
        email:String,
        showOnMap:Boolean,
        isActive:Boolean
    }
    
    input associatedChapters{ 
        chapterId:String
    }
    
    type internalSubChapterAccess{
      backendUser:UserObject
      externalUser:UserObject
    }
    type moolyaSubChapterAccess{
      backendUser:UserObject
      externalUser:UserObject
    }
    type UserObject{
      canSearch:Boolean,
      canView:Boolean,
      canDiscover:Boolean
    }
    type SubChapter{
        _id:String
        clusterId:String
        isDefaultSubChapter:String
        clusterName: String
        chapterId:String
        subChapterImageLink:String
        chapterName :String
        stateName : String
        subChapterName :String
        subChapterDisplayName: String
        subChapterCode:String,
        aboutSubChapter: String
        subChapterImageLink: String
        subChapterEmail: String
        isEmailNotified: Boolean 
        showOnMap : Boolean
        isActive: Boolean
        latitude:Float
        longitude:Float
        isBespokeRegistration:Boolean
        isBespokeWorkFlow:Boolean
        internalSubChapterAccess:internalSubChapterAccess
        moolyaSubChapterAccess:moolyaSubChapterAccess
    }
    
    input internalSubChapterAccessObject{
      backendUser:UserInputObject,
      externalUser:UserInputObject,
    }
    input moolyaSubChapterAccessObject{
      backendUser:UserInputObject,
      externalUser:UserInputObject,
    }
    input UserInputObject{
      canSearch:Boolean,
      canView:Boolean,
      canDiscover:Boolean
    }
    
    input subChapterObject{
        subChapterId:String,
        isDefaultSubChapter:String,
        clusterId:String, 
        clusterName:String,
        stateId:String,
        chapterId:String,
        chapterName:String,
        stateName : String,
        subChapterCode:String,
        subChapterName:String,
        subChapterDisplayName:String,
        associatedChapters:[associatedChapters],
        subChapterUrl:String,
        isUrlNotified:Boolean,
        subChapterEmail:String,
        isEmailNotified:Boolean,
        aboutSubChapter:String,
        subChapterImageLink:String,
        showOnMap:Boolean,
        isActive:Boolean,
        isBespokeRegistration:Boolean,
        latitude:Float,
        longitude:Float,
        isBespokeWorkFlow:Boolean,
        internalSubChapterAccess:internalSubChapterAccessObject,
        moolyaSubChapterAccess:moolyaSubChapterAccessObject
    }
    
     type SubChapterResponse{
         data:[SubChapter]
    }
    
    type Query{ 
        fetchChapter:String
        fetchChapters(id:String):[Chapter]
        fetchChaptersWithoutAll(id:String):[Chapter]
        fetchSubChapter(_id: String):SubChapter
        fetchSubChapters(id: String):SubChapterResponse
        fetchChaptersForMap:[Chapter]
        fetchSubChaptersSelect(id: String,displayAllOption:Boolean):[SubChapter]
        fetchActiveSubChapters(id: String):[SubChapter]
        fetchSubChaptersSelectNonMoolya(chapterId: String,clusterId:String):[SubChapter] 
        fetchActiveClusterChapters(clusters:[String],displayAllOption:Boolean):[Chapter]
        fetchActiveStatesChapters(states:[String],clusters:[String]):[Chapter]
        fetchActiveChaptersSubChapters(chapters:[String],clusters:[String],displayAllOption:Boolean):[SubChapter],
        fetchSubChaptersForRegistration(id: String):[SubChapter]
        fetchSubChaptersSelectMoolya(chapterId: String,clusterId:String):[SubChapter]        
    }
    
     type Mutation {
        createChapter(chapter:chapterObject):String
        updateChapter(chapterId:String, chapter:chapterObject):String
        createSubChapter(subChapter:subChapterObject):String
        updateSubChapter(subChapterId:String, subChapterDetails:subChapterObject, moduleName:String, actionName:String):response
     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], chapterSchema]);
