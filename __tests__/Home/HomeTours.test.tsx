import Tours from '@/app/home/tours';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import shareReducer from "../../redux/shareSlice";
import toursReducer from "../../redux/toursSlice";
import userReducer from "../../redux/userSlice";

function renderWithStore(preloadedState?: any) {
	const store = configureStore({
		reducer: {
			user: userReducer,
			tours: toursReducer,
			share: shareReducer,
		} as any,
		preloadedState,
	});
  
	return render(
		<Provider store={store}>
			<Tours />
		</Provider>
	);
} 

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	const React = require('react');
  
	return {
	  ...actualNav,
	  useFocusEffect: (callback: any) => {
		React.useEffect(() => {
		  const cleanup = callback();
		  return cleanup;
		}, []);
	  },
	};
});  

describe('Tours Component', () => {
	it('renders title correctly', () => {
		const { getByText } = renderWithStore({
		  user: { token: 'test-token' },
		  tours: [],
		  share: {
			lookupTour: null,
			loading: false,
			error: null,
		  },
		});
	
		expect(getByText('Tour của tôi')).toBeTruthy();
	});
});
