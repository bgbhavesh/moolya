/**
 * Created by venkatasrinag on 17/1/17.
 */
/* eslint-disable */
import MoolyaCustomDateType from '../commons/graphQLScalar/Date';
import GraphQLJSON from 'graphql-type-json';
import MlSchemaDef from '../commons/mlSchemaDef';
import {mergeStrings} from 'gql-merge';

const MlQueryResolver = {};
const MlMutationResolver = {};
const MlUnionResolver={};
const MlLoginResolver={};
const MlScalarResolver={};
const MlModuleResolver = [];
const MlResolver = {MlQueryResolver, MlMutationResolver,MlUnionResolver, MlScalarResolver, MlModuleResolver,MlLoginResolver};



const MoolyaDateScalar = `scalar Date`;
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],MoolyaDateScalar]);
MlResolver.MlScalarResolver['Date']= MoolyaCustomDateType;
MlResolver.MlScalarResolver['JSON']= {JSON: GraphQLJSON};

module.exports = MlResolver;


