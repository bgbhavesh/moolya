/**
 * Created by venkatasrinag on 18/1/17.
 */

import MlResolver from '../mlAdminResolverDef'


MlResolver['FetchMenu'] = (_,{name},context) =>{
    return MlMenus.findOne({name});
}
