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
                selected.changedPlaces = {};
            }
        },
        togglePlaceDayVisit: (state, action: PayloadAction<{ tourId: string; placeId: string; day: number }>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (!selected) return;

            const place = selected.placesToVisit.find(p => p.id === action.payload.placeId);
            if (!place) return;

            let dayVisit = selected.changedPlaces[action.payload.placeId] ?? [...place.dayVisit];
            
            if (dayVisit.includes(action.payload.day)) {
                dayVisit = dayVisit.filter(d => d !== action.payload.day);
            } else {
                dayVisit.push(action.payload.day);
            }

            if (dayVisit.length === 0 || dayVisit.join(",") === place.dayVisit.join(",")) {
                delete selected.changedPlaces[action.payload.placeId];
            } else {
                selected.changedPlaces[action.payload.placeId] = dayVisit;
            }
        }
    }
});

export const { addTour, addPlacesToVisit, togglePlaceDayVisit } = ToursSlice.actions;
export default ToursSlice.reducer;