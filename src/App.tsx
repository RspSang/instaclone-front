import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Hashtag from "./screens/Hashtag";

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
              <Route path="/" element={<Home />}>
                <Route path="photos/:id" element={<Home />} />
              </Route>
              {!isLoggedIn && <Route path="/login" element={<Login />} />}
              {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
              <Route path="users/:username" element={<Profile />}>
                <Route path="photos/:id" element={<Profile />} />
                <Route path="followers" element={<Profile />} />
                <Route path="following" element={<Profile />} />
              </Route>
              <Route path={`/users/:username/edit`} element={<EditProfile />} />
              <Route path={`/hashtags/:hashtag`} element={<Hashtag />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
