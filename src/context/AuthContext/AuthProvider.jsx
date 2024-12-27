import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { HelmetProvider } from 'react-helmet-async';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [light, setLight] = useState(true);

    const handleToggle = () => {
        setLight(!light);
    };

    const userSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userSignOut = () => {
        return signOut(auth);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const authInfo = {
        user,
        loading,
        userSignUp,
        userLogin,
        userSignOut,
        updateUserProfile,
        handleToggle,
        light,
    };

    return (
        <HelmetProvider>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </HelmetProvider>
    );
};

export default AuthProvider;
