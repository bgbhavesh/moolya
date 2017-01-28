/**
 * Created by venkatasrinag on 25/1/17.
 */
// let hierarchies = ["community", "chapter", "cluster", "Platform"];

let hierarchies = ["systemadmin", "clusteradmin", "chapteradmin", "communityadmin", "teamLead"];
let mlHierarchyCount = 10;

Meteor.startup(function () {
    for(i = 0; i < hierarchies.length; i++){
        let hierarchy = MlHierarchy.findOne({roleName: hierarchies[i]});
        if(!hierarchy){
            hierarchy = {roleName:hierarchies[i], hierarchyLevel:mlHierarchyCount};
            MlHierarchy.insert(hierarchy);
        }
        mlHierarchyCount--;
    }
})
