const { ApolloServer, gql } = require('apollo-server');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

const typeDefs = gql`
    type Vehicle {
        vehicleId: ID!
        year: Int
        make: String
        model: String
        expense: [Expense]
    }

    type Expense {
        expenseId: ID!
        amount: Float!
        description: String!
    }

    type Query {
        vehicles: [Vehicle]
    }
`;

const resolvers = {
    Query: {
      vehicles: async () => {        
        const response = await supabase
            .from("vehicle")
            .select("vehicleId: id, *, expense(expenseId: id, *)")
            .eq("deleted", false)
            .eq("expense.deleted", false, {foreignTable: "expense"})
        
        return response.data;
      }
    },
  };

  const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true
});

server.listen({ address: process.env.ADDRESS || "0.0.0.0", port: process.env.PORT || 8080 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});