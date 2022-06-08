import React from "react";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "./components/Client";
import AddClientModel from "./components/AddClientModel";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Header />

        <div className="container">
          <AddClientModel />
          <Client />
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
