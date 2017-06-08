/**
 * Created by venkatsrinag on 7/6/17.
 */

let stages = [
  'likes',
  'comment',
  'wishlist',
  'shortlist',
  'onboard'
]

Meteor.startup(function () {
    for (i = 0; i < stages.length; i++) {
        let stage = MlProcessStages.findOne({name: stages[i]});
        if (!stage) {
            stage = {name: stages[i], displayName: stages[i], code: stages[i].toUpperCase(), isActive: true};
            MlProcessStages.insert(stage);
        }
    }
});
