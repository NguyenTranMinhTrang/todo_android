import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    LogBox,
    StatusBar,
    Platform
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateTodo } from "../utils/services";
import { update } from "firebase/database";

const Detail = ({ navigation, route }) => {

    const [task, setTask] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = React.useState({
        des: '',
        time: '',
        date: ''
    })
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState('date');

    React.useEffect(() => {
        console.log('come here');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#FF573300');
            StatusBar.setTranslucent(true);
        }
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
        let { userId, item } = route.params;
        setTask({
            userId: userId,
            ...item
        });
    }, [route.params.item])


    const updateState = (newState) => {
        setData({
            ...data,
            ...newState
        })
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let sdate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        let stime = tempDate.getHours() + ":" + tempDate.getMinutes();
        updateState({ date: sdate, time: stime });
    }

    const update = () => {
        const todo = {
            id: task.id,
            name: task.name,
            des: data.des,
            date: data.date,
            time: data.time
        }
        updateTodo(task.userId, todo);
    }


    // render

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.padding, justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        marginHorizontal: SIZES.padding
                    }}

                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.black}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.h1 }}>{task?.name}</Text>
                </View>
            </View>
        )
    }

    function renderContent() {
        return (
            <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                <View>
                    <Text style={{ ...FONTS.body3, marginBottom: SIZES.base }}>Description </Text>
                    <TextInput
                        defaultValue={task?.description}
                        style={{
                            borderColor: "gray",
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            padding: SIZES.base * 2,
                        }}
                        onChangeText={(des) => updateState({ des: des })}
                    />
                </View>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.body3, marginBottom: SIZES.base }}>Date To Complete:</Text>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderWidth: 1,
                            marginLeft: SIZES.padding
                        }}

                        onPress={() => showMode('date')}
                    >
                        <Fontisto name="date" size={30} color="black" />
                    </TouchableOpacity>


                </View>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.body3, marginBottom: SIZES.base }}>Time To Complete: </Text>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderWidth: 1,
                            marginLeft: SIZES.padding
                        }}

                        onPress={() => showMode('time')}
                    >
                        <MaterialIcons name="av-timer" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => setShow(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: SIZES.padding
                        }}
                        onPress={() => setShow(false)}
                    >
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            is24Hour={true}
                            onChange={onChange}
                            themeVariant="light"
                            style={{ width: '100%', backgroundColor: 'white', height: 500 }}
                        />
                    </Pressable>
                </Modal>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: 100,
                        backgroundColor: COLORS.black,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius
                    }}

                    onPress={() => update()}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E8EAED' }}>
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    )
}

export default Detail;