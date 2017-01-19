/**
 * Created by venkatasrinag on 18/1/17.
 */

import MlResolver from '../mlAdminResolverDef'

MlResolver['LeftNav'] = () =>{
    return MlLeftNav.find().fetch();
}
