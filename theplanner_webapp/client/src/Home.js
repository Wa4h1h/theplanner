import React, { useContext } from 'react';
import TodaysPlanView from './components/calendar/TodaysPlanView';
import CalendarView from './components/calendar/CalendarView';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';
import Settings from './components/Settings';
import ReloadState from './contexts/ReloadContext';
import { SearchContext } from './contexts/SearchContext';
import SearchedTasksView from './components/calendar/SearchedTasksView';

function HomePage() {
	const { query } = useContext(SearchContext);

	return (
		<div style={{ backgroundColor: '#303841', maxHeight: '100%' }}>
			<Navbar />
			<ReloadState>
				<div style={{ paddingRight: 48, paddingLeft: 48, paddingBottom: 20 }}>
					{query.title !== null || query.date !== null ? (
						<SearchedTasksView />
					) : (
						<React.Fragment>
							<TodaysPlanView />
							<CalendarView />
						</React.Fragment>
					)}
				</div>
				<VoiceAssistant />
			</ReloadState>
			<Settings />
		</div>
	);
}

export default HomePage;
