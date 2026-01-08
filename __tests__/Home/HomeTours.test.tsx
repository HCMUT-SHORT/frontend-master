import Tours from '@/app/home/tours';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react-native';
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

	it('renders share code input', () => {
		const { getByPlaceholderText } = renderWithStore({
		  user: { token: 'test-token' },
		  tours: [],
		  share: { lookupTour: null, loading: false, error: null },
		});
	  
		expect(
		  getByPlaceholderText('Nhập mã tour được chia sẻ')
		).toBeTruthy();
	});

	it('shows loading text when loading is true', () => {
		const { getByText } = renderWithStore({
		  user: { token: 'test-token' },
		  tours: [],
		  share: {
			lookupTour: null,
			loading: true,
			error: null,
		  },
		});
	  
		expect(getByText('Đang xử lý...')).toBeTruthy();
	});

	it('renders tour cards from tours state', () => {
		const { getByTestId } = renderWithStore({
			user: { token: 'test-token' },
			tours: [
			{
				id: '1',
				destination: 'Tokyo',
				imageUrl: '',
				checkInDate: '2025-11-27',
				checkOutDate: '2025-11-29',
			},
			],
			share: { lookupTour: null, loading: false, error: null },
		});

		expect(getByTestId('tourcard-Tokyo')).toBeTruthy();
	});


	it('updates share code input value', () => {
		const { getByPlaceholderText } = renderWithStore({
		  user: { token: 'test-token' },
		  tours: [],
		  share: { lookupTour: null, loading: false, error: null },
		});
	  
		const input = getByPlaceholderText('Nhập mã tour được chia sẻ');
	  
		fireEvent.changeText(input, 'abc123');
	  
		expect(input.props.value).toBe('abc123');
	});
});
