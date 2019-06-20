import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GlobalStyle from './components/styled/GlobalStyles'
import Login from  './components/Login/Login'
import AppContainer from './components/styled/AppStyle'
import Friends from './components/Friends/Friends'

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Route path="/login" component={Login} />
          <Route path="/friends" component={Friends} />
        </Router>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
