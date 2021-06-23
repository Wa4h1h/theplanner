import React from 'react';
import TodaysPlanView from './components/calendar/TodaysPlanView';
import CalendarView from './components/calendar/CalendarView';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';
import Settings from './components/Settings';
import WeatherView from './components/weather/WeatherView';
import Grid from '@material-ui/core/Grid';

function HomePage() {
	return (
		<div style={{ backgroundColor: '#303841', maxHeight: '100%' }}>
			<Navbar />
			<Grid container spacing={0}>
				<Grid item xs={2}>
					<WeatherView />
				</Grid>
				<Grid item xs={10}>
					<div>
						<TodaysPlanView />
						<CalendarView />
					</div>
				</Grid>
			</Grid>
			<VoiceAssistant />
			<Settings />
		</div>
	);
}

export default HomePage;
