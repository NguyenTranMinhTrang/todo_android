import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    Animated
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { Feather, Ionicons } from '@expo/vector-icons';
import { getUserData, addnewTask, deleteTodo } from "../utils/services";
import { auth, database } from "../firebase/firebase";
import { ref, set, push, onValue, update } from "firebase/database";
import { Swipeable } from "react-native-gesture-handler";

const Home = ({ navigation }) => {

    const [color, setColor] = React.useState(COLORS.blue);
    const [newTodo, setNewTodo] = React.useState('');
    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const notification = React.useRef([]);
    const userId = React.useRef('');

    // fake data
    const colors = [COLORS.bubble, COLORS.blue, COLORS.green, COLORS.orange, COLORS.pink];
    React.useEffect(() => {
        const getUser = async () => {
            const userData = await getUserData();
            if (userData) {
                setUser(userData);
                notification.current = [...userData.notifications];
                userId.current = userData.id;
            }
            onValue(ref(database, 'todo/' + userData.id), (snapshot) => {
                let value = data.splice();
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    const data = {
                        id: childKey,
                        ...childData
                    }
                    value.push(data);
                });
                setData([...value]);
            }, {
                onlyOnce: false
            });
        }
        getUser();

        return () => {
            console.log(userId.current);
            update(ref(database, 'todo/' + userId.current), {
                notifications: notification.current
            })
                .then(() => {
                    console.log("update notification success");
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, []);



    const updateNotification = (newNotification) => {
        notification.current = [...newNotification];
        console.log("notification.current from Home screen: ", notification.current);
    }

    const addNewTodo = () => {
        if (newTodo !== '') {
            const todo = {
                name: newTodo,
                des: '',
                time: '',
                date: ''
            }
            addnewTask(user.id, todo);
            setNewTodo('');
            Keyboard.dismiss();
        }

    }

    const onSelectItem = (item) => {
        navigation.navigate("Detail", {
            email: user.email,
            userId: user.id,
            token: user.token,
            notification: notification.current,
            item: item,
            updateNotification: updateNotification
        });
    }

    const rightAction = (dragX, item) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        });

        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp"
        })
        return (
            <TouchableOpacity
                onPress={() => deleteTodo(user.id, item)}
            >
                <Animated.View
                    style={[{
                        backgroundColor: COLORS.red,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 80,
                        height: 63,
                        borderRadius: SIZES.radius
                    }, { opacity: opacity }]}
                >
                    <Animated.Text style={{ ...FONTS.h3, color: COLORS.white, transform: [{ scale }] }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    //render

    function renderHeader() {
        return (
            <View
                style={{
                    height: SIZES.height * 0.3,
                    backgroundColor: COLORS.blue,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    padding: SIZES.padding
                }}
            >
                {/*   Header Menu */}
                <View
                    style={{
                        height: 50,
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="menu" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            height: 75,
                            width: 75,
                            borderRadius: 75,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                height: 65,
                                width: 65,
                                borderRadius: 65,
                                backgroundColor: 'yellow'
                            }}
                        >

                        </View>
                    </View>

                    <View
                        style={{
                            justifyContent: 'center',
                            marginLeft: SIZES.base
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>Hello</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>{user?.email}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderItem({ item }) {
        return (
            <Swipeable renderRightActions={(_, dragX) => rightAction(dragX, item)}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        backgroundColor: color,
                        marginBottom: SIZES.base * 2,
                        padding: SIZES.base * 2,
                        borderRadius: SIZES.radius,
                        alignItems: 'center'
                    }}

                    onPress={() => onSelectItem(item)}
                >
                    <Text style={{ ...FONTS.body3, flex: 1, color: COLORS.white }}>{item.name}</Text>
                    <View
                        style={{
                            height: 18,
                            width: 18,
                            borderWidth: 2,
                            borderColor: COLORS.blue,
                            backgroundColor: COLORS.white,
                            borderRadius: 18
                        }}
                    >

                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    function renderContent() {
        return (
            <View
                style={{
                    padding: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h2 }}>List Task</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: SIZES.padding
                    }}
                >
                    <TextInput
                        placeholder="Your new task"
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            marginRight: SIZES.base,
                            padding: SIZES.base * 2,
                            fontSize: 16,
                            borderRadius: 60,
                            backgroundColor: COLORS.white,
                            borderColor: '#C0C0C0'
                        }}

                        value={newTodo}
                        onChangeText={(todo) => setNewTodo(todo)}
                    />
                    <TouchableOpacity
                        style={{
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue,
                            height: 60,
                            width: 60,
                            borderRadius: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                        onPress={addNewTodo}
                    >
                        <Ionicons name="add-sharp" size={50} color="white" />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    {
                        colors.map((value, index) => {
                            return (
                                <TouchableOpacity
                                    key={`${index} - ${value}`}
                                    style={{
                                        height: value === color ? 60 : 50,
                                        width: value === color ? 60 : 50,
                                        backgroundColor: value,
                                        borderRadius: SIZES.radius
                                    }}
                                    onPress={() => setColor(value)}
                                >

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: SIZES.padding }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },
});

export default Home;