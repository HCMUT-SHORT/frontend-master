import { axiosClient } from "@/api/axiosClient";
import { ContinueButton } from "@/components/ContinueButton";
import { TransportCard } from "@/components/TransportCard";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleTransportation } from "@/redux/toursSlice";
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
    margin-bottom: 15px;
`;

const TransportationWrapper = styled.View`
    row-gap: 15px;
`;

export default function Transportation() {
    const router = useRouter();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        Sentry.Native.addBreadcrumb({
            category: "transportation",
            message: "Entered Transportation Selection",
            data: { tourId },
        });

        return () => {
            Sentry.Native.addBreadcrumb({
                category: "transportation",
                message: "Left Transportation Selection",
                data: { tourId },
            });
        };
    }, [tourId]);

    if (!selectedTour) {
        return (
            <></>
        )
    }

    const handleUpdateTransportation = async () => {
        if (loading) return;

        const updateItems = Object.entries(selectedTour.changedTransportations).map(
            ([id, isSelected]) => ({ id, isSelected })
        );

        const transaction = Sentry.Native.startTransaction({
            name: "Update Transportation",
            op: "http.client",
        });

        try {
            setLoading(true);

            Sentry.Native.addBreadcrumb({
                category: "transportation",
                message: "Submitting transportation selection",
                data: {
                    tourId,
                    updateCount: updateItems.length,
                },
            });

            if (updateItems.length === 0) {
                Sentry.Native.addBreadcrumb({
                    category: "transportation",
                    message: "No transportation change, skipping update",
                });

                transaction.finish();
                router.replace(`/overviewTour/${tourId}`);
                return;
            }

            await axiosClient.put("/tour/transportation", updateItems);

            Sentry.Native.addBreadcrumb({
                category: "transportation",
                message: "Transportation updated successfully",
            });

            transaction.finish();
            router.replace(`/overviewTour/${tourId}`);
        } catch (error: any) {
            transaction.setStatus("internal_error");

            Sentry.Native.captureException(error, {
                tags: {
                    feature: "transportation",
                },
                extra: {
                    tourId,
                    updateItems,
                },
            });

            transaction.finish();
            console.log("There is an error updating transportation: ", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <TextDisplay>Hãy chọn phương tiện phù hợp nhé!</TextDisplay>

            <TransportationWrapper>
                {selectedTour.transportations.map((transport) => (
                    <TransportCard 
                        key={transport.id} 
                        transport={transport} 
                        onPress={() => {
                            Sentry.Native.addBreadcrumb({
                                category: "transportation",
                                message: "Selected transportation",
                                data: {
                                    tourId,
                                    transportId: transport.id,
                                    wasSelected: transport.isSelected,
                                },
                            });

                            dispatch(toggleTransportation({ 
                                tourId: selectedTour.id || "", 
                                transportId: transport.id 
                            }));
                        }}

                    />
                ))}
            </TransportationWrapper>

            <ContinueButton
                onPress={handleUpdateTransportation}
                disabled={loading}
                text={"Tiếp tục"}
                type="cont"
            />
        </Container>
    )
}