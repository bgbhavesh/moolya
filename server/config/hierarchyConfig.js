/**
 * Created by venkatasrinag on 25/1/17.
 * Updated by mohdmohasin on 15/2/2017
 */

let hierarchies = [
  {"code":"PLATFORM",level:4,"module":null,"menuName":"mlAdminMenu","moduleFieldRef":null,"isParent":true,immediateParentCode:null,immediateParentLevel:null,child:[{"code":"CLUSTER",level:3,"module":"cluster","moduleFieldRef":"clusterId","isParent":false},{"code":"CHAPTER",level:2,"module":"chapter","moduleFieldRef":"chapterId","isParent":false},{"code":"SUBCHAPTER",level:1,"module":"SubChapter","moduleFieldRef":"subChapterId","isParent":false},  {"code":"COMMUNITY",level:0,"module":"community","moduleFieldRef":"communityId","isParent":false}],parent:[]},

  {"code":"CLUSTER",level:3,"module":"cluster","menuName":"mlClusterAdminMenu","moduleFieldRef":"clusterId","isParent":false,immediateParentCode:"PLATFORM",immediateParentLevel:4,child:[{"code":"CHAPTER",level:2,"module":"chapter","moduleFieldRef":"chapterId","isParent":false},{"code":"SUBCHAPTER",level:1,"module":"SubChapter","moduleFieldRef":"subChapterId","isParent":false},  {"code":"COMMUNITY",level:0,"module":"community","moduleFieldRef":"communityId","isParent":false}],parent:[{"code":"PLATFORM",level:4,"module":null,"moduleFieldRef":null,"isParent":true}]},

  {"code":"CHAPTER",level:2,"module":"chapter", "menuName":"mlChapterAdminMenu", "moduleFieldRef":"chapterId","isParent":false,immediateParentCode:"CLUSTER",immediateParentLevel:3,child:[{"code":"SUBCHAPTER",level:1,"module":"SubChapter","moduleFieldRef":"subChapterId","isParent":false},  {"code":"COMMUNITY",level:0,"module":"community","moduleFieldRef":"communityId","isParent":false}],parent:[{"code":"PLATFORM",level:4,"module":null,"moduleFieldRef":null,"isParent":true},{"code":"CLUSTER",level:3,"module":"cluster","moduleFieldRef":"clusterId","isParent":false}]},

  {"code":"SUBCHAPTER",level:1,"module":"SubChapter", "menuName":"mlSubChapterAdminMenu", "moduleFieldRef":"subChapterId","isParent":false,immediateParentCode:"CHAPTER",immediateParentLevel:2,parent:[{"code":"PLATFORM",level:4,"module":null,"moduleFieldRef":null,"isParent":true},{"code":"CLUSTER",level:3,"module":"cluster","moduleFieldRef":"clusterId","isParent":false},{"code":"CHAPTER",level:2,"module":"chapter","moduleFieldRef":"chapterId","isParent":false}],child:[{"code":"COMMUNITY",level:0,"module":"community","moduleFieldRef":"communityId","isParent":false}]},

  {"code":"COMMUNITY",level:0,"module":"community", "menuName":"mlCommunityAdminMenu", "moduleFieldRef":"communityId","isParent":false,immediateParentCode:"SUBCHAPTER",immediateParentLevel:1,parent:[{"code":"PLATFORM",level:4,"module":null,"moduleFieldRef":null,"isParent":true},{"code":"CLUSTER",level:3,"module":"cluster","moduleFieldRef":"clusterId","isParent":false},{"code":"CHAPTER",level:2,"module":"chapter","moduleFieldRef":"chapterId","isParent":false},{"code":"SUBCHAPTER",level:1,"module":"SubChapter","moduleFieldRef":"subChapterId","isParent":false}],child:[]}];

Meteor.startup(function () {
    for(i = 0; i < hierarchies.length; i++){
        let hierarchy = MlHierarchy.findOne({code: hierarchies[i]["code"]});
        if(!hierarchy){
            MlHierarchy.insert(hierarchies[i]);
        }
    }
})
