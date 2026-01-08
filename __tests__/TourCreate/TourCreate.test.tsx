import TourCreate1 from "@/app/tourcreate";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import tourCreateReducer from "../../redux/tourCreateSlice";

function renderWithStore() {
    const store = configureStore({
        reducer: {
            tourCreate: tourCreateReducer,
        },
    });
  
    return {
        ...render(
            <Provider store={store}>
                <TourCreate1 />
            </Provider>
        ),
        store,
    };
}

describe("TourCreate1", () => {
    it("renders input and travel types", () => {
        const { getByText, getByPlaceholderText } = renderWithStore();

        expect(getByText("Nơi bạn muốn đến")).toBeTruthy();
        expect(getByPlaceholderText("Tìm kiếm địa điểm")).toBeTruthy();
        expect(getByText("Thám hiểm")).toBeTruthy();
    })

    it("allows entering destination", () => {
        const { getByPlaceholderText, store } = renderWithStore();

        fireEvent.changeText(getByPlaceholderText("Tìm kiếm địa điểm"), "Đà Nẵng");
        expect(store.getState().tourCreate.destination).toBe("Đà Nẵng");
    });

    it("allows selecting travel type", () => {
        const { getByText, store } = renderWithStore();

        fireEvent.press(getByText("Nghỉ dưỡng"));
        expect(store.getState().tourCreate.travelType).toBe("vacation");
    });

    it("enables Continue button when destination & travel type are filled", () => {
        const { getByText, getByPlaceholderText } = renderWithStore();

        fireEvent.changeText(
            getByPlaceholderText("Tìm kiếm địa điểm"),
            "Hà Nội"
        );
        fireEvent.press(getByText("Sinh thái"));

        const continueButton = getByText("Tiếp tục");
        expect(continueButton.props.accessibilityState?.disabled).toBeFalsy();
    });
});