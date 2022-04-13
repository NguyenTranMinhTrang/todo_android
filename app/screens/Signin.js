import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Platform,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import vadilator from "../utils/validation";
import { showError, showSuccess } from "../components/showMessage";
import { signUpUser } from "../utils/services";

const SignIn = ({ navigation }) => {

    const [state, setState] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        hidePassword: true,
        hideConfirm: true
    });

    const { email, password, confirmPassword, hidePassword, hideConfirm } = state;

    React.useEffect(() => {
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor('#FF573300');
            StatusBar.setTranslucent(true)
        }

    }, []);

    const updateState = (newState) => {
        setState({
            ...state,
            ...newState
        })
    }

    const validate = () => {
        const error = vadilator({
            email,
            password,
            confirmPassword,
        })

        if (error) {
            console.log(error);
            showError(error);
            return false;
        }
        return true;
    }

    const signUpCallback = (response) => {
        if (response.result === "success") {
            showSuccess("Sign up successfully!");
            navigation.navigate("Login");
        }
    }

    const signIn = () => {
        console.log("hello");
        const isValid = validate();
        if (isValid) {
            signUpUser(email, password, signUpCallback);
        }
    }

    function renderContent() {
        return (
            <KeyboardAvoidingView
                style={{
                    padding: SIZES.padding,
                    justifyContent: 'center'
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Email</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.black,
                        borderRadius: SIZES.radius,
                        padding: SIZES.base * 2,
                        marginVertical: SIZES.base
                    }}
                >
                    <View
                        style={{
                            marginRight: SIZES.base
                        }}
                    >
                        <FontAwesome name="user" size={30} color={COLORS.black} />
                    </View>

                    <TextInput
                        placeholder="Your Email ..."
                        placeholderTextColor={COLORS.black}
                        value={email}
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black
                        }}
                        onChangeText={(email) => updateState({ email: email })}
                    />
                </View>
                {/* Password */}
                <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Password</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.black,
                        borderRadius: SIZES.radius,
                        padding: SIZES.base * 2,
                        marginVertical: SIZES.base
                    }}
                >
                    <View
                        style={{
                            marginRight: SIZES.base
                        }}
                    >
                        <FontAwesome name="lock" size={30} color={COLORS.black} />
                    </View>

                    <TextInput
                        placeholder="Your Password ..."
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={hidePassword}
                        value={password}
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black,
                            flex: 1
                        }}
                        onChangeText={(password) => updateState({ password: password })}
                    />

                    <TouchableOpacity
                        onPress={() => updateState({ hidePassword: !hidePassword })}
                    >
                        {
                            hidePassword ?
                                <Feather name="eye-off" size={30} color="black" />
                                :
                                <Feather name="eye" size={30} color="black" />
                        }

                    </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Confirm Password</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.black,
                        borderRadius: SIZES.radius,
                        padding: SIZES.base * 2,
                        marginVertical: SIZES.base
                    }}
                >
                    <View
                        style={{
                            marginRight: SIZES.base
                        }}
                    >
                        <FontAwesome name="lock" size={30} color={COLORS.black} />
                    </View>

                    <TextInput
                        placeholder="Your Confirm Password ..."
                        placeholderTextColor={COLORS.black}
                        value={confirmPassword}
                        secureTextEntry={hideConfirm}
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black,
                            flex: 1
                        }}
                        onChangeText={(confirmPassword) => updateState({ confirmPassword: confirmPassword })}
                    />

                    <TouchableOpacity
                        onPress={() => updateState({ hideConfirm: !hideConfirm })}
                    >
                        {
                            hideConfirm ?
                                <Feather name="eye-off" size={30} color="black" />
                                :
                                <Feather name="eye" size={30} color="black" />
                        }

                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: SIZES.padding,
                        backgroundColor: COLORS.black,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: SIZES.base * 2,
                        borderRadius: SIZES.radius

                    }}
                    onPress={signIn}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sign In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.background}
                resizeMode="cover"
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',

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
export default SignIn;