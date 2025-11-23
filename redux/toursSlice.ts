import type { PlaceToStay, PlaceToVisit, TourState, Transportation } from "@/constants/type";
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
        },
        addPlacesToStay: (state, action: PayloadAction<{ tourId: string; places: PlaceToStay[]}>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (selected) {
                selected.placesToStay = action.payload.places.map((place) => ({
                    ...place,
                    originalSelected: place.isSelected
                }));
                selected.changedPlacesStay = {};
            }
        },
        togglePlaceToStay: (state, action: PayloadAction<{ tourId: string; placeId: string; }>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (!selected) return;

            const place = selected.placesToStay.find(p => p.id === action.payload.placeId);
            if (!place) return;

            place.isSelected = !place.isSelected;
            
            if (place.isSelected !== place.originalSelected) {
                selected.changedPlacesStay[action.payload.placeId] = place.isSelected;
            } else {
                delete selected.changedPlacesStay[action.payload.placeId];
            }
        },
        addTransportations: (state, action: PayloadAction<{ tourId: string; transportations: Transportation[]; }>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (selected) {
                selected.transportations = action.payload.transportations.map((transport) => ({
                    ...transport,
                    originalSelected: transport.isSelected
                }));
                selected.changedTransportations = {};
            }
        },
        toggleTransportation: (state, action: PayloadAction<{ tourId: string; transportId: string}>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (!selected) return;

            const clickedId = action.payload.transportId;

            selected.transportations.forEach(t => {
                const newSelectedState = t.id === clickedId;
            
                if (t.isSelected !== newSelectedState) {
                    t.isSelected = newSelectedState;
    
                    if (t.isSelected !== t.originalSelected) {
                        selected.changedTransportations[t.id] = t.isSelected;
                    } else {
                        delete selected.changedTransportations[t.id];
                    }
                }
            });
        }
    }
});

export const { addTour, addPlacesToVisit, togglePlaceDayVisit, addPlacesToStay, togglePlaceToStay, addTransportations, toggleTransportation } = ToursSlice.actions;
export default ToursSlice.reducer;