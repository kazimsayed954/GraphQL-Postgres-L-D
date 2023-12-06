const MutationService = require("./mutation");
const QueryService = require("./query");

const resolvers = {
  Query: QueryService,
  Mutation:MutationService
};

module.exports = resolvers;
