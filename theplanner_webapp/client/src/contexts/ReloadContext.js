import { useState, createContext } from 'react';

export const ReloadContext = createContext();

const ReloadState = ({ children }) => {
	const [reload, setReload] = useState(false);

	return (
		<ReloadContext.Provider value={{ reload, setReload }}>
			{children}
		</ReloadContext.Provider>
	);
};

export default ReloadState;
