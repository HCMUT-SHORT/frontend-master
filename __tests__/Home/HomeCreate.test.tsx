import Create from '@/app/home/create';
import { render } from '@testing-library/react-native';

describe('Create Component', () => {
    it('Create - Nothing', () => {
        const { getByText } = render(<Create />);
        expect(getByText('Create screen')).toBeTruthy();
    });
});
