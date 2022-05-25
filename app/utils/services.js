import { auth, database } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set, push, remove, get, child } from "firebase/database";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { showSuccess, showError } from "../components/showMessage";

const signUpUser = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            callback({ result: "success", user: user.email });
        })
        .catch((error) => {
            callback({ result: "fail", error: error });
            console.log(error);
        })
}

const signInUser = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            let notifications = await get(child(ref(database), 'todo/' + user.uid))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        if (snapshot.val().notifications) {
                            return (snapshot.val().notifications);
                        }
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });

            if (!notifications) {
                notifications = [];
            }

            registerForPushNotificationsAsync().then(token => {
                callback({
                    result: "success", data: {
                        email: user.email,
                        id: user.uid,
                        token: token,
                        notifications: notifications
                    }
                });
            })
        })
        .catch((error) => {
            callback({ result: "fail" })
            console.log(error);
        });
}

const clearUserData = async () => {
    return AsyncStorage.removeItem('user');
}

const handleSignOut = () => {
    return auth.signOut();
}

const getUserData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('user').then(data => {
            resolve(JSON.parse(data));
        });
    });
}

const setUserData = async (data) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('user', data);
}

const getTodoData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('todo').then(data => {
            resolve(JSON.parse(data));
        });
    });
}

const setTodoData = async (data) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('todo', data);
}


const addnewTask = (userId, data) => {
    const postListRef = ref(database, 'todo/' + userId);
    const newPostRef = push(postListRef);
    set(newPostRef, {
        name: data.name,
        description: data.des,
        date: data.date,
        time: data.time
    })
        .then(() => {
            console.log('Success');
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteTodo = (userId, item) => {
    const pathDelete = ref(database, 'todo/' + userId + "/" + item.id);
    remove(pathDelete)
        .then(() => {
            showSuccess("Delete Success!");
        })
        .catch((error) => {
            showError("There is an error occured white delete todo!");
            console.log(error);
        })
}

const updateTodo = (userId, data) => {
    const postListRef = ref(database, 'todo/' + userId + "/" + data.id);
    set(postListRef, {
        name: data.name,
        description: data.des,
        date: data.date,
        time: data.time
    })
        .then(() => {
            showSuccess("Update Success!");
        })
        .catch((error) => {
            showError("There is an error occured white update todo!");
            console.log(error);
        });
}

const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const schedulePushNotification = async (date, time, nameTask) => {
    let arrayDate = date.split("/");
    let arrayTime = time.split(":");
    let now = Date.now();
    let deadline = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]), parseInt(arrayTime[0]), parseInt(arrayTime[1]), 0, 0);
    let miliseconds = deadline.getTime();
    let remind = miliseconds - now;
    if (remind >= 0) {
        let seconds = Math.floor(remind / 1000);
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Deadline!",
                body: nameTask
            },
            trigger: {
                seconds: seconds
            }
        })
        const result = {
            id: id,
            deadline: miliseconds
        }
        return result;
    }

    return null;
}

const cancelNotification = async (notifId) => {
    await Notifications.cancelScheduledNotificationAsync(notifId);
}

export {
    signUpUser,
    signInUser,
    clearUserData,
    handleSignOut,
    setUserData,
    getUserData,
    addnewTask,
    deleteTodo,
    updateTodo,
    schedulePushNotification,
    cancelNotification,
    getTodoData,
    setTodoData
}