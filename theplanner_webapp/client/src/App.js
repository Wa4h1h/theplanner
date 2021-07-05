import React, { useContext } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import HomePage from './Home';
import LoginPage from './components/loginAndRegister/LoginPage';
import RegisterPage from './components/loginAndRegister/RegisterPage';
import { AuthStateContext } from './contexts/AuthStateContext';
import SearchProvider from './contexts/SearchContext';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#303841',
		},
		secondary: {
			main: '#132C33',
		},
	},
	typography: {
		fontFamily: ['Roboto Condensed', 'sans-serif'].join(','),
	},
});

function App() {
	const { loggedIn } = useContext(AuthStateContext);

	return loggedIn > 0 ? (
		<ThemeProvider theme={theme}>
			<SearchProvider>
				<HomePage />
			</SearchProvider>
		</ThemeProvider>
	) : (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Switch>
					<Route path="/register">
						<RegisterPage />
					</Route>
					<Route exact path="/">
						<LoginPage />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

export default App;
