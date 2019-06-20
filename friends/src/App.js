import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GlobalStyle from './components/styled/GlobalStyles'
import Login from  './components/Login/Login'
import AppContainer from './components/styled/AppStyle'
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Route path="/login" component={Login} />
        </Router>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
