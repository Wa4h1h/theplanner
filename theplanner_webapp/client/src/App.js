import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import HomePage from './Home';
import LoginPage from './components/loginAndRegister/LoginPage';
import RegisterPage from './components/loginAndRegister/RegisterPage';
import UserProvider from './contexts/UserProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#303841',
    },
    secondary: {
      main: '#132C33'
    },
  },
  typography: {
    fontFamily: [
      'Roboto Condensed', 'sans-serif'
    ].join(',')
  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage />
            </Route>
          </Switch>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
