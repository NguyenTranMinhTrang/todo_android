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
    Platform,
    Alert
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateTodo, schedulePushNotification, cancelNotification } from "../utils/services";

const Detail = ({ navigation, route }) => {

    const [task, setTask] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = React.useState({
        des: '',
        time: '',
        date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    })
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState('date');
    const [token, setToken] = React.useState('');
    const [notification, setNotification] = React.useState([]);

    console.log("todo: ", data);
    console.log("notification: ", notification);

    React.useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#FF573300');
            StatusBar.setTranslucent(true);
        }
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
        let { userId, item, token } = route.params;
        setTask({
            userId: userId,
            ...item
        });
        setToken(token);
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
        schedulePushNotification(data.date, data.time, task.name)
            .then(result => {
                if (result) {
                    let notice = notification.filter((data) => {
                        return data.idTodo == task.id;
                    });
                    const array = [...notification];

                    console.log("notice: ", notice);

                    if (!notice[0] || notification.length == 0) {
                        console.log("create a new noti");
                        const newNoti = {
                            idTodo: task.id,
                            idNoti: result.id,
                            time: result.deadline
                        }
                        console.log("New notice: ", newNoti);
                        array.push(newNoti);
                        setNotification(array);
                    }
                    else {
                        if (result.deadline < notice[0].time) {
                            cancelNotification(notice[0].idNoti)
                                .then(() => {
                                    // set a new notification
                                    console.log("cancle");
                                    const newNoti = {
                                        idTodo: notice[0].idTodo,
                                        idNoti: result.id,
                                        time: result.deadline
                                    }
                                    let index = array.indexOf(notice[0]);
                                    console.log("index search: ", index);
                                    array.splice(index, 1, newNoti);
                                    setNotification(array);
                                })
                        }
                        else {
                            console.log("update a new notification");
                            const newNoti = {
                                idTodo: notice[0].idTodo,
                                idNoti: result.id,
                                time: result.deadline
                            }
                            let index = array.indexOf(notice[0]);
                            console.log("index search: ", index);
                            array.splice(index, 1, newNoti);
                            setNotification(array);
                        }

                    }
                }
                else {
                    Alert.alert("Error", "Set time error");
                }
            })
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