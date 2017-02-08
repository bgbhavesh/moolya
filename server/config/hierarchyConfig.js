/**
 * Created by venkatasrinag on 25/1/17.
 */

let hierarchies = ["platformadmin", "clusteradmin", "chapteradmin", "subchapteradmin", "communityadmin", "teamLead"];
let mlHierarchyCount = Meteor.settings.private.HierarchyCount;

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
