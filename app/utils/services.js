import { auth, database } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set, push, onValue } from "firebase/database";



const signUpUser = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            callback({ result: "success", user: user.email });
        })
        .catch((error) => {
            callback({ result: "fail", error: error });
            console.log(error);
        })
}

const signInUser = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            callback({ result: "success", data: { email: user.email, id: user.uid } });
        })
        .catch((error) => {
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

const addnewTask = (userId, data) => {
    const postListRef = ref(database, 'todo/' + userId);
    const newPostRef = push(postListRef);
    set(newPostRef, {
        name: data.name,
        description: data.des,
        complete: data.complete
    })
        .then(() => {
            console.log('Success');
        })
        .catch((error) => {
            console.log(error);
        });
}

const readTask = async (userId) => {
    const db = ref(database, 'todo/' + userId);
    const value = [];
    onValue(db, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            const data = {
                id: childKey,
                ...childData
            }
            value.push(data);

        });
    }, {
        onlyOnce: false
    });
    console.log('value : ', value);
    return value;
}

export {
    signUpUser,
    signInUser,
    clearUserData,
    handleSignOut,
    setUserData,
    getUserData,
    addnewTask,
    readTask
}