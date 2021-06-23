import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import AddOrChangeTaskDialog from './AddOrChangeTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';

const useStyles = makeStyles((theme) => ({
	todaysPlanStyle: {
		
		height: 110,
		marginRight: 10,
		marginLeft: 10,
		backgroundColor: '#E3CDC1',
		borderRadius: 8,
		paddingTop: 10,
		paddingRight: 15,
		paddingLeft: 10,
		paddingBottom: 10,
	},
	calendarStyle: {
		width: 261,
		marginTop: 20,
		backgroundColor: '#E3CDC1',
		borderRadius: 8,
		paddingTop: 10,
		paddingRight: 15,
		paddingLeft: 10,
	},
}));

function TaskCard(props) {
	const classes = useStyles();

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
					{props.task.start_time}H - {props.task.end_time}H
				</Typography>
			</div>
			<Checkbox />
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
