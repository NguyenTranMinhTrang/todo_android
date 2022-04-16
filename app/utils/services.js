import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


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
            callback({
                result: "success", user: {
                    email: user.email,
                    id: user.uid
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
export {
    signUpUser,
    signInUser
}