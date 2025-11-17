import type { TourState } from "@/constants/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TourState[] = [];

const ToursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {
        addTour: (state, action: PayloadAction<TourState>) => {
            state.push(action.payload);
        }
    }
});

export const { addTour } = ToursSlice.actions;
export default ToursSlice.reducer;