import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    console.log(data);

    React.useEffect(() => {
        let item = route.params.item;
        setTask(item);
    }, [])


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
        console.log(event);
        const currentDate = selectedDate || date;
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let sdate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        let stime = tempDate.getHours() + ":" + tempDate.getMinutes();
        updateState({ date: sdate, time: stime });
    }


    // render

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
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
                        marginLeft: SIZES.padding
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

                    {
                        show && mode == 'date' && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                                style={{
                                    position: 'absolute',
                                    left: SIZES.width * 0.7,
                                    width: 100,
                                    height: 100
                                }}

                            />
                        )
                    }
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

                    {
                        show && mode == 'time' && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                                style={{
                                    height: 200,
                                    width: 200
                                }}

                            />
                        )
                    }
                </View>
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