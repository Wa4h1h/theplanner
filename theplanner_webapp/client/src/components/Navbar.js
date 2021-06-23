import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	scheduleIcon: {
		marginRight: 20,
        height: 60,
        width: 60,
	},
	title: {
		flex: 1,
        fontSize: 54,
        fontFamily: 'Megrim'
	},
	toolbar: {
		backgroundColor: '#132C33',
	},
}));

export default function Navbar() {
	const classes = useStyles();

	return (
		<div>
			<AppBar position="static" style={{ backgroundColor: '#132C33'}}>
				<Toolbar style={{height:'10vh'}}>
					<ScheduleIcon className={classes.scheduleIcon} />
					<Typography className={classes.title} variant="h6" color="inherit">
						thePlanner
					</Typography>
					<IconButton>
						<NotificationsIcon style={{color: 'white', width: 45, height:45}}/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}
