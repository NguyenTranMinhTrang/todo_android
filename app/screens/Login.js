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
    Alert
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import vadilator from "../utils/validation";
import { showError, showSuccess } from "../components/showMessage";
import { signInUser } from "../utils/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {

    const [state, setState] = React.useState({
        email: '',
        password: '',
        hide: true
    });

    const { email, password, hide } = state;

    React.useEffect(() => {
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor('#FF573300');
            StatusBar.setTranslucent(true)
        }

        const checkUserState = async () => {
            let user = await AsyncStorage.getItem('user');
            if (user) {
                navigation.navigate("Home");
            }
        }

        checkUserState();

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
            password
        })

        if (error) {
            showError(error);
            return false;
        }
        return true;
    }

    const signInCallBack = async (response) => {
        if (response.result === "success") {
            showSuccess("Sign in successfully!");
            await AsyncStorage.setItem('user', response.user);
            navigation.navigate("Home");
        }
        else {
            Alert.alert("Error signing in", "Invalid email / password");
        }
    }

    const handleLogin = () => {
        const isValid = validate();
        if (isValid) {
            signInUser(email, password, signInCallBack);
        }

    }

    function renderContent() {
        return (
            <View
                style={{
                    marginTop: SIZES.height * 0.2,
                    padding: SIZES.padding,
                    justifyContent: 'center'
                }}
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
                        value={password}
                        secureTextEntry={hide}
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black,
                            flex: 1
                        }}

                        onChangeText={(password) => updateState({ password: password })}
                    />

                    <TouchableOpacity
                        onPress={() => updateState({ hide: !hide })}
                    >
                        {
                            hide ?
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
                    onPress={handleLogin}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: SIZES.base,
                        backgroundColor: COLORS.black,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: SIZES.base * 2,
                        borderRadius: SIZES.radius

                    }}
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sign Up</Text>
                </TouchableOpacity>
            </View >
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