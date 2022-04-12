import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Platform, StatusBar } from "react-native";
import { FONTS, images } from "../constants";

const Login = () => {

    React.useEffect(() => {
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor('#FF573300');
            StatusBar.setTranslucent(true)
        }

    }, []);

    function renderContent() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.background}
                resizeMode="cover"
                style={{
                    height: '100%',
                    width: '100%'
                }}
            >
                {renderContent()}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Login;