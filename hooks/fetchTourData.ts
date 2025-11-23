import { axiosClient } from "@/api/axiosClient";
import { TourState } from "@/constants/type";
import { AppDispatch } from "@/redux/store";
import { addPlacesToStay, addPlacesToVisit, addTransportations } from "@/redux/toursSlice";
import { parseDays } from "@/utility/stringConverter";

export const fetchPlacesToVisit = async (selectedTour: TourState, dispatch: AppDispatch) => {
    if (selectedTour?.placesToVisit && selectedTour.placesToVisit.length > 0) return;

    try {
        const response = await axiosClient.get(`/tour/placestovisit/${selectedTour.id}`);
    
        const transformedPlaces = response.data.map((place: any) => ({
            ...place,
            dayVisit: parseDays(place.dayVisit)
        }));

        const sortedPlaces = transformedPlaces.sort((a: any, b: any) => {
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            } else {
                return b.totalRating - a.totalRating;
            }
        });

        dispatch(addPlacesToVisit({ tourId: selectedTour.id || "", places: sortedPlaces}))
    } catch (error: any) {
        console.log("There is error fetching places to visit: ", error.message);
        return;
    }
};

export const fetchPlacesToStay = async (selectedTour: TourState, dispatch: AppDispatch) => {
    if (selectedTour?.placesToStay && selectedTour.placesToStay.length > 0) return;

    try {
        const response = await axiosClient.get(`/tour/placestostay/${selectedTour.id}`);
        const sortedPlaces = response.data.sort((a: any, b: any) => {
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            } else {
                return b.totalRating - a.totalRating;
            }
        });
        dispatch(addPlacesToStay({ tourId: selectedTour.id || "", places: sortedPlaces }));
    } catch(error: any) {
        console.log("There is an error fetching places to stay:", error.message);
    }
}

export const fetchTransportations = async (selectedTour: TourState, dispatch: AppDispatch) => {
    if (selectedTour?.transportations && selectedTour.transportations.length > 0) return;

    try {
        const response = await axiosClient.get(`/tour/transportation/${selectedTour.id}`);
        dispatch(addTransportations({ tourId: selectedTour.id || "", transportations: response.data }));
    } catch(error: any) {
        console.log("There is an error fetching transportations: ", error.message);
    } 
}