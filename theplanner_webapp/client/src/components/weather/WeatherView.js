import { Typography } from '@material-ui/core';
import React from 'react';
import WeatherItem from './WeatherItem';

function WeatherView() {
	return (
		<div style={{textAlign:'center',paddingTop: 20, justifyItems: 'center'}}>
			<Typography style={{ fontSize: 26, marginBottom: 5, color: 'white'}}>
				Today's Weather
			</Typography>
			{[0, 1, 2, 3, 4].map((i) => {
				return <WeatherItem />;
			})}
		</div>
	);
}

export default WeatherView;
