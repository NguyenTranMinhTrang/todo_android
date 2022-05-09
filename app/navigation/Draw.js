import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Detail } from '../screens';
import {
    View,
    Alert
} from "react-native";
import { Avatar, Title, Drawer } from 'react-native-paper';
import { FONTS, images, SIZES, COLORS } from "../constants";
import { DrawerItem } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { clearUserData, handleSignOut } from '../utils/services';
import { showSuccess } from '../components/showMessage';

const Draw = createDrawerNavigator();

const MyDrawer = ({ navigation, route }) => {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        let { user } = route.params;
        if (user) {
            setUser(user);
        }
    }, []);

    const onSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure, yout want to sign out from this device',
            [{ text: 'Yes', onPress: signOut }, { text: 'No', }],
            { cancelable: true }
        )
    }

    const signOut = () => {
        clearUserData();
        handleSignOut()
            .then(() => {
                showSuccess("Sign Out Successfully!");
                navigation.replace('Login');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const drawerContent = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* render info user */}
                <View style={{ paddingLeft: 20, marginTop: 15 }}>
                    <View>
                        <View>
                            <Title style={{ ...FONTS.h2, color: COLORS.black }}>Mail</Title>
                        </View>
                        <View>
                            <Title style={{ ...FONTS.body3, color: COLORS.black }}>{user?.email}</Title>
                        </View>
                    </View>
                </View>
                <Drawer.Section>
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name='exit-to-app'
                                color={COLORS.black}
                                size={30}
                            />
                        )}
                        label="Sign out"
                        labelStyle={{
                            color: COLORS.black,
                            ...FONTS.body3

                        }}
                        onPress={onSignOut}
                    />
                </Drawer.Section>
            </View>
        )
    }

    return (

        <Draw.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
            drawerContent={drawerContent}
        >
            <Draw.Screen name="Home" component={Home} />
            <Draw.Screen name="Detail" component={Detail} />
        </Draw.Navigator>

    );
}

export default MyDrawer;