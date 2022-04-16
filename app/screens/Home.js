import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard
} from "react-native";
import { FONTS, images, SIZES, COLORS } from "../constants";
import { Feather, Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = ({ navigation }) => {

    const [color, setColor] = React.useState(COLORS.blue);
    const [newTodo, setNewTodo] = React.useState('');
    const [data, setData] = React.useState([]);

    /* const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user);
        } else {
            console.log('No');
        }
    }); */

    // fake data

    const colors = [COLORS.bubble, COLORS.blue, COLORS.green, COLORS.orange, COLORS.pink];

    const addNewTodo = () => {
        if (newTodo !== '') {
            const todo = {
                id: data.length + 1,
                name: newTodo
            }

            const oldList = [...data];
            oldList.push(todo);
            setData(oldList);
            setNewTodo('');
            Keyboard.dismiss();
        }

    }

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
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>minhtrang@gmail.com</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderItem({ item }) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: color,
                    marginBottom: SIZES.base * 2,
                    padding: SIZES.base * 2,
                    borderRadius: SIZES.radius,
                    alignItems: 'center'
                }}
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
            </View>
        )
    }

    function renderContent() {
        return (
            <View
                style={{
                    padding: SIZES.padding
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
                    contentContainerStyle={{ paddingVertical: SIZES.padding }}
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