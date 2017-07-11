import MoolyaSelect from '../../../commons/containers/select/MlSelectComposer';
import React from 'react';
import {appClient} from '../../core/appConnection';

/**
 * Method :: anonymous
 * Desc   :: wraps the generic MlSelect component with apollo connection for app
 * @param queryOptions :: Object ::Query options containing variables/parameters
 * @returns  {<React.Component>}
 */
export default (queryOptions)=>{
  return <MoolyaSelect {...queryOptions} connection={appClient}/>;
}
