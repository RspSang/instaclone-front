import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.home}
                element={
                  isLoggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Login />
                  )
                }
              />
              {!isLoggedIn ? (
                <Route path={routes.signUp} element={<SignUp />} />
              ) : null}
              <Route
                path={`/users/:username`}
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path={`/users/:username/edit`}
                element={
                  <Layout>
                    <EditProfile />
                  </Layout>
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
