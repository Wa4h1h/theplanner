import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import AddOrChangeTaskDialog from './AddOrChangeTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';
import axios from '../../utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
	todaysPlanStyle: {
		height: 110,
		marginRight: 10,
		marginLeft: 10,
		backgroundColor: '#E3CDC1',
		borderRadius: 10,
		paddingTop: 10,
		paddingRight: 10,
		paddingLeft: 10,
	},
	calendarStyle: {
		width: '100%',
		marginTop: 20,
		backgroundColor: '#E3CDC1',
		borderRadius: 10,
		paddingTop: 10,
		paddingRight: 10,
		paddingLeft: 10,
	},
}));

function TaskCard(props) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(props.task.state);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleChange = async (event) => {
		setIsLoading(true);
		var task = Object.assign(props.task);
		task.state = event.target.checked;
		try {
			await axios.put(`tasks/${props.task.id}/complete`);
			setChecked(true);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className={
				props.view === 'todaysPlan'
					? classes.todaysPlanStyle
					: classes.calendarStyle
			}
		>
			<div>
				<Typography style={{ fontSize: 22, fontWeight: 'bold' }}>
					{props.task.title}
				</Typography>
				<Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
					{props.search ? props.task.date + " - ": null} {props.task.start_time}H - {props.task.end_time}H
				</Typography>
			</div>
			{checked === true ? (
				<DoneIcon style={{marginTop: 10}}/>
			) : isLoading === true ? (
				<CircularProgress />
			) : (
				<Checkbox checked={checked} onChange={handleChange} />
			)}
			<div style={{ float: 'right' }}>
				<AddOrChangeTaskDialog
					function="edit"
					task={props.task}
					reload={props.reload}
				/>
				<DeleteTaskDialog task={props.task} reload={props.reload} />
			</div>
		</div>
	);
}

export default TaskCard;
