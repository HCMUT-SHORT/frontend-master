import { CompassIcon } from "@/assets/Icons/CompassIcon";
import { HomeIcon } from "@/assets/Icons/HomeIcon";
import { PlusIcon } from "@/assets/Icons/PlusIcon";
import { COLORS } from "@/constants/Colors";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
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