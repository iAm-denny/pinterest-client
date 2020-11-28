import { useState } from 'react'
import { Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Detail from "./components/Detail";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Post from "./components/Post";
import { LoginContext, UserContext } from "./Helper/Context";

const client = new ApolloClient({
  uri: "https://pinterest--clone.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState("")
  return (
    <ApolloProvider client={client}>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <UserContext.Provider value={{userProfile, setUserProfile}}>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/pin/:id/:userid" component={Detail} />
          <Route path="/post" component={Post} />
        </Switch>
        </UserContext.Provider>
      </LoginContext.Provider>
    </ApolloProvider>
  );
}

export default App;
