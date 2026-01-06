import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TourState } from "@/constants/type";

interface ShareState {
    shareCode: string | null;
    lookupTour: TourState | null;
    loading: boolean;
    error: string | null;
}

const initialState: ShareState = {
    shareCode: null,
    lookupTour: null,
    loading: false,
    error: null,
};

const shareSlice = createSlice({
    name: "share",
    initialState,
    reducers: {
        setShareLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setShareError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setShareCode: (state, action: PayloadAction<string>) => {
            state.shareCode = action.payload;
        },
        setLookupTour: (state, action: PayloadAction<TourState | null>) => {
            state.lookupTour = action.payload;
        },
        resetShareState: () => initialState
    }
});

export const {
    setShareLoading,
    setShareError,
    setShareCode,
    setLookupTour,
    resetShareState
} = shareSlice.actions;

export default shareSlice.reducer;
