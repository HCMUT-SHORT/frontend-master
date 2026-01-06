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

            if (dayVisit.length === place.dayVisit.length && dayVisit.every(d => place.dayVisit.includes(d))) {
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
        togglePlaceToStay: (state, action: PayloadAction<{ tourId: string; placeId: string; checkInDate: string; checkOutDate: string }>) => {
            const selected = state.find(t => t.id === action.payload.tourId);
            if (!selected) return;

            const place = selected.placesToStay.find(p => p.id === action.payload.placeId);
            if (!place) return;

            const nights = Math.max(1,
                Math.ceil(
                    (new Date(action.payload.checkOutDate).getTime() -
                     new Date(action.payload.checkInDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
            );

            const selectedCount = selected.placesToStay.filter(p => p.isSelected).length;
            const isSelecting = !place.isSelected;

            if (isSelecting && selectedCount >= nights) {
                selected.placeToStayError = `Bạn chỉ được chọn ${nights} chỗ ở cho ${nights} đêm.`;
                return;
            }
        
            selected.placeToStayError = null;
            
            place.isSelected = !place.isSelected;
            
            if (place.isSelected !== place.originalSelected) {
                selected.changedPlacesStay[action.payload.placeId] = place.isSelected;
            } else {
                delete selected.changedPlacesStay[action.payload.placeId];
            }
        },
        clearPlaceToStayError: (state, action: PayloadAction<{ tourId: string }>) => {
            const selectedTour = state.find(t => t.id === action.payload.tourId);
            if (!selectedTour) return;
            selectedTour.placeToStayError = "";
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
        },
        setTours(state, action: PayloadAction<any[]>) {
            return action.payload; // completely replace the list
        },
    }
});

export const { addTour, addPlacesToVisit, togglePlaceDayVisit, addPlacesToStay, togglePlaceToStay, clearPlaceToStayError, addTransportations, toggleTransportation, setTours } = ToursSlice.actions;
export default ToursSlice.reducer;