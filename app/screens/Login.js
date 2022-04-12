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

const Login = ({ navigation }) => {

    const [hide, setHide] = React.useState(true);

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
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black
                        }}
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
                        secureTextEntry={hide}
                        style={{
                            ...FONTS.h3_light,
                            color: COLORS.black,
                            flex: 1
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => setHide(!hide)}
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
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Login</Text>
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