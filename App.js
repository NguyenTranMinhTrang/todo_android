import React, { useEffect, useRef, useState } from 'react';
import { Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";
import 'react-native-gesture-handler';
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";



// screen
import { SignIn, Login } from './app/screens';
import MyDrawer from './app/navigation/Draw';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Black": require('./app/assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./app/assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./app/assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Light": require('./app/assets/fonts/Roboto-Light.ttf'),
  });

  const [connect, setConnect] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert(notification.request.content.title, notification.request.content.body);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnect(state.isConnected);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe();
    };
  }, []);


  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Login'
      >
        <Stack.Screen name="Login">
          {props => <Login {...props} internet={connect} />}
        </Stack.Screen>
        <Stack.Screen name="MyDrawer">
          {props => <MyDrawer {...props} internet={connect} />}
        </Stack.Screen>
        <Stack.Screen name="SignIn">
          {props => <SignIn {...props} internet={connect} />}
        </Stack.Screen>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}


