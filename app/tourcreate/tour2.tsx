import { ContinueButton } from "@/components/ContinueButton";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { setTourCreateField } from "@/redux/tourCreateSlice";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    dayNames: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'],
    dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    today: "Hôm nay"
};

LocaleConfig.defaultLocale = 'vi';

type CustomLabelProps = {
    MinBudgetLimit: string,
    MaxBudgetLimit: string
};

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    flex: 1;
    padding: 24px;
`;

const CalendarText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;

const ErrorText = styled.Text`
    color: ${COLORS.RED};
    font-family: "Nunito-Regular";
    font-size: 14px;
    margin-top: 5px;
`;

const BudgetText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 10px;
`;

const SliderContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const CustomLabelWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-inline: -15px;
    margin-bottom: -10px;
`;

const CustomLabelText =styled.Text`
    font-family: "Nunito-Regular";
    color: ${COLORS.DARKGREEN};
`;

const CustomLabel = ({ MinBudgetLimit, MaxBudgetLimit } : CustomLabelProps) => {

    return (
        <CustomLabelWrapper>
            <CustomLabelText>{MinBudgetLimit}</CustomLabelText>
            <CustomLabelText>{MaxBudgetLimit}</CustomLabelText>
        </CustomLabelWrapper>
    )
}

export default function TourCreate2() {
    const router = useRouter();
    const { width } = Dimensions.get("window");
    const checkInDate = useSelector((state: RootState) => state.tourCreate.checkInDate);
    const checkOutDate = useSelector((state: RootState) => state.tourCreate.checkOutDate);
    const minBudget = useSelector((state: RootState) => state.tourCreate.MinBudget);
    const maxBudget = useSelector((state: RootState) => state.tourCreate.MaxBudget);
    const dispatch = useDispatch<AppDispatch>();
    const [errorText, setErrorText] = useState<string>("");

    const handleDayPress = (date: DateData) => {
        if (!checkInDate) {
            dispatch(setTourCreateField({ key: "checkInDate", value: date.dateString }));
            dispatch(setTourCreateField({ key: "checkOutDate", value: "" }));
            return;
        }

        if (checkInDate && !checkOutDate) {
            if (date.dateString === checkInDate) {
                return;
            }

            if (date.dateString < checkInDate) {
                dispatch(setTourCreateField({ key: "checkInDate", value: date.dateString }));
                return;
            }

            const diff = (new Date(date.dateString).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24);
            if (diff > 2) {
                setErrorText("Hiện tại app chỉ hỗ trợ tối đa 3 ngày 2 đêm! (Dev Nghèo)");
                return;
            }

            dispatch(setTourCreateField({ key: "checkOutDate", value: date.dateString }));
            return;
        }

        dispatch(setTourCreateField({ key: "checkInDate", value: date.dateString }));
        dispatch(setTourCreateField({ key: "checkOutDate", value: "" }));
    };

    useEffect(() => {
        if (!errorText) return;

        const timer = setTimeout(() => setErrorText(""), 3000);

        return () => clearTimeout(timer);
    }, [errorText])

    const getMarkedDates = () : MarkedDates => {
        if (!checkInDate) return {};

        let marked: MarkedDates = {
            [checkInDate]: {
                startingDay: true,
                color: COLORS.DARKGREEN,
                textColor: COLORS.YELLOW
            }
        }

        if (checkOutDate) {
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);

            let current = new Date(startDate);
            current.setDate(current.getDate() + 1);

            while(current <= endDate) {
                const dateString = current.toISOString().split("T")[0];

                marked[dateString] = {
                    color: COLORS.DARKGREEN,
                    textColor: COLORS.YELLOW
                };

                current.setDate(current.getDate() + 1);
            }

            marked[checkOutDate] = {
                endingDay: true,
                color: COLORS.DARKGREEN,
                textColor: COLORS.YELLOW
            }
        }

        return marked;
    }

    return (
        <Container>
            <CalendarText>Thời gian du lịch</CalendarText>
            <Calendar
                style={{ borderRadius: 10 }}
                markingType={"period"}
                enableSwipeMonths={true}
                onDayPress={(date: DateData) => handleDayPress(date)}
                markedDates={getMarkedDates()}
                theme={{
                    textDayFontFamily: "Nunito-Regular",
                    textDayHeaderFontFamily: "Nunito-Regular",
                    textMonthFontFamily: "Nunito-Regular",
                    arrowColor: COLORS.DARKGREEN,
                }}
            />
            <ErrorText>{errorText}</ErrorText>
            
            <BudgetText>Chi phí</BudgetText>

            <SliderContainer>
                <MultiSlider
                    values={[
                        minBudget ? Number(minBudget) : 1000000,
                        maxBudget ? Number(maxBudget) : 100000000
                    ]}
                    onValuesChange={(values) => {
                        const [min, max] = values;
                        dispatch(setTourCreateField({ key: "MinBudget", value: String(min) }));
                        dispatch(setTourCreateField({ key: "MaxBudget", value: String(max) }));
                    }}
                    min={1000000}
                    max={100000000}
                    step={1000000}
                    allowOverlap={false}
                    snapped
                    sliderLength={width - 64}
                    selectedStyle={{ backgroundColor: COLORS.DARKGREEN }}
                    markerStyle={{ backgroundColor: COLORS.DARKGREEN, height: 20, width: 20, borderColor: "black", borderWidth: 1 }}
                    enableLabel={true}
                    customLabel={() => {
                        const min = minBudget ? Number(minBudget).toLocaleString("en-US") : "1,000,000";
                        const max = maxBudget ? Number(maxBudget).toLocaleString("en-US") : "100,000,000";
                        return ( <CustomLabel MinBudgetLimit={min} MaxBudgetLimit={max}/> );
                    }}
                />
            </SliderContainer>

            <ContinueButton 
                disabled={!(checkInDate && checkOutDate)}
                onPress={() => router.replace("/tourloading")}
                text={"Tiếp tục"}
            />
        </Container>
    )
}