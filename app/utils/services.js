import { auth, database } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set } from "firebase/database";

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
export {
    signUpUser,
    signInUser,
    clearUserData,
    handleSignOut,
    setUserData,
    getUserData
}