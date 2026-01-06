import { axiosClient } from "@/api/axiosClient";
import { ContinueButton } from "@/components/ContinueButton";
import { PlaceToStayCard } from "@/components/PlaceToStayCard";
import { COLORS } from "@/constants/Colors";
import { fetchTransportations } from "@/hooks/fetchTourData";
import { AppDispatch, RootState } from "@/redux/store";
import { clearPlaceToStayError, togglePlaceToStay } from "@/redux/toursSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as Sentry from "sentry-expo";

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
    flex: 1;
`;

const TextDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 5px;
`;

const PlacesContainer = styled.ScrollView`
    margin-top: 15px;
`;

const ErrorDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.RED};
`;

export default function PlacesToStay() {
    const router = useRouter();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        Sentry.Native.addBreadcrumb({
            category: "places_to_stay",
            message: "Entered Places To Stay Screen",
            data: {
                tourId,
            },
        });

        return () => {
            Sentry.Native.addBreadcrumb({
                category: "places_to_stay",
                message: "Left Places To Stay Screen",
                data: {
                    tourId,
                },
            });
        };
    }, [tourId]);

    useEffect(() => {
        if (!selectedTour?.placeToStayError) return;

        Sentry.Native.addBreadcrumb({
            category: "places_to_stay",
            message: "Place to stay selection error",
            data: {
                tourId,
                error: selectedTour.placeToStayError,
            },
        });

        const timer = setTimeout(() => {
            dispatch(clearPlaceToStayError({ tourId: selectedTour.id || "" }));
        }, 3000);

        return () => clearTimeout(timer);
    }, [selectedTour?.placeToStayError, dispatch, selectedTour?.id]);


    if (!selectedTour) {
        return (
            <></>
        )
    }

    const handleUpdatePlacesToStay = async () => {
        if (loading) return;

        const updateItems = Object.entries(selectedTour.changedPlacesStay).map(
            ([id, isSelected]) => ({ id, isSelected })
        );
        const transaction = Sentry.Native.startTransaction({
            name: "Update Places To Stay",
            op: "http.client",
        });
        try {
            setLoading(true);
            Sentry.Native.addBreadcrumb({
                category: "places_to_stay",
                message: "Submitting places to stay",
                data: {
                    tourId,
                    updateCount: updateItems.length,
                },
            });
            if (updateItems.length === 0) {
                Sentry.Native.addBreadcrumb({
                    category: "places_to_stay",
                    message: "No changes, skipping update",
                });
                await fetchTransportations(selectedTour, dispatch);
                transaction.finish();
                router.push(`/editTour/${tourId}/transportation`);
                return;
            }    

            await axiosClient.put("/tour/placestostay", updateItems);
            await fetchTransportations(selectedTour, dispatch);
            Sentry.Native.addBreadcrumb({
                category: "places_to_stay",
                message: "Places to stay updated successfully",
            });

            transaction.finish();
            router.push(`/editTour/${tourId}/transportation`);
        } catch(error: any) {
            transaction.setStatus("internal_error");

            Sentry.Native.captureException(error, {
                tags: {
                    feature: "places_to_stay",
                },
                extra: {
                    tourId,
                    updateItems,
                },
            });

            transaction.finish();
            console.log("There is an error updating place to stay:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <TextDisplay>Hãy chọn khách sạn phù hợp nhé!</TextDisplay>

            {selectedTour.placeToStayError && (
                <ErrorDisplay>{selectedTour.placeToStayError}</ErrorDisplay>
            )}

            <PlacesContainer contentContainerStyle={{ gap: 15 }}>
                {selectedTour.placesToStay.map((place) => (
                    <PlaceToStayCard 
                        key={place.id} 
                        place={place} 
                        onPress={() => {
                            Sentry.Native.addBreadcrumb({
                                category: "places_to_stay",
                                message: "Toggled place to stay",
                                data: {
                                    tourId,
                                    placeId: place.id,
                                    wasSelected: place.isSelected,
                                },
                            });

                            dispatch(togglePlaceToStay({ 
                                tourId: selectedTour.id || "", 
                                placeId: place.id, 
                                checkInDate: selectedTour.checkInDate || "", 
                                checkOutDate: selectedTour.checkOutDate || ""
                            }));
                        }}

                    />
                ))}
            </PlacesContainer>

            <ContinueButton
                onPress={handleUpdatePlacesToStay}
                disabled={loading}
                text={"Tiếp tục"}
                type="cont"
            />
        </Container>
    )
}