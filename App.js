import React, { useEffect, useRef } from 'react';
import { Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";
import 'react-native-gesture-handler';
import * as Notifications from "expo-notifications";


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
  })
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert(notification.request.content.title, notification.request.content.body);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}


