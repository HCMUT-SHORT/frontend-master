import { ContinueButton } from "@/components/ContinueButton";
import { InputField } from "@/components/InputField";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { setTourCreateField } from "@/redux/tourCreateSlice";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

interface TravelItemProps {
    selected: boolean
}

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    flex: 1;
    padding: 24px;
`;

const SearchText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;

const TravelTypeText = styled.Text`
    margin-top: 30px;
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;

const TravelTypeContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

const TravelItem = styled.TouchableOpacity<{ selected: boolean }>`
    background-color: ${({ selected } : TravelItemProps) => (selected ? COLORS.DARKGREEN : COLORS.YELLOW)};
    padding: 10px 15px;
    border-radius: 8px;
`;

const TravelText = styled.Text<{ selected: boolean }>`
    color: ${({ selected }: TravelItemProps) => (selected ? COLORS.YELLOW : COLORS.DARKGREEN)};
    font-family: ${({ selected }: TravelItemProps) => (selected ? "Nunito-SemiBold" : "Nunito-Regular")};
    font-size: 15px;
`;

export default function TourCreate1() {
    const router = useRouter();
    const destination = useSelector((state: RootState) => state.tourCreate.destination);
    const travelType = useSelector((state: RootState) => state.tourCreate.travelType);
    const dispatch = useDispatch<AppDispatch>();

    const travelTypeItems = [
        { value: "exploration", label: "Thám hiểm" },
        { value: "vacation", label: "Nghỉ dưỡng" },
        { value: "Honeymoon", label: "Trăng mật" },
        { value: "ecotourism", label: "Sinh thái" },
        { value: "culture", label: "Văn hoá" },
        { value: "volunteering", label: "Tình nguyện" }
    ];

    return (
        <Container>
            <SearchText>Nơi bạn muốn đến</SearchText>

            <InputField
                value={destination}
                onChange={(text: string) => dispatch(setTourCreateField({ key: "destination", value: text }))}
                placeholder={"Tìm kiếm địa điểm"}
                fieldType={"search"}
                keyboardType={"default"}
            />

            <TravelTypeText>Loại hình du lịch</TravelTypeText>

            <TravelTypeContainer>
                {travelTypeItems.map((item) => {
                    const isSelected = travelType === item.value;
                    return (
                        <TravelItem 
                            key={item.value}
                            selected={isSelected}
                            onPress={() => dispatch(setTourCreateField({ key: "travelType", value: item.value }))}
                        >
                            <TravelText selected={isSelected}>{item.label}</TravelText>
                        </TravelItem>
                    )
                })}
            </TravelTypeContainer>
            
            <ContinueButton 
                onPress={() => router.push("/tourcreate/tour2")} 
                disabled={!(destination && travelType)}
                text={"Tiếp tục"}
                type="cont"
            />
        </Container>
    )
}