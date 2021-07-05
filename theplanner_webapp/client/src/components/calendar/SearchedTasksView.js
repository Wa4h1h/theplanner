import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import TaskCard from './TaskCard';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../utils';
import useFetch from '../../hooks/useFetch';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { ReloadContext } from '../../contexts/ReloadContext';
import { SearchContext } from '../../contexts/SearchContext';

function SearchedTasksView(props) {
	const { query, setQuery } = useContext(SearchContext);

	let endpointDate = `users/${localStorage.getItem('userId')}/extraction?date=${
		query.date
	}`;
	let endpointTitle = `tasks/extraction/${query.title}`;
	let endpointTitleAndDate = `tasks/extraction/${query.title}/${query.date}`;
	const endpoint =
		query.title !== null
			? query.date !== null
				? endpointTitleAndDate
				: endpointTitle
			: endpointDate;

	const { data: tasks, setData: setTasks } = useFetch(endpoint);

	const reloadTasks = async () => {
		try {
			const res = await axios.get(endpoint);
			setTasks(res.data.tasks);
		} catch (err) {
			console.log(err);
		}
	};

	const nullObj = {
		title: null,
		date: null,
	};

	const [count, setCount] = useState(0);

	return (
		<div
			style={{
				borderRadius: 8,
				width: '100%',
				minHeight: 795,
				height: '100%',
				backgroundColor: '#404550',
				marginBottom: 15,
				marginTop: 35,
				paddingBottom: 20,
				paddingLeft: 100,
			}}
		>
			<IconButton
				style={{
					position: 'relative',
					float: 'right',
					color: 'white',
				}}
				onClick={() => {
					setQuery(nullObj);
				}}
			>
				<CloseIcon />
			</IconButton>
			<Box
				display="flex"
				justifyContent="center"
				width="100%"
				paddingRight="100px"
                paddingTop="50px"
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="center" width="100%">
							<Typography
								style={{
									fontSize: 26,
									marginBottom: 5,
									marginRight: 10,
									color: 'white',
								}}
							>
								{'Your Searched Tasks' +
									(query.title ? 'with this title: ' + query.title : '') +
									(query.title && query.date ? ' and ' : '') +
									(query.date ? ' on this date: ' + query.date : '')}
							</Typography>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" justifyContent="center" width="100%">
							<IconButton
								disabled={count === 0}
								onClick={() => setCount(count - 1)}
							>
								<ArrowDropUpRoundedIcon
									style={{
										color: count === 0 ? 'gray' : 'white',
										width: 100,
										height: 100,
									}}
								/>
							</IconButton>
						</Box>
					</Grid>
					<Grid container spacing={4} item xs={12}>
						{tasks.slice(count * 6, count * 6 + 6).map((task) => {
							return (
								<Grid item xs={4}>
									<TaskCard
										view="searchView"
										search="true"
										task={task}
										reload={reloadTasks}
									/>
								</Grid>
							);
						})}
					</Grid>
					{count * 6 + 6 < tasks.length && (
						<Grid item xs={12}>
							<Box display="flex" justifyContent="center" width="100%">
								<IconButton onClick={() => setCount(count + 1)}>
									<ArrowDropDownRoundedIcon
										style={{ color: 'white', width: 100, height: 100 }}
									/>
								</IconButton>
							</Box>
						</Grid>
					)}
				</Grid>
			</Box>
		</div>
	);
}

export default SearchedTasksView;
