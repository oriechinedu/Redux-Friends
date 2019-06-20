import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "./components/styled/GlobalStyles";
import Login from "./components/Login/Login";
import AppContainer from "./components/styled/AppStyle";
import Friends from "./components/Friends/Friends";
import PrivateRoute from './components/Auth/PrivateRoute'

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/friends" component={Friends} />
          </Switch>
        </Router>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
