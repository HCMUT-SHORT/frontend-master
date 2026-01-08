import TourCreate2 from "@/app/tourcreate/tour2";
import { RootState } from "@/redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import tourCreateReducer, { TourCreateState } from "../../redux/tourCreateSlice";

type TestRootState = {
    tourCreate: TourCreateState;
}; 

function renderWithStore(preloadedState?: TestRootState) {
    const store = configureStore<{
      tourCreate: RootState["tourCreate"];
    }>({
      reducer: {
        tourCreate: tourCreateReducer,
      },
      preloadedState,
    });
  
    return {
      ...render(
        <Provider store={store}>
          <TourCreate2 />
        </Provider>
      ),
      store,
    };
}

const mockRouter = {
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
};
  
jest.mock("expo-router", () => ({
    useRouter: () => mockRouter,
}));

jest.mock("react-native-calendars", () => {
    const React = require("react");
    const { Text } = require("react-native");
    
    return {
      Calendar: ({ onDayPress }: any) => {
        return (
          <>
            <Text onPress={() => onDayPress({ dateString: "2024-10-10" })}>
              Select CheckIn
            </Text>
            <Text onPress={() => onDayPress({ dateString: "2024-10-15" })}>
              Select Too Long
            </Text>
          </>
        );
      },
      LocaleConfig: { locales: {}, defaultLocale: "vi" },
    };
});

jest.mock("@ptomasroos/react-native-multi-slider", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const MockMultiSlider = ({ onValuesChange }: any) => (
    <Text onPress={() => onValuesChange([2000000, 5000000])}>
      Change Budget
    </Text>
  );

  MockMultiSlider.displayName = "MockMultiSlider";

  return MockMultiSlider;
});

describe("TourCreate2", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });    

    it("renders calendar and budget section", () => {
        const { getByText } = renderWithStore();

        expect(getByText("Thời gian du lịch")).toBeTruthy();
        expect(getByText("Chi phí")).toBeTruthy();
        expect(getByText("Tiếp tục")).toBeTruthy();
    });

    it("does not navigate when checkInDate is missing", () => {
        const { getByText } = renderWithStore({
          tourCreate: {
            destination: "Hà Nội",
            travelType: "vacation",
            checkInDate: "",
            checkOutDate: "",
            MinBudget: "1000000",
            MaxBudget: "5000000",
          },
        });
      
        fireEvent.press(getByText("Tiếp tục"));
        expect(mockRouter.replace).not.toHaveBeenCalled();
    });

    it("navigates when dates exist", () => {
        const { getByText } = renderWithStore({
          tourCreate: {
            destination: "Hà Nội",
            travelType: "vacation",
            checkInDate: "2024-10-10",
            checkOutDate: "2024-10-12",
            MinBudget: "1000000",
            MaxBudget: "5000000",
          },
        });
      
        fireEvent.press(getByText("Tiếp tục"));
        expect(mockRouter.replace).toHaveBeenCalledWith("/tourloading");
    });

    it("shows error when selecting more than 3 days", () => {
        const { getByText } = renderWithStore({
          tourCreate: {
            destination: "Hà Nội",
            travelType: "vacation",
            checkInDate: "",
            checkOutDate: "",
            MinBudget: "",
            MaxBudget: "",
          },
        });
      
        fireEvent.press(getByText("Select CheckIn"));
        fireEvent.press(getByText("Select Too Long"));
      
        expect(
          getByText("Hiện tại app chỉ hỗ trợ tối đa 3 ngày 2 đêm! (Dev Nghèo)")
        ).toBeTruthy();
    });
      
    it("updates MinBudget and MaxBudget when slider changes", () => {
      const { getByText, store } = renderWithStore({
        tourCreate: {
          destination: "",
          travelType: "",
          checkInDate: "",
          checkOutDate: "",
          MinBudget: "",
          MaxBudget: "",
        },
      });
    
      fireEvent.press(getByText("Change Budget"));
    
      const state = store.getState().tourCreate;
    
      expect(state.MinBudget).toBe("2000000");
      expect(state.MaxBudget).toBe("5000000");
    });
})