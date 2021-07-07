import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import axios from '../utils';
import { AuthStateContext } from '../contexts/AuthStateContext';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing(3),
		left: theme.spacing(3),
		width: 70,
		height: 70,
		color: '#132C33',
		backgroundColor: '#DDFCF8',
		'&:hover': {
			backgroundColor: '#62F9E6',
		},
	},
	fabLogout: {
		position: 'fixed',
		bottom: theme.spacing(15),
		left: theme.spacing(4),
		width: 50,
		height: 50,
		color: '#132C33',
		backgroundColor: '#DDFCF8',
		'&:hover': {
			backgroundColor: '#62F9E6',
		},
	},
	icon: {
		width: 40,
		height: 40,
	},
}));

function Settings() {
	const classes = useStyles();
	const { setLoggedIn } = useContext(AuthStateContext);

	const handleLogout = async () => {
		try {
			const res = await axios.get(
				`users/${localStorage.getItem('userId')}/logout`
			);
			localStorage.setItem('userId', -1);
			setLoggedIn(-1);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<Fab
				className={classes.fab}
				color="#132C33"
				onClick={handleLogout}
			>
				<ExitToAppRoundedIcon className={classes.icon} />
			</Fab>
		</React.Fragment>
	);
}

export default Settings;
