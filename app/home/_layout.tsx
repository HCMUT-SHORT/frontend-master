import { axiosClient } from "@/api/axiosClient";
import { CompassIcon } from "@/assets/Icons/CompassIcon";
import { HomeIcon } from "@/assets/Icons/HomeIcon";
import { PlusIcon } from "@/assets/Icons/PlusIcon";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { addTour } from "@/redux/toursSlice";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const CreateButton = styled.TouchableOpacity`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background-color: ${COLORS.DARKGREEN};
    align-items: center;
    justify-content: center;
    margin-bottom: -5px;
`;

export default function HomeLayout() {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.userId);
    const tours = useSelector((state: RootState) => state.tours);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchUserTours = async () => {
            if (!userId) return;

            try {
                const response = await axiosClient.get(`/tour/getUserTours/${userId}`);
                
                response.data.forEach((tour: any) => {
                    const exists = tours.some(t => t.id === tour.id);

                    if (!exists) {
                        dispatch(addTour({
                            id: tour.id,
                            createdAt: tour.createdAt,
                            createdBy: tour.createdBy,
                            destination: tour.destination,
                            checkInDate: tour.checkindate,
                            checkOutDate: tour.checkoutdate,
                            minBudget: tour.minBudget.toString(), 
                            maxBudget: tour.maxBudget.toString(),
                            travelType: tour.travelType,
                            imageUrl: tour.imageUrl,
                            placesToVisit: []
                        }));
                    }
                })
            } catch(error: any) {
                console.log("There is an error fetching user tours: ", error.message);
                return;
            }
        };

        fetchUserTours();
    }, [userId, dispatch, tours])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }} edges={["top"]}>
            <Tabs 
                screenOptions={{ 
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.DARKGREEN,
                    tabBarInactiveTintColor: COLORS.GRAY,
                    tabBarStyle: {
                        height: 70,
                        paddingTop: 10,
                        backgroundColor: COLORS.PUREWHITE
                    },
                }}
            >
                <Tabs.Screen 
                    name="index"
                    options={{
                        title: 'Nhà',
                        tabBarIcon: ({ focused }) => (
                            <HomeIcon color={focused ? COLORS.DARKGREEN : COLORS.GRAY} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                            <CreateButton onPress={() => {
                                router.push("/tourcreate")
                            }}>
                                <PlusIcon/>
                            </CreateButton>
                        )
                    }}
                    listeners={{
                        tabPress: (e) => {e.preventDefault();}
                    }}
                />
                <Tabs.Screen 
                    name="tours"
                    options={{
                        title: 'Tour của tôi',
                        tabBarIcon: ({ focused }) => (
                            <CompassIcon color={focused ? COLORS.DARKGREEN : COLORS.GRAY} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    )
}