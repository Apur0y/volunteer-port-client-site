import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';

const AuthProvider = ({children}) => {

    const [user,setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    const userSignUp=(email,password)=>{

        return createUserWithEmailAndPassword(auth,email,password)
    }

    const userLogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const userSignOut =()=>{
        return signOut(auth)
    }

    const updateUserProfile=(updatedData)=>{
        return updateUserProfile(auth.currentUser,updatedData)
    }

    useEffect(()=>{

        onAuthStateChanged(auth,currentUser=>{
            setuser(currentUser)
            setLoading(false)
        })
    },[])

    const authInfo ={
        user,
        loading,
        userSignUp,
        userLogin,
        userSignOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );{children}
};

export default AuthProvider;