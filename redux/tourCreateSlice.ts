import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourCreateState {
    destination: string | null;
    travelType: string | null;
    checkInDate: string | null;
    checkOutDate: string | null;
    MinBudget: string;
    MaxBudget: string;
};

const initialState: TourCreateState = {
    destination: null,
    travelType: null,
    checkInDate: null,
    checkOutDate: null,
    MinBudget: "1000000",
    MaxBudget: "100000000"
};

const tourCreateSlice = createSlice({
    name: "tourcreate",
    initialState,
    reducers: {
        setTourCreateField: (state, action: PayloadAction<{ key: keyof TourCreateState; value: string }>) => {
            state[action.payload.key] = action.payload.value;
        }
    }
});

export const { setTourCreateField } = tourCreateSlice.actions;
export default tourCreateSlice.reducer;