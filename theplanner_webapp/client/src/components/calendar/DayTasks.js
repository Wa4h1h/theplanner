import { Box, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import IconButton from '@material-ui/core/IconButton';
import AddOrChangeTaskDialog from './AddOrChangeTaskDialog';
import { DayAsString } from '../../utilities/DateUtils';
import axios from '../../utils';

function DayTasks(props) {
	const day = props.day;
	const dayconv =
		day.getFullYear() +
		'-' +
		(day.getMonth() > 8 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)) +
		'-' +
		(day.getDate() > 9 ? day.getDate() : '0' + day.getDate());
	const [tasks, setTasks] = useState([]);
	var endpoint = `users/${localStorage.getItem(
		'userId'
	)}/extraction?date=${dayconv}`;

	const reload = async () => {
		try {
			const res = await axios.get(endpoint);
			setTasks(res.data.tasks);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await axios.get(endpoint);
				setTasks(res.data.tasks);
			} catch (err) {
				console.log(err);
			}
		};
		fetch();
	}, [endpoint]);

	const [count, setCount] = useState(0);

	return (
		<div
			style={{
				marginLeft: 10,
				height: '100%',
				marginRight: 10,
				display: 'inline-block',
				borderRadius: 10,
				backgroundColor:
					day.getDay() === 6 || day.getDay() === 0 ? '#3A6351' : '#404550',
			}}
		>
			<div
				style={{
					borderRadius: 10,
					backgroundColor: '#132C33',
					width: 261,
					height: 70,
					textAlign: 'center',
					padding: 10,
					marginBottom: 60,
				}}
			>
				<Typography style={{ color: 'white' , fontWeight:'bold', fontSize: 20}}>
					{DayAsString(day.getDay())}
				</Typography>
				<Typography style={{ color: 'white' , fontWeight:'bold', fontSize: 16}}>
					{day.getDate() +
						'.' +
						(day.getMonth() > 8
							? day.getMonth() + 1
							: '0' + (day.getMonth() + 1))}
				</Typography>
			</div>
			{count !== 0 && (
				<Box display="flex" justifyContent="center" width="100%">
					<IconButton
						onClick={() => {
							setCount(count - 1);
						}}
					>
						<ArrowDropUpRoundedIcon style={{ color: 'white' }} />
					</IconButton>
				</Box>
			)}
			{tasks.length > 3
				? tasks.slice(count * 3, count * 3 + 3).map((task) => {
					    console.log(task);
						return <TaskCard view="calendarView" task={task} reload={reload} />;
				  })
				: tasks.map((task) => {
						return <TaskCard view="calendarView" task={task} reload={reload} />;
				  })}
			{count * 3 + 3 <= tasks.length && (
				<Box display="flex" justifyContent="center" width="100%">
					<IconButton
						onClick={() => {
							setCount(count + 1);
						}}
					>
						<ArrowDropDownRoundedIcon style={{ color: 'white' }} />
					</IconButton>
				</Box>
			)}
			<AddOrChangeTaskDialog taskslength={tasks.length} function="add" date={dayconv} reload={reload} />
		</div>
	);
}

export default DayTasks;
