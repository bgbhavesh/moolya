/**
 * Created by venkatasrinag on 17/1/17.
 */

import MoolyaCustomDateType from '../commons/graphQLScalar/Date';
import MlSchemaDef from '../commons/mlSchemaDef';
import {mergeStrings} from 'gql-merge';

const MlQueryResolver = {};
const MlMutationResolver = {};
const MlUnionResolver={};
const MlScalarResolver={};
const MlModuleResolver = [];
const MlResolver = {MlQueryResolver, MlMutationResolver,MlUnionResolver, MlScalarResolver, MlModuleResolver};



const MoolyaDateScalar = `scalar Date`;
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],MoolyaDateScalar]);
MlResolver.MlScalarResolver['Date']= MoolyaCustomDateType;


module.exports = MlResolver;


