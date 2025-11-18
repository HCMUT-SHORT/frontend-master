import type { PlaceToVisit, TourState } from "@/constants/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TourState[] = [];

const ToursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {
        addTour: (state, action: PayloadAction<TourState>) => {
            state.push(action.payload);
        },
        addPlacesToVisit: (state, action: PayloadAction<{ tourId: string, places: PlaceToVisit[] }>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (selected) {
                selected.placesToVisit = action.payload.places;
            }
        }
    }
});

export const { addTour, addPlacesToVisit } = ToursSlice.actions;
export default ToursSlice.reducer;