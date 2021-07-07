import { Box, Typography } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import TaskCard from './TaskCard';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import IconButton from '@material-ui/core/IconButton';
import AddOrChangeTaskDialog from './AddOrChangeTaskDialog';
import { DayAsString } from '../../utilities/DateUtils';
import axios from '../../utils';
import useFetch from '../../hooks/useFetch';
import { ReloadContext } from '../../contexts/ReloadContext';

function DayTasks(props) {
	const day = props.day;
	const dayconv =
		day.getFullYear() +
		'-' +
		(day.getMonth() > 8 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)) +
		'-' +
		(day.getDate() > 9 ? day.getDate() : '0' + day.getDate());
	let endpoint = `users/${localStorage.getItem(
		'userId'
	)}/extraction?date=${dayconv}`;
	const { data: tasks, setData: setTasks } = useFetch(endpoint);
	const { reload } = useContext(ReloadContext);

	const reloadTasks = async () => {
		try {
			const res = await axios.get(endpoint);
			setTasks(res.data.tasks);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		reloadTasks();
	}, [reload]);

	const [count, setCount] = useState(0);

	return (
		<div
			style={{
				marginLeft: 9,
				height: '100%',
				marginRight: 9,
				width: 315,
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
					width: '100%',
					height: 70,
					textAlign: 'center',
					padding: 10,
					marginBottom: 60,
				}}
			>
				<Typography
					style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
				>
					{DayAsString(day.getDay())}
				</Typography>
				<Typography
					style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
				>
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
			{tasks
				.sort((task1, task2) => {
					return task1.start_time - task2.start_time;
				})
				.slice(count * 3, count * 3 + 3)
				.map((task) => {
					return (
						<TaskCard view="calendarView" task={task} reload={reloadTasks} />
					);
				})}
			{count * 3 + 3 < tasks.length && (
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
			<AddOrChangeTaskDialog
				taskslength={tasks.length}
				function="add"
				date={dayconv}
				reload={reloadTasks}
			/>
		</div>
	);
}

export default DayTasks;
