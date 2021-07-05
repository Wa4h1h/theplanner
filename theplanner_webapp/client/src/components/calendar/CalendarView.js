import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import GetDates from '../../utilities/DateUtils';
import DayTasks from './DayTasks';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

function CalendarView() {
	const [startDate, setStartDate] = useState(new Date());
	var today = new Date();

	const handlePreviousFiveDays = () => {
		var newDate = new Date(startDate);
		newDate.setDate(startDate.getDate() - 5);
		setStartDate(newDate);
	};

	const handleNextFiveDays = () => {
		var newDate = new Date(startDate);
		newDate.setDate(startDate.getDate() + 5);
		setStartDate(newDate);
	};

	return (
		<Grid
			container
			style={{
				borderRadius: 8,
				width: '100%',
				minHeight: 600,
				height: '100%',
				backgroundColor: '#404550',
				marginBottom: 20,
				marginTop: 30,
				paddingBottom: 20,
				paddingTop: 20,
			}}
		>
			<Grid item xs={0.5}>
				<IconButton
					disabled={
						today.getDate() === startDate.getDate() &&
						today.getMonth() === startDate.getMonth() &&
						today.getFullYear() === startDate.getFullYear()
					}
					onClick={() => handlePreviousFiveDays()}
				>
					<ArrowLeftRoundedIcon
						style={{
							color:
								today.getDate() === startDate.getDate() &&
								today.getMonth() === startDate.getMonth() &&
								today.getFullYear() === startDate.getFullYear()
									? 'gray'
									: 'white',
							width: 45,
							height: 45,
						}}
					/>
				</IconButton>
			</Grid>
			{GetDates(startDate).map((day) => {
				return (
					<Grid item xs={2.2}>
						<DayTasks day={day} />
					</Grid>
				);
			})}
			<Grid item xs={0.5}>
				<IconButton onClick={() => handleNextFiveDays()}>
					<ArrowRightRoundedIcon
						style={{ color: 'white', width: 45, height: 45 }}
					/>
				</IconButton>
			</Grid>
		</Grid>
	);
}

export default CalendarView;
