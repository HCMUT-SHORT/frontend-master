jest.mock("expo-router", () => ({
    useRouter: () => ({
        prefetch: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
}));