import { axiosClient } from "@/api/axiosClient";
import { AppDispatch } from "@/redux/store";
import { TourState } from "@/constants/type";
import { addTour } from "@/redux/toursSlice";
import {
    setShareCode,
    setLookupTour,
    setShareLoading,
    setShareError
} from "@/redux/shareSlice";

export const createShareCode = async (
    selectedTour: TourState,
    token: string | null,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setShareLoading(true));
        dispatch(setShareError(null));

        const response = await axiosClient.post(
            `/tour/share/${selectedTour.id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(setShareCode(response.data.code));
        return response.data.code;

    } catch (error: any) {
        console.log("Share error:", error.response?.data || error.message);
        dispatch(setShareError("Không thể tạo mã chia sẻ"));
        throw error;
    } finally {
        dispatch(setShareLoading(false));
    }
};

export const lookupShareCode = async (code: string, dispatch: AppDispatch) => {
    try {
        dispatch(setShareLoading(true));
        dispatch(setShareError(null));

        const response = await axiosClient.get(`/tour/lookup/${code}`);
        const tourData = response.data?.[0] ?? null;
        const mappedTour: TourState = {
            ...tourData,
            checkInDate: tourData.checkindate, 
            checkOutDate: tourData.checkoutdate,
        };
        dispatch(setLookupTour(mappedTour))

    } catch (error: any) {
        dispatch(setShareError("Mã chia sẻ không hợp lệ"));
        dispatch(setLookupTour(null));
        throw error;
    } finally {
        dispatch(setShareLoading(false));
    }
};

export const joinSharedTour = async (
    code: string,
    token: string | null,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setShareLoading(true));
        dispatch(setShareError(null));
        const response = await axiosClient.post("/tour/join", 
            { code },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const tourid = response.data.tourId;
        const tourResponse = await axiosClient.get(`/tour/${tourid}`);
        const tour = tourResponse.data[0];
        const mappedTour: TourState = {
            ...tour,
            checkInDate: tour.checkindate, 
            checkOutDate: tour.checkoutdate,
        };
        dispatch(addTour(mappedTour))

    } catch (error: any) {
        dispatch(setShareError("Không thể tham gia tour"));
        throw error;
    } finally {
        dispatch(setShareLoading(false));
    }
};
