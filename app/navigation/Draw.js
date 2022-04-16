import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens';
import {
    View,
} from "react-native";

import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { FONTS, images, SIZES, COLORS } from "../constants";
import { DrawerItem } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Draw = createDrawerNavigator();

const MyDrawer = () => {

    const drawerContent = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* render info user */}
                <View style={{ paddingLeft: 20, marginTop: 15 }}>
                    <View>
                        <Avatar.Image
                            source={require('../assets/images/avatar.jpg')}
                            size={100}
                        />
                        <View>
                            <Title style={{ ...FONTS.body3, color: COLORS.blue }}>minhtrang@gmail.com</Title>
                        </View>
                    </View>
                </View>
                <Drawer.Section>
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name='exit-to-app'
                                color={COLORS.blue}
                                size={30}
                            />
                        )}
                        label="Sign out"
                        labelStyle={{
                            color: COLORS.blue,
                            ...FONTS.body3

                        }}
                        onPress={() => { }}
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
        </Draw.Navigator>

    );
}

export default MyDrawer;