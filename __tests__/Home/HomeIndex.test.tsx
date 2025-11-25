import Home from "@/app/home";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from '@testing-library/react-native';
import Animated from "react-native-reanimated";
import { Provider } from "react-redux";

const mockTours = [
    {
        "changedPlaces": {}, 
        "changedPlacesStay": {}, 
        "changedTransportations": {}, 
        "checkInDate": "2025-12-10", 
        "checkOutDate": "2025-12-12", 
        "createdAt": "2025-11-23T23:45:13.856947+00:00", 
        "createdBy": "7e4229ac-2014-46d1-9bd6-2591fe6a9a85", 
        "destination": "Quy Nhon", 
        "id": "ea529baf-f0ca-409b-a76f-0d112060c327", 
        "imageUrl": "https://vietnamnomad.com/wp-content/uploads/2020/09/Quy-Nhon-Travel-Guide-Vietnamnomad.jpg", 
        "maxBudget": "79000000", 
        "minBudget": "48000000", 
        "placeToStayError": "", 
        "placesToStay": [], 
        "placesToVisit": [], 
        "transportations": [], 
        "travelType": "vacation"
    }, 
    {
        "changedPlaces": {}, 
        "changedPlacesStay": {}, 
        "changedTransportations": {}, 
        "checkInDate": "2025-11-28", 
        "checkOutDate": "2025-11-30", 
        "createdAt": "2025-11-23T22:56:59.554558+00:00", 
        "createdBy": "7e4229ac-2014-46d1-9bd6-2591fe6a9a85", 
        "destination": "Osaka", 
        "id": "a615e89b-284e-4daf-817c-29026e8d2ccf", 
        "imageUrl": "https://www.frasershospitality.com/en/fraser-cachet/go-local/your-ultimate-guide-to-experiencing-autumn-in-osaka/_jcr_content/root/column_controller/column-1-wrapper/image_149071.coreimg.jpeg/1663260807569/article-image-1200x800-osakacastle-min.jpeg", 
        "maxBudget": "100000000", 
        "minBudget": "64000000", 
        "placeToStayError": "", 
        "placesToStay": [], 
        "placesToVisit": [], 
        "transportations": [], 
        "travelType": "Honeymoon"
    }, 
    {
        "changedPlaces": {}, 
        "changedPlacesStay": {}, 
        "changedTransportations": {}, 
        "checkInDate": "2025-11-27", 
        "checkOutDate": "2025-11-29", 
        "createdAt": "2025-11-23T18:16:44.815437+00:00", 
        "createdBy": "7e4229ac-2014-46d1-9bd6-2591fe6a9a85", 
        "destination": "Tokyo", 
        "id": "806e6ec9-8abf-4800-b950-b834b29bbde4", 
        "imageUrl": "https://www.phenomenalglobe.com/wp-content/uploads/2019/12/Tokyo-Tower-at-night.jpg", 
        "maxBudget": "90000000", 
        "minBudget": "70000000", 
        "placeToStayError": "", 
        "placesToStay": [], 
        "placesToVisit": [], 
        "transportations": [], 
        "travelType": "exploration"
    }
]

const createTestStore = () => {
    return configureStore({
        reducer: {
            tours: (state = mockTours, action: any) => state,
            user: (state = {}, action: any) => state,
            tourCreate: (state = {}, action: any) => state,
        }
    });
};

const renderWithStore = (component: React.ReactElement) => {
    const store = createTestStore();
    return render(<Provider store={store}>{component}</Provider>);
}

describe("Home Component", () => {
    it("Home - Khám phá thế giới hùng vĩ", () => {
        const { getByText } = renderWithStore(<Home />);
        expect(getByText('Khám phá thế giới hùng vĩ')).toBeTruthy();
    });

    it("Home - Tour của tôi", () => {
        const { getByText } = renderWithStore(<Home />);
        expect(getByText('Tour của tôi')).toBeTruthy();
    });

    it("Home - Xem tất cả", () => {
        const { getByText } = renderWithStore(<Home />);
        expect(getByText('Xem tất cả')).toBeTruthy();
    });

    it("Home - Render 3 tours", () => {
        const { getAllByTestId } = renderWithStore(<Home />);
        const destinations = getAllByTestId("tour-destination");
        expect(destinations.length).toBe(3);
    });

    it('Home - filters tours with no createdAt', () => {
        const store = configureStore({
            reducer: {
                tours: (state = [...mockTours, { ...mockTours[0], id: '4', createdAt: undefined }], action) => state,
                user: (state = {}, action) => state,
                tourCreate: (state = {}, action) => state,
            }
        });
        const { queryByText } = render(<Provider store={store}><Home /></Provider>);
        expect(queryByText('Quy Nhon')).toBeTruthy();
    });

    it("Home - Render Quy Nhon Tour Card", () => {
        const { getByTestId, getAllByTestId } = renderWithStore(<Home />);
        expect(getByTestId("tourcard-Quy Nhon")).toBeTruthy();
        const destinations = getAllByTestId('tour-destination');
        expect(destinations[0].children[0]).toBe('Quy Nhon');
    });

    it("Home - Render Osaka Tour Card", () => {
        const { getByTestId, getAllByTestId } = renderWithStore(<Home />);
        expect(getByTestId("tourcard-Osaka")).toBeTruthy();
        const destinations = getAllByTestId('tour-destination');
        expect(destinations[1].children[0]).toBe('Osaka');
    });

    it("Home - Render Tokyo Tour Card", () => {
        const { getByTestId, getAllByTestId } = renderWithStore(<Home />);
        expect(getByTestId("tourcard-Tokyo")).toBeTruthy();
        const destinations = getAllByTestId('tour-destination');
        expect(destinations[2].children[0]).toBe('Tokyo');
    });

    it("Home - TourCard Scroll", () => {
        const { getAllByTestId, UNSAFE_getByType } = renderWithStore(<Home />);
        const tourCards = getAllByTestId(/^tour-/);
        expect(tourCards.length).toBe(3);

        const flatList = UNSAFE_getByType(Animated.FlatList);
        fireEvent.scroll(flatList, {
            nativeEvent: {
                contentOffset: { x: 100 },
            },
        });
    });
})