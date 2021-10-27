import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink
  } from "@apollo/client";
  
export const link = createHttpLink({ uri: "http://localhost:8080/graphql"  });
const client = new ApolloClient({cache: new InMemoryCache(), link});
  
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
        ,document.getElementById("root"));
