import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FONTS } from "../constants/theme";

const Login = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ ...FONTS.h1 }}>login</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D88559',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Login;