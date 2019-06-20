import React from 'react';
import GlobalStyle from './components/styled/GlobalStyles'

import AppContainer from './components/styled/AppStyle'

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <h1>Hello</h1>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
