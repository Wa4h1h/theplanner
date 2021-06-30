import React from 'react';
import TodaysPlanView from './components/calendar/TodaysPlanView';
import CalendarView from './components/calendar/CalendarView';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';
import Settings from './components/Settings';
import ReloadState from './contexts/ReloadContext';

function HomePage() {
	return (
		<div style={{ backgroundColor: '#303841', maxHeight: '100%' }}>
			<Navbar />
			<ReloadState>
				<div style={{ paddingRight: 48, paddingLeft: 48, paddingBottom: 20 }}>
					<TodaysPlanView />
					<CalendarView />
				</div>
				<VoiceAssistant />
			</ReloadState>
			<Settings />
		</div>
	);
}

export default HomePage;
