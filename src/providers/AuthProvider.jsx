import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import PropTypes from "prop-types"; // ES6
import auth from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // register user with email
    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // register user with google 
    const singUpWithApp = (provider) => {
        setIsLoading(true);
        return signInWithPopup(auth, provider);
    };

    // login user
    const loginUser = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("logged from :", currentUser);
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const logout = () => {
        setIsLoading(true);
        return signOut(auth);
    };
    const authInfo = {
        user,
        isLoading,
        createUser,
        singUpWithApp,
        loginUser,
        logout,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
};
export default AuthProvider;
