import React from "react";
import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        statusBarHeight: Platform.OS === "android" ? 20 : 10,
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        statusBarHeight: Platform.OS === "android" ? 20 : 10,
        message
    })
}

export {
    showError,
    showSuccess
}