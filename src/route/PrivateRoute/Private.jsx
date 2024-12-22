import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

const Private = ({children}) => {

    const {user,loading} = useContext(AuthContext)

    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }

    if(user){
        return children
    }

    return (
       <Navigate to='/login'></Navigate>
    );
};

export default Private;