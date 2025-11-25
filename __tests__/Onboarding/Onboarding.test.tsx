import Onboarding from "@/app/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

jest.mock('@/components/OnBoardingItem', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
  
    return {
        OnBoardingItem: ({ title, description }: any) => {
            return (
                <View testID="onboarding-item">
                    <Text testID="onboarding-title">{title}</Text>
                    <Text testID="onboarding-description">{description}</Text>
                </View>
            );
        },
    };
});

jest.mock('@/assets/Icons/Onboarding1', () => ({
    IconOnboarding1: () => 'IconOnboarding1',
}));

jest.mock('@/assets/Icons/Onboarding2', () => ({
    IconOnboarding2: () => 'IconOnboarding2',
}));

jest.mock('@/assets/Icons/Onboarding3', () => ({
    IconOnboarding3: () => 'IconOnboarding3',
}));

const mockRouter = {
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
};
  
jest.mock("expo-router", () => ({
    useRouter: () => mockRouter,
}));

describe("Onboarding", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Onboarding - Items", () => {
        const { getAllByTestId } = render(<Onboarding />);
        const items = getAllByTestId('onboarding-item');
        expect(items.length).toBe(3);
    });

    it('Onboarding - Text', () => {
        const { getAllByTestId } = render(<Onboarding />);
        const titles = getAllByTestId('onboarding-title');
        const descriptions = getAllByTestId('onboarding-description');
    
        expect(titles[0].children[0]).toBe('Khám phá dễ dàng');
        expect(descriptions[0].children[0]).toContain('Thông tin địa điểm chi tiết');
    
        expect(titles[1].children[0]).toBe('Lên kết hoạch thông minh');
        expect(descriptions[1].children[0]).toContain('Công nghệ AI gợi ý');
    
        expect(titles[2].children[0]).toBe('Chia sẻ cùng với mọi người');
        expect(descriptions[2].children[0]).toContain('Dễ dàng chia sẻ lịch trình');
    });

    it('Onboarding - prefetch authentication route on mount', () => {
        render(<Onboarding />);
        expect(mockRouter.prefetch).toHaveBeenCalledWith('/authentication');
    });

    it('Onboarding - render skip and next buttons', () => {
        const { getByText, getByTestId } = render(<Onboarding />);
        expect(getByText('Bỏ qua')).toBeTruthy();
        expect(getByTestId("next-button")).toBeTruthy();
    });

    it('Onboarding - render all UI elements correctly', () => {
        const { getByText, getAllByTestId } = render(<Onboarding />);
    
        expect(getByText('Bỏ qua')).toBeTruthy();
        expect(getAllByTestId('onboarding-item')).toHaveLength(3);
        expect(getAllByTestId('onboarding-title')).toHaveLength(3);
        expect(getAllByTestId('onboarding-description')).toHaveLength(3);
    });

    it("Onboarding - Skip Button", async () => {
        const { getByText } = render(<Onboarding />);
        const skipButton = getByText('Bỏ qua');

        fireEvent.press(skipButton);
        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('hasOnboarded', 'true');
            expect(mockRouter.replace).toHaveBeenCalledWith('/authentication');
        });
    });

    it("Onboarding - Next Button 1 time", async () => {
        const { getByTestId } = render(<Onboarding/>);
        const nextButton = getByTestId("next-button");

        fireEvent.press(nextButton);

        await waitFor(() => {
            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
            expect(mockRouter.replace).not.toHaveBeenCalled();
        })
    });
});