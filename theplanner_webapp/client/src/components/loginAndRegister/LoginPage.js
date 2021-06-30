import React, { Fragment, useContext, useState } from 'react';
import {
	Box,
	Button,
	Card,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './StylesLoginAndRegister';
import axios from '../../utils';
import { AuthStateContext } from '../../contexts/AuthStateContext';

const LoginPage = () => {
	const classes = useStyles();
	const [username_, setUsername] = useState('');
	const [password_, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();
	const { setLoggedIn } = useContext(AuthStateContext);

	const changeUserInfo = (e) => {
		if (e.target.id === 'username-input') setUsername(e.target.value);
		if (e.target.id === 'password-input') setPassword(e.target.value);
	};

	const login = () => {
		const req = async () => {
			try {
				const res = await axios.post('users/login', {
					username: username_,
					password: password_,
				});
				localStorage.setItem('userId', res.data.id);
				setLoggedIn(1);
			} catch (err) {
				console.log(err);
			}
		};
		req();
	};

	return (
		<Fragment>
			<div className={classes.main}>
				<Box
					width="100%"
					height="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Card className={classes.card} elevation={3}>
						<Box
							height="100%"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
						>
							<Box
								p={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<AccountCircleIcon className={classes.icon} />
								<Typography
									className={classes.head}
									align="center"
									color="primary"
									variant="body2"
								>
									Login with your username and password
								</Typography>
								<Box
									mt={4}
									display="flex"
									flexDirection="column"
									justifyContent="space-between"
								>
									<FormControl
										className={classes.input}
										size="small"
										variant="outlined"
									>
										<InputLabel htmlFor="username-input">username</InputLabel>
										<OutlinedInput
											value={username_}
											onChange={changeUserInfo}
											id="username-input"
											labelWidth={70}
										/>
									</FormControl>
									<FormControl
										className={classes.input}
										size="small"
										variant="outlined"
									>
										<InputLabel htmlFor="password-input">password</InputLabel>
										<OutlinedInput
											value={password_}
											onChange={changeUserInfo}
											id="password-input"
											labelWidth={70}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														onClick={() => {
															setShowPassword(!showPassword);
														}}
														edge="end"
													>
														{showPassword ? (
															<VisibilityIcon />
														) : (
															<VisibilityOffIcon />
														)}
													</IconButton>
												</InputAdornment>
											}
											type={showPassword ? 'text' : 'password'}
										/>
									</FormControl>
								</Box>
								<Button variant="contained" color="secondary" onClick={login}>
									Login
								</Button>
							</Box>
							<Box display="flex" width="100%" mb={0} justifyContent="flex-end">
								<Link style={{ textDecoration: 'none' }} to="/register">
									<Box p={2}>
										<Typography style={{ color: '#132C33' }} variant="caption">
											Dont have an account? then register{' '}
										</Typography>
									</Box>
								</Link>
							</Box>
						</Box>
					</Card>
				</Box>
			</div>
		</Fragment>
	);
};

export default LoginPage;
