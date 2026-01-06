import { axiosClient } from "@/api/axiosClient";
import { WaitingCounter } from "@/components/WaitingCounter";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { addTour } from "@/redux/toursSlice";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as Sentry from "@sentry/react-native";

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.Image`
    width: 200px;
    height: 200px;
`;

const ErrorText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.RED};
    text-align: center;
    margin-top: 10px;
`;

const ReturnButton = styled.TouchableOpacity`
    margin-top: 10px;
    background-color: ${COLORS.YELLOW};
    padding: 10px 15px;
    border-radius: 8px;
`;

const ReturnText =styled.Text`
    color: ${COLORS.DARKGREEN};
    font-family: "Nunito-SemiBold";
    font-size: 14px;
`;

export default function TourLoading() {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.userId);
    const destination = useSelector((state: RootState) => state.tourCreate.destination);
    const travelType = useSelector((state: RootState) => state.tourCreate.travelType);
    const checkInDate = useSelector((state: RootState) => state.tourCreate.checkInDate);
    const checkOutDate = useSelector((state: RootState) => state.tourCreate.checkOutDate);
    const minBudget = Number(useSelector((state: RootState) => state.tourCreate.MinBudget));
    const maxBudget = Number(useSelector((state: RootState) => state.tourCreate.MaxBudget));
    const dispatch= useDispatch<AppDispatch>();
    const hasCreatedRef = useRef(false);
    const [errorText, setErrorText] = useState<string>("");
    useEffect(() => {
        Sentry.addBreadcrumb({
            category: "tour_create",
            message: "Entered Tour Creation Loading",
        });
    }, []);

    useEffect(() => {
        const CreateTour = async () => {
            if (hasCreatedRef.current) return;
            hasCreatedRef.current = true;

            if (!userId || !destination || !travelType || !checkInDate || !checkOutDate || !minBudget || !maxBudget) return;
            // const transaction = Sentry.startTransaction({
            //     name: "Create Tour",
            //     op: "http.client",
            // });
            try {
                Sentry.addBreadcrumb({
                    category: "tour_create",
                    message: "Sending create tour request",
                    data: {
                        destination,
                        travelType,
                        checkInDate,
                        checkOutDate,
                        minBudget,
                        maxBudget,
                    },
                });
                const response = await axiosClient.post("/tour/create", {
                    userId: userId,
                    destination: destination,
                    travelType: travelType,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    minBudget: minBudget,
                    maxBudget: maxBudget
                });
                Sentry.addBreadcrumb({
                    category: "tour_create",
                    message: "Tour created successfully",
                    data: {
                        tourId: response.data[0].id,
                    },
                });
                dispatch(addTour({
                    id: response.data[0].id,
                    createdAt: response.data[0].createdAt,
                    createdBy: response.data[0].createdBy,
                    destination: response.data[0].destination,
                    checkInDate: response.data[0].checkindate,
                    checkOutDate: response.data[0].checkoutdate,
                    minBudget: response.data[0].minBudget.toString(), 
                    maxBudget: response.data[0].maxBudget.toString(),
                    travelType: response.data[0].travelType,
                    imageUrl: response.data[0].imageUrl,
                    placesToVisit: []
                }));
                // transaction.finish();
                router.replace(`/editTour/${response.data[0].id}`);
            } catch (error: any) {
                // transaction.setStatus("internal_error");

                Sentry.captureException(error, {
                    tags: {
                        feature: "tour_create",
                    },
                    extra: {
                        destination,
                        travelType,
                        checkInDate,
                        checkOutDate,
                        minBudget,
                        maxBudget,
                    },
                });

                // transaction.finish();
                console.log("There is an error creating new tour:", error.message);
                setErrorText("Tạo tour gặp lỗi!")
                return;
            }
        };

        CreateTour();
    }, [userId, destination, travelType, checkInDate, checkOutDate, minBudget, maxBudget, router, dispatch]);

    return (
        <Container>
            <Logo source={require("../../assets/images/travel.gif")}/>
            <WaitingCounter/>

            <ErrorText>{errorText}</ErrorText>

            {errorText && (
                <ReturnButton onPress={() => router.replace("/home")}>
                    <ReturnText>Trở về</ReturnText>
                </ReturnButton>
            )}
        </Container>
    )
}