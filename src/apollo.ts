import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NavigateFunction } from "react-router-dom";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const uploadHttpLink: ApolloLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://rspsang-instaclone.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
    User: {
      keyFields: (obj) => `User:${obj.username}`,
    },
    Room: {
      fields: {
        messages: {
          merge: (existing = [], incoming) => [...existing, ...incoming],
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache,
});

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (navigate?: NavigateFunction) => {
  client.clearStore();
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  if (navigate) navigate(routes.home, { replace: true });
};
