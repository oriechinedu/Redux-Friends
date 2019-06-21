import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "./components/styled/GlobalStyles";
import Login from "./components/Auth/Login/Login";
import AppContainer from "./components/styled/AppStyle";
import Friends from "./components/Friends/Friends";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Header from "./components/Header/Header";
import AddNewFriendForm from "./components/Friends/AddFriendForm";
import ReduxToastr from "react-redux-toastr";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <Router>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/friends" component={Friends} />
            <PrivateRoute path="/friends/add" component={AddNewFriendForm} />
            <PrivateRoute
              path="/friends/:friendId/edit"
              component={AddNewFriendForm}
            />
          </Switch>
        </Router>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
