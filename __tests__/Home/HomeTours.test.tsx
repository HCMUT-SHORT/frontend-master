import Tours from '@/app/home/tours';
import { render } from '@testing-library/react-native';

describe('Tours Component', () => {
	it('Tours - Nothing', () => {
		const { getByTestId } = render(<Tours />);
		const container = getByTestId('tours-container');
		expect(container).toBeTruthy();
	});
});
