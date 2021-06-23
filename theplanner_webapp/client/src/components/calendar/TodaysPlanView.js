import { Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import axios from '../../utils';
import AddOrChangeTaskDialog from './AddOrChangeTaskDialog';
import useFetch from '../../hooks/useFetch';

function TodaysPlanView() {
	const [count, setCount] = useState(0);
	const today = new Date();
	const todayconv =
		today.getFullYear() +
		'-' +
		(today.getMonth() > 8
			? today.getMonth() + 1
			: '0' + (today.getMonth() + 1)) +
		'-' +
		(today.getDate() > 9 ? today.getDate() : '0' + today.getDate());
	let endpoint = `users/${localStorage.getItem(
		'userId'
	)}/extraction?date=${todayconv}`;
	
	const {data:tasks,setData:setTasks}=useFetch(endpoint)
	

	const reload = async () => {
		try {
			const res = await axios.get(endpoint);
			setTasks(res.data.tasks);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Grid container 
			/* style={{
				width: '100%',
				paddingTop: 20,
				justifyItems: 'center',
			}} */
		>
				<Grid item xs={12}>
					<div style={{ display: 'inline-block' }}>
						<Typography
							style={{
								fontSize: 26,
								marginBottom: 5,
								marginRight: 10,
								color: 'white',
								marginLeft: 140,
							}}
						>
							Today's Plan
						</Typography>
					</div>
					<div style={{ display: 'inline-block', marginTop: 20}}>
						<AddOrChangeTaskDialog
							function="add"
							date={todayconv}
							reload={reload}
						/>
					</div>
				</Grid>

				<Grid item xs={1}>
					<IconButton
						disabled={count === 0}
						onClick={() => setCount(count - 1)}
					>
						<ArrowLeftRoundedIcon
							style={{
								color: count === 0 ? 'gray' : 'white',
								width: 100,
								height: 100,
							}}
						/>
					</IconButton>
				</Grid>
				{tasks.slice(count * 3, count * 3 + 3).map((task) => {
					return (
						<Grid item xs={3}>
							<TaskCard view="todaysPlan" task={task} />
						</Grid>
					);
				})}
				{count * 3 + 3 < tasks.length && (
					<Grid item xs={1}>
						<IconButton onClick={() => setCount(count + 1)}>
							<ArrowRightRoundedIcon
								style={{ color: 'white', width: 100, height: 100 }}
							/>
						</IconButton>
					</Grid>
				)}
		</Grid>
	);
}

export default TodaysPlanView;
